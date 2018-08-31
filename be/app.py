# Copyright 2016 Google Inc.
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

import httplib
# [START app]
import json
import requests
import requests_toolbelt.adapters.appengine
requests_toolbelt.adapters.appengine.monkeypatch()

from flask import Flask, redirect, jsonify
from flask import request
from google.appengine.ext import ndb
from google.appengine.api import urlfetch


app = Flask(__name__)
url = "https://api.figo.me"
urlfetch.set_default_fetch_deadline(600)


def transform_category(category):
    related_categories = Category.query(
        Category.month == category.month,
        Category.id == category.id).fetch()
    average = sum(c.total_amount for c in related_categories) / len(related_categories)
    return {"month": category.month, "amount": format(category.total_amount, '.2f'),
            "averagePeerAmount": format(average, '.2f')}


@app.route('/fancy-categories')
def fancy_categories():
    username = request.args.get('username')
    categories = Category.query(Category.username == username).order(-Category.month)
    data = {}
    for category in categories:
        data[category.en_name] = data.get(category.en_name, []) + [transform_category(category)]
    return jsonify(data)


@app.route('/parse-transactions', methods=["POST"])
def parse_transactions():
    body = request.get_json()
    figo_username = body['figoUsername']
    figo_password = body['figoPassword']
    access_token = get_access_token(figo_username, figo_password)
    headers = {
        'Content-Type': "application/json",
        'Authorization': "Bearer " + access_token
    }
    response = requests.request("GET", url + "/rest/transactions", headers=headers)
    content = response.content
    data = json.loads(content)
    txs = data['transactions']
    for tx in txs:
        if "categories" in tx and len(tx['categories']) > 1 and tx["amount"] < 0:
            category_id = tx['categories'][0]['id']
            subcategory_id = tx['categories'][1]['id']
            month = get_month(tx['value_date'])
            cat_name = tx['categories'][0]['name']
            sub_cat_name = tx['categories'][1]['name']
            amount = abs(tx['amount'])
            if subcategory_id in en_categories:
                identifier = subcategory_id
            else:
                identifier = category_id

            cat_key = ndb.Key(
                Category, str(identifier) + "_" + month + "_" + figo_username)
            category = Category.get_by_id(cat_key.id())
            if category is None:
                category = Category(
                    id = identifier, month=month, category=cat_name, category_id=category_id, total_amount=0.0,
                    subcategory=sub_cat_name, subcategory_id=subcategory_id, username= figo_username,
                    en_name=en_categories.get(identifier, None))
                category.key = cat_key
            category.total_amount += amount
            category.put()
    return "DONE"


def get_access_token(username, password):
    payload = {"scope": "categorization=rw accounts=rw transactions=rw balance=rw offline create_user",
               "grant_type": "password", "username": username, "password": password }
    headers = {'Authorization': "",
               "Content-Type": "application/json"}
    print(payload)
    j = json.dumps(payload)
    print(j)
    response = requests.request("POST", url + "/auth/token", data=j, headers=headers)
    content = response.content
    print(content)
    access_token = json.loads(content)['access_token']
    return access_token


def get_month(date):
    return date[0:7]


class Category(ndb.Model):
    id = ndb.IntegerProperty()
    month = ndb.StringProperty()
    category = ndb.StringProperty()
    category_id = ndb.IntegerProperty()
    total_amount = ndb.FloatProperty()
    subcategory = ndb.StringProperty()
    subcategory_id = ndb.IntegerProperty()
    username = ndb.StringProperty()
    en_name = ndb.StringProperty()


en_categories = {
    1: "Cash",
    3: "Education",
    11: "Income",
    22: "Leisure",
    24: "Restaurants",
    41: "Health",
    45: "Pets",
    50: "Investment",
    82: "Living Costs",
    158: "Rent",
    101: "Transport",
    119: "Other",
    128: "Insurance",
    149: "Utilities",
    94:  "Groceries",
    164: "Electricity",
    165: "Telecommunications",
    92: "Clothing",
    107: "Flights"
}
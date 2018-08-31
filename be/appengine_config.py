# appengine_config.py
from google.appengine.ext import vendor
from google.appengine.api import urlfetch

# Add any libraries install in the "lib" folder.
vendor.add('lib')
urlfetch.set_default_fetch_deadline(600)
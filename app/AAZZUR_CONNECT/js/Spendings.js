import React, { Component } from 'react';
import {
    View,
    FlatList,
    Image,
    Text,
    TouchableOpacity,
    Animated,
    Easing,
    ActivityIndicator,
    Dimensions
} from 'react-native';
import AppBar from './AppBar';
import { scaleHeight, scaleWidth, scaleFont } from './scale';
import remote from './remote';
import colors from './colors';
import { BarChart, Grid, XAxis, AreaChart, LineChart } from 'react-native-svg-charts';
import {Image as SVGImage, Svg} from 'react-native-svg';
import * as scale from 'd3-scale';
import * as shape from 'd3-shape';
import Carousel from 'react-native-snap-carousel';

export default class Spendings extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showCategoryDetails: new Animated.Value(0)
        }
        this.renderItem = this.renderItem.bind(this);
        this.showCategoryDetails = this.showCategoryDetails.bind(this);
        this.hideCategoryDetails = this.hideCategoryDetails.bind(this);
        this.changeMonth = this.changeMonth.bind(this);
    }

    componentDidMount() {
        this.setState({loading: true});
        remote.get('fancy-categories?username=jk@aazzur.com').then(async resp => {
            if(resp) {
                let data = await resp.json();
                let allData = this.storeData(data);
                this.setState(allData);
                this.setState({loading: false});
            }
        })
    }

    monthToAmountData() {
        let date = new Date();
        date.setMonth(date.getMonth() - 11);
        let monthToAmountData = {};
        let months = this.months();
        for(let i = 0; i < 12; i++) {
            
            if(!monthToAmountData[months[date.getMonth()]])
                monthToAmountData[months[date.getMonth()]] = 0;
            date.setMonth(date.getMonth() + 1);
        }
           
            
        return monthToAmountData;
    }

    months() {
        return ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    }

    storeData(data) {
        let monthlyData = {};
        let monthlyCategoriesData = [];
        let selectedMonth;
        if(data) {
            for(let category in data) {
                for(let categoryData of data[category]) {
                    if(!monthlyData[categoryData.month])
                        monthlyData[categoryData.month] = [];
                    monthlyData[categoryData.month].push({category, amount: Number(categoryData.amount), amountPeer: Number(categoryData.averagePeerAmount), diff: Number(categoryData.amount) - Number(categoryData.averagePeerAmount)});
                }
            }
            for(let date in monthlyData) {
                
                let categoriesData, monthlyBarData, xLabelData;
                categoriesData = monthlyData[date];
                let barColors = ['#2274A5FF', '#F85B03FF', '#F1C40EFF', '#D90367FF', '#01CD66FF']
                categoriesData = categoriesData.sort((a, b) => b.amount - a.amount);
                let peerData = categoriesData.map(categoryData => ({value: categoryData.amountPeer}));
                let userData = categoriesData.map((categoryData, index) => ({value: categoryData.amount, svg: {
                    fill: barColors[index%5],                   
                }}));
                monthlyBarData = [{
                    data: peerData.length > 5 ? peerData.slice(0, 5) : peerData,
                    svg: {
                        fill: '#F2F2F2FF',                   
                    }
                }, {
                    data: userData.length > 5 ? userData.slice(0, 5) : userData,
                    
                }];
                xLabelData = categoriesData.map(categoryData => categoryData.category);
                monthlyCategoriesData.push({selectedMonth: date, monthlyBarData: monthlyBarData, xLabelData: xLabelData.length > 5 ? xLabelData.slice(0, 5) : xLabelData});
            }
            selectedMonth = monthlyCategoriesData[0].selectedMonth;
        }
        return {monthlyCategoriesData: monthlyCategoriesData.sort((a, b) => new Date(b.selectedMonth) - new Date(a.selectedMonth)), monthlyData, selectedMonth};
    }
    showCategoryDetails(selectedCategory) {
        let monthToUserAmountData = this.monthToAmountData();
        let monthToPeerAmountData = this.monthToAmountData();
        let {monthlyData} = this.state;
        console.log('momnthly', monthlyData, monthToPeerAmountData);
        let months = this.months();
        for(let date in monthlyData) {
            let categoriesData = monthlyData[date];
            for(let categoryData of categoriesData) {
                if(categoryData.category === selectedCategory.category) {
                    let monthName = months[new Date(date).getMonth()];
                    console.log('peer amount', categoryData.amountPeer);
                    monthToUserAmountData[monthName] += categoryData.amount;
                    monthToPeerAmountData[monthName] += categoryData.amountPeer;
                    break;
                }
            }
        }
        this.setState({selectedCategory, monthToPeerAmountData, monthToUserAmountData});
        Animated.timing(this.state.showCategoryDetails, {
            toValue: 1,
            duration: 400,
            easing: Easing.in(Easing.ease),
            useNativeDriver: true
        }).start();
    }
    
    hideCategoryDetails() {
        Animated.timing(this.state.showCategoryDetails, {
            toValue: 0,
            duration: 400,
            easing: Easing.out(Easing.ease),
            useNativeDriver: true
        }).start();
        this.setState({selectedCategory: null, monthToPeerAmountData: null, monthToUserAmountData:  null});
    }

    renderItem({item}) {
        console.log('categories', item);
        return (
            <View style = {{backgroundColor: 'white', width: '100%', height: scaleHeight(84), paddingHorizontal: scaleWidth(8), marginBottom: scaleWidth(12),}}>
                <TouchableOpacity activeOpacity = {0.7} style = {{backgroundColor: 'white', width: '100%', height: scaleHeight(82), borderLeftColor: '#2274A5FF', borderLeftWidth: 2, elevation: 2}} onPress = {() => this.showCategoryDetails(item)}>
                    <View style = {{flexDirection: 'row', width: '100%', paddingHorizontal: scaleWidth(16), marginVertical: scaleHeight(12)}}>
                        <Image style = {{height: scaleHeight(24), width: scaleWidth(24)}} />
                            <Text style = {{width: scaleWidth(92), fontSize: scaleFont(16), fontFamily: 'sans-serif-condensed', color: 'black'}}>{item.category}</Text>
                        <View style = {{position: 'absolute', right: 0, flexDirection: 'row'}}>
                            <Image style = {{marginRight: scaleWidth(12), height: scaleHeight(24), width: scaleWidth(24)}} resizeMode = 'contain' source = {require('../assets/reveal.png')}/>
                            <Image style = {{height: scaleWidth(24), width: scaleWidth(24), marginRight: scaleWidth(12)}} resizeMode = 'contain' source = {require('../assets/expand-down-24px.png')}/>
                        </View>
                    </View>
                    <View style = {{flexDirection: 'row', width: '100%', paddingHorizontal: scaleWidth(16), marginTop: scaleHeight(12)}}>
                
                        <Text style = {{width: scaleWidth(76), fontSize: scaleFont(16), fontFamily: 'sans-serif-condensed', color: 'black'}}>{'€ ' + item.amount}</Text>
                        <Text style = {{width: scaleWidth(76), fontSize: scaleFont(16), fontFamily: 'sans-serif-condensed', color: 'black', marginLeft: scaleWidth(75), textAlign: 'right'}}>{'€ ' + Math.abs(item.diff).toFixed(2)}</Text>
                        <Image style = {{height: scaleWidth(20), width: scaleWidth(20), marginLeft: scaleWidth(16), marginRight: scaleWidth(4)}} resizeMode = 'contain' source = {item.diff >0 ? require('../assets/arrow_upward_24px.png') :  require('../assets/arrow_downward_24px.png')} />
                        <Text style = {{width: scaleWidth(76), fontSize: scaleFont(16), fontFamily: 'sans-serif-condensed', color: 'black', textAlign: 'left'}} numberOfLines = {1}>{(Math.abs(item.diff) / item.amountPeer * 100).toFixed(2) + '%'}</Text>
                    </View>
                </TouchableOpacity>
                
            </View>
        )
    }

    changeMonth(dateIndex) {
        if(dateIndex!=undefined) {
            let {monthlyCategoriesData} = this.state;      
            this.setState({selectedMonth: monthlyCategoriesData[dateIndex].selectedMonth});
            this.hideCategoryDetails();
        }       
    }    

    render() {
        let catergoryAnimate = this.state.showCategoryDetails.interpolate({
            inputRange: [0, 1],
            outputRange: [0, scaleHeight(280)]
        });

        let {monthlyCategoriesData, selectedMonth, monthlyData, selectedCategory, monthToPeerAmountData, monthToUserAmountData} = this.state;
       
        let monthDataIndex = selectedMonth && monthlyCategoriesData ? monthlyCategoriesData.findIndex(monthlyCategoryData => monthlyCategoryData.selectedMonth === selectedMonth) : 0;
        let categoriesData;
        if(monthlyData && selectedMonth) {
            categoriesData = monthlyData[selectedMonth];
        }
        let itemWidth = Dimensions.get('window').width;
        return (
            <View style = {{backgroundColor: 'white', width: '100%', height: '100%'}}>
                <AppBar text = 'Spendings' />
                {this.state.loading ?
                <View style = {{width: '100%', height: scaleHeight(528), marginTop: scaleHeight(56), justifyContent: 'center', alignItems: 'center'}}>
                <ActivityIndicator size = 'large' color = {colors.blue}/>
                    </View> :
                <View style = {{width: '100%', height: scaleHeight(528),  marginTop: scaleHeight(56)}}>
                <View style = {{backgroundColor: 'white', width: '100%', height: scaleHeight(192), borderBottomColor: '#0000000D', borderBottomWidth: 1}}>
                {monthDataIndex != undefined && monthlyCategoriesData && 
                <Carousel 
                itemWidth = {itemWidth} 
                sliderWidth = {itemWidth}
                data = {monthlyCategoriesData} 
                onSnapToItem = {this.changeMonth} 
                firstItem = {monthDataIndex}
                renderItem = {({item}) => (<BarChartComponent monthlyBarData = {item.monthlyBarData} 
                    xLabelData = {item.xLabelData} 
                    selectedMonth = {item.selectedMonth}/>)}
                    />
                }
                </View>
                <View style = {{backgroundColor: 'white', height: scaleHeight(312), width: '100%'}}>
                    <Text style = {{fontSize: scaleFont(16), fontFamily: 'sans-serif-condensed', paddingLeft: scaleWidth(16), color: 'black', marginBottom: scaleHeight(8), height: scaleHeight(24), opacity: 0.45, marginTop: scaleHeight(16)}}>Categories</Text>
                    <View style = {{width: '100%', flex: 1, borderTopColor: '#0000000D', borderTopWidth: 1}}>
                    {categoriesData && <FlatList style = {{width: '100%', flex: 1}}
                    showsVerticalScrollIndicator = {false}
                    data = {categoriesData}
                    keyExtractor = {(item, index) => index.toString()}
                    renderItem = {this.renderItem}/>}
                    <Animated.View style = {{position: 'absolute', width: '100%', top: -scaleHeight(280), backgroundColor: 'white', height: scaleHeight(280), transform: [{translateY: catergoryAnimate}], opacity: this.state.showCategoryDetails}}>
                        {selectedCategory ? <CategoryDetailsComponent hideCategoryDetails = {this.hideCategoryDetails} item = {selectedCategory}  monthToPeerAmountData = {monthToPeerAmountData} monthToUserAmountData = {monthToUserAmountData} /> : null}
                    </Animated.View>
                    </View>
                </View>
                </View>}
            </View>
        );
    }
}

const CategoryDetailsComponent = props => {
    return (
        <View style = {{width: '100%', height: '100%', paddingHorizontal: scaleWidth(8), paddingBottom: scaleHeight(2)}}>
       
            {/* <TouchableOpacity style = {{height: '100%', width: '100%', borderLeftColor: '#2274A5FF', borderLeftWidth: 2, elevation: 2 }} onPress = {props.hideCategoryDetails}> */}
            <TouchableOpacity style = {{flexDirection: 'row', width: '100%', paddingHorizontal: scaleWidth(16), marginTop: scaleHeight(12)}} onPress = {props.hideCategoryDetails}>
                <Image style = {{height: scaleHeight(24), width: scaleWidth(24)}} />
                    <Text style = {{width: scaleWidth(92), fontSize: scaleFont(16), fontFamily: 'sans-serif-condensed', color: 'black'}}>{props.item.category}</Text>
                <View style = {{position: 'absolute', right: 0, flexDirection: 'row'}}>
                    <Image style = {{marginRight: scaleWidth(12), height: scaleHeight(24), width: scaleWidth(24)}} resizeMode = 'contain' source = {require('../assets/reveal.png')}/>
                    <Image style = {{height: scaleWidth(24), width: scaleWidth(24), marginRight: scaleWidth(12), transform: [{rotate: '180deg'}]}} resizeMode = 'contain' source = {require('../assets/expand-down-24px.png')}/>
                </View>
            {/* </View> */}
            </TouchableOpacity>
            <View style = {{flexDirection: 'row', width: '100%', paddingHorizontal: scaleWidth(16), marginTop: scaleHeight(12),}}>
                
                <Text style = {{width: scaleWidth(76), fontSize: scaleFont(16), fontFamily: 'sans-serif-condensed', color: 'black'}}>{'€ ' + props.item.amount}</Text>
                <Text style = {{width: scaleWidth(76), fontSize: scaleFont(16), fontFamily: 'sans-serif-condensed', color: 'black', marginLeft: scaleWidth(75), textAlign: 'right'}}>{'€ ' + Math.abs(props.item.diff).toFixed(2)}</Text>
                <Image style = {{height: scaleWidth(20), width: scaleWidth(20), marginLeft: scaleWidth(16), marginRight: scaleWidth(4)}} resizeMode = 'contain' source = {props.item.diff >0 ? require('../assets/arrow_upward_24px.png') :  require('../assets/arrow_downward_24px.png')} />
                <Text style = {{width: scaleWidth(76), fontSize: scaleFont(16), fontFamily: 'sans-serif-condensed', color: 'black', textAlign: 'left'}} numberOfLines = {1}>{(Math.abs(props.item.diff) / props.item.amountPeer * 100).toFixed(2) + '%'}</Text>
            </View>
            <View style = {{height: 2, width: '90%', backgroundColor: '#0000000D', marginTop: scaleHeight(16), alignSelf: 'center'}} />
            <View style = { {flex: 1}}>
            <AreaChart style = {{width: '100%', height: scaleHeight(92)}} 
                data = {Object.values(props.monthToPeerAmountData)} 
                svg = {{fill: '#E0EAF1FF'}}
                contentInset={{ top: scaleHeight(10), bottom: scaleHeight(10) }} animate
                curve={ shape.curveNatural } 
                />
            <XAxis
                data={ Object.keys(props.monthToPeerAmountData)}
                style={{ marginTop: scaleHeight(10) }}
                xAccessor = {({item}) => item}
                
                scale={scale.scaleBand}
                formatLabel={ (value, index) => value }
                labelStyle={ { color: 'black', width: scaleWidth(20)} }
                spacingInner = {0.5}
                contentInset={ { top: scaleHeight(30), bottom: scaleHeight(30) } }
                />
                <LineChart
                    style={ { position: 'absolute', width: '100%', height: scaleHeight(92)} }
                    data={ Object.values(props.monthToUserAmountData) }
                    svg={ {
                        stroke: 'rgb(134, 65, 244)',
                    } }
                    curve = { shape.curveNatural } 
                />
                </View>
        </View> 
    );
}

const BarChartComponent = props => {
    return (
        <View style = {{width: '100%', height: '100%', paddingHorizontal: scaleWidth(8)}}>
            <Text style = {{marginTop: scaleHeight(16), color: 'black', paddingLeft: scaleWidth(16)}}>{'Spendings - ' + props.selectedMonth}</Text>
            <BarChart style = {{height: scaleHeight(130), marginTop: scaleHeight(-15)}}
            data = {props.monthlyBarData}
            spacingInner = {0.5}
            yAccessor = {({ item }) => item.value}
            contentInset={ { top: scaleHeight(30), bottom: scaleHeight(30) } }
            numberOfTicks = {5}
            >
            <Grid />
            
        </BarChart>
        <XAxis                    
            style={{ marginTop: 0,  }}
            xAccessor = {({item}) => item}
            data = {props.xLabelData}
            scale={scale.scaleBand}
            formatLabel={ (value, index) => ' ' }
            labelStyle={ { color: 'black', width: scaleWidth(20)} }
            spacingInner = {0.5}
            contentInset={ { top: scaleHeight(30), bottom: scaleHeight(30) } }
           
        ><SVGImage  width="50%"
        height="100%" x = {"" + scaleWidth(-50)} href={require('../assets/visibility_24px.png')}/>
        <SVGImage  width="50%"
        height="100%" x = {"" + scaleWidth(40)} href={require('../assets/visibility_24px.png')}/>
         <SVGImage  width="50%"
        height="100%" x = {"" + scaleWidth(135)} href={require('../assets/visibility_24px.png')}/>
         <SVGImage  width="50%"
        height="100%" x = {"" + scaleWidth(230)} href={require('../assets/visibility_24px.png')}/>
        
        </XAxis>
        </View>
    );
}

const graphLabelImages = {
    Cash: require('../assets/money.png'),
    Education: require('../assets/money.png'),
    Income: require('../assets/money.png'),
    Leisure: require('../assets/money.png'),
    Health: require('../assets/money.png'),
    Pets: require('../assets/money.png'),
    Investment: require('../assets/money.png'),
    Living_Costs: require('../assets/money.png'),
    Rent: require('../assets/money.png'),
    Transport: require('../assets/money.png'),
    Other: require('../assets/money.png'),
    Insurance: require('../assets/money.png'),
    Utilities: require('../assets/money.png'),
    Groceries: require('../assets/money.png'),
    Electricity: require('../assets/money.png'),
    Telecommunications: require('../assets/money.png'),
    Clothing: require('../assets/money.png'),
    Flights: require('../assets/money.png'),
};
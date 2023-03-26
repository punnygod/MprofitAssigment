import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {LineChart} from 'react-native-chart-kit';
import * as Progress from 'react-native-progress';

const back = require('../assets/back.png');
const threedot = require('../assets/threedot.png');

const screenWidth = Dimensions.get('window').width;

const Spending = ({navigation}) => {
  const [data, setData] = useState([
    {
      Date: '2022-01-01',
      Spending: 5000,
    },
    {
      Date: '2022-01-15',
      Spending: 8000,
    },
    {
      Date: '2022-02-01',
      Spending: 7000,
    },
    {
      Date: '2022-02-15',
      Spending: 15000,
    },
    {
      Date: '2022-03-01',
      Spending: 14000,
    },
    {
      Date: '2022-03-15',
      Spending: 20000,
    },
    {
      Date: '2022-04-01',
      Spending: 24000,
    },
  ]);
  const [cardData, setCardData] = useState([
    {
      title: 'Shopping',
      date: '10 jan 2022',
      amount: '$ 544',
      amountMedium: 'In Cash',
      image: require('../assets/store.png'),
      color: '#81B2CA24',
    },
    {
      title: 'Restuarant',
      date: '11 jan 2022',
      amount: '$ 1044',
      amountMedium: 'Card',
      image: require('../assets/coffee.png'),
      color: '#836F8124',
    },
    {
      title: 'Shopping',
      date: '12 jan 2022',
      amount: '$ 1800',
      amountMedium: 'Online',
      image: require('../assets/bus.png'),
      color: '#42887C24',
    },
  ]);

  // Update state variables based on user input or API calls
  useEffect(() => {
    fetch('https://dashboard-mobile.free.beeceptor.com/chart-data')
      .then(response => response.json())
      .then(responseJson => {
        setData(responseJson);
      })
      .catch(e => {
        console.log('e', e);
      });
  }, []);
  const formatYLabel = data => {
    return Intl.NumberFormat('en-US', {
      notation: 'compact',
      maximumFractionDigits: 1,
    }).format(data);
  };
  const getlabels=()=>{
    return data.map(a => new Date(a.Date)).map(a=>a.toLocaleString('en-US', { month: 'short' }))
  }
  const datset = {
    labels: getlabels(),
    datasets: [
      {
        data: data.map(a => a.Spending),
        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, 
        strokeWidth: 2.5, 
      },
    ],
  };

  const chartConfig = {
    backgroundGradientFrom: '#fff',
    backgroundGradientFromOpacity: 1,
    backgroundGradientTo: '#fff',
    backgroundGradientToOpacity: 1,
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    strokeWidth: 2.5, 
    barPercentage: 0.5,
    useShadowColorFromDataset: false, 
    fillShadowGradientTo: '#fff',
    fillShadowGradientFrom: '#fff',
    labelColor: (opacity = 1) => `#818181`,
  };
  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image source={back} style={styles.back} />
          </TouchableOpacity>
          <Text style={styles.headerText}>My Spending</Text>
          <Image source={threedot} style={styles.back} />
        </View>
        <ScrollView horizontal={true}>
        <LineChart
          data={datset}
          width={screenWidth * 1.5}
          height={256}
          chartConfig={chartConfig}
          bezier
          withVerticalLines={false}
          verticalLabelRotation={0}
          formatYLabel={formatYLabel}
          fromZero={true}
        />
        </ScrollView>
        <View>
          <View style={styles.budgetCard}>
            <View style={styles.cardOne}>
              <View style={styles.textCont}>
                <Text style={styles.budgetText}>Budget for October</Text>
                <Text style={styles.amount}>$2,478</Text>
              </View>
              <Progress.Bar
                progress={0.6}
                width={screenWidth * 0.8}
                height={6}
                borderColor="#2C383F"
                unfilledColor="rgba(255, 255, 255, 0.38)"
                color="#FAB512"
              />
            </View>
            <View style={styles.budgetListCont}>
              <Text style={styles.budgetHeader}>Your Budget</Text>
              {cardData?.map((card, i) => {
                return (
                  <View style={styles.listCard} key={i}>
                    <View
                      style={[
                        styles.imageCardCont,
                        {backgroundColor: card.color, borderRadius: 18},
                      ]}>
                      <Image source={card.image} style={styles.cardImg} />
                    </View>
                    <View style={{width: '72%'}}>
                      <View style={styles.topText}>
                        <Text style={styles.titleText}>{card.title}</Text>
                        <Text style={[styles.titleText, {textAlign: 'right'}]}>
                          {card.amount}
                        </Text>
                      </View>
                      <View style={styles.topText}>
                        <Text style={styles.subText}>{card.date}</Text>
                        <Text style={[styles.subText, {textAlign: 'right'}]}>
                          {card.amountMedium}
                        </Text>
                      </View>
                    </View>
                  </View>
                );
              })}
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  imageCardCont: {
    height: 65,
    width: 65,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  titleText: {
    fontSize: 16,
    lineHeight: 20,
    color: '#1A202C',
    fontWeight: '600',
  },
  subText: {
    fontSize: 12,
    lineHeight: 24,
    color: '#1A202C',
    fontWeight: '400',
  },
  topText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardImg: {
    width: 32,
    height: 32,
    resizeMode: 'contain',
  },
  listCard: {
    padding: 7,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderRadius: 20,
    marginVertical: 12,
  },
  back: {
    height: 24,
    width: 24,
    resizeMode: 'contain',
  },
  cardOne: {
    paddingVertical: 34,
    paddingHorizontal: 44,
  },
  headerText: {
    color: '#030303',
    textAlign: 'center',
    fontWeight: '700',
    fontSize: 16,
    lineHeight: 20,
    width:'auto'
  },
  header: {
    flexDirection: 'row',
    marginHorizontal: 10,
    marginVertical: '8%',
    alignItems: 'center',
    width:screenWidth*0.9,
    justifyContent: 'space-between',
  },
  textCont: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  budgetCard: {
    backgroundColor: '#2C383F',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    width: screenWidth,
    marginTop: 32,
  },
  budgetText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '600',
    lineHeight: 20,
  },
  budgetHeader: {
    color: '#030303',
    fontSize: 15,
    fontWeight: '600',
    lineHeight: 24,
  },
  amount: {
    color: '#FFFFFF',
    fontSize: 21,
    fontWeight: '700',
    lineHeight: 26,
  },
  budgetListCont: {
    backgroundColor: '#F4F6F6',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    width: screenWidth,
    paddingVertical: 27,
    paddingHorizontal: 24,
  },
});

export default Spending;

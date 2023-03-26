import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';

const visa = require('../assets/visa.png');
const branch = require('../assets/branch.png');
const grid = require('../assets/grid.png');
const money = require('../assets/money.png');
const wallet = require('../assets/wallet.png');
const bank = require('../assets/bank.png');

const Dashboard = () => {
  const [data, setData] = useState({
    AvailableBalance: 5400,
    Budget: 2453,
    Income: 1700,
    Expense: 1500,
    currency:'$'
  });

  // Update state variables based on user input or API calls
  useEffect(() => {
    fetch('https://dashboard-mobile.free.beeceptor.com/stats')
      .then(response => {
        console.log('response', response._bodyInit._data);
        let data = {
          AvailableBalance: 5400,
          Budget: 2453,
          Income: 1700,
          Expense: 1500,
          currency:'$'
        };
        setData({...data});
      })
      .catch(e => {
        console.log('e', e);
      });
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={grid} style={styles.grid} />
        <Text style={styles.headerText}>Dashboard</Text>
      </View>
      <View style={styles.card}>
        <View style={styles.visaContainer}>
          <Text style={styles.title}>Available Balance</Text>
          <Image source={visa} style={styles.visa} />
        </View>
        <Text style={styles.amount}>{data?.currency} {data?.AvailableBalance}</Text>
        <Image source={branch} style={styles.branch} />
        <View style={styles.branchContainer}>
          <Text style={styles.details}>See details</Text>
        </View>
      </View>
      <View style={[styles.card, styles.budgetCard]}>
        <View>
          <Text style={styles.budgetTitle}>Budget for October</Text>
          <Text style={styles.budgetDetails}>Cash Available</Text>
        </View>
        <View>
          <Text style={styles.budgetAmount}>{data?.currency} {data?.Budget}</Text>
        </View>
      </View>
      <View style={[styles.card, styles.savingGoalCard]}>
        <View style={styles.savingsText}>
          <Text style={styles.savingsTitle}>Create a Saving goal</Text>
          <Text style={styles.savingsDetails}>
            Lorem ipsum dolor sit amet, consectetur adipisci.
          </Text>
        </View>
        <View>
          <Image source={money} style={styles.money} />
        </View>
      </View>
      <View style={styles.incomeExpCont}>
        <Text style={styles.cash}>Cash</Text>
        <View style={styles.doublecardCont}>
          <View style={[styles.card, styles.incomeCard]}>
            <View style={styles.imageCircCont}>
              <Image source={bank} style={styles.imageCirc} />
            </View>
            <View>
              <Text style={styles.incomeText}>{data?.currency} {data?.Income}</Text>
              <Text style={styles.headDetails}>Income</Text>
            </View>
          </View>
          <View
            style={[
              styles.card,
              styles.incomeCard,
              {backgroundColor: '#E6E2E6'},
            ]}>
            <View style={[styles.imageCircCont, {backgroundColor: '#836F81'}]}>
              <Image source={wallet} style={styles.imageCirc} />
            </View>
            <View>
              <Text style={styles.incomeText}>{data?.currency} {data?.Expense}</Text>
              <Text style={styles.headDetails}>Expense</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginVertical: 20,
  },
  doublecardCont: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  imageCirc: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
  headDetails: {
    fontSize: 14,
    lineHeight: 17,
    fontWeight: '400',
    color: '#686868',
  },
  imageCircCont: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 40,
    backgroundColor: '#42887C',
    marginBottom: 47,
  },
  incomeExpCont: {
    width: '90%',
  },
  grid: {
    height: 24,
    width: 24,
    resizeMode: 'contain',
  },
  incomeCard: {
    backgroundColor: '#D9E7E5',
    flexDirection: 'column',
    width: '45%',
  },
  cash: {
    fontWeight: '600',
    fontSize: 15,
    lineHeight: 24,
    alignSelf: 'flex-start',
    color: '#030303',
  },
  headerText: {
    color: '#030303',
    width: '90%',
    textAlign: 'center',
  },
  budgetTitle: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 13,
    lineHeight: 20,
  },
  budgetDetails: {
    color: 'rgba(255, 255, 255, 0.7);',
    fontWeight: '400',
    fontSize: 13,
    lineHeight: 20,
  },
  savingsText: {
    width: '70%',
  },
  incomeText: {
    fontSize: 17,
    lineHeight: 24,
    fontWeight: '700',
    color: '#030303',
  },
  budgetAmount: {
    fontSize: 21,
    fontWeight: '700',
    lineHeight: 26,
    color: '#fff',
  },
  header: {
    flexDirection: 'row',
    width: '90%',
    marginBottom: '5%',
    alignItems: 'center',
  },
  budgetCard: {
    backgroundColor: '#81B2CA',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  savingGoalCard: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  card: {
    backgroundColor: '#37474F',
    borderRadius: 24,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: '90%',
    marginVertical: 8,
  },
  details: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
  },
  visa: {
    width: 56,
    height: 31,
    resizeMode: 'contain',
  },
  branch: {
    width: 210,
    height: 200,
    position: 'absolute',
    right: -10,
    resizeMode: 'contain',
  },
  branchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 40,
  },
  visaContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  title: {
    fontSize: 15,
    fontWeight: '500',
    marginBottom: 10,
    color: 'rgba(255, 255, 255, 0.7);',
  },
  amount: {
    fontSize: 29,
    fontWeight: '600',
    color: '#fff',
  },
  savingsTitle: {
    lineHeight: 24,
    fontSize: 16,
    color: '#030303',
    fontWeight: '600',
  },
  savingsDetails: {
    color: '#818181',
    fontSize: 13,
    lineHeight: 20,
    fontWeight: '400',
  },
  money: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },
});

export default Dashboard;

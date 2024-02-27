import React from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { setFee } from '../redux/reducers/feeSlice';
import { setPage } from '../redux/reducers/pageSlice';
import { RootState } from '../redux/store';
import Sheet from '../components/Sheet';
import Table from '../components/Table';
import { ScreenWidth } from 'react-native-elements/dist/helpers';

const ResultPage = () => {
  const { playFee, maxFee, nurseFee } = useSelector((state: RootState) => state.fee);
  const dispatch = useDispatch();
  let play: number = playFee;
  let max: number = maxFee;
  let nurse: number = nurseFee;

  const matrix = useSelector((state: RootState) => state.matrix.data);

  const handleSetPage0 = () => {
    dispatch(setPage("firstPage"));
  };
  const handleSetPage2 = () => {
    dispatch(setPage("inputPage"));
  };

  return (
    <View style={styles.panContainer} >
      <View style={styles.tViewStyle}>
        <Text style={styles.ruleStyle} >法則シート</Text>
      </View>
      <View style={[styles.table]}>
        <Table data={matrix} />
      </View>
      <View style={[styles.table]}>
        <Sheet data={matrix} />
      </View>
      <TouchableOpacity onPress={handleSetPage2}>
        <View>
          <Text style={styles.playStyle}>プレイ画面</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;



const styles = StyleSheet.create({
  panContainer: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  ruleStyle: {
    textAlign: 'center',
    fontSize: 15,
    fontWeight: 'bold',
    width: screenWidth / 4,
    height: screenHeight * 1.2 / 20,
    backgroundColor: '#2f99b1',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#999',
    color: 'white',
    paddingTop: screenHeight * 1.4 / 20 / 4,
  },
  playStyle: {
    textAlign: 'center',
    fontSize: 15,
    fontWeight: 'bold',
    width: screenWidth / 4,
    height: screenHeight * 1.2 / 20,
    backgroundColor: '#94a44c',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#999',
    color: 'white',
    paddingTop: screenHeight * 1.4 / 20 / 4,
  },
  table: {
    width: '100%',
    paddingLeft: 15,
    paddingRight: 15,
    // borderWidth: 1,
    borderColor: 'black',
    marginBottom: screenHeight / 20,
  },
  tViewStyle: {
    marginTop: screenHeight / 20,
    marginBottom: screenHeight / 20,
  }
});

export default ResultPage;

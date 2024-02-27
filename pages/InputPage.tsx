import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { setcolor } from '../redux/reducers/colorstate';
import { setFee } from '../redux/reducers/feeSlice';
import { setPage } from '../redux/reducers/pageSlice';
import { RootState } from '../redux/store';

import Table from '../components/Table';
import { updateData } from '../redux/reducers/matrixSlice';
import Sheet from '../components/Sheet';
import { AnyAsyncThunk } from '@reduxjs/toolkit/dist/matchers';
import { ScreenHeight, ScreenWidth } from 'react-native-elements/dist/helpers';
const getRandomColor = () => {
  const colors = ['green', 'blue']; // Blue and Green colors
  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
};

const InputPage = (props: any) => {
  
  const { playFee, maxFee, nurseFee } = useSelector((state: RootState) => state.fee);

  const matrix = useSelector((state: RootState) => state.matrix.data);
  const { grcnt, grconcnt, grtconcnt, bltconcnt, blcnt, blconcnt} = useSelector((state: RootState) => state.color)
  const dispatch = useDispatch();
  let play: number = playFee;
  let max: number = maxFee;
  let nurse: number = nurseFee;
  
  const handleSetPage0 = () => {
    dispatch(setPage("firstPage"));
  };
  const handleSetPage3 = () => {
    dispatch(setPage("resultPage"));
  };
  const [randomColor, setRandomColor] = useState<string>('');
  const handleButtonClick = (isGreen: boolean) => {
    let newRow;
    let gr=grcnt, bl=blcnt, grt=grtconcnt, blt=bltconcnt, grc=grconcnt, blc=blconcnt;
    console.log("matrix" , matrix);
    if(isGreen){
      newRow = 'green';
      if(matrix[matrix.length-1] === 'green'){
        if(matrix.length>1){
          if(matrix[matrix.length-2] === 'green'){
            grt=grtconcnt+1;
          }
          else{
            grc=grconcnt+1;
          }
        }
        else{
          grc=grconcnt+1;
        }
      }
      else if(matrix[matrix.length-1] === 'blue'){
        if(matrix.length-2 >= 0){
          if(matrix[matrix.length-2] === 'green')
            bl=blcnt+1;
        }
        else bl=blcnt+1; 
      }
      
    }
    else {
      newRow = "blue";
      if(matrix[matrix.length-1] === 'blue'){
        if(matrix.length>1){
          if(matrix[matrix.length-2] === 'blue'){
            blt=bltconcnt+1;
          }
          else{
            blc=blconcnt+1;
          }
        }
        else{
          blc=blconcnt+1;
        }
      }
      else if(matrix[matrix.length-1] === 'green') {
        if(matrix.length-2 >= 0){
          if(matrix[matrix.length-2] === 'blue'){
            gr=grcnt+1;
          }
        }
        else gr=grcnt+1;
      }
      
    }
    dispatch(setcolor({grcnt: gr, grconcnt: grc, blcnt: bl, blconcnt: blc, grtconcnt: grt, bltconcnt: blt}))
    const newMatrix = [...matrix, newRow];
    dispatch(updateData(newMatrix));
  };
  const curColorset = () => {
    const newRandomColor = getRandomColor();
    let gr=grcnt, bl=blcnt, grt=grtconcnt, blt=bltconcnt, grc=grconcnt, blc=blconcnt;
    if(matrix.length<4){
      setRandomColor('');
    }
    else{
      if(matrix[matrix.length-1] == 'green'){
        if(matrix[matrix.length-2] == 'green'){
          if(gr > grt){
            setRandomColor('green');
          }
          else if(gr == grt){
            setRandomColor('');
          }
          else {
            setRandomColor('blue');
          }
        }
        else {
          if(gr > grc){
            setRandomColor('green')
          }
          else if(gr == grc){
            setRandomColor('')
          } 
          else{
            setRandomColor('blue')
          }
        }
      }
      else {
        if(matrix[matrix.length-2] == 'blue'){
          if(bl > blt){
            setRandomColor('blue');
          }
          else if(bl == blt){
            setRandomColor('');
          }
          else {
            setRandomColor('green');
          }
        }
        else {
          if(bl > blc){
            setRandomColor('blue')
          }
          else if(bl == blc){
            setRandomColor('')
          } 
          else{
            setRandomColor('green')
          }
        }
      }
    }
    console.log('',matrix);
    
  }
  useEffect (()=>{
    curColorset();
  }, [matrix])


  return (
    <View>
      <View style={styles.btContainer}>
        <Text style={styles.calStyle} >損益計算</Text>
        <TouchableOpacity onPress={handleSetPage0}>
          <Text style={styles.backStyle}>終了</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.sheet}>
        <Sheet data={matrix} />
      </View>
      <View style={styles.panContainer}>
        <TouchableOpacity onPress={handleSetPage3}>
          <View>
            <Text style={styles.ruleStyle}>データ</Text>
          </View>
        </TouchableOpacity>
        <View>
          <Text style={styles.inputStyle}>
            {play.toString()}
          </Text>
        </View>
        <View>
          {randomColor ? (
              <Text style={[styles.nextCol, { backgroundColor: randomColor }]}>

              </Text>
            ) : (
              <Text style={styles.nextCol}>
                ?
              </Text>
            )}
        </View>
        <View style={styles.colPan}>
          <TouchableOpacity onPress={() => handleButtonClick(true)}>
            <View style={styles.gBt}></View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleButtonClick(false)}>
            <View style={styles.bBt}></View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;
const color_size = screenHeight > screenWidth ? screenWidth : screenHeight;
const circle_size = screenHeight > screenWidth ? screenWidth / 5 : screenHeight / 8;

const styles = StyleSheet.create({
  panContainer: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btContainer: {
    // height: ScreenHeight / 10,
    marginTop: screenHeight * 0.5 /20,
    marginBottom: screenHeight * 0.5 /20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  colPan: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  gBt: {
    width: circle_size,
    height: circle_size,
    borderRadius: 80,
    backgroundColor: 'green',
  },
  bBt: {
    width: circle_size,
    height: circle_size,
    borderRadius: 80,
    backgroundColor: 'blue',
  },
  nextCol: {
    width: circle_size,
    height: circle_size,
    borderRadius: 80,
    borderWidth: 1,
    borderColor: '#999',
    color: 'black',
    fontSize: 30,
    textAlign: 'center',
    paddingTop: screenHeight / 5 / 5,
  },
  inputStyle: {
    width: screenWidth / 2.5,
    height: screenHeight * 1.4 / 20,
    paddingTop: screenHeight * 1.4 / 20 / 5,
    borderWidth: 1,
    borderColor: '#999',
    backgroundColor: 'yellow',
    color: 'black',
    borderRadius: 10,
    textAlign: 'center',
    fontSize: 28,
    marginBottom: screenHeight * 0.5 /20,
  },
  backStyle: {
    textAlign: 'center',
    fontSize: 20,
    width: screenWidth / 6,
    // height: 40,
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#999',
    color: 'black',
    marginRight: 15,
    height: screenHeight * 1.2 / 20,
    paddingTop: screenHeight * 1.4 / 20 / 5,
  },
  calStyle: {
    textAlign: 'center',
    fontSize: 20,
    width: screenWidth / 2,
    backgroundColor: '#f00',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#999',
    color: 'white',
    marginLeft: 15,
    height: ScreenHeight *1.2 / 20,
    paddingTop: screenHeight * 1.4 / 20 / 5,
  },
  ruleStyle: {
    textAlign: 'center',
    fontSize: 17,
    fontWeight: 'bold',
    width: screenWidth / 2.5,
    height: screenHeight * 1.2 /20,
    backgroundColor: '#2f99b1',
    borderRadius: 10,
    color: 'white',
    marginBottom: screenHeight * 0.5 /20,
    paddingTop: screenHeight * 1.4 / 20 / 5,
  },
  table: {
    width: '95%',
    height: 150,
    marginLeft: 'auto',
    marginRight: 'auto',
    borderWidth: 1,
    borderColor: '#999',
  },
  sheet: {
    paddingLeft: 15,
    paddingRight: 15,
    marginBottom: ScreenHeight /20,
  }
});

export default InputPage;

/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import React, { useState } from 'react';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View,
    Button,
    TouchableOpacity,
    Dimensions
} from 'react-native';

import {
    Colors,
    DebugInstructions,
    Header,
    LearnMoreLinks,
    ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import FeePage from './FeePage';
import InputPage from './InputPage';
import ResultPage from './ResultPage';
import { Provider } from 'react-redux';
import store from '../redux/store';
import { useSelector, useDispatch } from 'react-redux';
import { setPage } from '../redux/reducers/pageSlice';
import { RootState } from '../redux/store';
import { colors } from 'react-native-elements';

function FirstPage() {
    const { page } = useSelector((state: RootState) => state.page);
    const dispatch = useDispatch();
    const isDarkMode = useColorScheme() === 'dark';

    const backgroundStyle = {
        backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    };

    const handleSetPage = (topage: string): void => {
        dispatch(setPage(topage));
    };

    const renderPage = (renpage: string) => {
        switch (renpage) {
            case "firstPage":
                return (
                    <View style={[backgroundStyle]}>
                        <TouchableOpacity onPress={() => handleSetPage('settingPage')}>
                            <View style={styles.firstContainer}>
                                <Text style={styles.textStyle}>設定</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => handleSetPage('inputPage')}>
                            <View style={styles.secondContainer}>
                                <Text style={styles.textStyle}>一刀流</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => handleSetPage('inputPage')}>
                            <View style={styles.thirdContainer}>
                                <Text style={styles.textStyle}>二刀流</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                );
            case "settingPage":
                return (
                    <View>
                        <FeePage />
                    </View>
                );
            case "inputPage":
                return (
                    <View>
                        <InputPage />
                    </View>
                );
            case "resultPage":
                return (
                    <View>
                        <ResultPage />
                    </View>
                );
            default:
                return null;
        }
    };
    return (
        <View style={styles.topContainer}>
            {renderPage(page)}
        </View>
    );
}
const screenHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    topContainer: {
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
    },
    firstContainer: {
        marginTop: screenHeight / 11,
        width: '80%',
        height: screenHeight / 11,
        marginLeft: 'auto',
        marginRight: 'auto',
        backgroundColor: '#9f73bc',
        borderRadius: 10,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    secondContainer: {
        marginTop: screenHeight * 2 / 11,
        width: '80%',
        height: screenHeight / 11,
        marginLeft: 'auto',
        marginRight: 'auto',
        backgroundColor: '#bc7a73',
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
    },
    thirdContainer: {
        marginTop: screenHeight * 2 / 11,
        width: '80%',
        height: screenHeight / 11,
        marginLeft: 'auto',
        marginRight: 'auto',
        backgroundColor: '#73b2bc',
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
    },
    textStyle: {
        textAlign: 'center',
        fontSize: 25,
        width: '100%',
        color: 'black',
    }
});

export default FirstPage;

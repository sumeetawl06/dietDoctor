/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import {RecipeListScreen} from './src/App/RecipeList/RecipeListScreen';
import {Constants} from './src/Common/Constants';

const App: () => React$Node = () => {
  return (
    <>
        <View style={{
            width: '100%',
            height: 45,
            backgroundColor: Constants.colors.themeGreenColor
        }}>
        </View>
      <View style={{flex: 1}}>
        <RecipeListScreen/>
      </View>
    </>
  );
};

export default App;

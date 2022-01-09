import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Provider} from 'react-redux';
import {store} from './app/store/redux';
import {ThemeProvider} from 'react-native-elements';
import {NavigationContainer} from '@react-navigation/native';
import Router from './app/components/Navigation/Router';

export default () => (
  <ThemeProvider>
    <SafeAreaProvider>
      <Provider store={store}>
        <NavigationContainer>
          <Router />
        </NavigationContainer>
      </Provider>
    </SafeAreaProvider>
  </ThemeProvider>
);

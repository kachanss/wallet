import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Provider} from 'react-redux';
import {store} from './app/store';
import {Text, ThemeProvider} from 'react-native-elements';
import {FlatList, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import CommonLayout from './app/components/Layout/CommonLayout';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Settings from './app/components/Settings/Settings';
import Test from './app/components/Test/Test';

const Home = () => {
  return (
    <CommonLayout>
      <FlatList
        data={[]}
        renderItem={() => <View></View>}
        ListEmptyComponent={
          <View>
            <Text>No wallets</Text>
          </View>
        }
      />
    </CommonLayout>
  );
};

const Stack = createNativeStackNavigator();

export default () => (
  <NavigationContainer>
    <ThemeProvider>
      <SafeAreaProvider>
        <Provider store={store}>
          <Stack.Navigator
            screenOptions={{animation: 'none', headerBackVisible: false}}>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Test" component={Test} />
            <Stack.Screen name="Settings" component={Settings} />
          </Stack.Navigator>
        </Provider>
      </SafeAreaProvider>
    </ThemeProvider>
  </NavigationContainer>
);

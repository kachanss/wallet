import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Provider} from 'react-redux';
import {store} from './app/store';
import {Text, ThemeProvider} from 'react-native-elements';
import {TouchableOpacity, View} from 'react-native';
import {
  NavigationContainer,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import CommonLayout from './app/components/Layout/CommonLayout';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const MockFooter = () => {
  const route = useRoute();
  const navigation = useNavigation();

  const CustButton = ({text, routeName}: any) => {
    const isActive = routeName === route.name;

    return (
      <TouchableOpacity
        onPress={() => navigation.navigate(routeName)}
        style={{
          flex: 1,
          padding: 20,
          backgroundColor: !isActive ? 'silver' : 'gray',
          alignContent: 'center',
          alignItems: 'center',
          borderRadius: 10,
          margin: 5,
        }}>
        <Text
          style={{
            color: !isActive ? 'black' : 'white',
          }}>
          {text}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View
      style={{
        flexDirection: 'row',
        alignContent: 'center',
        alignItems: 'center',
      }}>
      <CustButton bdColor="#aaffff" text="Home" routeName={'Home'} />
      <CustButton bdColor="#ffaaff" text="Test" routeName={'Test'} />
      <CustButton bdColor="#ffffaa" text="Settings" routeName={'Settings'} />
    </View>
  );
};

const Home = () => {
  return (
    <CommonLayout footer={<MockFooter />}>
      <View>
        <Text>HOME</Text>
      </View>
    </CommonLayout>
  );
};

const Settings = () => {
  return (
    <CommonLayout footer={<MockFooter />}>
      <View>
        <Text>Settings</Text>
      </View>
    </CommonLayout>
  );
};

const Test = () => {
  return (
    <CommonLayout footer={<MockFooter />}>
      <View>
        <Text>Test</Text>
      </View>
    </CommonLayout>
  );
};

const Stack = createNativeStackNavigator();

export default () => (
  <NavigationContainer>
    <SafeAreaProvider>
      <Provider store={store}>
        <ThemeProvider>
          <Stack.Navigator
            screenOptions={{animation: 'none', headerBackVisible: false}}>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Test" component={Test} />
            <Stack.Screen name="Settings" component={Settings} />
          </Stack.Navigator>
        </ThemeProvider>
      </Provider>
    </SafeAreaProvider>
  </NavigationContainer>
);

import {useNavigation, useRoute} from '@react-navigation/native';
import {TouchableOpacity, View} from 'react-native';
import {Text} from 'react-native-elements';
import React from 'react';

const MainFooter = () => {
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
        backgroundColor: 'white',
        borderTopColor: 'silver',
        borderTopWidth: 1,
      }}>
      <CustButton bdColor="#aaffff" text="Home" routeName={'Home'} />
      <CustButton bdColor="#ffaaff" text="Test" routeName={'Test'} />
      <CustButton bdColor="#ffffaa" text="Settings" routeName={'Settings'} />
    </View>
  );
};

export default MainFooter;

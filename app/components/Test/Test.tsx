import CommonLayout from '../Layout/CommonLayout';
import {ScrollView} from 'react-native';
import {Text} from 'react-native-elements';
import React, {useEffect, useState} from 'react';

const Test = () => {
  const [items, setItems] = useState<any[]>([]);

  useEffect(() => {
    setTimeout(() => {
      setItems(['asd', 'qwe']);
    }, 3 * 1000);
  }, []);

  return (
    <CommonLayout>
      <ScrollView>
        <Text>TEST</Text>
        <Text>List:</Text>
        {items.map(item => {
          console.log('RenderItem', {item});
          return <Text>{Math.random()}</Text>;
        })}
      </ScrollView>
    </CommonLayout>
  );
};

export default Test;

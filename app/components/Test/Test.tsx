import CommonLayout from '../Layout/CommonLayout';
import {ScrollView} from 'react-native';
import {Text} from 'react-native-elements';
import React, {useEffect, useState} from 'react';
import {doUpdate} from '../../models/settings';

const Test = () => {
  const [items, setItems] = useState<any[]>([]);

  useEffect(() => {
    (async () => {
      await doUpdate();
    })();
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

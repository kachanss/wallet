import React from 'react';
import CommonLayout from '../Layout/CommonLayout';
import {FlatList} from 'react-native';
import {useSelector} from 'react-redux';
import {selectWallets} from '../Redux/Wallets/walletsSlice';
import {Button, Text, useTheme} from 'react-native-elements';

const WalletList = () => {
  const {theme} = useTheme();
  const wallets = useSelector(selectWallets);

  return (
    <CommonLayout>
      <FlatList
        data={wallets}
        renderItem={({item}) => {
          return <Text>{item.id}</Text>;
        }}
        ListEmptyComponent={<Text>No wallets</Text>}
        ListFooterComponent={() => {
          return (
            <>
              <Button
                title={'Create'}
                icon={{
                  name: 'plus',
                  type: 'font-awesome',
                  size: 15,
                  color: theme.colors?.primary,
                }}
                type="outline"
                buttonStyle={{
                  borderWidth: 0,
                }}
                onPress={() => {}}
              />
              <Button
                title={'Import'}
                icon={{
                  name: 'download',
                  type: 'font-awesome',
                  size: 15,
                  color: theme.colors?.primary,
                }}
                type="outline"
                buttonStyle={{
                  borderWidth: 0,
                }}
                onPress={() => {}}
              />
            </>
          );
        }}
      />
    </CommonLayout>
  );
};

export default WalletList;

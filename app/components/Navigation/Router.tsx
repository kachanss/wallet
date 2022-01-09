import React, {useEffect} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {ActivityIndicator, FlatList, View} from 'react-native';
import {Text, useTheme} from 'react-native-elements';
import Test from '../Test/Test';
import Settings from '../Settings/Settings';
import CommonLayout from '../Layout/CommonLayout';
import {useSelector} from 'react-redux';
import {selectIsInitialized, setInitialized} from '../Redux/System/systemSlice';
import {migrateIfNeeded} from '../../store/sqlite';
import logger from '../../service/logger';
import {useAppDispatch} from '../../hooks/redux';
import WalletList from '../Wallets/WalletList';

const Stack = createNativeStackNavigator();

const Loading = () => {
  const {theme} = useTheme();

  return (
    <CommonLayout showFooter={false}>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <ActivityIndicator size="large" color={theme.colors?.primary} />
      </View>
    </CommonLayout>
  );
};

const Router = () => {
  const dispatch = useAppDispatch();
  const isInitialized = useSelector(selectIsInitialized);

  useEffect(() => {
    if (isInitialized) return;

    (async () => {
      const wasUpdated = await migrateIfNeeded();
      if (wasUpdated) {
        logger.info('Migrations was successfully executed');
      }

      dispatch(setInitialized());
    })();
  }, [dispatch, isInitialized]);

  if (!isInitialized) {
    return <Loading />;
  }

  return (
    <Stack.Navigator
      screenOptions={{animation: 'none', headerBackVisible: false}}>
      <Stack.Screen name="Home" component={WalletList} />
      <Stack.Screen name="Test" component={Test} />
      <Stack.Screen name="Settings" component={Settings} />
    </Stack.Navigator>
  );
};

export default Router;

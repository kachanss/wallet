import React from 'react';
import {SafeAreaView, View} from 'react-native';
import MainFooter from '../Navigation/MainFooter';

type CommonLayoutProps = {
  children: any;
  showFooter?: boolean;
};

const CommonLayout = ({children, showFooter = true}: CommonLayoutProps) => {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      {children}
      {showFooter && <MainFooter />}
    </SafeAreaView>
  );
};

export default CommonLayout;

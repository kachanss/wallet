import React from 'react';
import {SafeAreaView, ScrollView, View} from 'react-native';

type CommonLayoutProps = {
  children: any;
  footer?: any;
};

const CommonLayout = ({children, footer}: CommonLayoutProps) => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView>{children}</ScrollView>
      {footer ? <View>{footer}</View> : null}
    </SafeAreaView>
  );
};

export default CommonLayout;

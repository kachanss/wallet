import CommonLayout from '../Layout/CommonLayout';
import {SectionList, TouchableOpacity, View} from 'react-native';
import {Text, Header} from 'react-native-elements';
import React from 'react';

type MenuItem = {
  key: (index: number) => string;
  render: () => React.ReactElement;
};

class InfoItem implements MenuItem {
  info: string;

  constructor(info: string) {
    this.info = info;
  }

  key(index: number): string {
    return 'simple_' + index;
  }

  render(): React.ReactElement {
    return (
      <View
        style={{
          padding: 25,
          paddingLeft: 8,
          borderBottomWidth: 1,
          borderBottomColor: '#eeeeee',
          backgroundColor: 'white',
        }}>
        <Text>{this.info}</Text>
      </View>
    );
  }
}

class TouchableInfoItem extends InfoItem {
  onPress: () => void;

  constructor(info: string, onPress: () => void) {
    super(info);
    this.onPress = onPress.bind(this);
  }

  render(): React.ReactElement {
    return (
      <TouchableOpacity onPress={this.onPress}>
        {super.render()}
      </TouchableOpacity>
    );
  }
}

class CopiableInfoItem extends TouchableInfoItem {
  constructor(info: string, copyText: string | null = null) {
    if (copyText === null) {
      copyText = info;
    }
    super(info, () => console.log('Copied: ', copyText));
  }
}

const DATA = [
  {title: 'Wallets', data: [new InfoItem('Choose account'), new InfoItem('Backup account')]},
  {title: 'Security', data: [new InfoItem('Set PIN'), new InfoItem('Enable biometrics')]},
  {title: 'Common', data: [new InfoItem('Language'), new InfoItem('Local currency'), new CopiableInfoItem('Version: 1.2.3', '1.2.3'), new TouchableInfoItem('Support', () => console.log('Support pressed'))]},
];

const Item = ({title}: any) => <Text>{title}</Text>;

const Settings = () => {
  return (
    <CommonLayout showFooter={true}>
      <SectionList
        style={{backgroundColor: 'white'}}
        sections={DATA}
        keyExtractor={(item: MenuItem, index) => item.key(index)}
        renderItem={({item}: {item: MenuItem}) => item.render()}
        renderSectionHeader={({section: {title}}) => (
          <View
            style={{
              padding: 10,
              paddingLeft: 8,
              backgroundColor: 'white',
            }}>
            <Text style={{fontSize: 20}}>{title}</Text>
          </View>
        )}
      />
    </CommonLayout>
  );
};

export default Settings;

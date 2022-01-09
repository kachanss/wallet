import {SectionList, TouchableOpacity, View} from 'react-native';
import {Text} from 'react-native-elements';
import React from 'react';
import CommonLayout from '../Layout/CommonLayout';

type InfoItemProps = {
  info: string;
};

type PressableInfoItemProps = InfoItemProps & {
  onPress: () => void;
};

type CopiableInfoItemProps = Omit<PressableInfoItemProps, 'onPress'> & {
  copyText: string | null;
};

const InfoItem = ({info}: InfoItemProps) => {
  return (
    <View
      style={{
        padding: 25,
        paddingLeft: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#eeeeee',
        backgroundColor: 'white',
      }}>
      <Text>{info}</Text>
    </View>
  );
};

const PressableInfoItem = ({info, onPress}: PressableInfoItemProps) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <InfoItem info={info} />
    </TouchableOpacity>
  );
};

const CopiableInfoItem = ({info, copyText = null}: CopiableInfoItemProps) => {
  const handleCopy = () => {
    const text = copyText === null ? info : copyText;
    console.log('Copied: ', text);
  };

  return <PressableInfoItem info={info} onPress={handleCopy} />;
};

enum ItemType {
  Info = 'info',
  PressableInfo = 'info_press',
  CopiableInfo = 'info_copy',
}

type SectionHeaderProps = {
  title: string;
};

const SectionHeader = ({title}: SectionHeaderProps) => {
  return (
    <View
      style={{
        padding: 10,
        paddingLeft: 8,
        backgroundColor: 'white',
      }}>
      <Text style={{fontSize: 20}}>{title}</Text>
    </View>
  );
};

const DATA = [
  {
    title: 'Wallets',
    data: [
      {type: ItemType.Info, info: 'Choose account', key: 'wallets_choose'},
      {type: ItemType.Info, info: 'Backup account', key: 'wallets_backup'},
    ],
  },
  {
    title: 'Security',
    data: [
      {type: ItemType.Info, info: 'Set PIN', key: 'security_set_pin'},
      {
        type: ItemType.Info,
        info: 'Enable biometrics',
        key: 'security_biometrics',
      },
    ],
  },
  {
    title: 'Common',
    data: [
      {type: ItemType.Info, info: 'Language', key: 'common_lang'},
      {type: ItemType.Info, info: 'Local currency', key: 'common_currency'},
      {
        type: ItemType.CopiableInfo,
        info: 'Version: 1.2.3',
        copyText: '1.2.3',
        key: 'common_version',
      },
      {
        type: ItemType.PressableInfo,
        info: 'Support',
        onPress: () => console.log('Support pressed'),
        key: 'common_support',
      },
    ],
  },
];

type ItemTypeAware = {
  type: ItemType;
};

type KeyAware = {
  key: string;
};

const Settings = () => {
  const renderItem = ({item}: {item: ItemTypeAware & KeyAware}) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const {type, key, ...rest} = item;

    switch (item.type) {
      case ItemType.Info:
        // @ts-ignore
        return <InfoItem {...rest} />;
      case ItemType.PressableInfo:
        // @ts-ignore
        return <PressableInfoItem {...rest} />;
      case ItemType.CopiableInfo:
        // @ts-ignore
        return <CopiableInfoItem {...rest} />;
      default:
        console.log(`Unsupported ItemType (${item.type})`);
        return null;
    }
  };

  return (
    <CommonLayout showFooter={true}>
      <SectionList
        style={{backgroundColor: 'white'}}
        sections={DATA}
        renderItem={renderItem}
        renderSectionHeader={({section: {title}}) => (
          <SectionHeader title={title} />
        )}
      />
    </CommonLayout>
  );
};

export default Settings;

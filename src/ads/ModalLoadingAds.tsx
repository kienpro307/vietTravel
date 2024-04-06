import * as React from 'react';
import {Text, View, StyleSheet, Modal} from 'react-native';
import {Chase} from 'react-native-animated-spinkit';
import { dictionary2Trans } from '../utils/LanguageUtils';

interface ModalLoadingAdsProps {
  visible: boolean;
}

const ModalLoadingAds = (props: ModalLoadingAdsProps) => {
  return (
    <Modal visible={props.visible} statusBarTranslucent transparent>
      <View
        style={{
          width: '100%',
          height: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#00000090',
          gap: 10,
        }}>
        <Chase size={50} color="#fff" />
        <Text style={{fontFamily: 'Poppins-Medium', color: '#fff'}}>
          {dictionary2Trans('Loading Ads. Please Waiting!')}
        </Text>
      </View>
    </Modal>
  );
};

export default ModalLoadingAds;

const styles = StyleSheet.create({
  container: {},
});

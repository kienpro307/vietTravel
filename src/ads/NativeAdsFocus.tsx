import * as React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import NativeAdsShow, {NativeAdsShowProps} from './NativeAdsShow';
import {useIsFocused} from '@react-navigation/native';

const NativeAdsFocus = (props: NativeAdsShowProps) => {
  const focus = useIsFocused();
  return focus && <NativeAdsShow {...props} />;
};

export default NativeAdsFocus;

const styles = StyleSheet.create({
  container: {},
});

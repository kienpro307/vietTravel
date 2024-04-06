import * as React from 'react';
import {Text, View, StyleSheet, Dimensions} from 'react-native';
import {ContextApp} from './CommonAppContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {STORAGE} from './constant';
import {loadNativeAdById} from './ads/NativeAdsUtils';
import {Native_OnBoard_Screen, Native_Setting} from './ads/AdUtils';

interface CommonAppProviderProps {
  children: React.ReactNode;
}

const screen = Dimensions.get('screen');

const CommonAppProvider = (props: CommonAppProviderProps) => {
  const [dimention, setDimention] = React.useState<{
    width: number;
    height: number;
  }>({width: screen.width, height: screen.height});

  const [firstOpen, setFirstOpen] = React.useState<boolean>(false);
  React.useEffect(() => {
    const get = async () => {
      const value = await AsyncStorage.getItem(STORAGE.FIRST_OPEN);
      const firstOpenV = value ? false : true;
      if (firstOpenV) {
        loadNativeAdById(Native_OnBoard_Screen);
        loadNativeAdById(Native_Setting);
      }
      setFirstOpen(firstOpenV);
    };
    get();
  }, []);

  React.useEffect(() => {
    const screen = Dimensions.get('screen');
    setDimention({width: screen.width, height: screen.height});
    Dimensions.addEventListener('change', ({screen}) => {
      setDimention({width: screen.width, height: screen.height});
    });
  }, []);

  return (
    <ContextApp.Provider value={{dimention, firstOpen}}>
      {props.children}
    </ContextApp.Provider>
  );
};

export default CommonAppProvider;

const styles = StyleSheet.create({
  container: {},
});

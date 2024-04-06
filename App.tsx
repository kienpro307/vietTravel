/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect} from 'react';
import {SafeAreaView, StatusBar, StyleSheet} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import {useLanguageChangeHook} from './src/utils/LanguageUtils';
import {useAppStore} from './src/store/AppStore';
import {I18nextProvider} from 'react-i18next';
import i18next from './services/i18next';
import {RemoteConfigProvider} from './src/remoteConfig/RemoteConfig';
import UpdateContextProvider from './src/forceUpdate/UpdateProvider';
import AdsContextProvider from './src/ads/AdsContextProvider';
import OpenApp from './src/screens/open/OpenApp';
import {COLORS, HEIGHT, WIDTH} from './src/theme';
import SplashScreenLoading from './src/screens/SplashScreenLoading';
import CommonAppProvider from './src/CommonAppProvider';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {BannerAdSize} from 'react-native-google-mobile-ads';
import {BANNER_ID, interBackID} from './src/ads/AdUtils';
import BannerAdWrap from './src/ads/BannerAdWrap';
import {useAdsInterRegister} from './src/ads/useAdsInter';
import {TourGuideProvider} from 'rn-tourguide';
import AdjustConfigProvider from './src/adjust/AdjustConfigProvider';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import HomeLayout from './src/screens/HomeLayout';
import {RootRouter} from './src/type';

const Tab = createBottomTabNavigator<RootRouter>();
const RouterWrap = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        tabBar={() => null}
        // backBehavior="history"
        screenOptions={{
          headerShown: false,
          header: () => null,
        }}>
        <Tab.Screen name="Main" component={HomeLayout} />
        {/* <Tab.Screen name="WifiQrShare" component={WifiQrShare} />
        <Tab.Screen name="WifiList" component={WifiList} />
        <Tab.Screen name="ShowPassWords" component={ShowPassWords} />
        <Tab.Screen name="SpeedTest" component={SpeedTest} />
        <Tab.Screen name="ConnectedDevices" component={ConnectedDevices} /> */}
      </Tab.Navigator>
    </NavigationContainer>
  );
};

function App(): JSX.Element {
  const {changeLanguage} = useLanguageChangeHook();
  useAdsInterRegister(interBackID, 'back', true);
  const currentLanguage = useAppStore((state: any) => state.Language);
  // const viewBanner = useAppStore((state: any) => state.viewBanner);

  useEffect(() => {
    const fetch = async () => {
      const language = currentLanguage;
      if (language != null) {
        changeLanguage(language);
      } else {
        changeLanguage('en');
      }
    };
    fetch();
  }, [currentLanguage]);

  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 500);
  });

  return (
    <SafeAreaView style={styles.container}>
      {/* <GestureHandlerRootView style={{flex: 1}}> */}
      <StatusBar
        backgroundColor="transparent"
        translucent
        barStyle="dark-content"
      />
      {/* <CommonAppProvider> */}
      {/* <SplashScreenLoading> */}
      {/* <AdjustConfigProvider> */}
      {/* <RemoteConfigProvider> */}
      <I18nextProvider i18n={i18next}>
        <AdsContextProvider>
          {/* <OpenApp> */}
          {/* <UpdateContextProvider> */}
          <TourGuideProvider preventOutsideInteraction {...{borderRadius: 16}}>
            <RouterWrap />

            {/* <BannerAdWrap
              unitId={BANNER_ID}
              position="bottom"
              size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
            /> */}
          </TourGuideProvider>
          {/* </UpdateContextProvider> */}
          {/* </OpenApp> */}
        </AdsContextProvider>
      </I18nextProvider>
      {/* </RemoteConfigProvider> */}
      {/* </AdjustConfigProvider> */}
      {/* </SplashScreenLoading> */}
      {/* </CommonAppProvider> */}
      {/* </GestureHandlerRootView> */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    height: HEIGHT(100),
    width: WIDTH(100),
    backgroundColor: COLORS.primaryBgVaniHex,
  },
});

export default App;

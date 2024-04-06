import * as React from 'react';
import {StyleSheet, AppState, PermissionsAndroid} from 'react-native';
import {AppOpenAd, AdEventType, TestIds} from 'react-native-google-mobile-ads';
import AdsContext from '../../ads/AdsContext';
import SplashScreen from 'react-native-splash-screen';
import OpenAppContext from './OpenAppContext';
import {adjustSendEvent, adjustTrackAds} from '../../adjust/AdjustUtils';
import {ADJUST_EVENT, FIREBASE} from '../../constant';
import {firebaseSendEvent} from '../../firebase/FirebaseUtiils';
import {OPEN_ID, getPlacementId} from '../../ads/AdUtils';
import {useSplash} from '../SplashScreenLoading';
import {useAppStore} from '../../store/AppStore';
import {playSound, sounds, stopSound} from '../../utils/SoundManager';

interface OpenAppProps {
  children: React.ReactNode;
}

const OpenApp = (props: OpenAppProps) => {
  const muteBackgroundMusic = useAppStore(
    (state: any) => state.muteBackgroundMusic,
  );
  const isShowedApp = React.useRef<boolean>(false);
  const adsContext = React.useContext(AdsContext);
  const [showApp, setShowApp] = React.useState<boolean>(false);
  const showOpenAds = React.useRef<boolean>(false);
  const shouldShowOpenAds = React.useRef<boolean>(true);
  const refShowAds = React.useRef<boolean>(adsContext.showAds);
  const splash = useSplash();
  const [hasRunEffect, setHasRunEffect] = React.useState(false);

  const onChangeShouldShowOpenAds = (v: boolean) => {
    shouldShowOpenAds.current = v;
  };

  // React.useEffect(() => {
  //   if (!hasRunEffect && !muteBackgroundMusic) {
  //     playSound(AUDIO.musicBackground);
  //     const interval = setInterval(() => {
  //       playSound(0);
  //     }, 188 * 1000);
  //     return () => {
  //       clearInterval(interval);
  //     };
  //   }
  //   setHasRunEffect(true);
  // }, [hasRunEffect, muteBackgroundMusic]);
  function checkAppState() {
    const appState = AppState.currentState;
    if (appState === 'active' && !muteBackgroundMusic) {
      playSound(0);
      const interval = setInterval(() => {
        playSound(0);
      }, 188 * 1000);
      return () => {
        clearInterval(interval);
      };
    } else {
      for (let i = 0; i < sounds.length; i++) {
        stopSound(i);
      }
    }
  }
  React.useEffect(() => {
    const appStateSubscription = AppState.addEventListener(
      'change',
      checkAppState,
    );
    checkAppState();
    return () => {
      appStateSubscription.remove();
    };
  }, [muteBackgroundMusic]);

  React.useEffect(() => {
    refShowAds.current = adsContext.showAds;
  }, [adsContext.showAds]);

  React.useEffect(() => {
    const appOpenAd = AppOpenAd.createForAdRequest(
      getPlacementId(TestIds.APP_OPEN, OPEN_ID),
      {},
    );
    appOpenAd.load();

    let number = 0;
    // show open
    let interval = setInterval(() => {
      if (number >= 15 || !refShowAds.current) {
        setShowApp(true);
        isShowedApp.current = true;
        try {
          SplashScreen.hide();
          splash.hide();
        } catch (err) {}
        if (interval) {
          clearInterval(interval);
        }
        return;
      }

      if (appOpenAd.loaded) {
        // adjustSendEvent(ADJUST_EVENT.OPEN_ADS_SHOW);
        // firebaseSendEvent(FIREBASE.OPEN_ADS_SHOW);
        appOpenAd.show();
        showOpenAds.current = true;
        clearInterval(interval);
      } else {
        number++;
      }
    }, 1000);

    appOpenAd.addAdEventListener(AdEventType.PAID, (payload: any) => {
      if (payload?.value) {
        // adjustTrackAds(payload.value);
      }
    });

    // render app after view ads when open
    appOpenAd.addAdEventListener(AdEventType.CLOSED, () => {
      setShowApp(true);
      if (!isShowedApp.current) {
        try {
          SplashScreen.hide();
          splash.hide();
        } catch (err) {}
      }
      isShowedApp.current = true;
    });

    appOpenAd.addAdEventListener(AdEventType.CLOSED, () => {
      appOpenAd.load();
    });

    // show change status app
    const listener = AppState.addEventListener('change', st => {
      if (
        st === 'active' &&
        isShowedApp.current &&
        appOpenAd.loaded &&
        shouldShowOpenAds.current &&
        refShowAds.current
      ) {
        // adjustSendEvent(ADJUST_EVENT.OPEN_ADS_SHOW);
        firebaseSendEvent(FIREBASE.OPEN_ADS_SHOW);
        appOpenAd.show();
      }
      if (st === 'active') {
        shouldShowOpenAds.current = true;
      }
    });

    appOpenAd.addAdEventListener(AdEventType.OPENED, () => {
      // adjustSendEvent(ADJUST_EVENT.OPEN_ADS_DISPLAYED);
      firebaseSendEvent(FIREBASE.OPEN_ADS_DISPLAYED);
    });

    return () => {
      appOpenAd.removeAllListeners();
      listener.remove();
      if (interval) {
        clearInterval(interval);
      }
    };
  }, []);

  return (
    <OpenAppContext.Provider
      value={{
        onChangeShouldShowOpenAds,
      }}>
      {props.children}
    </OpenAppContext.Provider>
  );
};

export default OpenApp;

const styles = StyleSheet.create({
  container: {},
});

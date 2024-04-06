import React from 'react';
import {AdHookReturns, useInterstitialAd} from 'react-native-google-mobile-ads';
import {adjustSendEvent, adjustTrackAds} from '../adjust/AdjustUtils';
import {ADJUST_EVENT, FIREBASE} from '../constant';
import {firebaseSendEvent} from '../firebase/FirebaseUtiils';
import {useAds} from './AdsContext';

export const useAdsInter = (
  id: string,
  preload: boolean,
  setShowLoading: (v: boolean) => void,
  onBefore?: () => void,
  onAfter?: () => void,
  loadAds: boolean = true,
) => {
  const openReward = React.useRef<(() => void) | undefined>(undefined);
  const closeReward = React.useRef<(() => void) | undefined>(undefined);
  const inter = useInterstitialAd(id);
  const intervalRef = React.useRef<NodeJS.Timeout | undefined>();
  const interRef = React.useRef<AdHookReturns>(inter);
 
  React.useEffect(() => {
    interRef.current = inter;
  }, [inter]);

  const forceShowInter = (
    timeSecond: number,
    onOpened?: () => void,
    onClosed?: () => void,
  ): Promise<boolean> => {
    onBefore?.();
    console.log('Show Ads Inter: ', id);
    if (!preload && !interRef.current.isLoaded) {
      interRef.current.load();
    }
    return new Promise((resolve, reject) => {
      let number = 0;
      const func = () => {
        if (interRef.current.isLoaded) {
          openReward.current = onOpened;
          closeReward.current = onClosed;
          interRef.current.show();
          resolve(true);
          clearInterval(intervalRef.current);
          return;
        }
        number++;
        if (number > timeSecond) {
          clearInterval(intervalRef.current);
          resolve(false);
        }
      };
      intervalRef.current = setInterval(func, 1000);
      func();
    });
  };

  const showInter = async (onOpened?: () => void, onClosed?: () => void) => {
    onBefore?.();
    console.log('Show Ads Inter: ', id);
    if (!interRef.current.isLoaded) {
      return Promise.resolve(false);
    }

    openReward.current = onOpened;
    closeReward.current = onClosed;
    interRef.current.show();
    return Promise.resolve(true);
  };

  React.useEffect(() => {
    if (inter.isClosed) {
      adjustSendEvent(ADJUST_EVENT.INTER_DISPLAYED);
      firebaseSendEvent(FIREBASE.INTER_DISPLAYED);
      onAfter?.();
    }
    if (inter.isClosed && closeReward.current) {
      closeReward.current();
      closeReward.current = undefined;
    }
  }, [inter.isClosed]);

  React.useEffect(() => {
    if (inter.isOpened && openReward.current) {
      openReward.current();
      openReward.current = undefined;
    }
    setShowLoading(false);
  }, [inter.isOpened]);

  React.useEffect(() => {
    if (!inter.isLoaded && loadAds && preload) {
      console.log('Load inter: ', id);
      inter.load();
    }

    if (inter.isLoaded && loadAds) {
      console.log('Loaded inter: ', id);
    }
  }, [inter.load, loadAds, inter.isLoaded, preload]);

  // React.useEffect(() => {
  //   if (inter.revenue) {
  //     adjustTrackAds(inter.revenue.value);
  //   }
  // }, [inter.revenue]);

  return {
    showInter,
    forceShowInter,
    ...inter,
  };
};

export const useAdsInterRegister = (
  id: string,
  name: string,
  preload: boolean,
  onBefore?: () => void,
  onAfter?: () => void,
) => {
  const global = useAds();
  const ads = useAdsInter(
    id,
    preload,
    global.setShowLoading,
    () => {
      if (name) {
        // firebaseSendEvent('inter_show_' + name);
      }
      onBefore?.();
    },
    () => {
      if (name) {
        // firebaseSendEvent('inter_displayed_' + name);
      }
      onAfter?.();
    },
    global.showAds,
  );

  React.useEffect(() => {
    console.log('Register Inter: ', id);
    global.registerInter(id, ads);
    return () => {
      console.log('Unregister Inter: ', id);
      global.unRegisterInter(id);
    };
  }, []);

  return ads;
};

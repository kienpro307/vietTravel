import React from 'react';
import {adjustSendEvent, adjustTrackAds} from '../adjust/AdjustUtils';
import {useAds} from './AdsContext';
import {AdHookReturns, useRewardedAd} from 'react-native-google-mobile-ads';
import {firebaseSendEvent} from '../firebase/FirebaseUtiils';
import {ADJUST_EVENT, FIREBASE} from '../constant';

export const useAdsReward = (
  id: string,
  preload: boolean,
  setShowLoading: (v: boolean) => void,
  onBefore?: () => void,
  onAfter?: () => void,
  loadAds: boolean = true,
) => {
  const openReward = React.useRef<(() => void) | undefined>(undefined);
  const closeReward = React.useRef<(() => void) | undefined>(undefined);
  const intervalRef = React.useRef<NodeJS.Timeout | undefined>();
  const reward = useRewardedAd(id);
  const rewardRef = React.useRef<AdHookReturns>(reward);

  React.useEffect(() => {
    rewardRef.current = reward;
  }, [reward]);

  const showRewardedVideo = async (
    onOpened?: () => void,
    onClosed?: () => void,
  ) => {
    onBefore?.();
    console.log('Show Ads RW: ', id);
    if (!rewardRef.current.isLoaded) {
      return Promise.resolve(false);
    }

    openReward.current = onOpened;
    closeReward.current = onClosed;
    rewardRef.current.show();
    return Promise.resolve(true);
  };

  const forceShowRewardedVideo = (
    timeSecond: number,
    onOpened?: () => void,
    onClosed?: () => void,
  ): Promise<boolean> => {
    onBefore?.();
    if (!preload && !rewardRef.current.isLoaded) {
      rewardRef.current.load();
    }
    console.log('Show Ads RW: ', id);
    return new Promise((resolve, reject) => {
      let number = 0;
      const func = () => {
        if (rewardRef.current.isLoaded) {
          openReward.current = onOpened;
          closeReward.current = onClosed;
          rewardRef.current.show();
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

  React.useEffect(() => {
    if (reward.isClosed) {
      adjustSendEvent(ADJUST_EVENT.REWARD_DISPLAYED);
      firebaseSendEvent(FIREBASE.REWARD_DISPLAYED);
      onAfter?.();
    }
    if (reward.isClosed && closeReward.current) {
      closeReward.current();
      closeReward.current = undefined;
    }
  }, [reward.isClosed]);

  React.useEffect(() => {
    if (reward.isOpened && openReward.current) {
      openReward.current();
      openReward.current = undefined;
    }
    setShowLoading(false);
  }, [reward.isOpened]);

  React.useEffect(() => {
    if (!rewardRef.current.isLoaded && loadAds && preload) {
      console.log('Load reward: ', id);
      rewardRef.current.load();
    }

    if (rewardRef.current.isLoaded && loadAds) {
      console.log('Loaded reward: ', id);
    }
  }, [reward.load, reward.isLoaded, loadAds, preload]);

  // React.useEffect(() => {
  //   if (reward.revenue) {
  //     adjustTrackAds(reward.revenue.value);
  //   }
  // }, [reward.revenue]);

  return {
    showRewardedVideo,
    forceShowRewardedVideo,
    ...reward,
  };
};

export const useAdsRewardRegister = (
  id: string,
  name: string,
  preload: boolean,
  onBefore?: () => void,
  onAfter?: () => void,
) => {
  const global = useAds();
  const ads = useAdsReward(
    id,
    preload,
    global.setShowLoading,
    () => {
      if (name) {
        firebaseSendEvent('reward_show_' + name);
      }
      onBefore?.();
    },
    () => {
      if (name) {
        firebaseSendEvent('reward_displayed_' + name);
      }
      onAfter?.();
    },
    global.showAds,
  );

  React.useEffect(() => {
    console.log('Register Reward: ', id);
    global.registerReward(id, ads);
    return () => {
      global.unRegisterReward(id);
      console.log('Unregister Reward: ', id);
    };
  }, []);

  return ads;
};

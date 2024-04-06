import React from 'react';
import {AdHookReturns} from 'react-native-google-mobile-ads';

export type AdsInter = {
  showInter: (onOpened?: () => void, onClosed?: () => void) => Promise<boolean>;
  forceShowInter: (
    timeSecond: number,
    onOpened?: () => void,
    onClosed?: () => void,
  ) => Promise<boolean>;
} & AdHookReturns;

export type AdsReward = {
  showRewardedVideo: (
    onOpened?: () => void,
    onClosed?: () => void,
  ) => Promise<boolean>;
  forceShowRewardedVideo: (
    timeSecond: number,
    onOpened?: () => void,
    onClosed?: () => void,
  ) => Promise<boolean>;
} & AdHookReturns;

const AdsContext = React.createContext<{
  showRewardedVideo: (
    id: string,
    onOpened?: () => void,
    onClosed?: () => void,
  ) => Promise<boolean>;
  showInter: (
    id: string,
    onOpened?: () => void,
    onClosed?: () => void,
  ) => Promise<boolean>;
  forceShowRewardedVideo: (
    id: string,
    timeSecond: number,
    onOpened?: () => void,
    onClosed?: () => void,
  ) => Promise<boolean>;
  forceShowInter: (
    id: string,
    timeSecond: number,
    onOpened?: () => void,
    onClosed?: () => void,
    insteadOfReward?: boolean,
  ) => Promise<boolean>;
  showAds: boolean;
  setShowLoading: (v: boolean) => void;
  registerInter: (id: string, inter: AdsInter) => void;
  registerReward: (id: string, reward: AdsReward) => void;
  unRegisterReward: (id: string) => void;
  unRegisterInter: (id: string) => void;
}>({
  showRewardedVideo: (id: string) => Promise.resolve(false),
  showInter: (id: string) => Promise.resolve(false),
  forceShowRewardedVideo: (
    id: string,
    v: number,
    onOpened?: () => void,
    onClosed?: () => void,
  ) => Promise.resolve(false),
  forceShowInter: (
    id: string,
    v: number,
    onOpened?: () => void,
    onClosed?: () => void,
  ) => Promise.resolve(false),
  showAds: false,
  setShowLoading: (v: boolean) => undefined,
  registerInter: (id: string, inter: AdsInter) => undefined,
  registerReward: (id: string, reward: AdsReward) => undefined,
  unRegisterReward: (id: string) => undefined,
  unRegisterInter: (id: string) => undefined,
});

export const useAds = () => React.useContext(AdsContext);

export default AdsContext;

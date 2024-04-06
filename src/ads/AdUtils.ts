import {TestIds} from 'react-native-google-mobile-ads';

export const BANNER_ID = 'ca-app-pub-1939315010587936/1093710963';
export const REWARD_ID = 'ca-app-pub-1939315010587936/5765537420';
export const INTER_ID = 'ca-app-pub-1939315010587936/4173254150';
export const NATIVE_ID = 'ca-app-pub-1939315010587936/6892832557';
export const OPEN_ID = 'ca-app-pub-1939315010587936/8793804255';

export const Banner_Tutorial = 'ca-app-pub-1939315010587936/1093710963';
export const Banner_Language = 'ca-app-pub-1939315010587936/1093710963';

export const Native_OnBoard_Screen = 'ca-app-pub-1939315010587936/3255357295';
export const Native_Setting = 'ca-app-pub-1939315010587936/3255357295';
export const Native_Language = 'ca-app-pub-1939315010587936/6892832557';
export const Native_Custom_RandomNumber = 'ca-app-pub-1939315010587936/6892832557';

export const Inter_Back = 'ca-app-pub-1939315010587936/4173254150';

export const getPlacementId = (dev: string, pro: string) => {
  return process.env.NODE_ENV === 'development' ? dev : pro;
};


export const rewardID = getPlacementId(
  TestIds.INTERSTITIAL,
  REWARD_ID,
);

export const interBackID = getPlacementId(TestIds.INTERSTITIAL, Inter_Back);

export const interID = getPlacementId(
  TestIds.INTERSTITIAL,
  INTER_ID,
);

export const nativeID = getPlacementId(
  TestIds.INTERSTITIAL,
  NATIVE_ID,
);

export const openID = getPlacementId(
  TestIds.INTERSTITIAL,
  OPEN_ID,
);


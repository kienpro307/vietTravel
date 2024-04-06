import {AdManager, AdOptions, TestIds} from 'react-native-admob-native-ads';
import {
  NATIVE_ID,
  getPlacementId,
} from './AdUtils';

export const checkHasAd = async (id: string) => {
  const check = (await AdManager.hasAd(id)) as any as {
    [key: string]: number;
  };

  return check[id] > 0;
};

export const loadNativeAdById = (
  id: string,
  number: number = 1,
  name?: string,
) => {
  AdManager.registerRepository({
    name: name || id,
    adUnitId: getPlacementId(TestIds.Video, id),
    numOfAds: number,
    adChoicesPlacement: 'bottomLeft',
  }).then(result => {});
};

export const loadNativeAdsInitApp = () => {
  // default
  loadNativeAdById(NATIVE_ID);
};

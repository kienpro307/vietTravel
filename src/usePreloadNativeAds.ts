import {loadNativeAdById} from './ads/NativeAdsUtils';
import React from 'react';

export const usePreloadNativeAds = (id: string[]) => {
  React.useEffect(() => {
    id.forEach(item => loadNativeAdById(item));
  }, id);
};

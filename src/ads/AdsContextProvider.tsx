import * as React from 'react';
import {StyleSheet} from 'react-native';
import AdsContext, {AdsInter, AdsReward} from './AdsContext';
import {adjustSendEvent} from '../adjust/AdjustUtils';
import {ADJUST_EVENT, FIREBASE} from '../constant';
// import PurcharseContext from '../purcharse/PurcharseContext';
import {firebaseSendEvent} from '../firebase/FirebaseUtiils';
import {
  AdsConsent,
  AdsConsentStatus,
  MobileAds,
  TestIds,
} from 'react-native-google-mobile-ads';
import {
  INTER_ID,
  Native_OnBoard_Screen,
  Native_Setting,
  REWARD_ID,
  getPlacementId,
} from './AdUtils';
import {REMOTE_KEY, useRemote} from '../remoteConfig/RemoteConfig';
import ModalLoadingAds from './ModalLoadingAds';
import {useAdsInter} from './useAdsInter';
import {useAdsReward} from './useAdsReward';
import {
  checkHasAd,
  loadNativeAdById,
  loadNativeAdsInitApp,
} from './NativeAdsUtils';
import {useCommonApp} from '../CommonAppContext';
interface AdsContextProviderProps {
  children: React.ReactNode;
}

const rewardID = getPlacementId(TestIds.REWARDED, REWARD_ID);
const interID = getPlacementId(TestIds.INTERSTITIAL, INTER_ID);

const AdsContextProvider = (props: AdsContextProviderProps) => {
  // const purchaseContext = React.useContext(PurcharseContext);
  const [showLoadingAds, setShowLoadingAds] = React.useState<boolean>(false);
  const repoAdsInter = React.useRef<{[key: string]: AdsInter | null}>({});
  const repoAdsReward = React.useRef<{[key: string]: AdsReward | null}>({});
  const [consentUMP, setConsentUMP] = React.useState<boolean>(false);
  const [isInited, setInited] = React.useState<boolean>(false);
  const [showAdsAfterConsent, setShowAdsAfterConsent] =
    React.useState<boolean>(false);
  // const showAds = !purchaseContext.purcharsed && showAdsAfterConsent;
  const showAds = showAdsAfterConsent;
  const showAdsAfterConsentError = useRemote(
    REMOTE_KEY.show_ads_when_consent_error,
  );
  const defaultInter = useAdsInter(
    interID,
    true,
    setShowLoadingAds,
    undefined,
    undefined,
    showAds,
  );
  const defaultReward = useAdsReward(
    rewardID,
    true,
    setShowLoadingAds,
    undefined,
    undefined,
    showAds,
  );
  const {firstOpen} = useCommonApp();

  const registerInter = (id: string, inter: AdsInter) => {
    repoAdsInter.current[id] = inter;
  };

  const registerReward = (id: string, reward: AdsReward) => {
    repoAdsReward.current[id] = reward;
  };

  const unRegisterInter = (id: string) => {
    repoAdsInter.current[id] = null;
  };

  const unRegisterReward = (id: string) => {
    repoAdsReward.current[id] = null;
  };

  const getReward = (id: string) => {
    return repoAdsReward.current[id] || defaultReward;
  };

  const getInter = (id: string) => {
    return repoAdsInter.current[id] || defaultInter;
  };

  const forceWaitShowRW = async (
    id: string,
    timeSecond: number,
    onOpened?: () => void,
    onClosed?: () => void,
  ): Promise<boolean> => {
    if (!showAds) return Promise.resolve(false);
    adjustSendEvent(ADJUST_EVENT.REWARD_SHOW);
    firebaseSendEvent(FIREBASE.REWARD_SHOW);
    const show = await getReward(id).forceShowRewardedVideo(
      timeSecond,
      onOpened,
      onClosed,
    );

    if (show) {
      return Promise.resolve(true);
    }

    if (defaultReward.isLoaded) {
      return defaultReward.showRewardedVideo(onOpened, onClosed);
    }

    const rewards = Object.values(repoAdsReward.current);

    for (let reward of rewards) {
      const showI = await reward?.showRewardedVideo(onOpened, onClosed);
      if (showI) return Promise.resolve(true);
    }

    return showInter('', onOpened, onClosed);
  };

  const forceWaitShowIS = async (
    id: string,
    timeSecond: number,
    onOpened?: () => void,
    onClosed?: () => void,
    insteadOfReward?: boolean,
  ): Promise<boolean> => {
    if (!showAds) return Promise.resolve(false);
    adjustSendEvent(ADJUST_EVENT.INTER_SHOW);
    firebaseSendEvent(FIREBASE.INTER_SHOW);
    const show = await getInter(id).forceShowInter(
      timeSecond,
      onOpened,
      onClosed,
    );

    if (!show && insteadOfReward) {
      return showRewardedVideo('', onOpened, onClosed);
    }

    if (!show) {
      const inters = Object.values(repoAdsInter.current);
      for (let inter of inters) {
        const showI = await inter?.showInter(onOpened, onClosed);
        if (showI) return Promise.resolve(true);
      }
    }

    return Promise.resolve(show);
  };

  const showRewardedVideo = async (
    id: string,
    onOpened?: () => void,
    onClosed?: () => void,
  ) => {
    if (!showAds) return Promise.resolve(false);
    adjustSendEvent(ADJUST_EVENT.REWARD_SHOW);
    firebaseSendEvent(FIREBASE.REWARD_SHOW);
    return getReward(id).showRewardedVideo(onOpened, onClosed);
  };

  const showInter = async (
    id: string,
    onOpened?: () => void,
    onClosed?: () => void,
  ) => {
    if (!showAds) return Promise.resolve(false);
    adjustSendEvent(ADJUST_EVENT.INTER_SHOW);
    firebaseSendEvent(FIREBASE.INTER_SHOW);
    return getInter(id).showInter(onOpened, onClosed);
  };

  const initSDK = () => {
    if (isInited || !showAds) return;
    MobileAds()
      .initialize()
      .then(adapterStatuses => {
        checkHasAd(Native_OnBoard_Screen).then(r => {
          if (!r && firstOpen) {
            loadNativeAdById(Native_OnBoard_Screen);
          }
        });
        checkHasAd(Native_Setting).then(r => {
          if (!r && firstOpen) {
            loadNativeAdById(Native_Setting);
          }
        });
        setInited(true);
      });
  };

  const showConsentUMPAndInitSDK = async () => {
    try {
      // console.log('im in show consent');
      const consentInfo = await AdsConsent.requestInfoUpdate();
      if (
        consentInfo.status === AdsConsentStatus.OBTAINED ||
        consentInfo.status === AdsConsentStatus.NOT_REQUIRED
      ) {
        // console.log('im in 1');
        if (consentInfo.canRequestAds) {
          // console.log('im in 2');
          initSDK();
          setShowAdsAfterConsent(true);
        }
        setConsentUMP(true);
        return;
      }

      if (consentInfo.canRequestAds) {
        // console.log('im in 3');
        initSDK();
      }

      const formResult = await AdsConsent.loadAndShowConsentFormIfRequired();
      if (formResult.canRequestAds) {
        // console.log('im in 4');
        initSDK();
        setShowAdsAfterConsent(formResult.canRequestAds);
      }
      setConsentUMP(true);
    } catch (err) {
      // console.log('im in 5');
      setConsentUMP(true);
      if (showAdsAfterConsentError().asBoolean()) {
        initSDK();
        setShowAdsAfterConsent(true);
      }
    }
  };

  const setShowLoading = (v: boolean) => {
    if (!showAds) return setShowLoadingAds(false);
    setShowLoadingAds(v);
  };

  React.useEffect(() => {
    if (showAds) {
      checkHasAd(Native_OnBoard_Screen).then(r => {
        if (!r && firstOpen) {
          loadNativeAdById(Native_OnBoard_Screen);
        }
      });
      checkHasAd(Native_Setting).then(r => {
        if (!r && firstOpen) {
          loadNativeAdById(Native_Setting);
        }
      });
    }
    loadNativeAdsInitApp();
    showConsentUMPAndInitSDK();
  }, []);

  return (
    <AdsContext.Provider
      value={{
        showRewardedVideo,
        showInter,
        showAds: showAds,
        forceShowRewardedVideo: forceWaitShowRW,
        forceShowInter: forceWaitShowIS,
        setShowLoading,
        registerInter,
        registerReward,
        unRegisterInter,
        unRegisterReward,
      }}>
      <ModalLoadingAds visible={showLoadingAds} />
      {consentUMP && props.children}
    </AdsContext.Provider>
  );
};

export default AdsContextProvider;

const styles = StyleSheet.create({
  container: {},
});

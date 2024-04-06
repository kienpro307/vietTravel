import * as React from 'react';
import {
  FlatList,
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import {dictionary2Trans} from '../../utils/LanguageUtils';
import {
  LANGUAGE_RESOURCE,
  LANGUAGE_TO_COUNTRY_CODE_MAP,
  LANGUAGE,
  STORAGE,
} from '../../constant';
import CountryFlag from 'react-native-country-flag';
import {useLanguageChangeHook} from '../../utils/LanguageUtils';
import {useAppStore} from '../../store/AppStore';
import {COLORS, FONTFAMILY, FONTSIZE, HEIGHT, WIDTH} from '../../theme';
import BackIcon from '../../iconSvg/BackIcon';
import CheckBox from '@react-native-community/checkbox';
import Entypo from 'react-native-vector-icons/Entypo';
import NativeAdsFocus from '../../ads/NativeAdsFocus';
import {
  BANNER_ID,
  Banner_Language,
  Native_Language,
  Native_OnBoard_Screen,
  Native_Setting,
  interBackID,
} from '../../ads/AdUtils';
import {usePreloadNativeAds} from '../../usePreloadNativeAds';
import {useCommonApp} from '../../CommonAppContext';
import {checkHasAd, loadNativeAdById} from '../../ads/NativeAdsUtils';
import BannerAdWrap from '../../ads/BannerAdWrap';
import {BannerAdSize} from 'react-native-google-mobile-ads';
import {useAds} from '../../ads/AdsContext';
import {useOpenApp} from '../open/OpenAppContext';
import {useRemote, REMOTE_KEY} from '../../remoteConfig/RemoteConfig';
import {useIsFocused} from '@react-navigation/native';

const LanguageSetting: React.FC = ({route, navigation}: any) => {
  const numBack = useAppStore((state: any) => state.numBack);
  const setNumBack = useAppStore((state: any) => state.setNumBack);
  const setViewBanner = useAppStore((state: any) => state.setViewBanner);
  const numPressBack = useRemote(REMOTE_KEY.show_ads_after_press_back);
  const ads = useAds();
  const openAds = useOpenApp();
  const {fromStart} = route.params;
  const {changeLanguage} = useLanguageChangeHook();
  const {firstOpen} = useCommonApp();
  const currentLanguage = useAppStore((state: any) => state.Language);
  const [languageSelect, setLanguageSelect] = React.useState<string>('');
  const [option, setOption] = React.useState<string>('');
  const isFocused = useIsFocused();

  usePreloadNativeAds([Native_Language]);

  const toggleOption = (item: string) => {
    setOption(item);
  };

  const changeLng = (lng: string) => {
    changeLanguage(lng, true);
    if (firstOpen && fromStart) {
      navigation.navigate('OnBoard');
    } else {
      navigation.navigate('Setting');
    }
  };

  const renderLanguageItem = (item: string, index: number) => {
    const country = LANGUAGE_TO_COUNTRY_CODE_MAP[item];

    if (!country) {
      console.log('Error: Not found country code of ', item);
      return null;
    }

    const value = item === option;

    return (
      <TouchableOpacity
        key={item}
        onPress={() => toggleOption(item)}
        style={[
          item === languageSelect ? styles.languageSelect : {},
          styles.LanguageSelectContainer,
        ]}>
        <CountryFlag isoCode={country} size={25} />
        <View style={{flex: 1}}>
          <Text
            style={{
              fontFamily: FONTFAMILY.Bold,
              color: COLORS.primaryBrownBorderHex,
              fontSize: FONTSIZE(2.5),
            }}>
            {LANGUAGE[item].nativeName}
          </Text>
        </View>

        <CheckBox
          disabled={false}
          value={value}
          onValueChange={() => toggleOption(item)}
          tintColors={{
            true: COLORS.primaryBrownBorderHex,
            false: COLORS.primaryBrownBorderHex,
          }}
          // style={{flex: 1}}
        />
      </TouchableOpacity>
    );
  };

  React.useEffect(() => {
    const fetch = async () => {
      const language = currentLanguage;
      setLanguageSelect(language);
      setOption(language);
    };
    fetch();
  }, []);

  React.useEffect(() => {
    checkHasAd(Native_OnBoard_Screen).then(r => {
      if (!r) {
        loadNativeAdById(Native_Setting);
      }
    });
  }, []);

  React.useEffect(() => {
    if (isFocused) {
      setViewBanner(false);
    } else {
      setViewBanner(true);
    }
  }, [isFocused]);

  return (
    <LinearGradient
      start={{x: 0.5, y: -0.2}}
      end={{x: 0.5, y: 1.2}}
      colors={[COLORS.primaryPinkBGHex, COLORS.primaryBlueBGHex]}
      style={styles.ScreenContainer}>
      <LinearGradient
        start={{x: 0.5, y: 0}}
        end={{x: 0.5, y: 2}}
        colors={
          fromStart
            ? [COLORS.primaryBrownBorderHex, COLORS.secondaryYellowHex]
            : ['transparent', 'transparent']
        }
        style={[
          styles.TittleRow,
          {
            backgroundColor: firstOpen
              ? COLORS.primaryBrownBorderHex
              : 'transparent',
          },
        ]}>
        {fromStart ? (
          <View style={styles.ButtonLeft} />
        ) : (
          <TouchableOpacity
            onPress={() => {
              if (ads.showAds && numBack === 0) {
                ads.showInter(interBackID).then(v => {
                  if (v) {
                    openAds.onChangeShouldShowOpenAds(false);

                    //  firebaseSendEvent(FIREBASE.SHOW_INTER_BACK, {
                    //    screen: 'setting',
                    //  });
                  }
                });
              }
              if (numBack > numPressBack().asNumber() - 2) {
                setNumBack(0);
              } else {
                setNumBack(numBack + 1);
              }
              navigation.navigate('Setting');
            }}
            style={styles.ButtonLeft}>
            <BackIcon width={WIDTH(10)} height={WIDTH(10)} />
          </TouchableOpacity>
        )}

        <View style={styles.TittleBar}>
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            style={[
              styles.TittleText,
              {
                color: firstOpen
                  ? COLORS.primaryWhiteHex
                  : COLORS.primaryWhiteHex,
              },
            ]}>
            {dictionary2Trans('Language')}
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => changeLng(option)}
          style={styles.ButtonRight}>
          <Entypo name="check" size={WIDTH(7)} color={COLORS.primaryWhiteHex} />
        </TouchableOpacity>
      </LinearGradient>
      {/* {firstOpen && (
        <BannerAdWrap
          unitId={Banner_Language}
          position="bottom"
          size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
        />
      )} */}

      <FlatList
        contentContainerStyle={{
          width: WIDTH(100),
          flex: 1,
          alignItems: 'center',
          marginTop: HEIGHT(2),
        }}
        data={Object.keys(LANGUAGE_RESOURCE)}
        renderItem={({item, index}) => renderLanguageItem(item, index)}
        keyExtractor={(item, index) => index.toString()}
      />
      <View
        style={{
          width: WIDTH(100),
          overflow: 'hidden',
        }}>
        <NativeAdsFocus repository={Native_Language} />
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  ScreenContainer: {
    // width: WIDTH(100),
    // height: HEIGHT(100),
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    overflow: 'hidden',
    // top: StatusBar.currentHeight,
  },

  languageSelect: {
    // borderWidth: 3,
    // borderColor: COLORS.primaryBrownBorderHex,
  },
  LanguageSelectContainer: {
    height: HEIGHT(8),
    width: WIDTH(90),
    paddingHorizontal: WIDTH(3),
    flexDirection: 'row',
    gap: WIDTH(3),
    backgroundColor: COLORS.primaryYellowHex,
    borderRadius: HEIGHT(2),
    margin: HEIGHT(0.7),
    // elevation: WIDTH(3),
    alignItems: 'center',
  },
  adBanner: {},
  TittleRow: {
    display: 'flex',
    width: WIDTH(100),
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: WIDTH(5),
    paddingBottom: HEIGHT(1),
    paddingTop: StatusBar.currentHeight,
  },
  ButtonLeft: {
    justifyContent: 'center',
    alignItems: 'center',
    width: WIDTH(10),
  },
  ButtonRight: {
    justifyContent: 'center',
    alignItems: 'center',
    width: WIDTH(10),
  },
  TittleBar: {
    width: WIDTH(70),
    alignItems: 'center',
  },
  TittleText: {
    textAlign: 'center',
    fontSize: FONTSIZE(3.2),
    fontFamily: FONTFAMILY.Bold,
  },
});

export default LanguageSetting;

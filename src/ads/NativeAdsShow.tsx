import * as React from 'react';
import {View, StyleSheet, ViewStyle, Text} from 'react-native';
import NativeAdView, {
  AdManager,
  AdOptions,
  ImageView,
  TestIds,
} from 'react-native-admob-native-ads';
import {
  AdBadge,
  TaglineView,
  HeadlineView,
  NativeMediaView,
  StoreView,
  IconView,
  CallToActionView,
  PriceView,
  StarRatingView,
} from 'react-native-admob-native-ads';
import AdsContext from './AdsContext';
import {adjustSendEvent} from '../adjust/AdjustUtils';
import {
  ADJUST_EVENT,
  BUTTON_HEIGHT,
  BUTTON_RADIUS,
  COLOR_LINEAR,
  FIREBASE,
} from '../constant';
import {firebaseSendEvent} from '../firebase/FirebaseUtiils';
import LinearGradient from 'react-native-linear-gradient';
import {checkHasAd, loadNativeAdById} from './NativeAdsUtils';
import {Chase} from 'react-native-animated-spinkit';
import {COLORS, HEIGHT, WIDTH} from '../theme';

export type PropType = {
  onShow?: () => void;
  onDisplayed?: () => void;
  onlyImage?: boolean;
  style?: ViewStyle;
  hiddenMedia?: boolean;
  hiddenTagLine?: boolean;
  reverse?: boolean;
  onlyOne?: boolean;
  hiddenIcon?: boolean;
};

const LayoutLarge = ({
  onlyImage,
  hiddenMedia,
  hiddenTagLine,
  reverse,
  hiddenIcon,
}: {
  onlyImage?: boolean;
  hiddenMedia?: boolean;
  hiddenTagLine?: boolean;
  reverse?: boolean;
  hiddenIcon?: boolean;
}) => {
  return (
    <>
      <View
        style={{
          flexDirection: 'row',
          gap: WIDTH(3),
          alignItems: 'center',
          paddingHorizontal: 8,
          paddingBottom: hiddenMedia && !reverse ? 5 : 0,
          marginTop: reverse ? 5 : 0,
        }}>
        {!hiddenIcon && (
          <IconView
            style={{
              height: 35,
              width: 35,
              borderRadius: 10,
              marginTop: 3,
            }}
          />
        )}
        <View style={{flex: 1, justifyContent: 'center'}}>
          <View style={{flexDirection: 'row', gap: 5}}>
            <View
              style={{
                height: 15,
                minWidth: 20,
                borderColor: 'green',
                borderWidth: 0.5,
                borderRadius: 3,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text style={{color: 'green', fontSize: 8.5}} numberOfLines={1}>
                Ad
              </Text>
            </View>
            <HeadlineView
              numberOfLines={1}
              style={{
                fontWeight: '500',
                fontSize: 11,
                color: '#000',
              }}
            />
          </View>
          {!hiddenTagLine && (
            <TaglineView
              numberOfLines={2}
              style={{
                fontWeight: '400',
                fontSize: 10,
                color: '#9e9e9e',
              }}
            />
          )}
          {!hiddenMedia && (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  gap: 5,
                  alignItems: 'center',
                }}>
                <StoreView
                  style={{
                    fontWeight: 'bold',
                    fontSize: 10,
                  }}
                />
                <StarRatingView size={12} iconSet="MaterialCommunityIcons" />
              </View>
              <PriceView
                style={{
                  fontWeight: 'bold',
                  fontSize: 9,
                }}
              />
            </View>
          )}
        </View>
      </View>
      {!hiddenMedia &&
        (onlyImage ? (
          <ImageView
            style={{
              width: '100%',
              height: 130,
              borderRadius: 15,
              marginVertical: 8,
            }}
          />
        ) : (
          <NativeMediaView
            style={{
              width: '100%',
              height: 130,
              borderRadius: 15,
              marginVertical: 8,
            }}
          />
        ))}
      <View
        style={[
          {
            position: 'absolute',
            marginTop: 3,
            left: 15,
            zIndex: 10,
            width: 15,
            height: 15,
          },
          reverse ? {bottom: 0} : {top: 0},
        ]}>
        <AdBadge
          style={{
            width: 15,
            height: 15,
            borderWidth: 1,
            borderColor: '#8a8a8a',
            zIndex: 10,
            alignItems: 'center',
            justifyContent: 'center',
          }}
          textStyle={{
            fontSize: 9,
            color: '#8a8a8a',
          }}
        />
      </View>

      <LinearGradient
        colors={COLOR_LINEAR}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        style={{
          overflow: 'hidden',
          borderRadius: BUTTON_RADIUS,
          marginBottom: 10,
        }}>
        <CallToActionView
          style={{
            height: BUTTON_HEIGHT,
            paddingHorizontal: 12,
            backgroundColor: 'transparent',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: BUTTON_RADIUS,
            elevation: 10,
            width: '100%',
          }}
          textStyle={{color: 'white', fontSize: 14}}
        />
      </LinearGradient>
    </>
  );
};

interface Repo extends PropType {
  repository: string;
  adUnitId?: undefined;
}
interface AdUnit extends PropType {
  adUnitId: string;
  repository?: undefined;
}

export type NativeAdsShowProps = Repo | AdUnit;

const NativeAdsShow = React.memo(
  (props: NativeAdsShowProps) => {
    const nativeAdViewRef = React.useRef<NativeAdView | null | undefined>();
    const [loaded, setLoaded] = React.useState<boolean>(false);
    const adsContext = React.useContext(AdsContext);
    const [showDefault, setShowDefault] = React.useState<boolean>(false);
    const [isAdSetting, setAdSetting] = React.useState<boolean>(false);

    React.useEffect(() => {
      const check = async () => {
        if (
          props.repository &&
          adsContext.showAds &&
          props.repository !== 'common'
        ) {
          const hasAds = await checkHasAd(props.repository);
          if (!hasAds && (await checkHasAd('common'))) {
            setShowDefault(true);
            console.log('Use default native ads');
          }
        }
      };
      check();

      if (adsContext.showAds) {
        nativeAdViewRef.current?.loadAd();
        adjustSendEvent(ADJUST_EVENT.NATIVE_ADS_SHOW);
        firebaseSendEvent(FIREBASE.NATIVE_ADS_SHOW);
        if (props.onShow) {
          props.onShow();
        }
      }
    }, [adsContext.showAds]);

    React.useEffect(() => {
      if (loaded && adsContext.showAds && !showDefault) {
        adjustSendEvent(ADJUST_EVENT.NATIVE_ADS_DISPLAYED);
        firebaseSendEvent(FIREBASE.NATIVE_ADS_DISPLAYED);
        if (props.onDisplayed) {
          props.onDisplayed();
        }
        console.log('Showed Native: ', props.repository || props.adUnitId);
        if (props.repository) {
          AdManager.unRegisterRepository(props.repository);

          if (!props.onlyOne) {
            {
              loadNativeAdById(props.repository);
            }
            console.log('Reload Native: ', props.repository);
          }
        }
      }
    }, [loaded, adsContext.showAds]);

    const {adUnitId, repository, ...restProps} = props;

    // console.log('showDefault', showDefault);
    return (
      adsContext.showAds &&
      (showDefault ? (
        <NativeAdsShow {...restProps} repository="common" />
      ) : (
        <>
          {!loaded && (
            <View
              style={{
                width: '100%',
                height: 0,
                alignItems: 'center',
              }}>
              <Chase color={'#bfbfbf'} size={30} />
            </View>
          )}
          <NativeAdView
            onNativeAdLoaded={ad => {
              if (!showDefault) {
                setAdSetting(ad.store ? true : false);
                setLoaded(true);
              }
            }}
            onAdLoaded={() => {
              setLoaded(true);
            }}
            onAdFailedToLoad={err => {
              console.log(err);
            }}
            onAdImpression={() => {}}
            style={[
              {
                // backgroundColor: COLORS.primaryYellowHex,
                backgroundColor: '#f3ead4',
                zIndex: 2,
                borderRadius: 5,
                height: loaded ? 'auto' : 0,
                overflow: 'hidden',
              },
              props.style,
            ]}
            ref={ref => {
              nativeAdViewRef.current = ref;
            }}
            repository={props.repository}>
            <View
              style={{
                paddingHorizontal: WIDTH(3),
                paddingVertical: HEIGHT(1),
                flexDirection:
                  props.reverse || (props.hiddenMedia && isAdSetting)
                    ? 'column-reverse'
                    : 'column',
              }}>
              <LayoutLarge
                hiddenIcon={props.hiddenIcon && !isAdSetting}
                hiddenMedia={props.hiddenMedia}
                onlyImage={props.onlyImage}
                hiddenTagLine={props.hiddenTagLine}
                reverse={props.reverse || (props.hiddenMedia && isAdSetting)}
              />
            </View>
          </NativeAdView>
        </>
      ))
    );
  },
  (pre, next) => {
    return pre.repository === next.repository;
  },
);

export default NativeAdsShow;

const styles = StyleSheet.create({
  container: {},
});

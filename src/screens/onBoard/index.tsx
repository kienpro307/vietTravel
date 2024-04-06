import * as React from 'react';
import {
  Animated,
  Dimensions,
  FlatList,
  ScrollView,
  StatusBar,
  ViewToken,
} from 'react-native';
import {Text, View, StyleSheet, Image} from 'react-native';
import NativeAdsShow from '../../ads/NativeAdsShow';
import {TouchableOpacity} from 'react-native';
import {
  NavigationProp,
  useIsFocused,
  useNavigation,
} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  ADJUST_EVENT,
  BUTTON_HEIGHT,
  COLOR_LINEAR,
  FIREBASE,
  IMAGES,
  STORAGE,
} from '../../constant';
import {firebaseSendEvent} from '../../firebase/FirebaseUtiils';
import LinearGradient from 'react-native-linear-gradient';
import {Banner_Tutorial, Native_OnBoard_Screen} from '../../ads/AdUtils';
import BannerAdWrap from '../../ads/BannerAdWrap';
import {BannerAdSize} from 'react-native-google-mobile-ads';
import {REMOTE_KEY, useRemote} from '../../remoteConfig/RemoteConfig';
import {COLORS, FONTFAMILY, FONTSIZE, HEIGHT, WIDTH} from '../../theme';
import LottieView from 'lottie-react-native';
import {useDictionaryToString} from '../../utils/LanguageUtils';
import {useAppStore} from '../../store/AppStore';

interface OnBoardScreenProps {
  navigation: any;
}

const window = Dimensions.get('window');

const ScreenItem = ({
  image,
  desc,
  title,
  onStart,
  last,
}: {
  image: React.ReactNode;
  desc: string;
  title: string;
  onStart: () => void;
  last: boolean;
}) => {
  const {dictionary2String} = useDictionaryToString();
  return (
    <View
      style={{
        width: window.width,
        alignItems: 'center',
        flexDirection: 'column',
        padding: 5,
        paddingTop: HEIGHT(10),
        height: HEIGHT(70),
        overflow: 'hidden',
      }}>
      <View
        style={{
          alignItems: 'center',
          flexDirection: 'column',
          justifyContent: 'center',
          flex: 1,
        }}>
        {image}
        <View
          style={{
            alignItems: 'center',
            flex: 1,
            justifyContent: 'center',
          }}>
          {title && (
            <Text
              style={{
                fontFamily: FONTFAMILY.Bold,
                fontSize: 25,
                color: COLORS.primaryWhiteHex,
                textAlign: 'center',
              }}>
              {dictionary2String(title)}
            </Text>
          )}
          <Text
            style={{
              fontSize: 14,
              fontFamily: FONTFAMILY.Bold,
              color: COLORS.primaryWhiteHex,
              textAlign: 'center',
              paddingHorizontal: 15,
            }}>
            {dictionary2String(desc)}
          </Text>
        </View>
      </View>
      {last && (
        <TouchableOpacity
          onPress={onStart}
          style={{
            borderRadius: 15,
            marginHorizontal: 15,
            height: BUTTON_HEIGHT,
            backgroundColor: COLORS.primaryPinkBGHex,
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 40,
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 3,
            },
            shadowOpacity: 0.29,
            shadowRadius: 4.65,
            elevation: 2,
            overflow: 'hidden',
          }}>
          <LinearGradient
            colors={COLOR_LINEAR}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            style={{
              width: '100%',
              alignItems: 'center',
              justifyContent: 'center',
              height: BUTTON_HEIGHT,
              paddingHorizontal: 30,
              minWidth: 300,
            }}>
            <Text
              style={{
                fontSize: FONTSIZE(3),
                fontFamily: FONTFAMILY.Bold,
                color: '#fff',
              }}>
              {dictionary2String("Let's Go")}
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      )}
    </View>
  );
};

const DESC = [
 
 
  {
    key: 0,
    title: 'Congratulations',
    value: "Let's explore all the features right now",
    image: (
      <Image
        style={{width: WIDTH(80), height: WIDTH(80)}}
        resizeMode="contain"
        source={require('./step1.png')}
      />
    ),
  },
];

const OnBoardScreen: React.FC<OnBoardScreenProps> = ({navigation}) => {
  const [active, setActive] = React.useState<number>(0);
  const ref = React.useRef<FlatList | null>();
  const reverseAds = true;
  const showBanner = true;
  const setViewBanner = useAppStore((state: any) => state.setViewBanner);
  const isFocused = useIsFocused();
  React.useEffect(() => {
    if (isFocused) {
      setViewBanner(false);
    } else {
      setViewBanner(true);
    }
  }, [isFocused]);

  const onNext = () => {
    ref.current?.scrollToOffset({offset: (active + 1) * window.width});
    setActive(active + 1);
  };

  const onPre = () => {
    ref.current?.scrollToOffset({offset: (active - 1) * window.width});
    setActive(active - 1);
  };

  const onSkip = () => {
    ref.current?.scrollToOffset({offset: (DESC.length - 1) * window.width});
    setActive(DESC.length - 1);
  };

  const onStart = () => {
    AsyncStorage.setItem(STORAGE.FIRST_OPEN, Date.now().toString());
    // adjustSendEvent(ADJUST_EVENT.TUTORIAL_3);
    // firebaseSendEvent(FIREBASE.TUTORIAL_DONE);

    // return navigation.navigate('Buy', {
    //   backToHome: true,
    //   showAds: true,
    // });
    return navigation.navigate('WheelList');
  };

  const ads = (
    // <View
    //   style={{
    //     width: WIDTH(100),
    //     // paddingBottom: !showBanner && !reverseAds ? 20 : 10,
    //   }}>
    <NativeAdsShow
      onlyOne
      hiddenMedia
      reverse={reverseAds}
      // hiddenTagLine
      // hiddenIcon
      style={{width: WIDTH(100), marginTop: 10}}
      repository={Native_OnBoard_Screen}
    />
    // </View>
  );

  const handleOnViewableItemsChanged = React.useRef(
    ({viewableItems}: {viewableItems: Array<ViewToken>}) => {
      setActive(viewableItems[0].index || 0);
    },
  ).current;

  const viewabilityConfig = React.useRef({
    itemVisiblePercentThreshold: 50,
  }).current;

  return (
    <LinearGradient
      start={{x: 0.5, y: -0.2}}
      end={{x: 0.5, y: 1.2}}
      colors={[COLORS.primaryPinkBGHex, COLORS.primaryBlueBGHex]}
      style={styles.ScreenContainer}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
      />
      {/* {showBanner && (
        <BannerAdWrap
          unitId={Banner_Tutorial}
          position="bottom"
          size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
        />
      )} */}
      <View style={{flex: 1}}>
        <ScrollView contentContainerStyle={{flexGrow: 1}}>
          <FlatList
            snapToAlignment="center"
            ref={r => {
              ref.current = r;
            }}
            viewabilityConfig={viewabilityConfig}
            showsHorizontalScrollIndicator={false}
            horizontal
            data={DESC}
            pagingEnabled
            style={{flex: 1}}
            progressViewOffset={2}
            onViewableItemsChanged={handleOnViewableItemsChanged}
            renderItem={({item}) => (
              <ScreenItem
                last={item.key === DESC.length - 1}
                onStart={onStart}
                title={item.title}
                image={item.image}
                desc={item.value}
              />
            )}
          />
        </ScrollView>
      </View>
      <View
        style={{
          alignItems: 'center',
          flexDirection: 'row',
          gap: 10,
          justifyContent: 'center',
          zIndex: 10,
          marginBottom: 15,
        }}>
        {DESC.map(item => (
          <View
            key={item.key}
            style={[
              {
                width: 13,
                height: 13,
                backgroundColor: '#e3e3e3',
                borderRadius: 10,
              },
              active === item.key && {
                backgroundColor: COLORS.primaryBrownBorderHex,
                width: 18,
                height: 18,
              },
            ].filter(Boolean)}
          />
        ))}
      </View>
      {ads}
    </LinearGradient>
  );
};

export default OnBoardScreen;

const styles = StyleSheet.create({
  ScreenContainer: {
    backgroundColor: COLORS.primaryBackgroundGreyHex,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    // width: WIDTH(100),
    // height: HEIGHT(100),
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },
});

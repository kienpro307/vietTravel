import {
  ScrollView,
  Share,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {COLORS, FONTFAMILY, FONTSIZE, HEIGHT, WIDTH} from '../../theme';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import {
  dictionary2Trans,
  useDictionaryToString,
} from '../../utils/LanguageUtils';
import ModalRateApp from './modal/ModalRate';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ToggleSwitch from 'toggle-switch-react-native';
import {useAppStore} from '../../store/AppStore';

const Setting: React.FC = ({route, navigation}: any) => {
  const muteBackgroundMusic = useAppStore(
    (state: any) => state.muteBackgroundMusic,
  );
  const setMuteBackgroundMusic = useAppStore(
    (state: any) => state.setMuteBackgroundMusic,
  );
  const muteSound = useAppStore((state: any) => state.muteSound);
  const setMuteSound = useAppStore((state: any) => state.setMuteSound);
  const iconSize = WIDTH(7);
  const [openRate, setOpenRate] = useState(false);
  const {dictionary2String} = useDictionaryToString();

  const handlePressSetting = (type: string) => {
    if (type === 'BackgroundMusic') {
      setMuteBackgroundMusic();
    } else if (type === 'Sound') {
      setMuteSound();
    }
  };

  const onShare = async () => {
    try {
      const appLink =
        'https://play.google.com/store/apps/details?id=com.flabs.lucky.draw.events';
      const translatedMessage = dictionary2Trans(
        "I found a funny app WIFI Master Password. Download it on Google Play:  '{{appLink}}'",
        appLink,
      ).props.children;

      const result = await Share.share({
        title: 'App link',
        message: translatedMessage,
        url: appLink,
      });
    } catch (error) {
      // Xử lý lỗi nếu cần
    }
  };

  const handlePressLanguage = () => {
    navigation.navigate('languageSetting', {fromStart: false});
  };

  const handlePressReview = () => {
    setOpenRate(true);
  };

  const handlePressShare = () => {
    onShare();
  };

  const handlePressFeedBack = () => {};

  const handlePressTerm = () => {};

  const handlePressPolicy = () => {
    navigation.navigate('Policy');
  };

  // const handlePress = () => {};

  function SettingItem(
    icon: React.ReactNode,
    title: string,
    tail: React.ReactNode,
    onPress: () => void,
  ) {
    return (
      <TouchableOpacity onPress={onPress} style={styles.SettingContainer}>
        <View style={styles.Icon}>{icon}</View>
        <View style={styles.SettingTitleContainer}>
          <Text style={styles.SettingTitleText}>{title}</Text>
        </View>
        <View style={styles.Icon}>{tail}</View>
      </TouchableOpacity>
    );
  }

  return (
    <LinearGradient
      start={{x: 0.5, y: -0.2}}
      end={{x: 0.5, y: 1.2}}
      colors={[COLORS.primaryPinkBGHex, COLORS.primaryBlueBGHex]}
      style={styles.ScreenContainer}>
      <View style={styles.TittleRow}>
        <TouchableOpacity
          // onPress={() => {
          //   navigation.goBack();
          // }}
          style={styles.ButtonLeft}>
          {/* <BackIcon width={WIDTH(10)} height={WIDTH(10)} /> */}
        </TouchableOpacity>
        <View style={styles.TittleBar}>
          <Text style={styles.TittleText}>{dictionary2Trans('SETTING')}</Text>
        </View>
        <TouchableOpacity style={styles.ButtonRight}></TouchableOpacity>
      </View>
      <ScrollView horizontal={false} showsVerticalScrollIndicator={false}>
        <View style={styles.GroupSettingContainer}>
          <View style={styles.LabelContainer}>
            <Text style={styles.LabelText}>{dictionary2Trans('General')}</Text>
          </View>
          <View style={styles.GroupSetting}>
            {SettingItem(
              <FontAwesome6
                name="earth-asia"
                size={iconSize}
                color={COLORS.primaryBrownBorderHex}
              />,
              dictionary2String('Language'),
              <MaterialIcons
                name="navigate-next"
                size={iconSize}
                color={COLORS.primaryBrownBorderHex}
              />,
              handlePressLanguage,
            )}
            <TouchableOpacity
              onPress={() => handlePressSetting('BackgroundMusic')}
              style={[styles.SettingContainer]}>
              <View style={{}}>
                <Ionicons
                  name="volume-mute-sharp"
                  size={iconSize}
                  color={COLORS.primaryBrownBorderHex}
                />
              </View>
              <View style={styles.SettingContent}>
                <Text style={styles.SettingContentText}>
                  {dictionary2Trans('Mute music')}
                </Text>
              </View>
              <View style={styles.SettingDetail}>
                <ToggleSwitch
                  isOn={muteBackgroundMusic}
                  onColor={COLORS.secondaryYellowHex}
                  offColor={COLORS.primaryWhiteGreyHex}
                  size="medium"
                  onToggle={isOn => {
                    setMuteBackgroundMusic();
                  }}
                />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handlePressSetting('Sound')}
              style={[styles.SettingContainer]}>
              <View style={{}}>
                <MaterialCommunityIcons
                  name="music-note-off"
                  size={iconSize}
                  color={COLORS.primaryBrownBorderHex}
                />
              </View>
              <View style={styles.SettingContent}>
                <Text style={styles.SettingContentText}>
                  {dictionary2Trans('Mute sound')}
                </Text>
              </View>
              <View style={styles.SettingDetail}>
                <ToggleSwitch
                  isOn={muteSound}
                  onColor={COLORS.secondaryYellowHex}
                  offColor={COLORS.primaryWhiteGreyHex}
                  size="medium"
                  onToggle={isOn => {
                    setMuteSound();
                  }}
                />
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.GroupSettingContainer}>
          <View style={styles.LabelContainer}>
            <Text style={styles.LabelText}>{dictionary2String('About')}</Text>
          </View>
          <View style={[styles.GroupSetting, {paddingBottom: HEIGHT(13)}]}>
            {SettingItem(
              <AntDesign
                name="star"
                size={iconSize}
                color={COLORS.primaryBrownBorderHex}
              />,
              dictionary2String('Review us'),
              <MaterialIcons
                name="navigate-next"
                size={iconSize}
                color={COLORS.primaryBrownBorderHex}
              />,
              handlePressReview,
            )}
            {SettingItem(
              <Entypo
                name="share"
                size={iconSize}
                color={COLORS.primaryBrownBorderHex}
              />,
              dictionary2String('Share with your friend'),
              <MaterialIcons
                name="navigate-next"
                size={iconSize}
                color={COLORS.primaryBrownBorderHex}
              />,
              handlePressShare,
            )}
            {/* {SettingItem(
              <MaterialIcons
                name="feedback"
                size={iconSize}
                color={COLORS.primaryBrownBorderHex}
              />,
              'Feedback',
              <MaterialIcons
                name="navigate-next"
                size={iconSize}
                color={COLORS.primaryBrownBorderHex}
              />,
              handlePressFeedBack,
            )} */}
            {/* {SettingItem(
              <Term
                width={iconSize}
                height={iconSize}
                fill={COLORS.primaryBrownBorderHex}
              />,
              'Terms of Service',
              <MaterialIcons
                name="navigate-next"
                size={iconSize}
                color={COLORS.primaryBrownBorderHex}
              />,
              handlePressTerm,
            )} */}
            {SettingItem(
              <MaterialIcons
                name="policy"
                size={iconSize}
                color={COLORS.primaryBrownBorderHex}
              />,
              dictionary2String('Terms & Privacy'),
              <MaterialIcons
                name="navigate-next"
                size={iconSize}
                color={COLORS.primaryBrownBorderHex}
              />,
              handlePressPolicy,
            )}
          </View>
        </View>
      </ScrollView>
      <ModalRateApp open={openRate} onClose={() => setOpenRate(false)} />
      {/* <BannerAdWrap
        unitId={BANNER_ID}
        position="bottom"
        size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
      /> */}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  ScreenContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  TittleRow: {
    display: 'flex',
    width: WIDTH(100),
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: WIDTH(2),
    marginTop: HEIGHT(2),
    paddingTop: StatusBar.currentHeight,
  },
  ButtonLeft: {
    justifyContent: 'center',
    alignItems: 'center',
    width: WIDTH(15),
  },
  ButtonRight: {
    justifyContent: 'center',
    alignItems: 'center',
    width: WIDTH(15),
  },
  TittleBar: {
    alignItems: 'center',
    flex: 1,
  },
  TittleText: {
    color: COLORS.primaryWhiteHex,
    textAlign: 'center',
    fontSize: FONTSIZE(3.5),
    fontFamily: FONTFAMILY.ExtraBold,
  },

  GroupSettingContainer: {
    flexDirection: 'column',
    width: WIDTH(100),
    paddingHorizontal: WIDTH(7),
    marginVertical: HEIGHT(1),
    gap: HEIGHT(1.5),
  },
  LabelContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  LabelText: {
    color: COLORS.primaryWhiteHex,
    fontSize: FONTSIZE(3.2),
    fontFamily: FONTFAMILY.Bold,
  },

  GroupSetting: {
    display: 'flex',
    flexDirection: 'column',
    gap: HEIGHT(1.5),
    alignItems: 'center',
  },
  SettingContainer: {
    backgroundColor: COLORS.primaryYellowHex,
    width: WIDTH(84),
    height: HEIGHT(8),
    borderRadius: HEIGHT(2),
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: WIDTH(3),
    elevation: WIDTH(2),
    justifyContent: 'space-between',
    gap: WIDTH(3),
  },
  Icon: {},
  SettingTitleContainer: {
    flex: 1,
  },
  SettingTitleText: {
    color: COLORS.primaryBrownBorderHex,
    fontSize: FONTSIZE(2.2),
    fontFamily: FONTFAMILY.Bold,
    textAlign: 'left',
  },
  SettingContentText: {
    color: COLORS.primaryBrownBorderHex,
    fontSize: FONTSIZE(2.2),
    fontFamily: FONTFAMILY.Bold,
  },
  SettingContent: {
    flex: 1,
    marginHorizontal: WIDTH(2),
  },
  SettingDetail: {
    width: WIDTH(20),
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingRight: WIDTH(2),
  },
});

export default Setting;

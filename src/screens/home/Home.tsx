import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {COLORS, FONTSIZE, HEIGHT, WIDTH} from '../../theme';
import HeaderBar from '../../components/HeaderBar';
import SettingIcon from '../../iconSvg/SettingIcon';
import LottieView from 'lottie-react-native';
import {IMAGES} from '../../constant';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootRouter} from '../../type';

const Home = () => {
  const navigation = useNavigation<NavigationProp<RootRouter>>();

  return (
    <View style={styles.Container}>
      <StatusBar
        backgroundColor="transparent"
        translucent
        barStyle="dark-content"
      />
      <HeaderBar
        title="Home"
        // moreAction={
        //   <TouchableOpacity style={styles.SettingContainer}>
        //     <SettingIcon
        //       height={HEIGHT(3.5)}
        //       width={HEIGHT(3.5)}
        //       fill={COLORS.primaryWhiteHex}
        //     />
        //   </TouchableOpacity>
        // }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  Container: {
    width: WIDTH(100),
    height: HEIGHT(100),
    backgroundColor: COLORS.primaryBgVaniHex,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  SettingContainer: {
    backgroundColor: COLORS.primaryBgGreyHex,
    width: HEIGHT(5),
    height: HEIGHT(5),
    borderRadius: HEIGHT(5),
    alignItems: 'center',
    justifyContent: 'center',
  },
  ActionRowContainer: {
    width: WIDTH(100),
    height: HEIGHT(15),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: WIDTH(5),
    marginBottom: HEIGHT(2),
    // backgroundColor: 'red',
  },
  ActionContainer: {
    width: WIDTH(43),
    height: HEIGHT(15),
    flexDirection: 'column',
    alignItems: 'center',
    gap: HEIGHT(1),
    borderRadius: HEIGHT(2),
    backgroundColor: COLORS.primaryBgGreyHex,
    justifyContent: 'center',
  },
});

export default Home;
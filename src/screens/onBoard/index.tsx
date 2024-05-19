import * as React from 'react';
import {Image, StatusBar, StyleSheet, Text, View} from 'react-native';

import {RootRouter} from '../../type';
import {useNavigation, NavigationProp} from '@react-navigation/native';
import {WIDTH, HEIGHT, COLORS, FONTSIZE, FONTFAMILY} from '../../theme';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {dictionary2Trans} from '../../utils/LanguageUtils';

const OnBoardScreen = () => {
  const navigation = useNavigation<NavigationProp<RootRouter>>();

  const handlePressLogin = () => {
    navigation.navigate('Login');
  };

  const handlePressRegister = () => {
    navigation.navigate('Register');
  };

  return (
    <View style={styles.ScreenContainer}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
      />
      <Image
        source={require('../../../assets/images/bg.png')}
        style={styles.ImageShowing}
      />
      <TouchableOpacity onPress={handlePressLogin} style={styles.LoginButton}>
        <Text style={[styles.ButtonText, {color: COLORS.primaryBlackHex}]}>
          {dictionary2Trans('Đăng nhập')}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.RegisterButton}
        onPress={handlePressRegister}>
        <Text style={[styles.ButtonText, {color: COLORS.primaryWhiteHex}]}>
          {dictionary2Trans('Đăng ký')}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default OnBoardScreen;

const styles = StyleSheet.create({
  ScreenContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-end',
    width: WIDTH(100),
    height: HEIGHT(100),
    paddingBottom: HEIGHT(3),
    gap: HEIGHT(2),
  },
  ImageShowing: {
    width: WIDTH(100),
    height: HEIGHT(100),
    position: 'absolute',
    bottom: 0,
  },
  LoginButton: {
    width: WIDTH(90),
    height: HEIGHT(7),
    backgroundColor: COLORS.primaryWhiteHex,
    borderRadius: HEIGHT(1.5),
    alignItems: 'center',
    justifyContent: 'center',
  },
  RegisterButton: {
    width: WIDTH(90),
    height: HEIGHT(7),
    backgroundColor: COLORS.primaryDarkBrownHex,
    borderRadius: HEIGHT(1.5),
    alignItems: 'center',
    justifyContent: 'center',
  },
  ButtonText: {
    fontSize: FONTSIZE(2.5),
    fontFamily: FONTFAMILY.Bold,
  },
});

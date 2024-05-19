import {
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import HeaderBar from '../../components/HeaderBar';
import SettingIcon from '../../iconSvg/SettingIcon';
import {HEIGHT, COLORS, WIDTH, FONTSIZE, FONTFAMILY} from '../../theme';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootRouter} from '../../type';
import {userInfoFake} from '../../Data';
import {dictionary2Trans} from '../../utils/LanguageUtils';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const User = () => {
  const navigation = useNavigation<NavigationProp<RootRouter>>();

  const handleChangeName = () => {};
  const handleChangePhoneNumber = () => {};
  const handleChangeEmail = () => {};
  const handleChangePassword = () => {
    navigation.navigate('ChangePassword');
  };

  const handleLogout = () => {
    navigation.navigate('OnBoard');
  };

  const rederInfo = (
    infoText: string,
    handleChangeInfo: () => void,
    icon: React.ReactNode,
  ) => {
    return (
      <View style={styles.InfoItemContainer}>
        <View style={styles.InfoIcon}>{icon}</View>
        <Text style={styles.InfoText}>{infoText}</Text>
        <TouchableOpacity style={styles.Change} onPress={handleChangeInfo}>
          <FontAwesome6
            name="pencil"
            size={HEIGHT(2.5)}
            color={COLORS.primaryBlackHex}
          />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.Container}>
      <StatusBar
        backgroundColor="transparent"
        translucent
        barStyle="dark-content"
      />

      <View style={styles.AvatarContainer}>
        <HeaderBar title="" />
        <Image
          source={{uri: userInfoFake.avatar}}
          style={{
            width: 100,
            height: 100,
            borderRadius: 60,
            flexDirection: 'row',
            justifyContent: 'flex-end',
          }}
        />
        <Text style={styles.UserName}>{userInfoFake.name}</Text>
        <Text style={styles.UserLiked}>
          {userInfoFake.numOfLiked} {dictionary2Trans('Thích')}
        </Text>
      </View>
      <View style={styles.InfoContainer}>
        {rederInfo(
          userInfoFake.name,
          handleChangeName,
          <AntDesign
            name="user"
            size={HEIGHT(2.5)}
            color={COLORS.primaryBlackHex}
          />,
        )}
        {rederInfo(
          userInfoFake.phoneNumber,
          handleChangeName,
          <FontAwesome6
            name="phone"
            size={HEIGHT(2.5)}
            color={COLORS.primaryBlackHex}
          />,
        )}
        {rederInfo(
          userInfoFake.email,
          handleChangeName,
          <MaterialCommunityIcons
            name="email"
            size={HEIGHT(2.5)}
            color={COLORS.primaryBlackHex}
          />,
        )}
        <TouchableOpacity
          style={[
            styles.InfoItemContainer,
            {
              borderTopWidth: 1,
              borderBottomWidth: 1,
              borderColor: COLORS.primaryGreyTextHex,
            },
          ]}
          onPress={handleChangePassword}>
          <View style={styles.InfoIcon}>
            <MaterialCommunityIcons
              name="email"
              size={HEIGHT(2.5)}
              color={COLORS.primaryBlackHex}
            />
          </View>
          <Text style={styles.InfoText}>
            {dictionary2Trans('Đổi mật khẩu')}
          </Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.LogoutButton} onPress={handleLogout}>
        <Text style={styles.LogoutText}>{dictionary2Trans('Đăng xuất')}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  Container: {
    width: WIDTH(100),
    height: HEIGHT(100),
    backgroundColor: COLORS.primaryWhiteHex,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: HEIGHT(1),
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
  AvatarContainer: {
    width: '100%',
    height: 'auto',
    flexDirection: 'column',
    alignItems: 'center',
  },
  UserName: {
    fontSize: FONTSIZE(3),
    color: COLORS.primaryBlackHex,
    textAlign: 'center',
    fontFamily: FONTFAMILY.Bold,
  },
  UserLiked: {
    fontSize: FONTSIZE(2),
    color: COLORS.primaryLightGreyHex,
    textAlign: 'center',
    fontFamily: FONTFAMILY.Bold,
  },
  InfoContainer: {
    width: WIDTH(85),
    height: 'auto',
    flexDirection: 'column',
    alignItems: 'center',
  },
  InfoItemContainer: {
    width: '100%',
    height: HEIGHT(7),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  InfoIcon: {
    width: HEIGHT(4.5),
    height: HEIGHT(4.5),
    borderRadius: HEIGHT(4),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.primaryGreyTextHex,
  },
  InfoText: {
    fontSize: FONTSIZE(2),
    color: COLORS.primaryBlackHex,
    textAlign: 'left',
    fontFamily: FONTFAMILY.Medium,
    flex: 1,
    marginLeft: WIDTH(3),
  },
  Change: {
    width: HEIGHT(3),
    height: HEIGHT(4),
    alignItems: 'center',
    justifyContent: 'center',
  },
  LogoutButton: {
    width: WIDTH(40),
    height: HEIGHT(6),
    borderRadius: HEIGHT(2),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.primaryBlackHex,
    marginTop: HEIGHT(5),
  },
  LogoutText: {
    fontSize: FONTSIZE(2.7),
    color: COLORS.primaryWhiteHex,
    textAlign: 'center',
    textAlignVertical: 'center',
    fontFamily: FONTFAMILY.Bold,
  },
});

export default User;

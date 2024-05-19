import {
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {useNavigation, NavigationProp} from '@react-navigation/native';
import HeaderBar from '../../components/HeaderBar';
import {WIDTH, HEIGHT, COLORS, FONTFAMILY, FONTSIZE} from '../../theme';
import {RootRouter} from '../../type';
import {
  useDictionaryToString,
  dictionary2Trans,
} from '../../utils/LanguageUtils';
import ModalSuccess from '../user/ModalSuccess';

const Register = () => {
  const navigation = useNavigation<NavigationProp<RootRouter>>();
  const {dictionary2String} = useDictionaryToString();
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [gmail, setGmail] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [openModalSuccess, setOpenModalSuccess] = useState(false);

  const handleOnBack = () => {
    navigation.navigate('OnBoard');
  };

  const handleSubmit = () => {
    setOpenModalSuccess(true);
  };
  return (
    <View style={styles.Container}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
      />
      <HeaderBar onBack={handleOnBack} title="Đăng ký" />
      <View style={styles.InputContainter}>
        <View style={styles.InputContainter}>
          <Text style={styles.LabelText}>{dictionary2Trans('Họ và tên')}</Text>
          <TextInput
            placeholder={dictionary2String('Nhập tên của bạn')}
            value={fullName}
            onChange={event => setFullName(event.nativeEvent.text)}
            placeholderTextColor={COLORS.primaryLightGreyHex}
            style={styles.TextInputContainer}
          />
        </View>
        <View style={styles.InputContainter}>
          <Text style={styles.LabelText}>{dictionary2Trans('Gmail')}</Text>
          <TextInput
            placeholder={dictionary2String('Nhập gmail')}
            value={gmail}
            onChange={event => setGmail(event.nativeEvent.text)}
            placeholderTextColor={COLORS.primaryLightGreyHex}
            style={styles.TextInputContainer}
          />
        </View>
        <View style={styles.InputContainter}>
          <Text style={styles.LabelText}>
            {dictionary2Trans('Số điện thoại')}
          </Text>
          <TextInput
            placeholder={dictionary2String('Nhập số điện thoại')}
            value={phoneNumber}
            onChange={event => setPhoneNumber(event.nativeEvent.text)}
            placeholderTextColor={COLORS.primaryLightGreyHex}
            style={styles.TextInputContainer}
          />
        </View>
        <Text style={styles.LabelText}>
          {dictionary2Trans('Tên đăng nhập')}
        </Text>
        <TextInput
          placeholder={dictionary2String('Nhập tên đăng nhập')}
          value={userName}
          onChange={event => setUserName(event.nativeEvent.text)}
          placeholderTextColor={COLORS.primaryLightGreyHex}
          style={styles.TextInputContainer}
        />
      </View>
      <View style={styles.InputContainter}>
        <Text style={styles.LabelText}>{dictionary2Trans('Mật khẩu')}</Text>
        <TextInput
          placeholder={dictionary2String('Nhập mật khẩu')}
          value={password}
          onChange={event => setPassword(event.nativeEvent.text)}
          placeholderTextColor={COLORS.primaryLightGreyHex}
          style={styles.TextInputContainer}
          secureTextEntry
        />
      </View>
      <View style={styles.InputContainter}>
        <Text style={styles.LabelText}>
          {dictionary2Trans('Nhập lại mật khẩu')}
        </Text>
        <TextInput
          placeholder={dictionary2String('Nhập lại mật khẩu')}
          value={confirmPassword}
          onChange={event => setConfirmPassword(event.nativeEvent.text)}
          placeholderTextColor={COLORS.primaryLightGreyHex}
          style={styles.TextInputContainer}
          secureTextEntry
        />
      </View>
      <TouchableOpacity style={styles.SubmitButton} onPress={handleSubmit}>
        <Text style={styles.SubmitText}>{dictionary2Trans('Xác nhận')}</Text>
      </TouchableOpacity>
      <ModalSuccess
        text="Đăng ký thành công"
        onClose={() => {
          setOpenModalSuccess(false);
          navigation.goBack();
        }}
        open={openModalSuccess}
      />
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
    justifyContent: 'flex-start',
    gap: HEIGHT(1.5),
  },
  InputContainter: {
    width: WIDTH(90),
    height: 'auto',
  },
  LabelText: {
    fontSize: FONTSIZE(2.4),
    color: COLORS.primaryBlackHex,
    fontFamily: FONTFAMILY.Bold,
    marginBottom: HEIGHT(1),
  },
  TextInputContainer: {
    height: HEIGHT(6),
    width: '100%',
    fontSize: FONTSIZE(2.2),
    color: COLORS.primaryBlackHex,
    backgroundColor: COLORS.primaryWhiteGreyHex,
    borderRadius: HEIGHT(1),
    paddingHorizontal: WIDTH(5),
  },
  SubmitButton: {
    width: WIDTH(40),
    height: HEIGHT(6),
    borderRadius: HEIGHT(2),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.primaryDarkBrownHex,
    marginTop: HEIGHT(2),
  },
  SubmitText: {
    fontSize: FONTSIZE(2.7),
    color: COLORS.primaryWhiteHex,
    textAlign: 'center',
    textAlignVertical: 'center',
    fontFamily: FONTFAMILY.Bold,
  },
});

export default Register;

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

const Login = () => {
  const navigation = useNavigation<NavigationProp<RootRouter>>();
  const {dictionary2String} = useDictionaryToString();
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const handleOnBack = () => {
    navigation.navigate('OnBoard');
  };

  const handleSubmit = () => {
    navigation.navigate('Main', {screen: 'Home'});
  };
  return (
    <View style={styles.Container}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
      />
      <HeaderBar onBack={handleOnBack} title="Đăng nhập" />
      <View style={styles.InputContainter}>
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

      <TouchableOpacity style={styles.SubmitButton} onPress={handleSubmit}>
        <Text style={styles.SubmitText}>{dictionary2Trans('Đăng nhập')}</Text>
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
    borderRadius: HEIGHT(1.5),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.primaryDarkBrownHex,
    marginTop: HEIGHT(2),
  },
  SubmitText: {
    fontSize: FONTSIZE(2),
    color: COLORS.primaryWhiteHex,
    textAlign: 'center',
    textAlignVertical: 'center',
    fontFamily: FONTFAMILY.Bold,
  },
});

export default Login;

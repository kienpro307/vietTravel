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
import ModalSuccess from './ModalSuccess';

const ChangePassword = () => {
  const navigation = useNavigation<NavigationProp<RootRouter>>();
  const {dictionary2String} = useDictionaryToString();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [openModalSuccess, setOpenModalSuccess] = useState(false);

  const handleOnBack = () => {
    navigation.goBack();
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
      <HeaderBar onBack={handleOnBack} title="Đổi mật khẩu" />
      <View style={styles.InputContainter}>
        <Text style={styles.LabelText}>
          {dictionary2Trans('Mật khẩu hiện tại')}
        </Text>
        <TextInput
          placeholder={dictionary2String('Nhập mật khẩu hiện tại')}
          value={currentPassword}
          onChange={event => setCurrentPassword(event.nativeEvent.text)}
          placeholderTextColor={COLORS.primaryLightGreyHex}
          style={styles.TextInputContainer}
        />
      </View>
      <View style={styles.InputContainter}>
        <Text style={styles.LabelText}>{dictionary2Trans('Mật khẩu mới')}</Text>
        <TextInput
          placeholder={dictionary2String('Nhập mật khẩu mới')}
          value={newPassword}
          onChange={event => setNewPassword(event.nativeEvent.text)}
          placeholderTextColor={COLORS.primaryLightGreyHex}
          style={styles.TextInputContainer}
          secureTextEntry
        />
      </View>
      <View style={styles.InputContainter}>
        <Text style={styles.LabelText}>
          {dictionary2Trans('Nhập lại mật khẩu mới')}
        </Text>
        <TextInput
          placeholder={dictionary2String('Nhập lại mật khẩu mới')}
          value={confirmPassword}
          onChange={event => setConfirmPassword(event.nativeEvent.text)}
          placeholderTextColor={COLORS.primaryLightGreyHex}
          style={styles.TextInputContainer}
          secureTextEntry
        />
      </View>
      <TouchableOpacity style={styles.SubmitButton} onPress={handleSubmit}>
        <Text style={styles.SubmitText}>{dictionary2Trans('Lưu')}</Text>
      </TouchableOpacity>
      <ModalSuccess
        text="Đổi mật khẩu thành công"
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

export default ChangePassword;

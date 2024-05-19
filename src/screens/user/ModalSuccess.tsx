import {
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {StatusBar} from 'react-native';
import React, {useEffect, useState} from 'react';

import AntDesign from 'react-native-vector-icons/AntDesign';
import {
  dictionary2Trans,
  useDictionaryToString,
} from '../../utils/LanguageUtils';
import {WIDTH, COLORS, HEIGHT, FONTSIZE, FONTFAMILY} from '../../theme';

interface ModalChangePasswordSuccessProps {
  open: boolean;
  onClose: () => void;
  text: string;
}

const ModalSuccess: React.FC<ModalChangePasswordSuccessProps> = ({
  open,
  text,
  onClose,
}) => {
  const [playerName, setPlayerName] = useState('');
  const {dictionary2String} = useDictionaryToString();

  return (
    <Modal
      animationType="fade"
      transparent
      visible={open}
      onRequestClose={onClose}
      statusBarTranslucent>
      <View style={styles.Container} onTouchEnd={onClose}>
        <View
          onTouchEnd={e => e.stopPropagation()}
          style={[styles.ItemContainer]}>
          <View style={styles.TittleRow}>
            <TouchableOpacity style={styles.ButtonLeft}></TouchableOpacity>
            <View style={styles.TittleBar}>
              <Text style={styles.TittleText}>{dictionary2Trans('')}</Text>
            </View>

            <TouchableOpacity onPress={onClose} style={styles.ButtonRight}>
              <AntDesign
                name="close"
                size={WIDTH(6)}
                color={COLORS.primaryBlackHex}
              />
            </TouchableOpacity>
          </View>
          <Text style={styles.TittleText}>{dictionary2Trans(text)}</Text>
          <TouchableOpacity style={styles.Button} onPress={onClose}>
            <Text style={styles.ButtonText}>{dictionary2String('OK')}</Text>
          </TouchableOpacity>
          {/* <Winner width={WIDTH(35)} height={WIDTH(35)} /> */}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  Container: {
    top: StatusBar.currentHeight,
    height: HEIGHT(100),
    width: WIDTH(100),
    backgroundColor: '#00000090',
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    position: 'absolute',
    overflow: 'hidden',
  },
  ItemContainer: {
    backgroundColor: COLORS.primaryWhiteHex,
    borderRadius: HEIGHT(2),

    width: WIDTH(90),
    height: 'auto',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    position: 'absolute',
    bottom: HEIGHT(45),
    alignItems: 'center',
    paddingBottom: HEIGHT(3),
  },
  TittleRow: {
    display: 'flex',
    width: '100%',
    flexDirection: 'row',
    marginTop: HEIGHT(1),
  },
  ButtonLeft: {
    width: WIDTH(15),
    justifyContent: 'center',
    alignItems: 'center',
  },
  ButtonRight: {
    width: WIDTH(15),
    justifyContent: 'center',
    alignItems: 'center',
  },
  TittleBar: {
    width: WIDTH(60),
    alignItems: 'center',
  },
  TittleText: {
    color: COLORS.primaryBlackHex,
    textAlign: 'center',
    fontSize: FONTSIZE(2.5),
    fontFamily: FONTFAMILY.Bold,
    marginBottom: HEIGHT(2),
  },
  PlayerNameInput: {
    backgroundColor: COLORS.primaryYellowHex,
    width: WIDTH(70),
    borderRadius: HEIGHT(2),
    height: HEIGHT(7),
    elevation: WIDTH(4),
    color: COLORS.primaryBlackHex,
    paddingLeft: WIDTH(5),
    borderWidth: 2,
    borderColor: COLORS.primaryBlackHex,
  },
  RewardContainer: {
    width: WIDTH(70),
    borderRadius: HEIGHT(2),
    height: HEIGHT(7),
    justifyContent: 'center',
    backgroundColor: COLORS.primaryYellowHex,
  },
  RewardText: {
    fontSize: FONTSIZE(3),
    color: COLORS.primaryBlackHex,
    textAlign: 'center',
    fontFamily: FONTFAMILY.Bold,
  },
  Label: {
    fontSize: FONTSIZE(1.8),
    color: COLORS.primaryBlackHex,
    fontFamily: FONTFAMILY.Bold,
  },
  Button: {
    height: HEIGHT(8),
    borderRadius: HEIGHT(2),
    width: WIDTH(50),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.primaryBrownHex,
    elevation: WIDTH(4),
  },
  ButtonText: {
    textAlign: 'center',
    fontSize: FONTSIZE(2.5),
    fontFamily: FONTFAMILY.Bold,
    color: COLORS.primaryWhiteHex,
  },
});

export default ModalSuccess;

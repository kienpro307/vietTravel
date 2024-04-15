import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import BackIcon from '../iconSvg/BackIcon';
import {useNavigation} from '@react-navigation/native';
import {COLORS, FONTSIZE, HEIGHT, WIDTH} from '../theme';

interface HeaderSubScreenProps {
  onBack?: () => void;
  title: string;
  moreAction?: React.ReactNode;
  center?: boolean;
  avatar?: boolean;
}

const HeaderBar = (props: HeaderSubScreenProps) => {
  const navigation = useNavigation();

  const onPressBack = () => {
    if (props.onBack) {
      return props.onBack();
    }
  };
  return (
    <View
      style={{
        marginTop: StatusBar.currentHeight,
        overflow: 'visible',
        alignItems: 'center',
        width: WIDTH(100),
        height: HEIGHT(6),
        flexDirection: 'row',
        paddingHorizontal: props.onBack ? 0 : WIDTH(5),
      }}>
      {props.onBack && (
        <TouchableOpacity
          style={{
            borderRadius: 100,
            width: HEIGHT(6),
            height: HEIGHT(6),
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onPress={onPressBack}>
          <BackIcon
            height={HEIGHT(2.5)}
            width={HEIGHT(2.5)}
            fill={COLORS.primaryWhiteHex}
          />
        </TouchableOpacity>
      )}
      <View
        style={[
          props.center && {
            position: 'absolute',
            left: 0,
            top: 0,
            right: 0,
            bottom: 0,
            alignItems: 'center',
            justifyContent: 'center',
          },
          {
            flex: 1,
          },
        ]}>
        <Text
          numberOfLines={1}
          style={{
            color: COLORS.primaryBlackHex,
            fontSize: FONTSIZE(2.8),
            flexShrink: 1,
            flex: 1,
            textAlignVertical: 'center',
          }}>
          {props.title}
        </Text>
      </View>
      {props.moreAction && (
        <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
          {props.moreAction}
        </View>
      )}
      {props.avatar && (
        <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}></View>
      )}
    </View>
  );
};

export default HeaderBar;

const styles = StyleSheet.create({
  container: {},
});

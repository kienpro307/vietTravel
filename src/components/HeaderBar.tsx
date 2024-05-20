import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  Image,
} from 'react-native';
import BackIcon from '../iconSvg/BackIcon';
import {useNavigation} from '@react-navigation/native';
import {COLORS, FONTFAMILY, FONTSIZE, HEIGHT, WIDTH} from '../theme';
import {userInfoListFake} from '../Data';
import {UserStore} from '../store/UserStore';

interface HeaderSubScreenProps {
  onBack?: () => void;
  title: string;
  moreAction?: React.ReactNode;
  center?: boolean;
  avatar?: boolean;
  color?: boolean;
}

const HeaderBar = (props: HeaderSubScreenProps) => {
  const navigation = useNavigation();
  const user_index = UserStore((state: any) => state.user_index);
  const onPressBack = () => {
    if (props.onBack) {
      return props.onBack();
    }
  };
  return (
    <View
      style={{
        marginTop: props.color ? 0 : StatusBar.currentHeight,
        paddingTop: !props.color ? 0 : StatusBar.currentHeight,
        overflow: 'visible',
        alignItems: 'center',
        width: WIDTH(100),
        height: !props.color ? HEIGHT(6) : 'auto',
        flexDirection: 'row',
        paddingHorizontal: props.onBack ? 0 : WIDTH(5),
        backgroundColor: props.color ? COLORS.primaryBrownHex : '',
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
            fill={
              !props.color ? COLORS.primaryBlackHex : COLORS.primaryWhiteHex
            }
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
            color: !props.color
              ? COLORS.primaryBlackHex
              : COLORS.primaryWhiteHex,
            fontSize: FONTSIZE(2.8),
            flexShrink: 1,
            flex: 1,
            textAlignVertical: 'center',
            fontFamily: FONTFAMILY.Bold,
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
        <Image
          source={{uri: userInfoListFake[user_index].avatar}}
          style={{
            width: 45,
            height: 45,
            borderRadius: 25,
            flexDirection: 'row',
            justifyContent: 'flex-end',
          }}
        />
      )}
    </View>
  );
};

export default HeaderBar;

const styles = StyleSheet.create({
  container: {},
});

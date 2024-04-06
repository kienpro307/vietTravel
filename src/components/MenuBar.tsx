import * as React from 'react';
import {Text, View, StyleSheet, TouchableNativeFeedback} from 'react-native';

import {SvgProps} from 'react-native-svg';
import {
  NavigationProp,
  useNavigation,
  useRoute,
  RouteProp,
} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import {RootRouter} from '../type';
import {COLORS, FONTSIZE, HEIGHT, WIDTH} from '../theme';
import HomeIcon from '../iconSvg/HomeIcon';
import UserIcon from '../iconSvg/UserIcon';

interface MenuBarProps {}

const BarItem = ({
  icon: Icon,
  title,
  onPress,
  active,
  ads,
}: {
  icon: React.FC<SvgProps>;
  title: string;
  active: boolean;
  onPress: () => void;
  ads?: boolean;
}) => {
  return (
    <View
      style={{
        height: HEIGHT(15),
        width: HEIGHT(15),
        borderRadius: HEIGHT(15),
        overflow: 'hidden',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',

        gap: 5,
      }}>
      <TouchableNativeFeedback
        style={{
          flex: 1,
          overflow: 'hidden',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        onPress={onPress}>
        <View
          style={{
            flex: 1,
            height: '100%',
            width: '100%',
            overflow: 'hidden',
            borderTopLeftRadius: HEIGHT(4),
            borderTopRightRadius: HEIGHT(4),
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',

            gap: 5,
          }}>
          <Icon
            height={HEIGHT(2.8)}
            width={HEIGHT(2.8)}
            fill={
              active ? COLORS.primaryDarkBrownHex : COLORS.primaryGreyBrownHex
            }
          />
          <Text
            numberOfLines={1}
            style={{
              fontSize: FONTSIZE(2),
              color: active
                ? COLORS.primaryDarkBrownHex
                : COLORS.primaryGreyBrownHex,
            }}>
            {title}
          </Text>
          {ads && (
            <LinearGradient
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                paddingHorizontal: 5,
                borderRadius: 50,
                position: 'absolute',
                right: 6,
                top: 8,
                zIndex: 2,
              }}
              colors={['#fee401', '#e9a400']}>
              <Text
                style={{
                  fontFamily: 'Poppins-Italic',
                  fontSize: 7,
                  color: '#000',
                }}>
                Ad
              </Text>
            </LinearGradient>
          )}
        </View>
      </TouchableNativeFeedback>
    </View>
  );
};

const MenuBar = (props: MenuBarProps) => {
  const navigation = useNavigation<NavigationProp<RootRouter>>();
  const route = useRoute<RouteProp<Pick<RootRouter, 'Main'>>>();

  return (
    <View style={styles.Container}>
      <View style={styles.RowContainer}>
        <BarItem
          icon={HomeIcon}
          title="Home"
          onPress={() => {
            navigation.navigate('Main', {
              screen: 'Home',
            });
          }}
          active={route.params?.screen === 'Home' || !route.params}
        />
        <BarItem
          icon={UserIcon}
          title="Account"
          onPress={() => {
            navigation.navigate('Main', {
              screen: 'User',
            });
          }}
          active={route.params?.screen === 'User'}
        />
      </View>
    </View>
  );
};

export default MenuBar;

const styles = StyleSheet.create({
  Container: {
    height: HEIGHT(12),
    width: WIDTH(100),
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },
  RowContainer: {
    height: HEIGHT(12),
    width: WIDTH(100),
    flexShrink: 0,
    overflow: 'hidden',
    flexDirection: 'row',
    backgroundColor: COLORS.primaryWhiteHex,
    borderTopLeftRadius: HEIGHT(4),
    borderTopRightRadius: HEIGHT(4),
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: WIDTH(5),
  },
});

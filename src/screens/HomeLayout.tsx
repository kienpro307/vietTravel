import * as React from 'react';
import {View, StyleSheet, StatusBar} from 'react-native';
import {COLORS, HEIGHT, WIDTH} from '../theme';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {MainScreen} from '../type';
import MenuBar from '../components/MenuBar';
import Home from './home/Home';
import {HOME_PAGE} from '../utils/utils';
import User from './user/User';
import Map from './map/Map';

const Tab = createBottomTabNavigator<MainScreen>();

interface HomeLayoutProps {}

const HomeLayout = (props: HomeLayoutProps) => {
  return (
    <View style={styles.Container}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
      />
      <View style={{flex: 1}}>
        <View style={{flex: 1}}>
          <Tab.Navigator
            tabBar={() => null}
            screenOptions={{
              headerShown: false,
            }}
            initialRouteName={HOME_PAGE}>
            <Tab.Screen name="Home" component={Home} />
            <Tab.Screen name="Map" component={Map} />
            <Tab.Screen name="User" component={User} />
          </Tab.Navigator>
        </View>
        <View
          style={[
            {
              width: WIDTH(100),
              height: HEIGHT(12),
            },
          ]}>
          <MenuBar />
        </View>
      </View>
    </View>
  );
};

export default HomeLayout;

const styles = StyleSheet.create({
  Container: {
    height: HEIGHT(100),
    width: WIDTH(100),
    backgroundColor: COLORS.primaryBgVaniHex,
  },
});

import {StatusBar, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import HeaderBar from '../../components/HeaderBar';
import {WIDTH, HEIGHT, COLORS} from '../../theme';

const Map = () => {
  return (
    <View style={styles.Container}>
      <StatusBar
        backgroundColor="transparent"
        translucent
        barStyle="dark-content"
      />
      <HeaderBar
        title="Map"
        // moreAction={
        //   <TouchableOpacity style={styles.SettingContainer}>
        //     <SettingIcon
        //       height={HEIGHT(3.5)}
        //       width={HEIGHT(3.5)}
        //       fill={COLORS.primaryWhiteHex}
        //     />
        //   </TouchableOpacity>
        // }
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
  },
});

export default Map;

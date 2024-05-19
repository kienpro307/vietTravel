import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {Place} from '../../../type';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import {COLORS, FONTSIZE, HEIGHT, WIDTH} from '../../../theme';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';

interface PlaceReviewProps {
  // navigation: any;
  item: Place;
  handlePressPlace: () => void;
}

const PlaceReview: React.FC<PlaceReviewProps> = ({item, handlePressPlace}) => {
  return (
    <TouchableWithoutFeedback onPress={handlePressPlace}>
      <View style={styles.ItemContainer}>
        <ImageBackground
          source={{uri: item.images[0]}}
          style={styles.ImageBackground}>
          <View style={styles.PlaceInfoContainer}>
            <Text style={styles.PlaceNameText}>{item.name}</Text>
            <View style={styles.PlaceInfoBottom}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'flex-start',
                  flex: 1,
                  gap: WIDTH(2),
                }}>
                <Entypo
                  name="location"
                  size={HEIGHT(2.5)}
                  color={COLORS.primaryWhiteHex}
                />
                <Text
                  numberOfLines={1}
                  style={[styles.PlaceNameText, {fontSize: FONTSIZE(1.8)}]}>
                  {item.location}
                </Text>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'flex-end',
                  height: '100%',
                  width: 'auto',
                  gap: WIDTH(2),
                }}>
                <AntDesign
                  name="star"
                  size={HEIGHT(2)}
                  color={COLORS.primaryYellowHex}
                />
                <Text style={styles.PlaceNameText}>{item.rate}</Text>
              </View>
            </View>
          </View>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  ItemContainer: {
    width: WIDTH(60),
    height: HEIGHT(40),
    borderRadius: HEIGHT(3),
    backgroundColor: COLORS.primaryGreyHex,
    overflow: 'hidden',
    margin: WIDTH(1),
    elevation: WIDTH(1),
  },
  ImageBackground: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
  },
  PlaceInfoContainer: {
    width: WIDTH(55),
    height: HEIGHT(8),
    borderRadius: HEIGHT(2),
    backgroundColor: 'rgba(0, 0, 0, 0.55)',
    position: 'absolute',
    bottom: HEIGHT(1.5),
    paddingHorizontal: WIDTH(3),
    flexDirection: 'column',
    justifyContent: 'center',
  },
  PlaceInfoBottom: {
    width: '100%',
    height: HEIGHT(4),
    flexDirection: 'row',
    alignItems: 'center',
  },
  PlaceNameText: {
    fontSize: FONTSIZE(2.1),
    color: COLORS.primaryWhiteHex,
    fontWeight: 'bold',
  },
});

export default PlaceReview;

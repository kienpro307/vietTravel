import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {COLORS, FONTSIZE, HEIGHT, WIDTH} from '../../theme';
import HeaderBar from '../../components/HeaderBar';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootRouter} from '../../type';
import {FlatList} from 'react-native-gesture-handler';
import PlaceReview from './components/PlaceReview';
import {placesFake, userInfoFake} from '../../Data';

const Home = () => {
  const navigation = useNavigation<NavigationProp<RootRouter>>();
  const [searchText, setSearchText] = useState('');

  const handlePressPlace = (placeId: string) => {
    navigation.navigate('Place', {placeId: placeId});
  };

  return (
    <View style={styles.Container}>
      <StatusBar
        backgroundColor="transparent"
        translucent
        barStyle="dark-content"
      />
      <HeaderBar title="" avatar={true} />
      <View style={styles.WelcomText}>
        <Text
          style={{
            fontSize: FONTSIZE(3.5),
            fontWeight: 'bold',
            color: COLORS.primaryBlackHex,
          }}>
          Chào {userInfoFake.name},
        </Text>
        <Text
          style={{
            fontSize: FONTSIZE(3),
            fontWeight: 'bold',
            color: COLORS.primaryLightGreyHex,
          }}>
          Khám phá Hà Nội
        </Text>
      </View>
      <View style={styles.SearchBarContainer}>
        <TextInput
          placeholder="Tìm kiếm..."
          value={searchText}
          onChange={event => setSearchText(event.nativeEvent.text)}
          placeholderTextColor={COLORS.primaryLightGreyHex}
          style={styles.TextInputContainer}
        />
      </View>
      <View style={styles.FavoritePlaces}>
        <Text
          style={{
            textAlign: 'left',
            width: WIDTH(90),
            fontWeight: 'bold',
            fontSize: FONTSIZE(2.5),
            color: COLORS.primaryBlackHex,
          }}>
          Địa điểm phổ biến
        </Text>
        <FlatList
          data={placesFake}
          renderItem={({item}) => (
            <PlaceReview
              item={item}
              handlePressPlace={() => handlePressPlace(item.placeId)}
            />
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.ContentContainerStyle}
        />
      </View>
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
    paddingTop: 10,
    paddingHorizontal: WIDTH(5),
    gap: HEIGHT(3),
  },
  SettingContainer: {
    backgroundColor: COLORS.primaryBgGreyHex,
    width: HEIGHT(5),
    height: HEIGHT(5),
    borderRadius: HEIGHT(5),
    alignItems: 'center',
    justifyContent: 'center',
  },
  ActionRowContainer: {
    width: WIDTH(100),
    height: HEIGHT(15),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: WIDTH(5),
    marginBottom: HEIGHT(2),
    // backgroundColor: 'red',
  },
  ActionContainer: {
    width: WIDTH(43),
    height: HEIGHT(15),
    flexDirection: 'column',
    alignItems: 'center',
    gap: HEIGHT(1),
    borderRadius: HEIGHT(2),
    backgroundColor: COLORS.primaryBgGreyHex,
    justifyContent: 'center',
  },
  WelcomText: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    height: 'auto',
    alignSelf: 'flex-start',
  },
  TextInputContainer: {
    height: HEIGHT(7),
    fontSize: FONTSIZE(2.5),
    color: COLORS.primaryBlackHex,
    backgroundColor: COLORS.primaryWhiteGreyHex,
    borderRadius: HEIGHT(2),
    paddingHorizontal: WIDTH(5),
  },
  SearchBarContainer: {
    // height: HEIGHT(8),
    width: WIDTH(90),
  },
  FavoritePlaces: {
    flexDirection: 'column',
    gap: HEIGHT(1) - WIDTH(1),
  },
  ContentContainerStyle: {gap: WIDTH(2)},
});

export default Home;

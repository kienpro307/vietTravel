import {
  FlatList,
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  NavigationProp,
  RouteProp,
  useIsFocused,
  useNavigation,
} from '@react-navigation/native';
import {RootRouter} from '../../type';
import HeaderBar from '../../components/HeaderBar';
import {WIDTH, HEIGHT, COLORS, FONTSIZE, FONTFAMILY} from '../../theme';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {placesFake} from '../../Data';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';

interface PlaceProps {
  route: RouteProp<RootRouter, 'SearchPage'>;
}

const SearchPage = (props: PlaceProps) => {
  const navigation = useNavigation<NavigationProp<RootRouter>>();
  const [searchText, setSearchText] = useState(props.route.params.keyWord);
  const [searchResult, setSearchResult] = useState<typeof placesFake>([]);
  const isFocus = useIsFocused();

  useEffect(() => {
    if (isFocus) {
      setSearchText(props.route.params.keyWord);
      const filteredPlaces = placesFake.filter(place =>
        place.name
          .toLowerCase()
          .includes(props.route.params.keyWord.toLowerCase()),
      );
      setSearchResult(filteredPlaces);
      console.log('>>>', filteredPlaces);
    }
  }, [isFocus]);

  const handlePressSearch = () => {
    const filteredPlaces = placesFake.filter(place =>
      place.name.toLowerCase().includes(searchText.toLowerCase()),
    );
    setSearchResult(filteredPlaces);
    console.log('>>>', filteredPlaces);
  };

  const handleOnBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.Container}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
      />
      <HeaderBar onBack={handleOnBack} title="Tìm kiếm" color />
      <View style={styles.SearchBarContainer}>
        <TextInput
          placeholder="Tìm kiếm..."
          value={searchText}
          onChange={event => setSearchText(event.nativeEvent.text)}
          placeholderTextColor={COLORS.primaryLightGreyHex}
          style={styles.TextInputContainer}
        />
        <TouchableOpacity
          onPress={handlePressSearch}
          style={styles.SearchButton}>
          <Ionicons name="search" size={24} color={COLORS.primaryBrownHex} />
        </TouchableOpacity>
      </View>
      <FlatList
        data={searchResult}
        renderItem={({item}) => (
          <TouchableOpacity style={styles.PreviewContainer}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'flex-start',
                position: 'absolute',
                gap: WIDTH(2),
                top: 5,
                left: 5,
                zIndex: 2,
                backgroundColor: 'rgba(0, 0, 0, 0.55)',
                paddingHorizontal: 5,
                borderRadius: 10,
              }}>
              <AntDesign
                name="star"
                size={HEIGHT(2)}
                color={COLORS.primaryYellowHex}
              />
              <Text style={[styles.PlaceNameText, {color: 'white'}]}>
                {item.rate}
              </Text>
            </View>
            <Image
              source={{uri: item.images[0]}}
              style={{
                height: HEIGHT(15),
                width: WIDTH(40),
              }}
            />
            <View style={styles.PlaceInfoContainer}>
              <Text numberOfLines={1} style={styles.PlaceNameText}>
                {item.name}
              </Text>

              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'flex-start',
                  gap: WIDTH(2),
                  width: WIDTH(45),
                }}>
                <Entypo
                  name="location"
                  size={HEIGHT(2.2)}
                  color={COLORS.primaryBlackHex}
                />
                <Text
                  numberOfLines={1}
                  style={[styles.PlaceNameText, {fontSize: FONTSIZE(1.6)}]}>
                  {item.location}
                </Text>
              </View>
              <Text
                numberOfLines={3}
                style={{
                  fontSize: FONTSIZE(1.8),
                  fontFamily: FONTFAMILY.Regular,
                  color: 'black',
                  marginTop: 8,
                }}>
                {item.summary}
              </Text>
            </View>
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.ContentContainerStyle}
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
    gap: HEIGHT(2),
  },
  SearchBarContainer: {
    // height: HEIGHT(8),
    width: WIDTH(90),
    flexDirection: 'row',
    gap: WIDTH(3),
  },
  SearchButton: {
    borderRadius: 8,
    marginLeft: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  TextInputContainer: {
    height: HEIGHT(7),
    fontSize: FONTSIZE(2.5),
    color: COLORS.primaryBlackHex,
    backgroundColor: COLORS.primaryWhiteGreyHex,
    borderRadius: HEIGHT(2),
    paddingHorizontal: WIDTH(5),
    flex: 1,
  },
  PreviewContainer: {
    width: WIDTH(90),
    height: HEIGHT(15),
    backgroundColor: COLORS.primaryBgVaniHex,
    borderRadius: HEIGHT(1),
    overflow: 'hidden',
    flexDirection: 'row',
  },
  ContentContainerStyle: {gap: HEIGHT(1)},
  PlaceInfoBottom: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  PlaceNameText: {
    fontSize: FONTSIZE(2.2),
    color: COLORS.primaryBlackHex,
    fontWeight: 'bold',
  },
  PlaceInfoContainer: {
    width: WIDTH(45),
    height: HEIGHT(15),
    borderRadius: HEIGHT(2),
    paddingHorizontal: WIDTH(3),
    flexDirection: 'column',
    justifyContent: 'flex-start',
    paddingVertical: HEIGHT(1),
  },
});

export default SearchPage;

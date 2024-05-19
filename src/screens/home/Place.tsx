import {
  FlatList,
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {
  NavigationProp,
  RouteProp,
  useNavigation,
} from '@react-navigation/native';
import {RootRouter} from '../../type';
import {placesFake, userInfoFake} from '../../Data';
import HeaderBar from '../../components/HeaderBar';
import {WIDTH, HEIGHT, COLORS, FONTSIZE, FONTFAMILY} from '../../theme';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {
  dictionary2Trans,
  useDictionaryToString,
} from '../../utils/LanguageUtils';
import StarRateIcon from '../../iconSvg/RateIcon';

interface PlaceProps {
  route: RouteProp<RootRouter, 'Place'>;
}

const Star = ({active, onPress}: {active: boolean; onPress: () => void}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        height: WIDTH(13),
        width: WIDTH(13),
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: active ? '#F2D59F' : COLORS.primaryWhiteGreyHex,
        borderRadius: 100,
      }}>
      {active ? (
        <StarRateIcon
          height={WIDTH(9)}
          width={WIDTH(9)}
          fill={COLORS.primaryBrownHex}
        />
      ) : (
        <StarRateIcon
          height={WIDTH(9)}
          width={WIDTH(9)}
          fill={COLORS.primaryLightGreyHex}
        />
      )}
    </TouchableOpacity>
  );
};

const Place = (props: PlaceProps) => {
  const navigation = useNavigation<NavigationProp<RootRouter>>();
  const {dictionary2String} = useDictionaryToString();
  const [rate, setRate] = useState<number>(0);
  const [comment, setComment] = useState('');

  const place = placesFake[0];

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

      <HeaderBar onBack={handleOnBack} title="Place" color />

      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        style={{
          width: WIDTH(100),
          height: 'auto',
        }}
        contentContainerStyle={styles.SrollViewContainer}>
        <View style={styles.ImagesContainer}>
          <FlatList
            snapToInterval={WIDTH(100)}
            data={place.images}
            renderItem={({item}) => (
              <Image source={{uri: item}} style={styles.ImageShowing} />
            )}
            showsHorizontalScrollIndicator={false}
            horizontal
            decelerationRate="fast"
          />
        </View>
        <View style={styles.PlaceInfoContainer}>
          <Text style={styles.PlaceNameText}>{place.name}</Text>
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
                color={COLORS.primaryBlackHex}
              />
              <Text
                numberOfLines={2}
                style={[styles.PlaceInfoText, {width: '90%'}]}>
                {place.location}
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
                size={HEIGHT(2.5)}
                color={COLORS.primaryBrownHex}
              />
              <Text style={styles.PlaceInfoText}>{place.rate}</Text>
            </View>
          </View>

          <Text style={styles.LabelText}>{dictionary2Trans('Mô tả')}</Text>
          <Text
            style={{
              fontSize: FONTSIZE(2.2),
              color: COLORS.primaryBlackHex,
              fontFamily: FONTFAMILY.Medium,
            }}>
            {dictionary2Trans(place.description)}
          </Text>
        </View>
        <View style={styles.ForumContainer}>
          <View style={styles.RateContainer}>
            <Text
              style={[styles.LabelText, {width: WIDTH(80), marginVertical: 0}]}>
              {dictionary2Trans('Đánh giá')}
            </Text>
            <View
              style={{
                flexDirection: 'row',
                overflow: 'hidden',
                gap: WIDTH(3),
                justifyContent: 'center',
                flex: 1,
                alignItems: 'center',
              }}>
              <Star onPress={() => setRate(1)} active={rate >= 1} />
              <Star onPress={() => setRate(2)} active={rate >= 2} />
              <Star onPress={() => setRate(3)} active={rate >= 3} />
              <Star onPress={() => setRate(4)} active={rate >= 4} />
              <Star onPress={() => setRate(5)} active={rate >= 5} />
            </View>
            <TextInput
              placeholder={dictionary2String('Đánh giá di tích...')}
              value={comment}
              onChange={event => setComment(event.nativeEvent.text)}
              placeholderTextColor={COLORS.primaryLightGreyHex}
              style={styles.TextInputContainer}
            />
            <TouchableOpacity style={styles.SubmitRateButton}>
              <Text
                style={[
                  styles.LabelText,
                  {color: COLORS.primaryWhiteHex, fontSize: FONTSIZE(2.5)},
                ]}>
                {dictionary2Trans('Lưu')}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.ListCommentContainer}>
            <Text style={styles.LabelText}>{dictionary2Trans('Comments')}</Text>
            <View style={styles.CommentContainer}>
              <View style={styles.UserCommentContainer}>
                <Image
                  source={{uri: userInfoFake.avatar}}
                  style={{
                    width: 50,
                    height: 50,
                    borderRadius: 50,
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: 5,
                  }}
                />
                <View style={styles.UserCommentInfo}>
                  <Text style={styles.UserCommentName}>Nguyen Duc Kien</Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      overflow: 'hidden',
                      gap: 5,
                      justifyContent: 'flex-start',
                      flex: 1,
                      alignItems: 'center',
                    }}>
                    <AntDesign
                      name="star"
                      size={HEIGHT(2)}
                      color={COLORS.primaryBrownHex}
                    />
                    <AntDesign
                      name="star"
                      size={HEIGHT(2)}
                      color={COLORS.primaryBrownHex}
                    />
                    <AntDesign
                      name="star"
                      size={HEIGHT(2)}
                      color={COLORS.primaryBrownHex}
                    />
                    <AntDesign
                      name="star"
                      size={HEIGHT(2)}
                      color={COLORS.primaryBrownHex}
                    />
                    <AntDesign
                      name="star"
                      size={HEIGHT(2)}
                      color={COLORS.primaryBrownHex}
                    />
                  </View>
                </View>
              </View>
              <Text style={styles.CommentText}>
                Chùa rất đẹp và cổ kính, tôi sẽ quay lại đây lần nữa. Rất đáng
                để tham quan
              </Text>
            </View>
            <View style={styles.CommentContainer}>
              <View style={styles.UserCommentContainer}>
                <Image
                  source={{
                    uri: 'data:image/jpeg;base64,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',
                  }}
                  style={{
                    width: 50,
                    height: 50,
                    borderRadius: 50,
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: 5,
                  }}
                />
                <View style={styles.UserCommentInfo}>
                  <Text style={styles.UserCommentName}>Pham Thi Thanh Tra</Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      overflow: 'hidden',
                      gap: 5,
                      justifyContent: 'flex-start',
                      flex: 1,
                      alignItems: 'center',
                    }}>
                    <AntDesign
                      name="star"
                      size={HEIGHT(2)}
                      color={COLORS.primaryBrownHex}
                    />
                    <AntDesign
                      name="star"
                      size={HEIGHT(2)}
                      color={COLORS.primaryBrownHex}
                    />
                    <AntDesign
                      name="star"
                      size={HEIGHT(2)}
                      color={COLORS.primaryBrownHex}
                    />
                    <AntDesign
                      name="star"
                      size={HEIGHT(2)}
                      color={COLORS.primaryBrownHex}
                    />
                    <AntDesign
                      name="star"
                      size={HEIGHT(2)}
                      color={COLORS.primaryBrownHex}
                    />
                  </View>
                </View>
              </View>
              <Text style={styles.CommentText}>
                Địa điểm rất thú vị và thu hút, khung cảnh cổ kính. Nên đi vào
                mùa xuân
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
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
  },
  SrollViewContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    gap: HEIGHT(1),
  },
  ImageShowing: {
    width: WIDTH(100),
    height: HEIGHT(35),
  },
  ImagesContainer: {
    flexDirection: 'column',
    width: WIDTH(100),
    gap: HEIGHT(1.5),
  },
  PlaceInfoContainer: {
    width: WIDTH(90),
    height: 'auto',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  PlaceInfoBottom: {
    width: '100%',
    height: HEIGHT(5),
    flexDirection: 'row',
    alignItems: 'center',
  },
  PlaceNameText: {
    fontSize: FONTSIZE(2.5),
    color: COLORS.primaryBlackHex,
    fontFamily: FONTFAMILY.Black,
  },
  PlaceInfoText: {
    fontSize: FONTSIZE(2),
    color: COLORS.primaryBlackHex,
    fontFamily: FONTFAMILY.Medium,
  },
  LabelText: {
    fontSize: FONTSIZE(2.4),
    color: COLORS.primaryBlackHex,
    fontFamily: FONTFAMILY.Bold,
    marginVertical: HEIGHT(1),
  },
  ForumContainer: {
    width: WIDTH(90),
    height: 'auto',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  RateContainer: {
    width: WIDTH(90),
    height: 'auto',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.primaryBgVaniHex,
    borderRadius: HEIGHT(2),
    paddingHorizontal: WIDTH(5),
    gap: HEIGHT(1.5),
    paddingVertical: HEIGHT(1),
  },
  SubmitRateButton: {
    width: WIDTH(30),
    height: HEIGHT(6),
    backgroundColor: COLORS.primaryBrownHex,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: HEIGHT(2),
  },
  TextInputContainer: {
    height: HEIGHT(6),
    width: '100%',
    fontSize: FONTSIZE(2.2),
    color: COLORS.primaryBlackHex,
    backgroundColor: COLORS.primaryWhiteHex,
    borderRadius: HEIGHT(2),
    paddingHorizontal: WIDTH(5),
  },
  ListCommentContainer: {
    width: WIDTH(90),
    height: 'auto',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginVertical: HEIGHT(2),
    gap: HEIGHT(1),
  },
  CommentContainer: {
    width: '100%',
    height: 'auto',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.primaryWhiteGreyHex,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    // backgroundColor: 'red',
  },
  UserCommentContainer: {
    width: '100%',
    height: 'auto',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  UserCommentInfo: {
    height: 'auto',
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-start',
    // backgroundColor: 'green',
  },
  UserCommentName: {
    fontSize: FONTSIZE(2.2),
    color: COLORS.primaryBlackHex,
    fontFamily: FONTFAMILY.Bold,
    marginVertical: HEIGHT(1),
  },
  CommentText: {
    fontSize: FONTSIZE(2.1),
    color: COLORS.primaryBlackHex,
    fontFamily: FONTFAMILY.Medium,
    marginVertical: HEIGHT(1),
    marginLeft: 30,
  },
});

export default Place;

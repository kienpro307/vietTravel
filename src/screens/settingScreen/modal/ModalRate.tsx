import * as React from 'react';
import {Text, View, StyleSheet, Modal, TouchableOpacity} from 'react-native';
import {dictionary2Trans} from '../../../utils/LanguageUtils';
import StarRateIcon from '../../../iconSvg/RateIcon';
import DirectIcon from '../../../iconSvg/DirectIcon';
import Rate, {AndroidMarket} from 'react-native-rate';
import {COLORS, FONTFAMILY, FONTSIZE, HEIGHT, WIDTH} from '../../../theme';
import LottieView from 'lottie-react-native';
import {IMAGES} from '../../../constant';

interface ModalRateAppProps {
  open: boolean;
  onClose: () => void;
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
        backgroundColor: active ? '#c8f9ff' : COLORS.primaryGreyHex,
        borderRadius: 100,
      }}>
      {active ? (
        <StarRateIcon height={WIDTH(9)} width={WIDTH(9)} fill={'#3ce3f8'} />
      ) : (
        <StarRateIcon height={WIDTH(9)} width={WIDTH(9)} fill={'#fff'} />
      )}
    </TouchableOpacity>
  );
};

const ModalRateApp: React.FC<ModalRateAppProps> = ({open, onClose}) => {
  const [rate, setRate] = React.useState<number>(4);
  const [showResponse, setShowResponse] = React.useState<boolean>(false);

  const onRate = () => {
    if (rate >= 4) {
      const items = {
        GooglePackageName: 'com.flabs.lucky.draw.events',
        preferredAndroidMarket: AndroidMarket.Google,
        preferInApp: true,
        openAppStoreIfInAppFails: true,
      };
      Rate.rate(items, (success, errorMessage) => {
        setShowResponse(true);
        if (success) {
        }
        if (errorMessage) {
        }
      });
    } else {
      setTimeout(() => {
        setShowResponse(true);
      }, 500);
    }
  };

  // React.useEffect(() => {
  //   if (props.open) {
  //     AsyncStorage.setItem(STORAGE.LAST_SHOW_RATE, Date.now().toString());
  //   }
  // }, [props.open]);

  const handleClose = () => {
    setShowResponse(false);
    setRate(4);
    onClose();
  };

  React.useEffect(() => {
    if (open) {
      setShowResponse(false);
    }
  }, [open]);

  return (
    <Modal
      animationType="fade"
      transparent
      visible={open}
      onRequestClose={() => handleClose()}
      statusBarTranslucent>
      <View style={styles.container} onTouchEnd={() => handleClose()}>
        <View
          onTouchEnd={e => e.stopPropagation()}
          style={styles.RateAppContainer}>
          {showResponse ? (
            <>
              <View style={{alignItems: 'center'}}>
                <LottieView
                  source={IMAGES.rateApp}
                  style={styles.Lottie}
                  autoPlay
                />
              </View>
              <Text style={styles.ContentText}>
                {dictionary2Trans(
                  'Thank you and your feedback! To us, every feedback is valuable. We will constantly strive to improve service quality to increase your satisfaction.',
                )}
              </Text>
              <View style={{alignItems: 'center'}}>
                <TouchableOpacity
                  onPress={() => handleClose()}
                  style={{
                    backgroundColor: COLORS.primaryPinkBGHex,
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: HEIGHT(7),
                    width: WIDTH(80),
                    borderRadius: HEIGHT(3),
                    marginBottom: HEIGHT(3),
                  }}>
                  <Text style={{fontFamily: 'Poppins-Regular', color: '#fff'}}>
                    {dictionary2Trans('Ok')}
                  </Text>
                </TouchableOpacity>
              </View>
            </>
          ) : (
            <>
              <View style={{alignItems: 'center'}}>
                <LottieView
                  source={IMAGES.hardWork}
                  style={styles.Lottie}
                  autoPlay
                />
              </View>
              <Text style={styles.ContentText}>
                {dictionary2Trans(
                  "We are working hard for a better user experience. We'd greatly appreciate if you can rate us.",
                )}
              </Text>
              <View style={{alignItems: 'center', marginTop: HEIGHT(1)}}>
                <View
                  style={{
                    flexDirection: 'row',
                    overflow: 'hidden',
                    gap: WIDTH(3),
                    justifyContent: 'center',
                    width: WIDTH(80),
                    alignItems: 'center',
                  }}>
                  <Star onPress={() => setRate(1)} active={rate >= 1} />
                  <Star onPress={() => setRate(2)} active={rate >= 2} />
                  <Star onPress={() => setRate(3)} active={rate >= 3} />
                  <Star onPress={() => setRate(4)} active={rate >= 4} />
                  <Star onPress={() => setRate(5)} active={rate >= 5} />
                </View>
                <View
                  style={{
                    width: '100%',
                    flexDirection: 'row',
                    alignItems: 'flex-end',
                    justifyContent: 'flex-end',
                    gap: 10,
                    paddingRight: WIDTH(12),
                  }}>
                  <Text
                    style={{
                      fontFamily: FONTFAMILY.Bold,
                      fontSize: FONTSIZE(1.7),
                      transform: [{translateY: 8}],
                      color: COLORS.primaryBlackHex,
                    }}>
                    {dictionary2Trans('The best we can get')}
                  </Text>
                  <DirectIcon
                    fill={COLORS.primaryBlackHex}
                    height={WIDTH(10)}
                    width={WIDTH(10)}
                  />
                </View>
              </View>
              <View style={{alignItems: 'center'}}>
                <TouchableOpacity
                  onPress={onRate}
                  style={{
                    backgroundColor: COLORS.primaryBlueBGHex,
                    alignItems: 'center',
                    justifyContent: 'center',

                    height: HEIGHT(7),
                    width: WIDTH(80),
                    borderRadius: HEIGHT(3),
                    marginBottom: HEIGHT(3),
                  }}>
                  <Text
                    style={{
                      fontFamily: FONTFAMILY.Bold,
                      color: COLORS.primaryWhiteHex,
                    }}>
                    {dictionary2Trans('Rate')}
                  </Text>
                </TouchableOpacity>
              </View>
            </>
          )}
        </View>
      </View>
    </Modal>
  );
};

export default ModalRateApp;

const styles = StyleSheet.create({
  container: {
    height: HEIGHT(100),
    width: WIDTH(100),
    backgroundColor: '#00000090',
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    position: 'absolute',
    overflow: 'hidden',
    bottom: 0,
  },
  RateAppContainer: {
    backgroundColor: COLORS.primaryWhiteHex,
    borderRadius: HEIGHT(5),
    width: WIDTH(90),
    // height: HEIGHT(70),
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    // position: 'absolute',
    alignItems: 'center',
    gap: HEIGHT(3),
    // bottom: HEIGHT(20),
  },
  ContentText: {
    fontFamily: FONTFAMILY.Bold,
    width: WIDTH(85),
    color: COLORS.primaryBlackHex,
    fontSize: FONTSIZE(2),
    textAlign: 'center',
  },
  Lottie: {width: WIDTH(90), height: HEIGHT(25)},
});

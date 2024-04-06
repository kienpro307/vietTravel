/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from 'react';
import {Image, Modal, Text, TouchableOpacity, View} from 'react-native';
import {REMOTE_KEY, useRemote} from '../remoteConfig/RemoteConfig';
import DeviceInfo from 'react-native-device-info';
import Illustration from './Illustration';
import {Linking} from 'react-native';
import {useTranslation} from 'react-i18next';
import {COLORS, FONTFAMILY, FONTSIZE, HEIGHT, WIDTH} from '../theme';
import {IMAGES} from '../constant';
import {dictionary2Trans} from '../utils/LanguageUtils';

interface ContextProviderProps {
  children: React.ReactNode;
}

enum StrategyUpdateType {
  LOW = 0,
  MEDIUM = 1,
  HEIGHT = 2,
}
const UpdateContextProvider = (props: ContextProviderProps) => {
  const lastVersion = useRemote(REMOTE_KEY.last_version);
  const lastVersionForceUpdate = useRemote(
    REMOTE_KEY.last_version_force_update,
  );
  const lastVersionPriority = useRemote(REMOTE_KEY.last_version_priority);
  const [strategyUpdate, setStrategyUpdate] =
    React.useState<StrategyUpdateType>(StrategyUpdateType.LOW);
  const [showPopupRequiredUpdate, setShowPopupRequiredUpdate] =
    React.useState<boolean>(false);

  const checkIfNeedUpdate = () => {
    // setStrategyUpdate(StrategyUpdateType.MEDIUM);
    // setShowPopupRequiredUpdate(true);
    DeviceInfo.getVersion;
    const versionCode = Number.parseInt(DeviceInfo.getBuildNumber());

    if (versionCode < lastVersionForceUpdate().asNumber()) {
      setStrategyUpdate(StrategyUpdateType.HEIGHT);
      console.log('im in force update high');
      update(StrategyUpdateType.HEIGHT);
      return;
    }
    if (versionCode < lastVersion().asNumber()) {
      setStrategyUpdate(lastVersionPriority().asNumber());
      console.log('im in force update medium or high');
      update(lastVersionPriority().asNumber());
      return;
    }
  };

  const onCancel = () => {
    setShowPopupRequiredUpdate(false);
  };

  const update = (priority: number) => {
    console.log('im in update function');
    switch (priority) {
      case StrategyUpdateType.HEIGHT:
      case StrategyUpdateType.MEDIUM: {
        setShowPopupRequiredUpdate(true);
        break;
      }
      default: {
        setShowPopupRequiredUpdate(false);
        break;
      }
    }
  };

  React.useEffect(() => {
    checkIfNeedUpdate();
  }, []);

  // React.useEffect(() => {
  //   update();
  // }, [strategyUpdate]);

  const onUpdate = () => {
    Linking.openURL(
      // '',
      'https://play.google.com/store/apps/details?id=com.flabs.lucky.draw.events',
    );
  };
  return (
    <>
      <Modal statusBarTranslucent transparent visible={showPopupRequiredUpdate}>
        <View
          style={{
            backgroundColor: '#00000090',
            width: '100%',
            height: '100%',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <View
            style={{
              width: WIDTH(90),
              backgroundColor: '#fff',
              borderRadius: HEIGHT(3),
              padding: HEIGHT(3),
              gap: HEIGHT(3),
              alignItems: 'center',
            }}>
            <Image
              source={IMAGES.update}
              style={{
                width: WIDTH(80),
                height: WIDTH(50),
              }}
              resizeMode="contain"
            />
            <Text
              style={{
                fontFamily: FONTFAMILY.Bold,
                color: '#000',
                textAlign: 'center',
                fontSize: FONTSIZE(2.3),
              }}>
              {strategyUpdate === StrategyUpdateType.MEDIUM
                ? dictionary2Trans(
                    'The application has a new version. Do you want to update now?',
                  )
                : dictionary2Trans(
                    'You need to update to the latest version to use. Please update now!',
                  )}
            </Text>
            <View
              style={{
                justifyContent:
                  strategyUpdate === StrategyUpdateType.HEIGHT
                    ? 'center'
                    : 'space-between',
                flexDirection: 'row',
                width: '100%',
              }}>
              {strategyUpdate === StrategyUpdateType.MEDIUM && (
                <TouchableOpacity
                  onPress={onCancel}
                  style={{
                    backgroundColor: '#fff',
                    borderWidth: 1,
                    borderColor: '#949494',
                    borderRadius: HEIGHT(4),
                    height: HEIGHT(8),
                    width: WIDTH(35),
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Text
                    style={{
                      fontFamily: FONTFAMILY.Bold,
                      color: '#949494',
                      verticalAlign: 'top',
                    }}>
                    {dictionary2Trans('Next time')}
                  </Text>
                </TouchableOpacity>
              )}
              <TouchableOpacity
                onPress={onUpdate}
                style={{
                  backgroundColor: '#0678D6',

                  borderRadius: HEIGHT(4),
                  height: HEIGHT(8),
                  width: WIDTH(35),
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text
                  style={{
                    fontFamily: FONTFAMILY.Bold,
                    color: COLORS.primaryWhiteHex,
                    fontSize: FONTSIZE(2.2),
                    verticalAlign: 'top',
                  }}>
                  {dictionary2Trans('Update')}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      {props.children}
    </>
  );
};

export default UpdateContextProvider;

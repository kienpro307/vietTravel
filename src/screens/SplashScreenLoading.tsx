import * as React from 'react';
import {Text, View, StyleSheet, Modal} from 'react-native';
import CommonAppModule from '../CommonAppModule';
import {
  Bounce,
  Chase,
  Flow,
  Fold,
  Swing,
  Wander,
} from 'react-native-animated-spinkit';
import {COLORS} from '../theme';

interface SplashScreenProps {
  children: React.ReactNode;
}

const SplashContext = React.createContext<{
  show: () => void;
  hide: () => void;
  isHided: boolean;
}>({
  show: () => undefined,
  hide: () => undefined,
  isHided: false,
});

export const useSplash = () => {
  return React.useContext(SplashContext);
};

const SplashScreenLoading = (props: SplashScreenProps) => {
  const [show, setShow] = React.useState<boolean>(true);
  React.useEffect(() => {
    CommonAppModule.hideNavigation();
  }, []);

  return (
    <SplashContext.Provider
      value={{
        show: () => setShow(true),
        hide: () => setShow(false),
        isHided: !show,
      }}>
      <Modal transparent visible={show} statusBarTranslucent>
        <View style={styles.container}>
          <View style={{alignItems: 'center', paddingBottom: 100}}>
            <Flow size={90} color={COLORS.primaryGreyHex} />
          </View>
        </View>
      </Modal>
      {props.children}
    </SplashContext.Provider>
  );
};

export default SplashScreenLoading;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
});

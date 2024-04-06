import * as React from 'react';
import {Adjust, AdjustEvent, AdjustConfig} from 'react-native-adjust';
import {isDev} from '../utils/utils';

interface AdjustConfigProviderProps {
  children: React.ReactNode;
}

const AdjustConfigProvider = (props: AdjustConfigProviderProps) => {
  React.useEffect(() => {
    const adjustConfig = new AdjustConfig(
      'iu12ik34ha80',
      isDev()
        ? AdjustConfig.EnvironmentSandbox
        : AdjustConfig.EnvironmentProduction,
    );
    adjustConfig.setLogLevel(AdjustConfig.LogLevelVerbose);
    Adjust.create(adjustConfig);

    return () => {
      Adjust.componentWillUnmount();
    };
  }, []);
  return <>{props.children}</>;
};

export default AdjustConfigProvider;

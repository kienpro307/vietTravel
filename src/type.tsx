import {NavigatorScreenParams} from '@react-navigation/native';

export type MainScreen = {
  Home: undefined;
  User: undefined;
};

export type RootRouter = {
  Main: NavigatorScreenParams<MainScreen>;
  Language: {
    fromSetting?: boolean;
  };
};

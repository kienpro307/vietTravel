import {NavigatorScreenParams} from '@react-navigation/native';

export type MainScreen = {
  Home: undefined;
  Map: undefined;
  User: undefined;
};

export type RootRouter = {
  Main: NavigatorScreenParams<MainScreen>;
  Language: {
    fromSetting?: boolean;
  };
};

export type UserLogin = {
  userName: string;
  password: string;
};

export type UserRegister = {
  userName: string;
  phoneNumber: number;
  email: string;
  password: string;
  confirmPassword: string;
  role: string;
};

export type UserInfo = {
  avatar: string;
  name: string;
  phoneNumber: number;
  email: string;
  numOfPlacesVisited: string;
  numOfLiked: number;
};

export type Place = {
  name: string;
  images: string[];
  location: string;
  rate: number;
  summary: string;
  description: string;
};

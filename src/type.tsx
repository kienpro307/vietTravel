import {NavigatorScreenParams} from '@react-navigation/native';
import {Timestamp} from 'react-native-reanimated/lib/typescript/reanimated2/commonTypes';

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
  Place: {
    placeId: string;
  };
  ChangePassword: undefined;
  Register: undefined;
  Login: undefined;
  OnBoard: undefined;
};

//Thông tin người dùng khi đăng nhập
export type UserLogin = {
  userName: string;
  password: string;
};

//Thông tin người dùng phải nhâp khi đăng ký
export type UserRegister = {
  userName: string;
  phoneNumber: number;
  email: string;
  password: string;
  confirmPassword: string;
  role: string;
};

//Thông tin người dùng
export type UserInfo = {
  userId: string;
  avatar: string;
  name: string;
  phoneNumber: number;
  email: string;
  numOfPlacesVisited: string;
  numOfLiked: number;
};

//Thông tin di tích
export type Place = {
  location: string;
  placeId: string;
  name: string;
  images: string[];
  rate: number;
  summary: string;
  description: string;
};

export type Comment = {
  commentId: string;
  userId: string;
  placeId: string;
  time: Timestamp;
  data: string;
  peopleLiked: string[];
  numOfLiked: number;
};

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
  placeId: string;
  name: string;
  images: string[];
  location: string;
  rate: number;
  summary: string;
  description: string;
};

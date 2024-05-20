import {create} from 'zustand';
import {produce} from 'immer';
import {persist, createJSONStorage} from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {REMOTE_KEY} from '../remoteConfig/RemoteConfig';
import {UserInfo} from '../type';

export const UserStore = create(
  persist(
    (set, get) => ({
      isLogin: false,
      userInfo: {},
      userInfoList: [
        {
          userId: '123456',
          avatar:
            'https://static2-images.vnncdn.net/files/publish/2022/12/8/meo-1-1416.jpg',
          name: 'John Doe',
          phoneNumber: '1234567890',
          email: 'john.doe@example.com',
          numOfPlacesVisited: 5,
          numOfLiked: 10,
        },
      ],
      user_index: 0,

      setUser_index: (value: number) =>
        set(
          produce(state => {
            state.user_index = value;
          }),
        ),
      addUserInfoList: (user: UserInfo) =>
        set(
          produce(state => {
            state.userInfoList.push(user);
          }),
        ),
      setIsLogin: (value: boolean) =>
        set(
          produce(state => {
            state.isLogin = value;
          }),
        ),
      setUserInfo: (userInfo: UserInfo) =>
        set(
          produce(state => {
            state.userInfo = userInfo;
          }),
        ),
    }),
    {
      name: 'User-store',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);

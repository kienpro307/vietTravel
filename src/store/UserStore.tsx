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
      userInfo: {
        avatar: 'demo',
        name: 'demo',
        phoneNumber: 123,
        email: 'demo',
        numOfPlacesVisited: 'demo',
        numOfLiked: 1,
      },

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

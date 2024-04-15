import {create} from 'zustand';
import {produce} from 'immer';
import {persist, createJSONStorage} from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {REMOTE_KEY} from '../remoteConfig/RemoteConfig';

export const PlaceStore = create(
  persist(
    (set, get) => ({
      isLogin: false,

      setIsLogin: (value: boolean) =>
        set(
          produce(state => {
            state.isLogin = value;
          }),
        ),
    }),
    {
      name: 'Place-store',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);

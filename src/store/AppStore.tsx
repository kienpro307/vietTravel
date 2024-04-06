import {create} from 'zustand';
import {produce} from 'immer';
import {persist, createJSONStorage} from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {REMOTE_KEY} from '../remoteConfig/RemoteConfig';

export const useAppStore = create(
  persist(
    (set, get) => ({
      Language: 'en',
      numBack: 0,
      muteBackgroundMusic: false,
      muteSound: false,
      viewBanner: true,

      setLanguage: (language: string) =>
        set(
          produce(state => {
            state.Language = language;
          }),
        ),
      setViewBanner: (view: boolean) =>
        set(
          produce(state => {
            state.viewBanner = view;
          }),
        ),
      setMuteBackgroundMusic: () =>
        set(
          produce(state => {
            const temp = !state.muteBackgroundMusic;
            state.muteBackgroundMusic = temp;
          }),
        ),
      setMuteSound: () =>
        set(
          produce(state => {
            const temp = !state.muteSound;
            state.muteSound = temp;
          }),
        ),
      setNumBack: (num: number) =>
        set(
          produce(state => {
            state.numBack = num;
          }),
        ),
    }),
    {
      name: 'App-setting',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);

import {create} from 'zustand';
import {produce} from 'immer';
import {persist, createJSONStorage} from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {REMOTE_KEY} from '../remoteConfig/RemoteConfig';
import {Place} from '../type';

export const PlaceStore = create(
  persist(
    (set, get) => ({
      places: [],

      addPlaces: (places: Place) =>
        set(
          produce(state => {
            state.places.push(places);
          }),
        ),
    }),
    {
      name: 'Place-store',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);

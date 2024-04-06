import React from 'react';
import {Dimensions} from 'react-native';

const screen = Dimensions.get('screen');

export const ContextApp = React.createContext<{
  dimention: {
    width: number;
    height: number;
  };
  firstOpen: boolean;
}>({
  dimention: {
    width: screen.width,
    height: screen.height,
  },
  firstOpen: false,
});

export const useCommonApp = () => {
  return React.useContext(ContextApp);
};

import React from 'react';

const OpenAppContext = React.createContext<{
  onChangeShouldShowOpenAds: (value: boolean) => void;
}>({
  onChangeShouldShowOpenAds: (value: boolean) => undefined,
});

export const useOpenApp = () => {
  return React.useContext(OpenAppContext);
};

export default OpenAppContext;

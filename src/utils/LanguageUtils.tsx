import {useTranslation, Trans} from 'react-i18next';
import React from 'react';
import {useAppStore} from '../store/AppStore';

export const useLanguageChangeHook = () => {
  const {i18n} = useTranslation();
  const setLanguage = useAppStore((state: any) => state.setLanguage);

  // i18n.changeLanguage('en');
  const changeLanguage = (value: string, isSave?: boolean) => {
    i18n
      .changeLanguage(value)
      .then(() => {
        if (isSave) {
          setLanguage(value);
        }
      })
      .catch((err: any) => console.log(err));
  };

  return {changeLanguage};
};

export const useDictionaryToString = () => {
  const {t} = useTranslation();

  const dictionary2String = (key: string) => {
    return t(key);
  };
  return {dictionary2String};
};

export const dictionary2Trans = (key: string, defaultText?: string) => {
  return <Trans i18nKey={key}>{defaultText}</Trans>;
};

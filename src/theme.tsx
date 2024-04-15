import {
  responsiveScreenHeight,
  responsiveScreenWidth,
  responsiveScreenFontSize,
} from 'react-native-responsive-dimensions';

export const COLORS = {
  primaryBlackHex: '#000',
  primaryBgBlackHex: '#141527',

  primaryGreyHex: '#3b3c51',
  primaryBgGreyHex: '#26273a',
  primaryGreyBrownHex: '#b8b8b8',
  primaryLightGreyHex: '#90919c',
  primaryGreyTextHex: '#d3d3da',

  primaryWhiteHex: '#fff',

  primaryBlueHex: '#3681ff',
  primaryLightBlueHex: '#94eaf4',

  primaryBgVaniHex: '#f6f1ea',
  primaryBrownHex: '#8C662C',
  primaryDarkBrownHex: '#35260f',
};

export const FONTFAMILY = {
  Light: 'Nunito-Light',
  LightItalic: 'Nunito-LightItalic',
  Regular: 'Nunito-Regular',
  RegularItalic: 'Nunito-RegularItalic',
  Medium: 'Nunito-Medium',
  MediumItalic: 'Nunito-MediumItalic',
  SemiBold: 'Nunito-SemiBold',
  SemiBoldItalic: 'Nunito-SemiBoldItalic',
  Bold: 'Nunito-Bold',
  BoldItalic: 'Nunito-BoldItalic',
  ExtraBold: 'Nunito-ExtraBold',
  ExtraBoldItalic: 'Nunito-ExtraBoldItalic',
  Black: 'Nunito-Black',
  BlackItalic: 'Nunito-BlackItalic',
  Weight: 'Nunito-Weight',
  WeightItalic: 'Nunito-WeightItalic',
};

const heightUnit = responsiveScreenHeight(1);
const widthUnit = responsiveScreenWidth(1);
const fontSizeUnit = responsiveScreenFontSize(1);

export const HEIGHT = (value: number) => {
  return heightUnit * value;
};

export const WIDTH = (value: number) => {
  return widthUnit * value;
};

export const FONTSIZE = (value: number) => {
  return fontSizeUnit * value;
};

import {NativeStackNavigationOptions} from '@react-navigation/native-stack';
import {COLORS, HEIGHT} from './theme';

export const SCREEN_OPTION_DEFAULT: NativeStackNavigationOptions = {
  headerShown: false,
  statusBarTranslucent: true,
  statusBarColor: 'transparent',
  statusBarStyle: 'dark',
  animation: 'slide_from_bottom',
};

export const IMAGES = {
  scanQrBg: require('../assets/images/scanQrButtonBg.png'),

  hardWork: require('../assets/lottie/hardWork.json'),
  rateApp: require('../assets/lottie/rateApp.json'),
  qrLottie: require('../assets/lottie/QrLottie.json'),
};

export const AUDIO = {
  musicBackground: 0,
  congratulation: 1,
  spinning: 2,
};

export const LANGUAGE: {[key: string]: {name: string; nativeName: string}} = {
  vi: {
    name: 'Vietnamese',
    nativeName: 'Tiếng Việt',
  },
  en: {
    name: 'English',
    nativeName: 'English',
  },
};

export const LANGUAGE_TO_COUNTRY_CODE_MAP: {[key: string]: string} = {
  en: 'gb',
  vi: 'vn',
};

export const LANGUAGE_RESOURCE = {
  en: {
    translations: require('./languages/locales/en.json'),
  },
  vi: {
    translations: require('./languages/locales/vi.json'),
  },
};

export const STORAGE = {
  FIRST_OPEN: 'first_open',
};

export const ADJUST_EVENT = {
  INTER_SHOW: 'a4aty9',
  INTER_DISPLAYED: 'mjd3mj',
  BANNER_SHOW: '2y3zcz',
  BANNER_DISPLAYED: 'tguvjq',
  REWARD_SHOW: 'qmharz',
  REWARD_DISPLAYED: 'rdgr9q',
  OPEN_ADS_SHOW: 'dmo9oy',
  OPEN_ADS_DISPLAYED: 'pacuxt',
  NATIVE_ADS_SHOW: 'ojd12n',
  NATIVE_ADS_DISPLAYED: 'dajmwp',

  NATIVE_SHOW_TUTORIAL: '46icmw',
  NATIVE_DISPLAYED_TUTORIAL: 'enot8p',
  NATIVE_SHOW_DOCUMENT: 'hthb59',
  NATIVE_DISPLAYED_DOCUMENT: '8br0zz',
  NATIVE_SHOW_CAMERA: 'gkua7w',
  NATIVE_DISPLAYED_CAMERA: 'pg3gmp',
  NATIVE_SHOW_HOME: 'obaj6e',
  NATIVE_DISPLAYED_HOME: 'cy6ocz',

  REWARD_ADD_WHEEL: '',
};

export const FIREBASE = {
  INTER_SHOW: 'aj_inters_show',
  INTER_DISPLAYED: 'aj_inters_displayed',
  BANNER_SHOW: 'aj_banner_show',
  BANNER_DISPLAYED: 'aj_banner_displayed',
  REWARD_SHOW: 'aj_rewarded_show',
  REWARD_DISPLAYED: 'aj_rewarded_displayed',
  OPEN_ADS_SHOW: 'aj_open_ads_show',
  OPEN_ADS_DISPLAYED: 'aj_open_ads_displayed',
  NATIVE_ADS_SHOW: 'aj_native_show',
  NATIVE_ADS_DISPLAYED: 'aj_native_displayed',

  INTER_SHOW_CLOSE_POPUP_SUB: 'aj_inters_show_close_popup',
  INTER_DISPLAYED_CLOSE_POPUP_SUB: 'aj_inters_displayed_close_popup',
  REWARD_SHOW_TEXT_COLOR: 'aj_reward_show_text_color',
  REWARD_DISPLAYED_TEXT_COLOR: 'aj_inters_displayed_text_color',
  REWARD_SHOW_BACKGROUND_COLOR: 'aj_reward_show_background_color',
  REWARD_DISPLAYED_BACKGROUND_COLOR: 'aj_inters_displayed_background_color',
  REWARD_SHOW_FONT_STYLE: 'aj_reward_show_font_style',
  REWARD_DISPLAYED_FONT_STYLE: 'aj_inters_displayed_font_style',

  START_TRIAL: 'aj_start_trial',
  SUB_WEEKLY: 'aj_subscribe_weekly',
  SUB_MONTHLY: 'aj_subscribe_monthly',
  SUB_YEARLY: 'aj_subscribe_yearly',
  TUTORIAL_DONE: 'aj_tutorial_done',

  SCREEN_TRANSLATE: 'screen_translate',
  TEXT_TRANSLATE: 'text_translate',
  VOICE_TRANSLATE: 'voice_translate',
  DOCUMENT_TRANSLATE: 'document_translate',

  SHOW_TOOLBAR: 'show_toolbar',
  SHOW_INTER_AFTER_TRANSLATE_SCREEN: 'inters_displayed_after_translate_screen',
  SHOW_FEATURE_VOICE: 'show_feature_voice',
  SHOW_FEATURE_CAMERA: 'show_feature_camera',
  SHOW_FEATURE_DOCUMENT: 'show_feature_document',
  SHOW_FEATURE_TEXT: 'show_feature_text',
  SHOW_FEATURE_SCREEN: 'show_feature_screen',
  TRANSLATE_DOCUMENT_FAILED: 'translate_document_failed',

  SHOW_INTER_BACK: 'inters_displayed_back',
  SHOW_INTER_DOCUMENT_HISTORY: 'inters_displayed_document_history',
  SHOW_INTER_DOCUMENY_TYPE: 'inters_displayed_document_type',
  SHOW_INTER_OPEN_DOCUMENT: 'inters_displayed_open_document',
  SHOW_INTER_TRANSLATE_OTHER: 'inters_displayed_translate_other',
  SHOW_INTER_TRANSLATE_TEXT: 'inter_displayed_after_translate_text',
  SHOW_INTER_TRANSLATE_VOICE: 'inter_displayed_translate_voice',
  SHOW_INTER_DOCUMENT_DOWNLOAD: 'inter_displayed_document_download',
  SHOW_INTER_CLICK_PDF_TYPE: 'inter_interdisplayed_click_pdf_type',

  SHOW_REWARD_CAMERA_MODE: 'reward_displayed_camera_mode',
  SHOW_REWARD_DOCUMENT_TRANSLATE: 'reward_display_document_translate',
  TRANSLATE_DOCUMENT_SUCCESS: 'translate_document_success',
  SHOW_INTER_TRANSLATE_CAMERA: 'inters_displayed_translate_camera',
  SHOW_REWARD_START_TRANSLATE_SCREEN: 'reward_displayed_translate_screen',

  SHOW_REWARD_UNLOCK_VOICE: 'reward_displayed_unlock_voice',
  SHOW_REWARD_UNLOCK_CAMERA: 'reward_displayed_unlock_camera',

  RATE_APP: 'rate_app',

  PDF_TO_TEXT: 'pdf_to_text_start',
  PDF_TO_TEXT_SUCCESS: 'pdf_to_text_success',
  PDF_TO_TEXT_ERROR: 'pdt_to_text_error',
  PDF_TO_TEXT_TRANSLATE: 'pdf_to_text_translate',
  PDF_TO_TEXT_EXPORT: 'pdf_to_text_export',
  CLICK_DOCUMENT_TYPE: 'click_document_type',
  SHOW_SPECIAL_SALE: 'show_special_sale',
};

export const BUTTON_HEIGHT = HEIGHT(6);
export const BUTTON_RADIUS = 100;
export const COLOR_LINEAR = [COLORS.primaryGreyHex, COLORS.primaryGreyHex];

import analytics from '@react-native-firebase/analytics';
import {FIREBASE} from '../constant';
import { isDev } from '../utils/utils';

export const firebaseSendEvent = async (
  eventName: string,
  params?: {[key: string]: any},
) => {
  if (isDev()) return Promise.resolve('ok');
  await analytics().logEvent(eventName, params);
};

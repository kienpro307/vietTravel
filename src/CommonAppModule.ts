import {NativeModules} from 'react-native';

const {CommonApp: CommonAppModule} = NativeModules;
interface BubbleCommunicationType {
  feedback: () => void;
  getUri: (path: string) => Promise<string>;
  requestNotificationPermission: () => void;
  hideNavigation: () => void;
}
export default CommonAppModule as BubbleCommunicationType;

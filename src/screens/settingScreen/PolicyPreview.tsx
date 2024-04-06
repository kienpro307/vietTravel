import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import WebView from 'react-native-webview';
import {COLORS, FONTFAMILY, WIDTH} from '../../theme';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {dictionary2Trans} from '../../utils/LanguageUtils';

interface PolicyPreviewProps {
  navigation?: any;
}

const PolicyPreview: React.FC<PolicyPreviewProps> = ({
  navigation,
}: PolicyPreviewProps) => {
  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          height: 35,
          marginBottom: 15,
        }}>
        <TouchableOpacity
          accessibilityLabel="Back"
          style={{
            position: 'absolute',
            left: 20,
            top: 0,
            padding: 4,
            paddingRight: 12,
          }}
          onPress={() => navigation.goBack()}>
          <Ionicons
            name="chevron-back"
            size={WIDTH(6)}
            color={COLORS.primaryBlackHex}
          />
        </TouchableOpacity>
        <Text
          style={{
            color: '#000',
            fontFamily: FONTFAMILY.Medium,
            fontSize: 15,
          }}>
          {dictionary2Trans('Terms & Privacy')}
        </Text>
      </View>
      <WebView
        source={{uri: 'https://vnpublisher.com/privacypolicy.html'}}
        style={{flex: 1}}
      />
    </View>
  );
};

export default PolicyPreview;

const styles = StyleSheet.create({
  container: {
    paddingTop: StatusBar.currentHeight,
    height: '100%',
    width: '100%',
    backgroundColor: '#fff',
  },
});

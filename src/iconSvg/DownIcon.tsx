import * as React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';

function DownIcon(props: SvgProps) {
  return (
    <Svg width={512} height={512} viewBox="0 0 24 24" {...props}>
      <Path
        d="M12 16a1 1 0 01-.71-.29l-6-6a1 1 0 011.42-1.42l5.29 5.3 5.29-5.29a1 1 0 011.41 1.41l-6 6a1 1 0 01-.7.29z"
        data-name={16}
        data-original="#000000"
      />
    </Svg>
  );
}

export default DownIcon;

import * as React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';

function CopyIcon(props: SvgProps) {
  return (
    <Svg width={512} height={512} viewBox="0 0 24 24" {...props}>
      <Path
        d="M5.452 22h9.096c1.748 0 3.182-1.312 3.406-3h.594A3.456 3.456 0 0022 15.548V5.452A3.456 3.456 0 0018.548 2H9.452A3.456 3.456 0 006 5.452V6h-.548A3.456 3.456 0 002 9.452v9.096A3.456 3.456 0 005.452 22zM8 5.452C8 4.652 8.651 4 9.452 4h9.096c.8 0 1.452.651 1.452 1.452v10.096c0 .8-.651 1.452-1.452 1.452H18V9.452A3.456 3.456 0 0014.548 6H8zm-4 4C4 8.652 4.651 8 5.452 8h9.096c.8 0 1.452.651 1.452 1.452v9.096c0 .8-.651 1.452-1.452 1.452H5.452C4.652 20 4 19.349 4 18.548z"
        data-original="#000000"
      />
    </Svg>
  );
}

export default CopyIcon;

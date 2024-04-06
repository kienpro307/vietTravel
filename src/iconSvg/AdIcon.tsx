import * as React from 'react';
import Svg, {Circle, Path, SvgProps} from 'react-native-svg';

function AddIcon(props: SvgProps) {
  return (
    <Svg width={512} height={512} viewBox="0 0 28 28" {...props}>
      <Path
        fill="#fff"
        d="M6.26 3.67L10.59 8h-7.5a5.96 5.96 0 013.17-4.33zM12.08 3H9c-.19 0-.38.01-.57.02L13.41 8h3.67zM19 3h-4.08l5 5h4.99A5.99 5.99 0 0019 3zm-6.518 16.626l5-2.75a1 1 0 000-1.752l-5-2.75A1 1 0 0011 13.25v5.5a1 1 0 001.482.876zM25 10v9a6.005 6.005 0 01-6 6H9a6.005 6.005 0 01-6-6v-9z"
        data-original="#0a0b12"
      />
    </Svg>
  );
}

export default AddIcon;

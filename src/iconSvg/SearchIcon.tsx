import * as React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';

function SearchIcon(props: SvgProps) {
  return (
    <Svg width={512} height={512} viewBox="0 0 118.783 118.783" {...props}>
      <Path
        d="M115.97 101.597L88.661 74.286a47.75 47.75 0 007.333-25.488c0-26.509-21.49-47.996-47.998-47.996S0 22.289 0 48.798c0 26.51 21.487 47.995 47.996 47.995a47.776 47.776 0 0027.414-8.605l26.984 26.986a9.574 9.574 0 006.788 2.806 9.58 9.58 0 006.791-2.806 9.602 9.602 0 00-.003-13.577zM47.996 81.243c-17.917 0-32.443-14.525-32.443-32.443s14.526-32.444 32.443-32.444c17.918 0 32.443 14.526 32.443 32.444S65.914 81.243 47.996 81.243z"
        data-original="#000000"
      />
    </Svg>
  );
}

export default SearchIcon;

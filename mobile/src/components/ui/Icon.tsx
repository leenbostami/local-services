import Svg, { Circle, Path, Rect } from 'react-native-svg';

import type { ServiceIcon } from '@/domain/types';

type IconName = ServiceIcon | 'search' | 'pin' | 'bell' | 'arrow' | 'star' | 'shield';

type IconProps = {
  name: IconName;
  color: string;
  size?: number;
  mirrored?: boolean;
};

export function Icon({ name, color, size = 22, mirrored = false }: IconProps) {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      style={mirrored ? { transform: [{ scaleX: -1 }] } : undefined}
    >
      {renderIcon(name, color)}
    </Svg>
  );
}

function renderIcon(name: IconName, color: string) {
  switch (name) {
    case 'search':
      return (
        <>
          <Circle cx="11" cy="11" r="6.5" stroke={color} strokeWidth={1.8} />
          <Path d="M16 16.5L20 20.5" stroke={color} strokeWidth={1.8} strokeLinecap="round" />
        </>
      );
    case 'pin':
      return (
        <>
          <Path
            d="M12 21s6-5.2 6-10a6 6 0 1 0-12 0c0 4.8 6 10 6 10z"
            stroke={color}
            strokeWidth={1.8}
          />
          <Circle cx="12" cy="11" r="2" fill={color} />
        </>
      );
    case 'bell':
      return (
        <Path
          d="M6 16.5h12l-1.2-2.1V10a4.8 4.8 0 0 0-9.6 0v4.4L6 16.5zM10 18.2a2 2 0 0 0 4 0"
          stroke={color}
          strokeWidth={1.8}
          strokeLinejoin="round"
        />
      );
    case 'arrow':
      return (
        <Path
          d="M5 12h14M13 6l6 6-6 6"
          stroke={color}
          strokeWidth={1.8}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      );
    case 'star':
      return (
        <Path
          d="M12 3.6l2.1 4.6 5 .6-3.7 3.4.9 4.9L12 14.8 7.7 17.1l.9-4.9L4.9 8.8l5-.6L12 3.6z"
          fill={color}
        />
      );
    case 'shield':
      return (
        <Path
          d="M12 3.5l7 2.4v5.4c0 4.2-2.8 7.2-7 8.7-4.2-1.5-7-4.5-7-8.7V5.9l7-2.4z"
          stroke={color}
          strokeWidth={1.8}
          strokeLinejoin="round"
        />
      );
    case 'broom':
      return (
        <Path
          d="M14 4l6 6M4 20c2.2-4 5-6 8.2-6.2L14.5 11"
          stroke={color}
          strokeWidth={1.8}
          strokeLinecap="round"
        />
      );
    case 'sparkle':
      return (
        <Path
          d="M12 3l1.4 5.2L18.5 9.5 13.4 11 12 16.2 10.6 11 5.5 9.5l5.1-1.3L12 3zM18 15l.6 2 2 .6-2 .6-.6 2-.6-2-2-.6 2-.6.6-2z"
          fill={color}
        />
      );
    case 'shirt':
      return (
        <Path
          d="M8 6l4 2 4-2 4 3-2 2v9H6V11L4 9l4-3z"
          stroke={color}
          strokeWidth={1.8}
          strokeLinejoin="round"
        />
      );
    case 'home':
      return (
        <Path
          d="M4 11.5L12 5l8 6.5V20H4v-8.5z"
          stroke={color}
          strokeWidth={1.8}
          strokeLinejoin="round"
        />
      );
    case 'clock':
      return (
        <>
          <Circle cx="12" cy="12" r="8" stroke={color} strokeWidth={1.8} />
          <Path d="M12 8v4.5L15 15" stroke={color} strokeWidth={1.8} strokeLinecap="round" />
        </>
      );
    case 'box':
      return (
        <>
          <Rect x="4" y="7" width="16" height="12" rx="2" stroke={color} strokeWidth={1.8} />
          <Path d="M4 11h16M12 7v4" stroke={color} strokeWidth={1.8} />
        </>
      );
    default:
      return null;
  }
}

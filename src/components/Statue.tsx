import { useTheme } from '../lib/theme';

const SOURCES = {
  light: { src: '/images/winged-victory-light.svg', width: 900, height: 1380 },
  dark: { src: '/images/winged-victory-dark.svg', width: 800, height: 1230 },
};

interface StatueProps {
  className?: string;
  reveal?: boolean;
  priority?: boolean;
}

// The Winged Victory of Samothrace, rendered as a halftone. Swaps artwork with the theme.
export default function Statue({ className = '', reveal = false, priority = false }: StatueProps) {
  const theme = useTheme();
  const { src, width, height } = SOURCES[theme];

  return (
    <img
      src={src}
      width={width}
      height={height}
      alt="The Winged Victory of Samothrace, rendered as a halftone"
      decoding="async"
      fetchPriority={priority ? 'high' : 'auto'}
      loading={priority ? 'eager' : 'lazy'}
      draggable={false}
      className={`select-none ${reveal ? 'statue-reveal' : ''} ${className}`}
    />
  );
}

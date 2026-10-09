export interface Artwork {
  sources: { light: string; dark: string };
  alt: string;
}

export const WINGED_VICTORY: Artwork = {
  sources: { light: '/images/winged-victory-light.svg', dark: '/images/winged-victory-dark.svg' },
  alt: 'The Winged Victory of Samothrace, rendered as a halftone',
};

export const ASTROLABE: Artwork = {
  sources: { light: '/images/astrolabe-light.svg', dark: '/images/astrolabe-dark.svg' },
  alt: 'The astrolabe of ʿUmar ibn Yusuf, rendered as a halftone',
};

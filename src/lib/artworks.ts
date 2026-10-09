export interface Artwork {
  id: string;
  sources: { light: string; dark: string };
  alt: string;
  /** Caption, set as "<em>title</em>details". */
  title: string;
  details: string;
}

export const WINGED_VICTORY: Artwork = {
  id: 'winged-victory',
  sources: { light: '/images/winged-victory-light.svg', dark: '/images/winged-victory-dark.svg' },
  alt: 'The Winged Victory of Samothrace, rendered as a halftone',
  title: 'Winged Victory of Samothrace',
  details: ', c. 190 BC. Parian marble. Louvre, Paris.',
};

export const URANIA: Artwork = {
  id: 'urania',
  sources: { light: '/images/urania-light.svg', dark: '/images/urania-dark.svg' },
  alt: 'A statue of Urania, Muse of astronomy, rendered as a halftone',
  title: 'Urania',
  details: ', Muse of astronomy. Roman, 2nd century AD, after a Greek original.',
};

export const ATHENA_GIUSTINIANI: Artwork = {
  id: 'athena-giustiniani',
  sources: { light: '/images/athena-light.svg', dark: '/images/athena-dark.svg' },
  alt: 'The Athena Giustiniani, rendered as a halftone',
  title: 'Athena Giustiniani',
  details: '. Roman copy of a Greek bronze, c. 400 BC. Vatican Museums.',
};

export const POLYHYMNIA: Artwork = {
  id: 'polyhymnia',
  sources: { light: '/images/draped-figure-light.svg', dark: '/images/draped-figure-dark.svg' },
  alt: 'A statue of Polyhymnia, Muse of sacred hymns, wrapped in her mantle, rendered as a halftone',
  title: 'Polyhymnia',
  details: ', Muse of sacred hymns. Roman, 2nd century AD, from Monte Calvo, Sabina. Marble. Ny Carlsberg Glyptotek, Copenhagen.',
};

export const CHARIOTEER_OF_DELPHI: Artwork = {
  id: 'charioteer-of-delphi',
  sources: { light: '/images/charioteer-light.svg', dark: '/images/charioteer-dark.svg' },
  alt: 'The Charioteer of Delphi, rendered as a halftone',
  title: 'Charioteer of Delphi',
  details: ', c. 470 BC. Bronze. Delphi Archaeological Museum.',
};

/** The statues the hero cycles through. */
export const STATUES: Artwork[] = [WINGED_VICTORY, URANIA, ATHENA_GIUSTINIANI, POLYHYMNIA, CHARIOTEER_OF_DELPHI];

export const ASTROLABE: Artwork = {
  id: 'astrolabe',
  sources: { light: '/images/astrolabe-light.svg', dark: '/images/astrolabe-dark.svg' },
  alt: 'The astrolabe of ʿUmar ibn Yusuf, rendered as a halftone',
  title: 'Astrolabe of ʿUmar ibn Yusuf',
  details: ', Yemen, 1291. Brass. The Metropolitan Museum of Art, New York.',
};

/** Picks a random index in [0, length) other than `current`. */
export function randomOtherIndex(length: number, current: number) {
  if (length < 2) return current;
  const pick = Math.floor(Math.random() * (length - 1));
  return pick >= current ? pick + 1 : pick;
}

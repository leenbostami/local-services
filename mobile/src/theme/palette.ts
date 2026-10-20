export const palette = {
  primaryGreen: '#0D9488',
  lightTeal: '#14B8A6',
  accentOrange: '#F97316',
  accentYellow: '#FBBF24',
  textDark: '#1F2937',
  neutralGray: '#6B7280',
  background: '#FAFAF8',
} as const;

export type Palette = typeof palette;
export type PaletteId = keyof Palette;

export const paletteTokens = [
  {
    id: 'primaryGreen',
    name: 'Primary Green',
    role: 'Trust, stability, cleanliness, growth',
  },
  {
    id: 'lightTeal',
    name: 'Light Teal',
    role: 'Freshness, calm, friendliness',
  },
  {
    id: 'accentOrange',
    name: 'Accent Orange',
    role: 'Energy, action, call to action',
  },
  {
    id: 'accentYellow',
    name: 'Accent Yellow',
    role: 'Optimism, positivity, attention',
  },
  {
    id: 'textDark',
    name: 'Dark Text',
    role: 'Readability, clarity',
  },
  {
    id: 'neutralGray',
    name: 'Neutral Gray',
    role: 'Secondary text, icons, borders',
  },
  {
    id: 'background',
    name: 'Warm Background',
    role: 'Clean, spacious, minimal',
  },
] as const satisfies readonly { id: PaletteId; name: string; role: string }[];

function channel(hex: string, index: number) {
  return Number.parseInt(hex.slice(1 + index * 2, 3 + index * 2), 16);
}

export function mix(from: string, to: string, amount: number) {
  const mixed = [0, 1, 2].map((index) => {
    const start = channel(from, index);
    const end = channel(to, index);
    return Math.round(start + (end - start) * amount)
      .toString(16)
      .padStart(2, '0');
  });

  return `#${mixed.join('')}`;
}

export function alpha(hex: string, opacity: number) {
  const value = Math.round(Math.min(1, Math.max(0, opacity)) * 255)
    .toString(16)
    .padStart(2, '0');

  return `${hex}${value}`;
}

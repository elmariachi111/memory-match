// Game configuration constants
export const GAME_CONFIG = {
  COLUMNS: 4,
  ROWS: 3,
  INACTIVITY_TIMEOUT: 15000, // 15 seconds in milliseconds
} as const;

// Calculated values based on configuration
export const TOTAL_CARDS = GAME_CONFIG.COLUMNS * GAME_CONFIG.ROWS;
export const PAIRS_COUNT = Math.floor(TOTAL_CARDS / 2);
export const HAS_UNPAIRED_CARD = TOTAL_CARDS % 2 === 1;
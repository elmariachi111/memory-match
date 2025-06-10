import { CardType } from '../types/game';
import { TOTAL_CARDS, PAIRS_COUNT, HAS_UNPAIRED_CARD } from '../constants/gameConfig';

// Card symbols using emoji for visual appeal
const cardSymbols = [
  '🚀', '🌟', '🌈', '🌸', '🍉', 
  '🎮', '🎨', '🎯', '🎵', '🎪',
  '🏄', '🚴', '🛶', '🏂', '🏆', 
  '🍕', '🍦', '🧁', '🍹', '🌮', 
  '🐱', '🐶', '🦊', '🐢', '🦄',
  '⚽', '🏀', '🎾', '🏐', '🏈',
  '🎲', '🎯', '🎪', '🎭', '🎨',
  '🌺', '🌻', '🌷', '🌹', '🌼',
  '🍎', '🍊', '🍋', '🍌', '🍇',
  '🦋', '🐝', '🐞', '🦗', '🕷️'
];

// Fisher-Yates shuffle algorithm
export const shuffleArray = <T>(array: T[]): T[] => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

// Create a new deck of cards based on the configured grid size
export const createDeck = (): CardType[] => {
  // Calculate how many unique symbols we need
  const symbolsNeeded = HAS_UNPAIRED_CARD ? PAIRS_COUNT + 1 : PAIRS_COUNT;
  
  // Select symbols randomly from our symbol set
  const selectedSymbols = shuffleArray(cardSymbols).slice(0, symbolsNeeded);
  
  // Create pairs for the paired symbols
  const pairedCards = selectedSymbols.slice(0, PAIRS_COUNT).flatMap((symbol, index) => [
    { id: index * 2, value: symbol, isFlipped: false, isMatched: false },
    { id: index * 2 + 1, value: symbol, isFlipped: false, isMatched: false }
  ]);
  
  // Add the unpaired card if needed
  const cards = [...pairedCards];
  if (HAS_UNPAIRED_CARD) {
    cards.push({
      id: TOTAL_CARDS - 1,
      value: selectedSymbols[PAIRS_COUNT],
      isFlipped: false,
      isMatched: false,
      isUnpaired: true
    });
  }
  
  // Shuffle and return
  return shuffleArray(cards);
};

// Format time in MM:SS format
export const formatTime = (milliseconds: number): string => {
  if (!milliseconds) return '00:00';
  
  const totalSeconds = Math.floor(milliseconds / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
};
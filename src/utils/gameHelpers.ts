import { CardType } from '../types/game';

// Card symbols using emoji for visual appeal
const cardSymbols = [
  '🚀', '🌟', '🌈', '🌸', '🍉', 
  '🎮', '🎨', '🎯', '🎵', '🎪',
  '🏄', '🚴', '🛶', '🏂', '🏆', 
  '🍕', '🍦', '🧁', '🍹', '🌮', 
  '🐱', '🐶', '🦊', '🐢', '🦄'
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

// Create a new deck of cards
export const createDeck = (): CardType[] => {
  // For a 5x5 grid, we need 25 cards (12 pairs + 1 unpaired card)
  // Or we could use 12 unique symbols with each appearing twice, plus one symbol appearing once
  // Let's go with 12 pairs and one unpaired for a fair game
  
  // Select 13 symbols randomly from our symbol set
  const selectedSymbols = shuffleArray(cardSymbols).slice(0, 13);
  
  // Create pairs for the first 12 symbols
  const pairedCards = selectedSymbols.slice(0, 12).flatMap((symbol, index) => [
    { id: index * 2, value: symbol, isFlipped: false, isMatched: false },
    { id: index * 2 + 1, value: symbol, isFlipped: false, isMatched: false }
  ]);
  
  // Add the last unpaired card
  const unpaired = {
    id: 24,
    value: selectedSymbols[12],
    isFlipped: false,
    isMatched: false
  };
  
  // Combine and shuffle
  return shuffleArray([...pairedCards, unpaired]);
};

// Format time in MM:SS format
export const formatTime = (milliseconds: number): string => {
  if (!milliseconds) return '00:00';
  
  const totalSeconds = Math.floor(milliseconds / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
};
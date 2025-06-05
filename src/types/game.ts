export interface CardType {
  id: number;
  value: string;
  isFlipped: boolean;
  isMatched: boolean;
  isUnpaired?: boolean;
}

export interface GameState {
  cards: CardType[];
  flippedCards: CardType[];
  moves: number;
  isGameOver: boolean;
  startTime: number | null;
  endTime: number | null;
  isStarted: boolean;
}
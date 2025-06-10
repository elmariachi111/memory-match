import React from 'react';
import Card from './Card';
import { CardType } from '../types/game';
import { GAME_CONFIG } from '../constants/gameConfig';

interface GameBoardProps {
  cards: CardType[];
  onCardClick: (card: CardType) => void;
}

const GameBoard: React.FC<GameBoardProps> = ({ cards, onCardClick }) => {
  return (
    <div className="w-full max-w-4xl mx-auto">
      <div 
        className="grid gap-2 md:gap-4"
        style={{
          gridTemplateColumns: `repeat(${GAME_CONFIG.COLUMNS}, minmax(0, 1fr))`,
          gridTemplateRows: `repeat(${GAME_CONFIG.ROWS}, minmax(0, 1fr))`
        }}
      >
        {cards.map(card => (
          <Card 
            key={card.id} 
            card={card} 
            onClick={onCardClick} 
          />
        ))}
      </div>
    </div>
  );
};

export default GameBoard;
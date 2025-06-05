import React from 'react';
import Card from './Card';
import { CardType } from '../types/game';

interface GameBoardProps {
  cards: CardType[];
  onCardClick: (card: CardType) => void;
}

const GameBoard: React.FC<GameBoardProps> = ({ cards, onCardClick }) => {
  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="grid grid-cols-5 gap-2 md:gap-4">
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
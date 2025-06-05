import React from 'react';
import { CardType } from '../types/game';

interface CardProps {
  card: CardType;
  onClick: (card: CardType) => void;
}

const Card: React.FC<CardProps> = ({ card, onClick }) => {
  const handleClick = () => {
    if (!card.isMatched) {
      onClick(card);
    }
  };

  return (
    <div 
      className={`
        relative h-16 w-16 md:h-20 md:w-20 lg:h-24 lg:w-24
        perspective-1000 cursor-pointer
        transform transition-transform duration-300
        ${card.isMatched ? 'opacity-0 pointer-events-none scale-0' : ''}
      `}
      onClick={handleClick}
    >
      <div 
        className={`
          absolute inset-0 w-full h-full
          rounded-lg shadow-md
          transform-style-preserve-3d
          transition-transform duration-500
          ${card.isFlipped ? 'rotate-y-180' : ''}
        `}
      >
        {/* Card Back */}
        <div 
          className={`
            absolute inset-0 w-full h-full
            bg-gradient-to-br from-blue-500 to-purple-600
            rounded-lg shadow-inner
            flex items-center justify-center
            backface-hidden
            border-2 border-white
          `}
        >
          <div className="text-white text-xl font-bold">?</div>
        </div>

        {/* Card Front */}
        <div 
          className={`
            absolute inset-0 w-full h-full
            bg-white rounded-lg
            flex items-center justify-center
            backface-hidden rotate-y-180
            border-2 border-blue-300
            ${card.isFlipped && !card.isMatched ? 'ring-2 ring-blue-500' : ''}
          `}
        >
          <div className="text-3xl md:text-4xl lg:text-5xl">{card.value}</div>
        </div>
      </div>
    </div>
  );
};

export default Card;
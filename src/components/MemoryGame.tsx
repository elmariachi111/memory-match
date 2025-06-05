import React from 'react';
import GameBoard from './GameBoard';
import GameStats from './GameStats';
import GameOverModal from './GameOverModal';
import { useMemoryGame } from '../hooks/useMemoryGame';
import { BrainCircuit } from 'lucide-react';

const MemoryGame: React.FC = () => {
  const {
    cards,
    moves,
    isGameOver,
    gameTime,
    handleCardClick,
    startGame,
    isGameStarted
  } = useMemoryGame();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 
                   flex flex-col items-center p-4 md:p-8">
      <header className="w-full max-w-3xl flex flex-col items-center mb-6 md:mb-8">
        <div className="flex items-center gap-2 mb-2">
          <BrainCircuit className="w-8 h-8 text-indigo-600" />
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800">Memory Match</h1>
        </div>
        <p className="text-gray-600 text-center">
          Find matching pairs to win! Your time is being tracked.
        </p>
      </header>

      <GameStats 
        moves={moves} 
        gameTime={gameTime} 
        startGame={startGame}
        isGameStarted={isGameStarted}
      />

      <div className="relative w-full">
        <GameBoard 
          cards={cards} 
          onCardClick={handleCardClick} 
        />

        {!isGameStarted && !isGameOver && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-white/90 backdrop-blur-sm rounded-lg p-4 shadow-lg">
              <p className="text-lg font-medium text-gray-800">
                Click the Start Game button to begin!
              </p>
            </div>
          </div>
        )}
      </div>

      <GameOverModal 
        isVisible={isGameOver} 
        moves={moves}
        time={gameTime}
        onRestart={startGame}
      />
    </div>
  );
};

export default MemoryGame;
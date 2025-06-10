import React, { useState, useEffect } from 'react';
import GameBoard from './GameBoard';
import GameStats from './GameStats';
import GameOverModal from './GameOverModal';
import { useMemoryGame } from '../hooks/useMemoryGame';
import { BrainCircuit, Pause } from 'lucide-react';
import confetti from 'canvas-confetti';

const MemoryGame: React.FC = () => {
  const [showAddToProfile, setShowAddToProfile] = useState(false);
  const {
    cards,
    moves,
    isGameOver,
    gameTime,
    handleCardClick,
    startGame,
    isGameStarted,
    lastMatchedCard,
    isPaused
  } = useMemoryGame();

  useEffect(() => {
    if (lastMatchedCard?.isUnpaired) {
      // Trigger confetti
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
      setShowAddToProfile(true);
    }
  }, [lastMatchedCard]);

  const handleCardClickWithResume = (card: any) => {
    // If paused, clicking any card will resume the game
    handleCardClick(card);
  };

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
        showAddToProfile={showAddToProfile}
        isPaused={isPaused}
      />

      <div className="relative w-full">
        <GameBoard 
          cards={cards} 
          onCardClick={handleCardClickWithResume} 
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

        {isPaused && isGameStarted && !isGameOver && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-white/95 backdrop-blur-sm rounded-lg p-6 shadow-lg border-2 border-yellow-300">
              <div className="flex items-center gap-3 mb-2">
                <Pause className="w-6 h-6 text-yellow-600" />
                <p className="text-xl font-semibold text-gray-800">Game Paused</p>
              </div>
              <p className="text-gray-600 text-center">
                Click any card to resume playing
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
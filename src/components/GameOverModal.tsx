import React, { useEffect } from 'react';
import { formatTime } from '../utils/gameHelpers';
import { Trophy, Clock, Mouse, RotateCw } from 'lucide-react';

interface GameOverModalProps {
  isVisible: boolean;
  moves: number;
  time: number;
  onRestart: () => void;
}

const GameOverModal: React.FC<GameOverModalProps> = ({ 
  isVisible, 
  moves, 
  time, 
  onRestart 
}) => {
  // Play a confetti animation when the game ends
  useEffect(() => {
    if (isVisible) {
      // In a real implementation, we might add a confetti animation library here
      // For this implementation, we're keeping it simple
    }
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-2xl p-6 md:p-8 w-full max-w-md transform transition-all 
                     animate-fade-in-up mx-4">
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center">
            <Trophy className="w-8 h-8 text-yellow-500" />
          </div>
        </div>
        
        <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-2">
          Congratulations!
        </h2>
        <p className="text-center text-gray-600 mb-6">
          You've completed the memory game!
        </p>
        
        <div className="space-y-3 mb-6">
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center">
              <Clock className="w-5 h-5 text-blue-600 mr-2" />
              <span className="text-gray-700">Time</span>
            </div>
            <span className="font-mono font-semibold text-lg">
              {formatTime(time)}
            </span>
          </div>
          
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center">
              <Mouse className="w-5 h-5 text-indigo-600 mr-2" />
              <span className="text-gray-700">Moves</span>
            </div>
            <span className="font-mono font-semibold text-lg">{moves}</span>
          </div>
        </div>
        
        <button
          onClick={onRestart}
          className="w-full flex items-center justify-center gap-2 bg-gradient-to-r 
                   from-indigo-500 to-purple-600 text-white font-medium py-3 px-4 
                   rounded-lg shadow-md hover:from-indigo-600 hover:to-purple-700 
                   transition-all duration-300"
        >
          <RotateCw className="w-4 h-4" />
          Play Again
        </button>
      </div>
    </div>
  );
};

export default GameOverModal;
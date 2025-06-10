import React from 'react';
import { formatTime } from '../utils/gameHelpers';
import { Clock, Mouse, Play, UserPlus, Pause } from 'lucide-react';

interface GameStatsProps {
  moves: number;
  gameTime: number;
  startGame: () => void;
  isGameStarted: boolean;
  showAddToProfile: boolean;
  isPaused?: boolean;
}

const GameStats: React.FC<GameStatsProps> = ({ 
  moves, 
  gameTime, 
  startGame, 
  isGameStarted,
  showAddToProfile,
  isPaused = false
}) => {
  return (
    <div className="flex flex-col md:flex-row gap-4 items-center justify-center w-full mb-6">
      <div className={`flex items-center bg-white rounded-full px-4 py-2 shadow-md transition-transform ${showAddToProfile ? 'animate-wiggle' : ''}`}>
        <Mouse className="w-5 h-5 mr-2 text-indigo-600" />
        <span className="font-semibold text-gray-800">
          Moves: <span className="font-mono">{moves}</span>
        </span>
      </div>
      
      <div className={`flex items-center rounded-full px-4 py-2 shadow-md transition-all duration-300 ${showAddToProfile ? 'animate-wiggle' : ''} ${isPaused ? 'bg-yellow-100 border-2 border-yellow-300' : 'bg-white'}`}>
        {isPaused && <Pause className="w-4 h-4 mr-2 text-yellow-700" />}
        <Clock className={`w-5 h-5 mr-2 ${isPaused ? 'text-yellow-700' : 'text-blue-600'}`} />
        <span className={`font-semibold ${isPaused ? 'text-yellow-800' : 'text-gray-800'}`}>
          Time: <span className="font-mono">{formatTime(gameTime)}</span>
        </span>
      </div>
      
      {!isGameStarted && (
        <button
          onClick={startGame}
          className="flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white 
                    font-medium py-2 px-4 rounded-full shadow-md hover:from-indigo-600 
                    hover:to-purple-700 transition-all duration-300 hover:shadow-lg"
        >
          <Play className="w-4 h-4" />
          Start Game
        </button>
      )}

      {showAddToProfile && (
        <button
          className="flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white 
                    font-medium py-2 px-4 rounded-full shadow-md hover:from-green-600 
                    hover:to-emerald-700 transition-all duration-300 hover:shadow-lg animate-fade-in"
        >
          <UserPlus className="w-4 h-4" />
          Add to Profile
        </button>
      )}
    </div>
  );
};

export default GameStats;
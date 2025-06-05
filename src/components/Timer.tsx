import React, { useState, useEffect } from 'react';
import { formatTime } from '../utils/gameHelpers';
import { Clock } from 'lucide-react';

interface TimerProps {
  isRunning: boolean;
  startTime: number | null;
  endTime: number | null;
}

const Timer: React.FC<TimerProps> = ({ isRunning, startTime, endTime }) => {
  const [time, setTime] = useState<number>(0);

  useEffect(() => {
    let intervalId: number;

    if (isRunning && startTime) {
      // Update every 100ms for smoother display
      intervalId = window.setInterval(() => {
        setTime(Date.now() - startTime);
      }, 100);
    } else if (endTime && startTime) {
      setTime(endTime - startTime);
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [isRunning, startTime, endTime]);

  return (
    <div className="flex items-center bg-white/90 backdrop-blur-sm rounded-full px-4 py-2 shadow-md">
      <Clock className="w-5 h-5 mr-2 text-blue-600" />
      <span className="font-mono text-lg font-semibold text-gray-800">
        {formatTime(time)}
      </span>
    </div>
  );
};

export default Timer;
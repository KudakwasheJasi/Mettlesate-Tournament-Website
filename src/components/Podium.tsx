import React from 'react';
import { motion } from 'framer-motion';

interface Player {
  id: number;
  username: string;
  points: number;
}

interface PodiumProps {
  players: Player[];
  className?: string;
}

const Podium: React.FC<PodiumProps> = ({ players, className = '' }) => {
  const top3 = players.slice(0, 3);
  const positions = [1, 0, 2]; // 2nd, 1st, 3rd place

  return (
    <div className={`grid grid-cols-3 gap-2 sm:gap-3 md:gap-4 h-36 sm:h-44 md:h-56 lg:h-60 xl:h-64 px-1 sm:px-2 mb-6 mt-4 sm:mt-6 ${className}`}>
      {positions.map((pos, index) => {
        const player = top3[pos];
        if (!player) return null;

        // Responsive heights
        const height = [
          "h-24 sm:h-32 md:h-40 lg:h-44 xl:h-48",  // 2nd place
          "h-32 sm:h-40 md:h-52 lg:h-56 xl:h-60",  // 1st place
          "h-20 sm:h-28 md:h-36 lg:h-40 xl:h-44"   // 3rd place
        ][pos];

        // Gradient colors for each position
        const colors = [
          "from-yellow-400 to-yellow-200",  // 2nd place
          "from-yellow-500 to-yellow-300",  // 1st place (more vibrant)
          "from-amber-600 to-amber-400"     // 3rd place
        ][pos];

        // Truncate long usernames
        const displayName = player.username.length > 10 
          ? `${player.username.substring(0, 8)}...` 
          : player.username;

        return (
          <motion.div
            key={player.id}
            className={`flex flex-col items-center justify-end ${height} ${
              index === 1 ? 'order-first' : ''
            }`}
            initial={{ y: 100, opacity: 0 }}
            animate={{
              y: 0,
              opacity: 1,
              transition: {
                type: 'spring',
                stiffness: 50,
                delay: index * 0.2
              }
            }}
          >
            <div 
              className={`w-full bg-gradient-to-b ${colors} rounded-t-lg shadow-md sm:shadow-lg p-2 sm:p-3 md:p-4 text-center`}
            >
              <div className="text-xs xs:text-sm sm:text-sm md:text-base lg:text-lg font-bold text-gray-900 truncate px-1">
                {displayName}
              </div>
              <div className="text-xs sm:text-xs md:text-sm font-semibold text-gray-800 mt-1">
                {player.points.toLocaleString()} pts
              </div>
            </div>
            <div className="w-full bg-blue-600 dark:bg-blue-800 text-white text-center py-1 sm:py-2 text-xs sm:text-sm font-bold rounded-b-lg">
              #{pos + 1}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default Podium;

/**
    * @description      : 
    * @author           : kudakwashe Ellijah
    * @group            : 
    * @created          : 22/07/2025 - 19:33:03
    * 
    * MODIFICATION LOG
    * - Version         : 1.3.0
    * - Date            : 28/07/2025
    * - Author          : kudakwashe Ellijah
    * - Modification    : Ensure loading UI overlay is clearly visible after app page loading
**/
import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView, useAnimation, AnimatePresence } from 'framer-motion';

interface Player {
  id: number;
  username: string;
  points: number;
}

const Leaderboard: React.FC = () => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const controls = useAnimation();
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef);


  useEffect(() => {
    if (isInView) {
      controls.start('show');
    } else {
      controls.stop();
    }
  }, [isInView, controls]);

  useEffect(() => {
    controls.start('show');
  }, [controls]);

  useEffect(() => {
    if (isInView) {
      console.log('Component is in view');
    }
  }, [isInView]);

  useEffect(() => {
    let isMounted = true;

    const fetchPlayers = async () => {
      console.log('Starting to fetch players...');
      setLoading(true);
      setError(null);

      try {
        // Artificial delay to make loading state visible longer
        await new Promise(resolve => setTimeout(resolve, 3000));

        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        if (!response.ok) throw new Error('Failed to fetch');

        const data = await response.json();
        console.log('API response received:', data);

        if (!isMounted) return;

        const requiredPlayers = 10;
        const availablePlayers = data.length;

        const mappedPlayers: Player[] = Array(requiredPlayers).fill(null).map((_, index) => {
          const user = data[index % availablePlayers];
          const username = index >= availablePlayers
            ? `${user.username}_${Math.floor(index / availablePlayers) + 1}`
            : user.username;

          return {
            id: index + 1,
            username,
            points: Math.floor(Math.random() * 1000) + 500,
          };
        });

        const sortedPlayers = mappedPlayers.sort((a, b) => b.points - a.points);
        console.log('Setting players data...', sortedPlayers);
        setPlayers(sortedPlayers);
      } catch (error) {
        console.error('Failed to fetch players:', error);
        if (isMounted) setError((error as Error).message);
      } finally {
        if (isMounted) {
          console.log('Setting loading to false');
          setLoading(false);
        }
      }
    };

    fetchPlayers();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    console.log('Loading state:', loading);
    console.log('Players count:', players.length);
  }, [loading, players]);

  return (
    <section ref={containerRef} className="py-6 sm:py-8 md:py-12 px-3 sm:px-6 md:px-12 relative bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 min-h-screen">
      <div className="max-w-6xl mx-auto relative pb-16">
        {loading && (
          <div className="absolute inset-0 bg-white bg-opacity-80 dark:bg-gray-900 dark:bg-opacity-80 flex flex-col items-center justify-center z-50">
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mb-3 sm:mb-4 font-medium sm:font-semibold text-center px-4">
              Loading Leaderboard...
            </p>
            <svg className="animate-spin h-10 w-10 sm:h-12 sm:w-12 text-blue-600 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
            </svg>
          </div>
        )}
        {!loading && error && (
          <div className="text-center text-sm sm:text-base text-red-600 dark:text-red-400 p-3 sm:p-4" data-testid="error-message">
            Error: {error}
          </div>
        )}
        {!loading && !error && (
          <>
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center mb-4 sm:mb-6 md:mb-8 px-2"
            >
              <h2 className="text-lg sm:text-xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 mb-2 sm:mb-3 md:mb-4">
                Tournament Leaderboard
              </h2>
              <p className="text-xs sm:text-sm md:text-base text-gray-600 dark:text-gray-300 max-w-md mx-auto">
                Check out the top performers in the tournament
              </p>
            </motion.div>
            <div className="leaderboard-container px-1 sm:px-0">
              <AnimatePresence>
                {players.length > 0 && (
                  <>
                    <Podium players={players} className="mb-6 sm:mb-8 md:mb-10" />
                    <motion.div
                      className="bg-white dark:bg-gray-800 rounded-lg sm:rounded-xl shadow-md sm:shadow-lg p-3 sm:p-4 md:p-6 mt-6 mb-8"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                    >
                      <h3 className="text-base sm:text-lg md:text-xl font-semibold text-gray-800 dark:text-white mb-3 sm:mb-4 md:mb-6">
                        Full Leaderboard
                      </h3>
                      <div className="overflow-x-auto -mx-1 sm:mx-0">
                        <div className="inline-block min-w-full align-middle">
                          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                            <thead className="bg-gray-50 dark:bg-gray-700">
                              <tr>
                                <th scope="col" className="px-2 sm:px-3 md:px-6 py-2 sm:py-3 text-left text-[10px] xs:text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                  Rank
                                </th>
                                <th scope="col" className="px-2 sm:px-3 md:px-6 py-2 sm:py-3 text-left text-[10px] xs:text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                  Player
                                </th>
                                <th scope="col" className="px-2 sm:px-3 md:px-6 py-2 sm:py-3 text-left text-[10px] xs:text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                  Points
                                </th>
                              </tr>
                            </thead>
                            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700 text-[10px] xs:text-xs sm:text-sm">
                              {players.map((player, index) => (
                                <tr
                                  key={player.id}
                                  className="hover:bg-blue-50 dark:hover:bg-gray-700 transition-colors duration-200"
                                >
                                  <td className="px-2 sm:px-3 md:px-6 py-2 sm:py-3 whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                    <span className="inline-flex items-center justify-center w-4 h-4 xs:w-5 xs:h-5 sm:w-6 sm:h-6 rounded-full bg-gray-100 dark:bg-gray-700 text-[10px] xs:text-xs sm:text-sm">
                                      {index + 1}
                                    </span>
                                  </td>
                                  <td className="px-2 sm:px-3 md:px-6 py-2 sm:py-3 whitespace-nowrap text-gray-700 dark:text-gray-300 truncate max-w-[100px] sm:max-w-[200px] md:max-w-none">
                                    {player.username}
                                  </td>
                                  <td className="px-2 sm:px-3 md:px-6 py-2 sm:py-3 whitespace-nowrap">
                                    <span className="px-1.5 xs:px-2 py-0.5 xs:py-1 inline-flex text-[9px] xs:text-xs leading-4 sm:leading-5 font-medium rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                                      {player.points.toLocaleString()} pts
                                    </span>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

const Podium: React.FC<{ players: Player[], className?: string }> = ({ players, className = '' }) => {
  const top3 = players.slice(0, 3);
  const positions = [1, 0, 2]; // 2nd, 1st, 3rd place

  return (
    <div className={`grid grid-cols-3 gap-2 sm:gap-3 md:gap-4 h-36 sm:h-44 md:h-56 lg:h-60 xl:h-64 px-1 sm:px-2 mb-6 mt-4 sm:mt-6 ${className}`}>
      {positions.map((pos, index) => {
        const player = top3[pos];
        if (!player) return null;

        // Responsive heights - reduced for larger screens
        const height = [
          "h-24 sm:h-32 md:h-40 lg:h-44 xl:h-48",  // 2nd place
          "h-32 sm:h-40 md:h-52 lg:h-56 xl:h-60",  // 1st place
          "h-20 sm:h-28 md:h-36 lg:h-40 xl:h-44"   // 3rd place
        ][pos];

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
            <div className="w-full bg-gray-800 text-white text-center py-1 sm:py-2 text-xs sm:text-sm font-medium rounded-b-lg">
              #{pos + 1}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default Leaderboard;


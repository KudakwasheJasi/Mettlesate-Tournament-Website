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
    <section ref={containerRef} className="py-12 px-6 sm:px-12 md:px-24 relative bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 min-h-screen">
      <div className="max-w-6xl mx-auto relative">
        {loading && (
          <div className="absolute inset-0 bg-white bg-opacity-80 dark:bg-gray-900 dark:bg-opacity-80 flex flex-col items-center justify-center z-50">
            <p className="text-gray-600 dark:text-gray-300 mb-4 font-semibold text-lg">
              We are loading Leaderboard...
            </p>
            <svg className="animate-spin h-12 w-12 text-blue-600 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
            </svg>
          </div>
        )}
        {!loading && error && (
          <div className="text-center text-red-600 dark:text-red-400 p-4" data-testid="error-message">
            Error loading leaderboard: {error}
          </div>
        )}
        {!loading && !error && (
          <>
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 mb-4">
                Tournament Leaderboard
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                Check out the top performers in the tournament
              </p>
            </motion.div>
            <div className="leaderboard-container">
              <AnimatePresence>
                {players.length > 0 && (
                  <>
                    <Podium players={players} />
                    <motion.div
                      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                    >
                      <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-6">
                        Full Leaderboard
                      </h3>
                      <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                          <thead className="bg-gray-50 dark:bg-gray-700">
                            <tr>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                Rank
                              </th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                Player
                              </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                              Points
                            </th>
                            </tr>
                          </thead>
                          <tbody
                            className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700"
                          >
                            {players.map((player, index) => (
                              <tr
                                key={player.id}
                                className="hover:bg-blue-100 dark:hover:bg-blue-900 transition-colors duration-300"
                              >
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                                  #{index + 1}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                                  {player.username}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300 font-medium">
                                  <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                                    {player.points} pts
                                  </span>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
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

const Podium: React.FC<{ players: Player[] }> = ({ players }) => {
  const top3 = players.slice(0, 3);
  const positions = [1, 0, 2];

  return (
    <div className="grid grid-cols-3 gap-4 mb-12 h-64">
      {positions.map((pos, index) => {
        const player = top3[pos];
        if (!player) return null;

        const height = ["h-48", "h-64", "h-36"][pos];
        const colors = [
          "from-yellow-400 to-yellow-200",
          "from-gray-300 to-gray-100",
          "from-amber-600 to-amber-400"
        ][pos];

        return (
          <motion.div
            key={player.id}
            className={`flex flex-col items-center justify-end ${height} ${index === 1 ? 'order-first' : ''}`}
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
            <div className={`w-full bg-gradient-to-b ${colors} rounded-t-lg shadow-lg p-4 text-center`}>
              <div className="text-2xl font-bold text-gray-900">{player.username}</div>
              <div className="text-lg font-semibold text-gray-800">{player.points} pts</div>
            </div>
            <div className="w-full bg-gray-800 text-white text-center py-2 rounded-b-lg">
              #{pos + 1}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default Leaderboard;


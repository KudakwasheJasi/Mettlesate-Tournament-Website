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
import React, { useEffect, useState, useRef, useCallback } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';
import Podium from './Podium';

interface Player {
  id: number;
  username: string;
  name: string;
  points: number;
  email?: string;
  company: string;
}

interface User {
  id: number;
  username: string;
  name: string;
  email: string;
  company: {
    name: string;
  };
}

interface LeaderboardProps {
  onLoadingChange?: (loading: boolean) => void;
}

const Leaderboard: React.FC<LeaderboardProps> = ({ onLoadingChange }): React.ReactElement => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const controls = useAnimation();
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef);

  // Memoize onLoadingChange to avoid unnecessary effect triggers
  const memoizedOnLoadingChange = useCallback(
    (loading: boolean) => {
      if (onLoadingChange) {
        onLoadingChange(loading);
      }
    },
    [onLoadingChange]
  );

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
    let isMounted = true;
    let loadingTimer: NodeJS.Timeout | null = null;
    
    const fetchPlayers = async () => {
      console.log('Starting to fetch players...');
      setLoading(true);
      if (memoizedOnLoadingChange) {
        memoizedOnLoadingChange(true);
      }
      setError(null);

      try {
        // Add a small delay to show loading state
        await new Promise(resolve => {
          loadingTimer = setTimeout(resolve, 1000);
        });
        
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        if (!response.ok) throw new Error('Failed to fetch');
        
        const data: User[] = await response.json();
        console.log('API response received:', data);

        if (!isMounted) return;

              // Process the data - take first 10 users and assign points
        const mappedPlayers: Player[] = data.slice(0, 10).map((user: User, index: number) => ({
          id: user.id,
          username: user.username,
          name: user.name,
          points: 1500 - (index * 150), // Higher points for better differentiation
          email: user.email,
          company: user.company.name
        }));

        // Sort by points in descending order
        const sortedPlayers = mappedPlayers.sort((a, b) => b.points - a.points);
        
        // Log the top 3 players for debugging
        console.log('Top 3 players:', sortedPlayers.slice(0, 3));
        
        if (!isMounted) return;
        
        setPlayers(sortedPlayers);
      } catch (err) {
        console.error('Error in fetchPlayers:', err);
        if (isMounted) {
          setError('Failed to load leaderboard. Please try again later.');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
          if (memoizedOnLoadingChange) {
            memoizedOnLoadingChange(false);
          }
        }
      }
    };

    fetchPlayers();

    return () => {
      isMounted = false;
      if (loadingTimer) {
        clearTimeout(loadingTimer);
      }
      if (memoizedOnLoadingChange) {
        memoizedOnLoadingChange(false);
      }
    };
  }, [memoizedOnLoadingChange]);

  // Debug effect to log state changes
  useEffect(() => {
    if (loading) {
      console.log('Loading leaderboard data...');
    } else if (players && players.length > 0) {
      console.log(`Loaded ${players.length} players`);
    }
  }, [loading, players]);

  // Ensure we have a proper return value
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-sm text-red-700">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <section ref={containerRef} className="py-6 sm:py-8 md:py-12 px-3 sm:px-6 md:px-12 relative bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 min-h-screen">
      <div className="max-w-6xl mx-auto relative pb-16">
        {error && (
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

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 sm:p-6 md:p-8">
              <Podium players={players} className="mb-8 sm:mb-12" />
              
              <motion.div 
                className="overflow-x-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-gray-700">
                    <tr>
                      <th scope="col" className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Rank
                      </th>
                      <th scope="col" className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Player
                      </th>
                      <th scope="col" className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Points
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                    {players.map((player, index) => (
                      <tr
                        key={player.id}
                        className={`transition-colors duration-200 ${
                          index < 3 
                            ? 'bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/20' 
                            : 'hover:bg-blue-50 dark:hover:bg-gray-700'
                        }`}
                      >
                        <td className="px-2 sm:px-3 md:px-6 py-2 sm:py-3 whitespace-nowrap font-medium">
                          <span className={`inline-flex items-center justify-center w-6 h-6 xs:w-7 xs:h-7 sm:w-8 sm:h-8 rounded-full ${
                            index === 0 ? 'bg-yellow-400 text-yellow-900' : 
                            index === 1 ? 'bg-gray-300 text-gray-800' : 
                            index === 2 ? 'bg-amber-600 text-white' : 
                            'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white'
                          } font-bold text-xs sm:text-sm`}>
                            {index + 1}
                          </span>
                        </td>
                        <td className="px-2 sm:px-3 md:px-6 py-2 sm:py-3 whitespace-nowrap">
                          <div className="flex flex-col">
                            <span className="font-medium text-gray-900 dark:text-white">
                              {player.username}
                            </span>
                            <span className="text-xs text-gray-500 dark:text-gray-400 truncate max-w-[120px] sm:max-w-[200px] md:max-w-none">
                              {player.company}
                            </span>
                          </div>
                        </td>
                        <td className="px-2 sm:px-3 md:px-6 py-2 sm:py-3 whitespace-nowrap">
                          <span className={`px-2 py-1 inline-flex text-xs xs:text-sm leading-4 sm:leading-5 font-semibold rounded-full ${
                            index === 0 ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-200' :
                            index === 1 ? 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200' :
                            index === 2 ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-200' :
                            'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                          }`}>
                            {player.points.toLocaleString()} pts
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </motion.div>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Leaderboard;
/**
    * @description      : 
    * @author           : kudakwashe Ellijah
    * @group            : 
    * @created          : 22/07/2025 - 19:33:03
    * 
    * MODIFICATION LOG
    * - Version         : 1.1.0
    * - Date            : 24/07/2025
    * - Author          : kudakwashe Ellijah
    * - Modification    : Updated to fetch from API and map data accordingly
**/
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface Player {
  id: number;
  username: string;
  points: number;
}

const Leaderboard: React.FC = () => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState(true);
  
  console.log('Leaderboard component rendering. Loading state:', loading, 'Players:', players.length);

  useEffect(() => {
    const fetchPlayers = async () => {
      console.log('Starting to fetch players...');
      setLoading(true);
      
      // Add artificial delay to see loading state
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      try {
        console.log('Making API call...');
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        if (!response.ok) throw new Error('Failed to fetch');
        
        const data = await response.json();
        console.log('API response received:', data);

        type User = {
          id: number;
          username: string;
        };

        // Map API data to Player type with random points
        const mappedPlayers: Player[] = data.slice(0, 10).map((user: User) => ({
          id: user.id,
          username: user.username,
          points: Math.floor(Math.random() * 1000) + 500,
        }));
        
        // Sort by points descending
        const sortedPlayers = mappedPlayers.sort((a, b) => b.points - a.points);
        console.log('Setting players data...');
        setPlayers(sortedPlayers);
      } catch (error) {
        console.error('Failed to fetch players:', error);
      } finally {
        console.log('Setting loading to false');
        setLoading(false);
      }
    };
    
    fetchPlayers();
    
    // Cleanup function
    return () => {
      console.log('Cleanup: Cancelling any pending operations');
    };
  }, []);

  // Loading spinner component
  const LoadingSpinner = () => (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-8 rounded-lg shadow-xl text-center">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4">
        </div>
        <h3 className="text-xl font-bold text-gray-800 mb-2">Loading Leaderboard</h3>
        <p className="text-gray-600">Please wait while we fetch the latest rankings...</p>
      </div>
    </div>
  );

  return (
    <section className="py-12 px-6 sm:px-12 md:px-24 relative">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8">Leaderboard</h2>
        {loading && <LoadingSpinner />}
        <div className={loading ? 'opacity-50 pointer-events-none' : ''}>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rank</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Gamer Tag</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Points</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {players.map((player, index) => (
                  <motion.tr
                    key={player.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`px-6 py-4 whitespace-nowrap ${
                      index < 3 ? 'bg-gradient-to-r from-yellow-100 to-yellow-50' : ''
                    }`}
                  >
                    <td className="text-sm font-medium text-gray-900">
                      <div className="flex items-center gap-2">
                        {index < 3 && (
                          <div className="w-4 h-4 rounded-full bg-yellow-500"></div>
                        )}
                        {index + 1}
                      </div>
                    </td>
                    <td className="text-sm text-gray-500">{player.username}</td>
                    <td className="text-sm text-gray-500">{player.points}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Leaderboard;

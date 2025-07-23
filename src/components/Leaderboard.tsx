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

  useEffect(() => {
    const fetchPlayers = async () => {
      setLoading(true);
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        const data = await response.json();

        type User = {
          id: number;
          username: string;
        };

        // Map API data to Player type with random points
        const mappedPlayers: Player[] = data.slice(0, 10).map((user: User) => ({
          id: user.id,
          username: user.username,
          points: Math.floor(Math.random() * 1000) + 500, // random points between 500 and 1500
        }));
        // Sort by points descending
        const sortedPlayers = mappedPlayers.sort((a, b) => b.points - a.points);
        setPlayers(sortedPlayers);
      } catch (error) {
        console.error('Failed to fetch players:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchPlayers();
  }, []);

  return (
    <section className="py-12 px-6 sm:px-12 md:px-24">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8">Leaderboard</h2>
        {loading ? (
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              className="animate-pulse"
            >
              Loading...
            </motion.div>
          </div>
        ) : (
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
        )}
      </div>
    </section>
  );
};

export default Leaderboard;

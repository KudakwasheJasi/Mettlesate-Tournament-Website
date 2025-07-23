/**
    * @description      : 
    * @author           : kudakwashe Ellijah
    * @group            : 
    * @created          : 22/07/2025 - 18:20:00
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 22/07/2025
    * - Author          : kudakwashe Ellijah
    * - Modification    : 
**/
import React from 'react';
import { motion } from 'framer-motion';

const EventDetails: React.FC = () => {
  return (
    <section className="py-12 px-6 sm:px-12 md:px-24">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12 text-blue-600">Event Details</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { title: 'Date & Time', value: 'August 10, 2025 at 6PM SAST', icon: '📅' },
            { title: 'Location', value: 'Online - Streamed live on Twitch', icon: '📍' },
            { title: 'Prize Pool', value: 'R50,000', icon: '💰' },
            { title: 'Format', value: 'Round Robin, Double Elimination', icon: '🏆' },
          ].map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex items-center justify-center mb-4">
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="text-4xl text-blue-500"
                >
                  {item.icon}
                </motion.span>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">{item.title}</h3>
              <p className="text-gray-600">{item.value}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EventDetails;

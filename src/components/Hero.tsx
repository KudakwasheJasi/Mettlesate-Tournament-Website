/**
    * @description      : 
    * @author           : kudakwashe Ellijah
    * @group            : 
    * @created          : 22/07/2025 - 13:11:22
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 22/07/2025
    * - Author          : kudakwashe Ellijah
    * - Modification    : 
**/
// components/Hero.tsx
import React from 'react';
import { motion } from 'framer-motion';

const Hero: React.FC<{ onRegisterClick: () => void }> = ({ onRegisterClick }) => {
  return (
    <section className="relative h-screen flex flex-col justify-center items-center text-white px-4 text-center overflow-hidden">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover"
      >
        <source src="/istockphoto-484131978-640_adpp_is.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div
        className="absolute top-0 left-0 w-full h-full z-10"
        style={{
          backgroundImage:
            'linear-gradient(to top, rgba(0,0,0,0.8), transparent 30%), ' +
            'linear-gradient(to bottom, rgba(0,0,0,0.8), transparent 30%), ' +
            'linear-gradient(to left, rgba(0,0,0,0.8), transparent 30%), ' +
            'linear-gradient(to right, rgba(0,0,0,0.8), transparent 30%), ' +
            'radial-gradient(circle, rgba(0,0,0,0.8) 0%, transparent 70%)',
          backgroundRepeat: 'no-repeat, no-repeat, no-repeat, no-repeat, no-repeat',
          backgroundPosition: 'top, bottom, left, right, center',
          backgroundSize: '100% 20px, 100% 20px, 20px 100%, 100% 100%, 100% 100%',
        }}
      ></div>
      <motion.div
        className="relative p-8 rounded-lg max-w-3xl z-20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <motion.h1
          className="text-5xl font-extrabold mb-4"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          Legends of Victory: Battle Royale Cup
        </motion.h1>
        <motion.p
          className="text-xl mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          Compete for glory. Only one can win.
        </motion.p>
        <motion.button
          onClick={onRegisterClick}
          className="bg-red-600 hover:bg-red-700 transition rounded-md px-6 py-3 text-lg font-semibold"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.5 }}
        >
          Register Now
        </motion.button>
      </motion.div>
    </section>
  );
};

export default Hero;

/**
    * @description      : 
    * @author           : kudakwashe Ellijah
    * @group            : 
    * @created          : 22/07/2025 - 13:11:22
    * 
    * MODIFICATION LOG
    * - Version         : 1.1.0
    * - Date            : 28/07/2025
    * - Author          : kudakwashe Ellijah
    * - Modification    : Added alternating video playback in Hero component
**/
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

const Hero: React.FC<{ onRegisterClick: () => void }> = ({ onRegisterClick }) => {
  const videos = [
    "/istockphoto-484131978-640_adpp_is.mp4",
    "/istockphoto-145566776-640_adpp_is.mp4"
  ];
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % videos.length);
    }, 10000); // Switch video every 10 seconds

    return () => clearInterval(interval);
  }, [videos.length]);

  return (
    <section className="relative min-h-[75vh] flex flex-col justify-center items-center text-white px-4 text-center py-20">
      <div className="absolute top-6 left-6 z-30 transition-transform duration-300 hover:scale-105">
        <Image 
          src="/Mettlestate-logo.png" 
          alt="MettleSate Logo" 
          width={80}
          height={80}
          className="drop-shadow-lg"
        />
      </div>
      <video
        key={videos[currentVideoIndex]} // key to force reload on source change
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover pointer-events-none"
      >
        <source src={videos[currentVideoIndex]} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div
        className="absolute top-0 left-0 w-full h-full z-10"
        style={{
          backgroundImage:
            'linear-gradient(to top, rgba(0,0,0,0.7), transparent 40%), ' +
            'linear-gradient(to bottom, rgba(0,0,0,0.7), transparent 40%), ' +
            'linear-gradient(to left, rgba(0,0,0,0.6), transparent 40%), ' +
            'linear-gradient(to right, rgba(0,0,0,0.6), transparent 40%), ' +
            'radial-gradient(circle, rgba(0,0,0,0.6) 0%, transparent 80%)',
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
          transition={{ delay: 0.5, duration: 0.5 }}
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

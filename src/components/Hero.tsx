/**
    * @description      : 
    * @author           : kudakwashe Ellijah
    * @group            : 
    * @created          : 22/07/2025 - 13:11:22
    * 
    * MODIFICATION LOG
    * - Version         : 1.4.0
    * - Date            : 31/07/2025
    * - Author          : kudakwashe Ellijah
    * - Modification    : Updated Hero component with animated modal for registration form
**/
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Modal from './Modal';
import RegistrationForm from './RegistrationForm';

const Hero: React.FC = () => {
  const videos = [
    "/istockphoto-484131978-640_adpp_is.mp4",
    "/istockphoto-145566776-640_adpp_is.mp4"
  ];
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % videos.length);
    }, 5000); // Switch video every 10 seconds

    return () => clearInterval(interval);
  }, [videos.length]);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <section className="relative min-h-[75vh] flex flex-col justify-center items-center text-white px-4 text-center py-20 sm:py-16 sm:px-6 xs:px-4 xs:py-12">
        <div className="absolute top-6 left-6 z-30 transition-transform duration-300 hover:scale-105">
          <Image 
            src="/Mettlesate-logo.PNG" 
            alt="MettleSate Logo" 
            width={200}
            height={200}
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
          className="relative p-6 rounded-lg max-w-3xl z-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <motion.h1
            className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4 sm:mb-6"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, duration: 0.3}}
          >
            Legends of Victory: Battle Royale Cup
          </motion.h1>
          <motion.p
            className="text-sm xs:text-base sm:text-lg md:text-xl mb-6 sm:mb-8 md:mb-10 text-gray-200"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1}}
          >
            Compete for glory. Only one can win.
          </motion.p>
          <motion.button
            onClick={openModal}
            className="bg-red-600 hover:bg-red-700 transition rounded-lg px-8 py-3 text-base sm:text-lg md:text-xl font-bold shadow-lg mt-2"
            whileHover={{ scale: 1.05, boxShadow: '0 0 15px rgba(239, 68, 68, 0.6)' }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.5 }}
          >
            Register Now
          </motion.button>
        </motion.div>
      </section>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <RegistrationForm onClose={closeModal} />
      </Modal>
    </>
  );
};

export default Hero;
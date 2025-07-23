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
import React, { useEffect, useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useAnimation, Variants } from 'framer-motion';

// Gradient colors for the brilliant effect
const gradientColors = [
  '#ff0000', '#ff7f00', '#ffff00', '#00ff00',
  '#0000ff', '#4b0082', '#9400d3', '#ff1493'
];

// Animation configuration for the border
const borderAnimation = {
  initial: { rotate: 0 },
  animate: { 
    rotate: 360,
    transition: {
      duration: 20,
      repeat: Infinity,
      ease: 'linear',
    },
  },
};

const EventDetails: React.FC = () => {
  const [moneyParticles, setMoneyParticles] = useState<{id: number; x: number; y: number; rotate: number}[]>([]);
  
  // Generate money particles for the prize bag
  useEffect(() => {
    const interval = setInterval(() => {
      setMoneyParticles(prev => [
        ...prev.slice(-10), // Keep only last 10 particles
        {
          id: Date.now(),
          x: Math.random() * 100,
          y: 0,
          rotate: Math.random() * 360
        }
      ]);
    }, 300);

    return () => clearInterval(interval);
  }, []);

  // Remove old particles
  useEffect(() => {
    if (moneyParticles.length > 20) {
      setMoneyParticles(prev => prev.slice(prev.length - 20));
    }
  }, [moneyParticles]);

  // Animation controls for the border
  const controls = useAnimation();
  const animationFrameRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);
  const progressRef = useRef<number>(0);

  // Animation loop
  const animate = useCallback((timestamp: number) => {
    if (!startTimeRef.current) startTimeRef.current = timestamp;
    const elapsed = timestamp - startTimeRef.current;
    const progress = (elapsed % 20000) / 20000; // 20 second loop
    progressRef.current = progress * 360; // Convert to degrees
    
    controls.set({
      rotate: progressRef.current,
    });
    
    animationFrameRef.current = requestAnimationFrame(animate);
  }, [controls]);

  // Start and clean up animation
  useEffect(() => {
    animationFrameRef.current = requestAnimationFrame(animate);
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [animate]);

  // Define the type for our event detail item
  interface EventDetailItem {
    title: string;
    value: string;
    icon: React.ReactNode;
    animation: Variants;
    isPrize?: boolean;
  }

  const eventDetails: EventDetailItem[] = [
    { 
      title: 'Date & Time', 
      value: 'August 10, 2025 at 6PM SAST', 
      icon: '📅',
      animation: {
        initial: { 
          rotate: 0,
          opacity: 0,
          y: 20
        },
        animate: { 
          rotate: [0, 10, -10, 0],
          opacity: 1,
          y: 0,
          transition: {
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }
        },
        exit: {
          opacity: 0,
          y: -20
        }
      }
    },
    { 
      title: 'Location', 
      value: 'Online - Streamed live on Twitch', 
      icon: '📍',
      animation: {
        initial: { 
          y: 20,
          opacity: 0 
        },
        animate: {
          y: [0, -5, 0],
          opacity: 1,
          transition: {
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }
        },
        exit: {
          opacity: 0,
          y: -20
        }
      }
    },
    { 
      title: 'Prize Pool', 
      value: 'R50,000', 
      icon: '💰',
      animation: {
        initial: { 
          rotate: 0, 
          scale: 1,
          opacity: 0
        },
        animate: {
          rotate: [0, 15, -15, 0],
          scale: [1, 1.2, 1],
          opacity: 1,
          transition: {
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }
        },
        exit: {
          opacity: 0,
          scale: 0.8
        }
      },
      isPrize: true
    },
    { 
      title: 'Format', 
      value: 'Round Robin, Double Elimination', 
      icon: '🏆',
      animation: {
        initial: { 
          rotate: 0,
          opacity: 0
        },
        animate: {
          rotate: [0, 0, 360],
          opacity: 1,
          transition: {
            duration: 8,
            repeat: Infinity,
            ease: "linear"
          }
        },
        exit: {
          opacity: 0,
          rotate: 90
        }
      }
    },
  ];

  return (
    <section className="py-12 px-6 sm:px-12 md:px-24 relative overflow-hidden min-h-[600px] flex items-center bg-black/50">
      {/* Background overlay */}
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm z-0"></div>
      
      {/* Animated border effect at container edge */}
      <motion.div 
        className="absolute inset-0"
        style={{
          zIndex: 5,
          padding: '2px',
          background: 'linear-gradient(90deg, #ff0000, #ff7f00, #ffff00, #00ff00, #0000ff, #4b0082, #9400d3, #ff1493, #ff0000)',
          backgroundSize: '400% 100%',
        }}
        animate={{
          backgroundPosition: ['0% 0%', '200% 0%']
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'linear'
        }}
      >
        <div className="w-full h-full bg-gray-900/95 backdrop-blur-sm">
          {/* Content will go here */}
        </div>
      </motion.div>
      
      {/* Glow effect */}
      <motion.div 
        className="absolute inset-0 pointer-events-none"
        style={{
          zIndex: 6,
          boxShadow: '0 0 40px 10px rgba(59, 130, 246, 0.4)'
        }}
        animate={{
          boxShadow: [
            '0 0 40px 10px rgba(59, 130, 246, 0.4)',
            '0 0 60px 15px rgba(124, 58, 237, 0.5)',
            '0 0 40px 10px rgba(59, 130, 246, 0.4)'
          ]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
      />
      
      {/* Content container */}
      <div className="w-full max-w-5xl mx-auto relative z-10 p-8">
        <h2 className="text-3xl font-bold text-center mb-12 text-blue-600">Event Details</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {eventDetails.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="relative flex items-center justify-center mb-4 h-16">
                <motion.span
                  initial="initial"
                  animate="animate"
                  variants={item.animation}
                  className="text-4xl text-blue-500 z-10 relative"
                >
                  {item.icon}
                </motion.span>
                {item.isPrize && (
                  <div className="absolute inset-0 overflow-visible">
                    <AnimatePresence>
                      {moneyParticles.map((particle) => (
                        <motion.div
                          key={particle.id}
                          initial={{
                            x: '50%',
                            y: '50%',
                            opacity: 1,
                            scale: 1,
                            rotate: particle.rotate
                          }}
                          animate={{
                            x: `${particle.x}%`,
                            y: `-100%`,
                            opacity: 0,
                            scale: 0.5,
                            rotate: particle.rotate + 360
                          }}
                          transition={{
                            duration: 2,
                            ease: 'easeOut'
                          }}
                          className="absolute text-yellow-400 text-xl"
                          style={{
                            left: '50%',
                            top: '50%',
                            transform: 'translate(-50%, -50%)'
                          }}
                        >
                          💵
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                )}
              </div>
              <motion.h3 
                className="text-xl font-semibold mb-2 text-gray-800"
                whileHover={{ scale: 1.05 }}
              >
                {item.title}
              </motion.h3>
              <motion.p 
                className="text-gray-600"
                whileHover={{ scale: 1.02 }}
              >
                {item.value}
              </motion.p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EventDetails;

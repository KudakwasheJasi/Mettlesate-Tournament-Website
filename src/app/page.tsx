/**
    * @description      : 
    * @author           : kudakwashe Ellijah
    * @group            : 
    * @created          : 22/07/2025 - 13:39:44
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 22/07/2025
    * - Author          : kudakwashe Ellijah
    * - Modification    : 
**/
// src/app/page.tsx  (if using App Router)
// or src/pages/index.tsx (if using Pages Router)

'use client';

import React, { useState, useEffect } from "react";
import Hero from "../components/Hero";
import EventDetails from "../components/EventDetails";
import { RegistrationForm } from "../components/RegistrationForm";
import Leaderboard from "../components/Leaderboard";
import FAQ from "../components/FAQ";
import Footer from "../components/Footer";

const LoadingDots: React.FC = () => {
  return (
    <div className="relative flex justify-center items-center h-40 w-40">
      <div className="flex space-x-2 justify-center items-center relative z-10">
        {[...Array(4)].map((_, i) => (
          <span
            key={i}
            className="inline-block w-4 h-4 bg-red-600 rounded-full animate-wave"
            style={{ animationDelay: `${i * 0.3}s` }}
          />
        ))}
      </div>
      <style jsx>{`
        @keyframes wave {
          0%, 60%, 100% {
            transform: translateY(0);
          }
          30% {
            transform: translateY(-10px);
          }
        }
        .animate-wave {
          animation: wave 1.2s infinite;
        }
      `}</style>
    </div>
  );
};

export default function Home() {
  const [showRegister, setShowRegister] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showLoadingDots, setShowLoadingDots] = useState(false);

  const handleRegisterClick = () => {
    setShowLoadingDots(true);
    setTimeout(() => {
      setShowLoadingDots(false);
      setShowRegister(true);
    }, 2000); // 2 seconds loading animation
  };

  const handleCloseModal = () => {
    setShowRegister(false);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500); // simulate loading delay
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-24 w-24"></div>
      </div>
    );
  }

  if (showLoadingDots) {
    return (
      <div className="flex items-center justify-center h-screen">
        <LoadingDots />
      </div>
    );
  }

  return (
    <>
      {!showRegister && <Hero onRegisterClick={handleRegisterClick} />}
      {!showRegister && <EventDetails />}
      {!showRegister && <Leaderboard />}
      {!showRegister && <FAQ />}
      {!showRegister && <Footer />}
      {showRegister && (
        <RegistrationForm
          onClose={handleCloseModal}
          onSubmit={(data) => {
            // Handle form submission here
            console.log('Registration data:', data);
            // Simulate API call or other submission logic
            setTimeout(() => {
              handleCloseModal();
            }, 1000); // Simulate async operation
          }}
        />
      )}
    </>
  );
}

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

import React, { useState, useEffect, useCallback } from "react";
import Hero from "../components/Hero";
import EventDetails from "../components/EventDetails";
import RegistrationForm from "../components/RegistrationForm";
import Leaderboard from "../components/Leaderboard";
import FAQ from "../components/FAQ";
import Footer from "../components/Footer";

/* Removed unused LoadingDots component to fix eslint warning */

const isTestEnv = process.env.NODE_ENV === 'test';

export default function Home() {
  const [showRegister, setShowRegister] = useState(false);
  const [loading, setLoading] = useState(!isTestEnv);
  const [leaderboardLoading, setLeaderboardLoading] = useState(true);
  const [leaderboardMounted] = useState(false);
  const [initialLoad, setInitialLoad] = useState(!isTestEnv);

  const handleLeaderboardLoadingChange = useCallback((loading: boolean) => {
    console.log('Leaderboard loading state:', loading);
    setLeaderboardLoading(loading);
  }, []);

  // Removed unused handleRegisterClick function to fix eslint warning

  const handleCloseModal = () => {
    setShowRegister(false);
  };

  useEffect(() => {
    if (isTestEnv) {
      setLoading(false);
      setInitialLoad(false);
      return;
    }
    const timer = setTimeout(() => {
      // First, complete the main app loading
      setLoading(false);
      
      // Then, after a small delay, allow the Leaderboard to start loading
      const leaderboardTimer = setTimeout(() => {
        setInitialLoad(false);
      }, 5000);
      
      return () => clearTimeout(leaderboardTimer);
    }, 1500); // Initial app loading delay
    
    return () => clearTimeout(timer);
  }, [isTestEnv]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-24 w-24"></div>
      </div>
    );
  }

  return (
    <>
      {!showRegister && (
        <>
          <Hero />
          <EventDetails />
          <div className="relative min-h-[50vh]">
            {initialLoad ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="animate-spin rounded-full h-20 w-20 border-t-2 border-b-2 border-blue-500 mb-4"></div>
                <p className="text-gray-700 dark:text-gray-300 text-lg font-medium">
                  Loading tournament data...
                </p>
              </div>
            ) : (
              <>
                {leaderboardLoading && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-white bg-opacity-80 z-10">
                    <div className="animate-spin rounded-full h-20 w-20 border-t-2 border-b-2 border-blue-500 mb-4"></div>
                    <p className="text-gray-700 dark:text-gray-300 text-lg font-medium">
                      Loading leaderboard data...
                    </p>
                  </div>
                )}
                <Leaderboard 
                  onLoadingChange={handleLeaderboardLoadingChange} 
                  key={String(leaderboardMounted)}
                />
              </>
            )}
          </div>
          <FAQ />
          <Footer />
        </>
      )}
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

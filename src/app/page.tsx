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
import Image from "next/image";
import Hero from "@/components/Hero";

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
      {showRegister && (
          <div
            className="fixed inset-0 flex items-center justify-center bg-cover bg-center"
            style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=1920&q=80")' }}
          >
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
              {/* Removed the Register heading text as requested */}
              <form className="space-y-4" noValidate>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Name</label>
                  <input type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <input type="email" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Password</label>
                  <input type="password" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" />
                </div>
                <button
                  type="submit"
                  className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Register
                </button>
              </form>
              <button
                onClick={handleCloseModal}
                className="mt-4 text-indigo-600 hover:text-indigo-500"
              >
                Cancel
              </button>
            </div>
          </div>
      )}
    </>
  );
}

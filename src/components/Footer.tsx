/**
    * @description      : 
    * @author           : kudakwashe Ellijah
    * @group            : 
    * @created          : 22/07/2025 - 23:49:35
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 22/07/2025
    * - Author          : kudakwashe Ellijah
    * - Modification    : 
**/
/**
 * @description      : Footer component with logo placeholder and social links
 * @author           : kudakwashe Ellijah
 * @created          : 24/07/2025
 * 
 * MODIFICATION LOG
 * - Version         : 1.0.0
 * - Date            : 24/07/2025
 * - Author          : kudakwashe Ellijah
 * - Modification    : Created Footer component
 **/
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-8 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
            MS
          </div>
          <span className="text-xl font-semibold">Mettlestate</span>
        </div>
        <div className="flex gap-6">
          <a href="#" aria-label="Facebook" className="hover:text-white transition">
            <svg
              className="w-6 h-6 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M22 12a10 10 0 10-11.5 9.9v-7h-2v-3h2v-2c0-2 1-3 3-3h2v3h-2c-.5 0-1 .5-1 1v1h3l-1 3h-2v7A10 10 0 0022 12z" />
            </svg>
          </a>
          <a href="#" aria-label="Twitter" className="hover:text-white transition">
            <svg
              className="w-6 h-6 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M23 3a10.9 10.9 0 01-3.14.86 4.48 4.48 0 001.98-2.48 9.14 9.14 0 01-2.88 1.1 4.52 4.52 0 00-7.7 4.13A12.8 12.8 0 013 4.15a4.52 4.52 0 001.4 6.05 4.48 4.48 0 01-2.05-.57v.06a4.52 4.52 0 003.63 4.43 4.52 4.52 0 01-2.04.08 4.52 4.52 0 004.22 3.14A9 9 0 013 19.54a12.7 12.7 0 006.92 2" />
            </svg>
          </a>
          <a href="#" aria-label="Instagram" className="hover:text-white transition">
            <svg
              className="w-6 h-6 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M7 2C4.243 2 2 4.243 2 7v10c0 2.757 2.243 5 5 5h10c2.757 0 5-2.243 5-5V7c0-2.757-2.243-5-5-5H7zm10 3a1 1 0 110 2 1 1 0 010-2zm-5 2a5 5 0 110 10 5 5 0 010-10zm0 2a3 3 0 100 6 3 3 0 000-6z" />
            </svg>
          </a>
        </div>
      </div>
      <div className="text-center text-sm mt-6 text-gray-500">
        &copy; {new Date().getFullYear()} Mettlestate. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;

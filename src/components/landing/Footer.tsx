
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 py-12 text-gray-400">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-between space-y-6 md:flex-row md:space-y-0">
          <div className="flex items-center space-x-2">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M16 4C9.4 4 4 9.4 4 16C4 22.6 9.4 28 16 28C22.6 28 28 22.6 28 16C28 9.4 22.6 4 16 4ZM16 26C10.5 26 6 21.5 6 16C6 10.5 10.5 6 16 6C21.5 6 26 10.5 26 16C26 21.5 21.5 26 16 26Z" fill="#AB0006"/>
              <path d="M16 10C13.8 10 12 11.8 12 14C12 16.2 13.8 18 16 18C18.2 18 20 16.2 20 14C20 11.8 18.2 10 16 10Z" fill="#AB0006"/>
              <path d="M13 20C11 20 10 22 10 23C10 24 10.5 25 12 25C13.5 25 14.5 24 15 23C15.5 22 15 20 13 20Z" fill="#AB0006"/>
              <path d="M19 20C21 20 22 22 22 23C22 24 21.5 25 20 25C18.5 25 17.5 24 17 23C16.5 22 17 20 19 20Z" fill="#AB0006"/>
            </svg>
            <span className="text-xl font-bold text-white">PetFeed WMS</span>
          </div>
          <div className="flex space-x-8">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Contact</a>
          </div>
          <div className="text-center md:text-right">
            <p>© 2023 PetFeed WMS. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

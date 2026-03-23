import React from 'react';
import PasswordGenerator from './components/PasswordGenerator';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <div className="relative min-h-screen w-full bg-moto-dark flex flex-col overflow-hidden">
      {/* Animated Background Blobs */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-10 left-5 sm:left-10 w-40 h-40 sm:w-72 sm:h-72 bg-moto-purple opacity-30 rounded-full blur-3xl animate-blob"></div>
        <div className="absolute bottom-10 right-5 sm:right-10 w-48 h-48 sm:w-80 sm:h-80 bg-moto-primary opacity-20 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-56 h-56 sm:w-96 sm:h-96 bg-blue-600 opacity-20 rounded-full blur-3xl animate-blob animation-delay-4000"></div>
      </div>

      <Navbar />

      {/* Content */}
      <div className="z-10 w-full flex-grow flex flex-col items-center justify-center px-4 py-6 sm:px-6 sm:py-8">
        <div className="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl">
          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-5 sm:mb-7 md:mb-8 text-transparent bg-clip-text bg-gradient-to-r from-moto-primary to-moto-secondary">
            Random Password Generator
          </h1>
          <PasswordGenerator />
        </div>
      </div>

      <Footer />

      <Toaster position="bottom-center" toastOptions={{
        style: {
          background: '#18181b',
          color: '#fff',
        },
      }} />
    </div>
  );
}

export default App;

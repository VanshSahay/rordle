"use client";

import { useEffect, useState } from "react";
import { BrainrotItem } from "~/lib/brainrotData";

interface BrainrotImageDisplayProps {
  brainrotItem: BrainrotItem;
  onTimerComplete: () => void;
  displayDuration?: number; // in seconds
}

export function BrainrotImageDisplay({ 
  brainrotItem, 
  onTimerComplete, 
  displayDuration = 5 
}: BrainrotImageDisplayProps) {
  const [timeLeft, setTimeLeft] = useState(displayDuration);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    if (timeLeft <= 0) {
      onTimerComplete();
      return;
    }

    const timer = setTimeout(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft, onTimerComplete]);

  useEffect(() => {
    // Reset timer when brainrot item changes
    setTimeLeft(displayDuration);
    setImageLoaded(false);
  }, [brainrotItem, displayDuration]);

  return (
    <div className="flex flex-col items-center justify-center h-full bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white relative overflow-hidden">
      {/* Background pattern for that brainrot aesthetic */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3Cpattern id='grid' width='20' height='20' patternUnits='userSpaceOnUse'%3E%3Cpath d='M 20 0 L 0 0 0 20' fill='none' stroke='white' stroke-width='1'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='100%25' height='100%25' fill='url(%23grid)' /%3E%3C/svg%3E")`
        }}></div>
      </div>

      {/* Timer display */}
      <div className="absolute top-4 right-4 bg-red-500 text-white rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold shadow-lg animate-pulse">
        {timeLeft}
      </div>

      {/* Main content */}
      <div className="text-center space-y-6 z-10 px-4">
        <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 bg-clip-text text-transparent animate-pulse">
          BRAINROT ALERT! 🧠💀
        </h1>
        
        <p className="text-xl md:text-2xl text-cyan-300 font-semibold">
          Study this image carefully! You&apos;ll need to guess what it is!
        </p>

        {/* Image container */}
        <div className="relative mx-auto max-w-md w-full">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20 shadow-2xl">
            {!imageLoaded && (
              <div className="w-full h-64 bg-gray-800 rounded-lg flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
              </div>
            )}
            <img
              src={brainrotItem.imageUrl}
              alt="Brainrot content"
              className={`w-full h-64 object-cover rounded-lg transition-opacity duration-300 ${
                imageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              onLoad={() => setImageLoaded(true)}
              onError={() => {
                // Fallback to a default brainrot image or placeholder
                setImageLoaded(true);
              }}
            />
          </div>
        </div>

        <p className="text-lg text-yellow-300 font-medium">
          Get ready to type what you think this represents! 🤔
        </p>

        {/* Progress bar */}
        <div className="w-full max-w-md mx-auto bg-gray-700 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-green-500 to-red-500 h-2 rounded-full transition-all duration-1000 ease-linear"
            style={{ width: `${((displayDuration - timeLeft) / displayDuration) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Fun animations */}
      <div className="absolute bottom-4 left-4 text-6xl animate-bounce">
        🚀
      </div>
      <div className="absolute top-1/4 left-8 text-4xl animate-ping">
        💥
      </div>
      <div className="absolute bottom-1/3 right-8 text-5xl animate-pulse">
        🔥
      </div>
    </div>
  );
}

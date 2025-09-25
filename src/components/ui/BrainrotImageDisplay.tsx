"use client";

import { useEffect, useState } from "react";
import { BrainrotItem } from "~/lib/brainrotData";

interface BrainrotImageDisplayProps {
  brainrotItem: BrainrotItem;
  onTimerComplete: () => void;
  onQuit?: () => void;
  displayDuration?: number; // in seconds
}

export function BrainrotImageDisplay({ 
  brainrotItem, 
  onTimerComplete, 
  onQuit,
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
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white relative">
      {/* Quit button */}
      {onQuit && (
        <div className="absolute top-6 left-6">
          <button
            onClick={onQuit}
            className="px-3 py-1 text-sm border border-gray-600 text-gray-400 hover:bg-gray-600 hover:text-white transition-colors"
          >
            ← QUIT
          </button>
        </div>
      )}

      {/* Timer display */}
      <div className="absolute top-6 right-6 bg-black text-white rounded w-12 h-12 flex items-center justify-center text-lg font-mono border border-gray-600">
        {timeLeft}
      </div>

      {/* Main content */}
      <div className="text-center space-y-8 px-4 max-w-lg mx-auto">
        <div className="space-y-4">
          <h1 className="text-2xl font-bold text-white">
            Study this image
          </h1>
          
          <p className="text-gray-400 text-sm">
            You&apos;ll need to guess what it represents
          </p>
        </div>

        {/* Image container */}
        <div className="relative mx-auto w-full max-w-sm">
          <div className="bg-black border border-gray-600 p-4">
            {!imageLoaded && (
              <div className="w-full h-64 bg-gray-800 flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
              </div>
            )}
            <img
              src={brainrotItem.imageUrl}
              alt="Content to guess"
              className={`w-full h-64 object-cover transition-opacity duration-300 ${
                imageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              onLoad={() => setImageLoaded(true)}
              onError={() => {
                setImageLoaded(true);
              }}
            />
          </div>
        </div>

        {/* Progress bar */}
        <div className="w-full max-w-sm mx-auto">
          <div className="bg-gray-700 h-1 rounded">
            <div 
              className="bg-white h-1 rounded transition-all duration-1000 ease-linear"
              style={{ width: `${((displayDuration - timeLeft) / displayDuration) * 100}%` }}
            ></div>
          </div>
          <p className="text-gray-500 text-xs mt-2">
            {timeLeft} seconds remaining
          </p>
        </div>
      </div>
    </div>
  );
}

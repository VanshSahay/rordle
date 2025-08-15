"use client";

import { cn } from "~/lib/utils";

export interface LetterResult {
  letter: string;
  status: 'correct' | 'present' | 'absent';
}

export interface FlexibleWordDisplayProps {
  currentGuess: string;
  previousGuesses: LetterResult[][];
  maxAttempts: number;
  targetWordLength: number;
}

export function FlexibleWordDisplay({ 
  currentGuess, 
  previousGuesses, 
  maxAttempts,
  targetWordLength 
}: FlexibleWordDisplayProps) {
  const renderLetterBox = (letter: string, status: 'correct' | 'present' | 'absent' | 'current' | 'empty', index: number) => {
    return (
      <div
        key={index}
        className={cn(
          "inline-flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 border-2 text-sm sm:text-base font-bold uppercase transition-all duration-300 mx-0.5",
          {
            // Current guess
            "border-gray-400 bg-background text-foreground": status === 'current',
            
            // Empty placeholder
            "border-gray-300 bg-background text-transparent": status === 'empty',
            
            // Correct letter in correct position
            "border-green-500 bg-green-500 text-white scale-105": status === 'correct',
            
            // Correct letter in wrong position
            "border-yellow-500 bg-yellow-500 text-white scale-105": status === 'present',
            
            // Letter not in word
            "border-gray-500 bg-gray-500 text-white": status === 'absent',
          }
        )}
      >
        {letter}
      </div>
    );
  };

  const renderGuessRow = (guess: LetterResult[], index: number) => {
    return (
      <div key={index} className="flex justify-center items-center mb-2 px-2">
        <div className="flex items-center">
          {guess.map((letterResult, letterIndex) => 
            renderLetterBox(letterResult.letter, letterResult.status, letterIndex)
          )}
        </div>
      </div>
    );
  };

  const renderCurrentGuess = () => {
    const letters = currentGuess.split('');
    const boxes = [];
    
    // Show typed letters
    for (let i = 0; i < letters.length; i++) {
      boxes.push(renderLetterBox(letters[i], 'current', i));
    }
    
    // Show placeholder for remaining letters (based on target word length as hint)
    for (let i = letters.length; i < Math.max(targetWordLength, letters.length + 1); i++) {
      boxes.push(renderLetterBox('', 'empty', i));
    }
    
    return (
      <div className="flex justify-center items-center mb-2 px-2">
        <div className="flex items-center">
          {boxes}
        </div>
      </div>
    );
  };

  return (
    <div className="w-full max-w-lg mx-auto">
      <div className="space-y-1">
        {/* Previous guesses */}
        {previousGuesses.map((guess, index) => renderGuessRow(guess, index))}
        
        {/* Current guess */}
        {previousGuesses.length < maxAttempts && renderCurrentGuess()}
        
        {/* Show attempts remaining */}
        <div className="text-center mt-4">
          <p className="text-sm text-muted-foreground">
            Attempt {previousGuesses.length + 1} of {maxAttempts}
          </p>
          <p className="text-xs text-purple-600 mt-1">
            Target length: {targetWordLength} letters
          </p>
        </div>
      </div>
    </div>
  );
}

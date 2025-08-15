"use client";

import { cn } from "~/lib/utils";

export interface LetterState {
  letter: string;
  status: 'correct' | 'present' | 'absent' | 'empty';
}

export interface WordleGridProps {
  guesses: LetterState[][];
  currentGuess: string;
  currentRow: number;
}

export function WordleGrid({ guesses, currentGuess, currentRow }: WordleGridProps) {
  const renderCell = (letter: LetterState, rowIndex: number, colIndex: number) => {
    const isCurrentRow = rowIndex === currentRow;
    const isCurrentGuessPosition = isCurrentRow && colIndex < currentGuess.length;
    const displayLetter = isCurrentGuessPosition ? currentGuess[colIndex] : letter.letter;
    
    return (
      <div
        key={`${rowIndex}-${colIndex}`}
        className={cn(
          "w-12 h-12 sm:w-14 sm:h-14 border-2 flex items-center justify-center text-lg sm:text-xl font-bold uppercase transition-colors duration-200",
          {
            // Empty state
            "border-border bg-background text-foreground": letter.status === 'empty' && !isCurrentGuessPosition,
            
            // Current guess
            "border-foreground bg-background text-foreground": isCurrentGuessPosition,
            
            // Correct letter in correct position
            "border-green-500 bg-green-500 text-white": letter.status === 'correct',
            
            // Correct letter in wrong position
            "border-yellow-500 bg-yellow-500 text-white": letter.status === 'present',
            
            // Letter not in word
            "border-gray-500 bg-gray-500 text-white": letter.status === 'absent',
          }
        )}
      >
        {displayLetter}
      </div>
    );
  };

  return (
    <div className="grid grid-rows-6 gap-2 p-4">
      {Array.from({ length: 6 }, (_, rowIndex) => (
        <div key={rowIndex} className="grid grid-cols-5 gap-2">
          {Array.from({ length: 5 }, (_, colIndex) => {
            const letter = guesses[rowIndex]?.[colIndex] || { letter: '', status: 'empty' as const };
            return renderCell(letter, rowIndex, colIndex);
          })}
        </div>
      ))}
    </div>
  );
}

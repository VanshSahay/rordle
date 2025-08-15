"use client";

import { cn } from "~/lib/utils";

export interface KeyboardProps {
  onKeyPress: (key: string) => void;
  onEnter: () => void;
  onBackspace: () => void;
  letterStatuses: Record<string, 'correct' | 'present' | 'absent' | 'unused'>;
}

const KEYBOARD_ROWS = [
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
  ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'BACKSPACE']
];

export function WordleKeyboard({ onKeyPress, onEnter, onBackspace, letterStatuses }: KeyboardProps) {
  const getKeyClassName = (key: string) => {
    if (key === 'ENTER' || key === 'BACKSPACE') {
      return "px-2 sm:px-3 py-3 sm:py-4 text-xs font-semibold bg-muted hover:bg-muted/80 text-muted-foreground";
    }

    const status = letterStatuses[key];
    
    return cn(
      "w-7 h-10 sm:w-8 sm:h-12 text-xs sm:text-sm font-semibold transition-colors duration-200",
      {
        // Default state
        "bg-muted hover:bg-muted/80 text-muted-foreground": status === 'unused',
        
        // Correct letter in correct position
        "bg-green-500 hover:bg-green-600 text-white": status === 'correct',
        
        // Correct letter in wrong position
        "bg-yellow-500 hover:bg-yellow-600 text-white": status === 'present',
        
        // Letter not in word
        "bg-gray-500 hover:bg-gray-600 text-white": status === 'absent',
      }
    );
  };

  const handleKeyClick = (key: string) => {
    if (key === 'ENTER') {
      onEnter();
    } else if (key === 'BACKSPACE') {
      onBackspace();
    } else {
      onKeyPress(key);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-2">
      {KEYBOARD_ROWS.map((row, rowIndex) => (
        <div key={rowIndex} className="flex gap-1 mb-1 justify-center">
          {row.map((key) => (
            <button
              key={key}
              onClick={() => handleKeyClick(key)}
              className={cn(
                "rounded flex items-center justify-center select-none cursor-pointer active:scale-95 transition-transform",
                getKeyClassName(key)
              )}
            >
              {key === 'BACKSPACE' ? '⌫' : key}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
}

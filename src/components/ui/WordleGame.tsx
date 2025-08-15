"use client";

import { useState, useEffect, useCallback } from "react";
import { WordleGrid, LetterState } from "./WordleGrid";
import { WordleKeyboard } from "./WordleKeyboard";
import { Button } from "./Button";

// Simple word list for the demo
const WORDS = [
  'REACT', 'FRAME', 'NEYNAR', 'WORLD', 'HAPPY', 'SMART', 'QUICK', 'BRAIN',
  'HEART', 'DREAM', 'LIGHT', 'PEACE', 'MAGIC', 'POWER', 'STORY', 'DANCE',
  'MUSIC', 'SPACE', 'OCEAN', 'EARTH', 'STARS', 'FRESH', 'BRAVE', 'SHINE'
];

const WORD_LENGTH = 5;
const MAX_GUESSES = 6;

export function WordleGame() {
  const [targetWord, setTargetWord] = useState('');
  const [guesses, setGuesses] = useState<LetterState[][]>([]);
  const [currentGuess, setCurrentGuess] = useState('');
  const [currentRow, setCurrentRow] = useState(0);
  const [gameStatus, setGameStatus] = useState<'playing' | 'won' | 'lost'>('playing');
  const [letterStatuses, setLetterStatuses] = useState<Record<string, 'correct' | 'present' | 'absent' | 'unused'>>({});

  // Initialize game
  useEffect(() => {
    resetGame();
  }, []);

  const resetGame = useCallback(() => {
    const randomWord = WORDS[Math.floor(Math.random() * WORDS.length)];
    setTargetWord(randomWord);
    setGuesses([]);
    setCurrentGuess('');
    setCurrentRow(0);
    setGameStatus('playing');
    setLetterStatuses({});
  }, []);

  const evaluateGuess = useCallback((guess: string): LetterState[] => {
    const result: LetterState[] = [];
    const targetLetters = targetWord.split('');
    const guessLetters = guess.split('');
    
    // First pass: mark correct letters
    for (let i = 0; i < WORD_LENGTH; i++) {
      if (guessLetters[i] === targetLetters[i]) {
        result[i] = { letter: guessLetters[i], status: 'correct' };
        targetLetters[i] = '';
        guessLetters[i] = '';
      }
    }
    
    // Second pass: mark present letters
    for (let i = 0; i < WORD_LENGTH; i++) {
      if (guessLetters[i] && targetLetters.includes(guessLetters[i])) {
        result[i] = { letter: guess[i], status: 'present' };
        const targetIndex = targetLetters.indexOf(guessLetters[i]);
        targetLetters[targetIndex] = '';
      } else if (guessLetters[i]) {
        result[i] = { letter: guess[i], status: 'absent' };
      }
    }
    
    return result;
  }, [targetWord]);

  const updateLetterStatuses = useCallback((evaluatedGuess: LetterState[]) => {
    const newStatuses = { ...letterStatuses };
    
    evaluatedGuess.forEach(({ letter, status }) => {
      const currentStatus = newStatuses[letter];
      
      // Priority: correct > present > absent
      if (status === 'correct' || 
          (status === 'present' && currentStatus !== 'correct') ||
          (status === 'absent' && !currentStatus)) {
        newStatuses[letter] = status;
      }
    });
    
    setLetterStatuses(newStatuses);
  }, [letterStatuses]);

  const submitGuess = useCallback(() => {
    if (currentGuess.length !== WORD_LENGTH || gameStatus !== 'playing') {
      return;
    }

    const evaluatedGuess = evaluateGuess(currentGuess);
    const newGuesses = [...guesses, evaluatedGuess];
    setGuesses(newGuesses);
    updateLetterStatuses(evaluatedGuess);

    if (currentGuess === targetWord) {
      setGameStatus('won');
    } else if (currentRow + 1 >= MAX_GUESSES) {
      setGameStatus('lost');
    } else {
      setCurrentRow(currentRow + 1);
    }

    setCurrentGuess('');
  }, [currentGuess, gameStatus, evaluateGuess, guesses, updateLetterStatuses, targetWord, currentRow]);

  const handleKeyPress = useCallback((key: string) => {
    if (gameStatus !== 'playing' || currentGuess.length >= WORD_LENGTH) {
      return;
    }
    setCurrentGuess(currentGuess + key);
  }, [currentGuess, gameStatus]);

  const handleBackspace = useCallback(() => {
    if (gameStatus !== 'playing') {
      return;
    }
    setCurrentGuess(currentGuess.slice(0, -1));
  }, [currentGuess, gameStatus]);

  const getGameStatusMessage = () => {
    if (gameStatus === 'won') {
      return `🎉 Congratulations! You guessed "${targetWord}"!`;
    }
    if (gameStatus === 'lost') {
      return `😔 Game over! The word was "${targetWord}".`;
    }
    return '';
  };

  return (
    <div className="flex flex-col items-center justify-center p-4 bg-background">
      <div className="w-full max-w-md mx-auto space-y-4">
        <div className="text-center">
          <p className="text-muted-foreground text-sm">
            Guess the 5-letter word in 6 tries
          </p>
        </div>

        <WordleGrid 
          guesses={guesses}
          currentGuess={currentGuess}
          currentRow={currentRow}
        />

        {gameStatus !== 'playing' && (
          <div className="text-center space-y-4">
            <p className="text-lg font-semibold text-foreground">
              {getGameStatusMessage()}
            </p>
            <Button onClick={resetGame} className="mx-auto">
              Play Again
            </Button>
          </div>
        )}

        <WordleKeyboard
          onKeyPress={handleKeyPress}
          onEnter={submitGuess}
          onBackspace={handleBackspace}
          letterStatuses={letterStatuses}
        />
      </div>
    </div>
  );
}

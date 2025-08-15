"use client";

import { useState, useCallback } from "react";
import { FlexibleWordDisplay, LetterResult } from "./FlexibleWordDisplay";
import { FlexibleInput } from "./FlexibleInput";
import { BrainrotImageDisplay } from "./BrainrotImageDisplay";
import { RordleStartScreen } from "./RordleStartScreen";
import { Button } from "./Button";
import { getRandomBrainrotItem, BrainrotItem } from "~/lib/brainrotData";

const MAX_ATTEMPTS = 6;

type GameState = 'start' | 'playing';
type GamePhase = 'showing-image' | 'guessing' | 'won' | 'lost';

export function WordleGame() {
  const [gameState, setGameState] = useState<GameState>('start');
  const [currentBrainrotItem, setCurrentBrainrotItem] = useState<BrainrotItem | null>(null);
  const [targetWord, setTargetWord] = useState('');
  const [previousGuesses, setPreviousGuesses] = useState<LetterResult[][]>([]);
  const [currentGuess, setCurrentGuess] = useState('');
  const [gamePhase, setGamePhase] = useState<GamePhase>('showing-image');
  const [letterStatuses, setLetterStatuses] = useState<Record<string, 'correct' | 'present' | 'absent' | 'unused'>>({});

  const startGame = useCallback(() => {
    const brainrotItem = getRandomBrainrotItem();
    setCurrentBrainrotItem(brainrotItem);
    setTargetWord(brainrotItem.word);
    setPreviousGuesses([]);
    setCurrentGuess('');
    setGamePhase('showing-image');
    setLetterStatuses({});
    setGameState('playing');
  }, []);

  const quitGame = useCallback(() => {
    setGameState('start');
    setCurrentBrainrotItem(null);
    setTargetWord('');
    setPreviousGuesses([]);
    setCurrentGuess('');
    setGamePhase('showing-image');
    setLetterStatuses({});
  }, []);

  const resetGame = useCallback(() => {
    startGame();
  }, [startGame]);

  const evaluateGuess = useCallback((guess: string): LetterResult[] => {
    const result: LetterResult[] = [];
    const targetLetters = targetWord.split('');
    const guessLetters = guess.split('');
    const wordLength = Math.max(targetWord.length, guess.length);
    
    // First pass: mark correct letters
    for (let i = 0; i < wordLength; i++) {
      if (guessLetters[i] === targetLetters[i]) {
        result[i] = { letter: guessLetters[i], status: 'correct' };
        targetLetters[i] = '';
        guessLetters[i] = '';
      }
    }
    
    // Second pass: mark present letters
    for (let i = 0; i < wordLength; i++) {
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

  const updateLetterStatuses = useCallback((evaluatedGuess: LetterResult[]) => {
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
    if (currentGuess.trim().length === 0 || gamePhase !== 'guessing') {
      return;
    }

    const evaluatedGuess = evaluateGuess(currentGuess);
    const newGuesses = [...previousGuesses, evaluatedGuess];
    setPreviousGuesses(newGuesses);
    updateLetterStatuses(evaluatedGuess);

    if (currentGuess.toUpperCase() === targetWord.toUpperCase()) {
      setGamePhase('won');
    } else if (newGuesses.length >= MAX_ATTEMPTS) {
      setGamePhase('lost');
    }

    setCurrentGuess('');
  }, [currentGuess, gamePhase, evaluateGuess, previousGuesses, updateLetterStatuses, targetWord]);

  const handleImageTimerComplete = useCallback(() => {
    setGamePhase('guessing');
  }, []);

  const handleInputChange = useCallback((value: string) => {
    setCurrentGuess(value);
  }, []);

  const getGameStatusMessage = () => {
    if (gamePhase === 'won') {
      return `🎉 BRAINROT MASTERY! You guessed "${targetWord}"! 🧠💯`;
    }
    if (gamePhase === 'lost') {
      return `💀 RIP BRAIN CELLS! The answer was "${targetWord}" (${currentBrainrotItem?.description})`;
    }
    return '';
  };

  // Show start screen
  if (gameState === 'start') {
    return <RordleStartScreen onStart={startGame} />;
  }

  // Show brainrot image during the image phase
  if (gamePhase === 'showing-image' && currentBrainrotItem) {
    return (
      <BrainrotImageDisplay
        brainrotItem={currentBrainrotItem}
        onTimerComplete={handleImageTimerComplete}
        onQuit={quitGame}
        displayDuration={5}
      />
    );
  }

  // Show the flexible guessing interface
  return (
    <div className="flex flex-col items-center justify-center p-4 bg-background min-h-screen">
      {/* Quit button */}
      <div className="absolute top-4 left-4">
        <button
          onClick={quitGame}
          className="px-3 py-1 text-sm border border-muted-foreground text-muted-foreground hover:bg-muted-foreground hover:text-background transition-colors"
        >
          ← QUIT
        </button>
      </div>

      <div className="w-full max-w-lg mx-auto space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold text-foreground">
            RORDLE
          </h1>
          <p className="text-muted-foreground text-sm">
            What was that image? Type your guess!
          </p>
          {currentBrainrotItem && (
            <p className="text-xs text-muted-foreground">
              Hint: {currentBrainrotItem.description}
            </p>
          )}
        </div>

        <FlexibleWordDisplay
          currentGuess={currentGuess}
          previousGuesses={previousGuesses}
          maxAttempts={MAX_ATTEMPTS}
          targetWordLength={targetWord.length}
        />

        {gamePhase === 'guessing' && (
          <FlexibleInput
            value={currentGuess}
            onChange={handleInputChange}
            onSubmit={submitGuess}
            placeholder="Type your guess..."
            disabled={false}
          />
        )}

        {(gamePhase === 'won' || gamePhase === 'lost') && (
          <div className="text-center space-y-4">
            <p className="text-lg font-semibold text-foreground">
              {getGameStatusMessage()}
            </p>
            {currentBrainrotItem && gamePhase === 'won' && (
              <div className="bg-green-100 dark:bg-green-900 p-3 rounded-lg">
                <p className="text-sm text-green-800 dark:text-green-200">
                  ✅ You correctly identified: {currentBrainrotItem.description}
                </p>
              </div>
            )}
            {currentBrainrotItem && gamePhase === 'lost' && (
              <div className="bg-red-100 dark:bg-red-900 p-3 rounded-lg">
                <img 
                  src={currentBrainrotItem.imageUrl} 
                  alt="The brainrot image" 
                  className="w-32 h-32 object-cover rounded mx-auto mb-2"
                />
                <p className="text-sm text-red-800 dark:text-red-200">
                  The image was: {currentBrainrotItem.description}
                </p>
              </div>
            )}
            <div className="flex gap-3 justify-center">
              <Button onClick={resetGame} className="bg-foreground text-background hover:bg-muted-foreground">
                NEXT CHALLENGE
              </Button>
              <Button onClick={quitGame} className="bg-transparent border border-foreground text-foreground hover:bg-foreground hover:text-background">
                QUIT
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

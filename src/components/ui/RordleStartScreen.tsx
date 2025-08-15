"use client";

interface RordleStartScreenProps {
  onStart: () => void;
}

export function RordleStartScreen({ onStart }: RordleStartScreenProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground">
      <div className="text-center space-y-8">
        {/* Game Title */}
        <div className="space-y-2">
          <h1 className="text-6xl md:text-8xl font-bold tracking-wider text-foreground">
            RORDLE
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground font-light">
            Guess the brainrot
          </p>
        </div>

        {/* Start Button */}
        <button
          onClick={onStart}
          className="px-8 py-4 text-xl font-semibold bg-foreground text-background border-2 border-foreground hover:bg-background hover:text-foreground transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-foreground focus:ring-offset-2 focus:ring-offset-background"
        >
          START
        </button>

        {/* Simple Instructions */}
        <div className="text-center space-y-2 max-w-md">
          <p className="text-sm text-muted-foreground">
            Watch the image for 5 seconds, then guess what it represents.
          </p>
          <p className="text-xs text-muted-foreground">
            You have 6 attempts to get it right.
          </p>
        </div>
      </div>
    </div>
  );
}

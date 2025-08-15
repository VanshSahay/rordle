"use client";

import { useState, useRef, useEffect } from "react";
import { cn } from "~/lib/utils";

export interface FlexibleInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  placeholder?: string;
  disabled?: boolean;
  maxLength?: number;
}

export function FlexibleInput({
  value,
  onChange,
  onSubmit,
  placeholder = "Type your guess...",
  disabled = false,
  maxLength,
}: FlexibleInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    // Auto-focus the input when component mounts
    if (inputRef.current && !disabled) {
      inputRef.current.focus();
    }
  }, [disabled]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      onSubmit();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value.toUpperCase();
    onChange(newValue);
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          disabled={disabled}
          maxLength={maxLength}
          className={cn(
            "w-full px-4 py-3 text-lg font-bold text-center uppercase border-2 rounded-lg transition-all duration-200",
            "bg-background text-foreground placeholder:text-muted-foreground",
            "focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500",
            {
              "border-purple-500 shadow-md": isFocused,
              "border-border": !isFocused,
              "opacity-50 cursor-not-allowed": disabled,
              "hover:border-purple-300": !disabled && !isFocused,
            }
          )}
          style={{
            fontSize: Math.max(16, Math.min(24, 400 / Math.max(value.length, 1))),
          }}
        />
        
        {/* Character count indicator */}
        {maxLength && (
          <div className="absolute -bottom-6 right-0 text-xs text-muted-foreground">
            {value.length}/{maxLength}
          </div>
        )}
      </div>
      
      {/* Instructions */}
      <div className="mt-3 text-center space-y-1">
        <p className="text-sm text-muted-foreground">
          Type your guess and press Enter
        </p>
        <div className="flex justify-center gap-4 text-xs">
          <span className="flex items-center gap-1">
            <div className="w-3 h-3 bg-green-500 rounded"></div>
            Correct
          </span>
          <span className="flex items-center gap-1">
            <div className="w-3 h-3 bg-yellow-500 rounded"></div>
            Wrong position
          </span>
          <span className="flex items-center gap-1">
            <div className="w-3 h-3 bg-gray-500 rounded"></div>
            Not in word
          </span>
        </div>
      </div>
    </div>
  );
}

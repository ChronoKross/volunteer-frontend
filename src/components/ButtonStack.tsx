"use client";

import type React from "react";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Employee } from "../types/types";

// Extend Employee for UI-only props
type AnimatedEmployee = Employee & {
  fallDirection?: "left" | "right" | "center";
  scaleEffect?: number;
};

interface ButtonStackProps {
  buttons: Employee[];
  onButtonClick?: (button: Employee) => void;
}

export const ButtonStack: React.FC<ButtonStackProps> = ({
  buttons: initialButtons,
  onButtonClick = () => {},
}) => {
  const [buttons, setButtons] = useState<AnimatedEmployee[]>([]);
  const animatingButtonsRef = useRef<Set<number>>(new Set()); // ID is number in your backend

  // Initialize buttons on first render or when props change
  useEffect(() => {
    setButtons(initialButtons.map((btn) => ({ ...btn })));
  }, [initialButtons]);

  const handleClick = (clicked: Employee) => {
    if (animatingButtonsRef.current.has(clicked.id)) return;

    onButtonClick(clicked);
    animatingButtonsRef.current.add(clicked.id);

    const directions = ["left", "right", "center"] as const;
    const randomDirection = directions[Math.floor(Math.random() * directions.length)];
    const randomScale = Math.random() * 0.8 + 0.7;

    setButtons((prev) => {
      const newButtons = prev.filter((btn) => btn.id !== clicked.id);
      return [
        ...newButtons,
        {
          ...clicked,
          fallDirection: randomDirection,
          scaleEffect: randomScale,
        },
      ];
    });

    setTimeout(() => {
      animatingButtonsRef.current.delete(clicked.id);
    }, 600);
  };

  const getAnimationVariants = (button: AnimatedEmployee) => {
    const direction = button.fallDirection;
    const scale = button.scaleEffect || 1;
    const rotateLeft = Math.random() * -30 - 5;
    const rotateRight = Math.random() * 30 + 5;

    switch (direction) {
      case "left":
        return {
          tap: { scale },
          exit: {
            opacity: 0,
            x: -100,
            y: 50,
            rotate: rotateLeft,
          },
        };
      case "right":
        return {
          tap: { scale },
          exit: {
            opacity: 0,
            x: 100,
            y: 50,
            rotate: rotateRight,
          },
        };
      default:
        return {
          tap: { scale },
          exit: {
            opacity: 0,
            y: 50,
            rotate: Math.random() * 10 - 5,
          },
        };
    }
  };

  return (
    <div className="flex flex-col gap-2 w-full max-w-xs">
      <AnimatePresence initial={false}>
        {buttons.map((button) => {
          const variants = getAnimationVariants(button);

          return (
            <motion.button
              key={button.id}
              onClick={() => handleClick(button)}
              className="flex justify-between items-center px-4 py-3 bg-indigo-600/90 dark:bg-gradient-to-b dark:from-gray-900 dark:to-black text-white rounded-lg hover:bg-indigo-700/90 dark:hover:from-gray-800 dark:hover:to-gray-900 shadow-lg backdrop-blur-sm border border-indigo-400/20 dark:border-white/10 transition-colors duration-300"
              initial={{ opacity: 1, y: 0, scale: 1, x: 0, rotate: 0 }}
              exit={variants.exit}
              animate={{ opacity: 1, y: 0, scale: 1, x: 0, rotate: 0 }}
              whileTap={variants.tap}
              transition={{
                type: "spring",
                stiffness: 300 + Math.random() * 200,
                damping: 20 + Math.random() * 20,
                duration: 0.4 + Math.random() * 0.4,
              }}
              layout
            >
              <span className="font-medium">{button.name}</span>
              <span className="inline-flex items-center justify-center bg-white/20 text-white text-xs font-semibold px-2 py-1 rounded-full min-w-[24px]">
                {button.wentHome}
              </span>
            </motion.button>
          );
        })}
      </AnimatePresence>
    </div>
  );
};

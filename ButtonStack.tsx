"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"

// Define the type for individual button items
export interface ButtonItem {
  id: string
  name: string
  leaveCount: number
  fallDirection?: "left" | "right" | "center"
  scaleEffect?: number
}

// Define the props for the ButtonStack component
interface ButtonStackProps {
  buttons: ButtonItem[]
  onButtonClick?: (button: ButtonItem) => void
}

export const ButtonStack: React.FC<ButtonStackProps> = ({ buttons: initialButtons, onButtonClick = () => {} }) => {
  // State to track the current order of buttons
  const [buttons, setButtons] = useState<ButtonItem[]>([])
  // Ref to track buttons being animated
  const animatingButtonsRef = useRef<Set<string>>(new Set())

  // Initialize buttons on first render
  useEffect(() => {
    // Add ids if they don't exist
    setButtons(
      initialButtons.map((button, index) => ({
        ...button,
        id: button.id || `button-${index}`,
      })),
    )
  }, [initialButtons])

  // Handle button click
  const handleClick = (clickedButton: ButtonItem) => {
    // Prevent multiple clicks during animation
    if (animatingButtonsRef.current.has(clickedButton.id)) return

    // Call the external click handler
    onButtonClick(clickedButton)

    // Mark this button as animating
    animatingButtonsRef.current.add(clickedButton.id)

    // Generate random fall direction
    const directions = ["left", "right", "center"] as const
    const randomDirection = directions[Math.floor(Math.random() * directions.length)]

    // Generate random scale effect
    // Values < 1 will shrink, values > 1 will grow
    // Range between 0.7 (shrink) and 1.5 (grow)
    const randomScale = Math.random() * 0.8 + 0.7

    // Reorder the buttons - move clicked button to the bottom with random effects
    setButtons((prevButtons) => {
      const newButtons = prevButtons.filter((button) => button.id !== clickedButton.id)
      return [
        ...newButtons,
        {
          ...clickedButton,
          fallDirection: randomDirection,
          scaleEffect: randomScale,
        },
      ]
    })

    // Remove from animating set after animation completes
    setTimeout(() => {
      animatingButtonsRef.current.delete(clickedButton.id)
    }, 600) // Match this with animation duration
  }

  // Get animation variants based on fall direction and scale effect
  const getAnimationVariants = (button: ButtonItem) => {
    const direction = button.fallDirection
    const scale = button.scaleEffect || 1

    // Random rotation angle
    const rotateLeft = Math.random() * -30 - 5
    const rotateRight = Math.random() * 30 + 5

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
        }
      case "right":
        return {
          tap: { scale },
          exit: {
            opacity: 0,
            x: 100,
            y: 50,
            rotate: rotateRight,
          },
        }
      default:
        return {
          tap: { scale },
          exit: {
            opacity: 0,
            y: 50,
            rotate: Math.random() * 10 - 5,
          },
        }
    }
  }

  return (
    <div className="flex flex-col gap-2 w-full max-w-xs">
      <AnimatePresence initial={false}>
        {buttons.map((button) => {
          const variants = getAnimationVariants(button)

          return (
            <motion.button
              key={button.id}
              onClick={() => handleClick(button)}
              className="flex justify-between items-center px-4 py-3 bg-indigo-600/90 dark:bg-primary/90 text-white rounded-lg hover:bg-indigo-700/90 dark:hover:bg-primary/80 shadow-lg backdrop-blur-sm border border-indigo-400/20 dark:border-white/10 transition-colors duration-300"
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
                {button.leaveCount}
              </span>
            </motion.button>
          )
        })}
      </AnimatePresence>
    </div>
  )
}


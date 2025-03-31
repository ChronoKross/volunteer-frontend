
import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import React from "react"

// Define the type for individual button items
interface ButtonItem {
  id: string
  name: string
  leaveCount: number
  lastVolunteeredOn?: string // ISO timestamp from backend
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
              className="flex justify-between items-center px-4 py-3 bg-primary/90 text-primary-foreground rounded-lg hover:bg-primary/80 shadow-lg backdrop-blur-sm border border-white/10"
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

// Example usage
export default function Example() {
  const employeeItems = [
    { id: "1", name: "John Smith", leaveCount: 5 },
    { id: "2", name: "Sarah Johnson", leaveCount: 3 },
    { id: "3", name: "Michael Brown", leaveCount: 0 },
    { id: "4", name: "Emily Davis", leaveCount: 2 },
    { id: "5", name: "David Wilson", leaveCount: 7 },
    { id: "6", name: "Jessica Taylor", leaveCount: 1 },
    { id: "7", name: "Robert Miller", leaveCount: 4 },
  ]

  const handleButtonClick = (employee: ButtonItem) => {
    console.log(`Employee: ${employee.name}, Leave Count: ${employee.leaveCount}`)
  }

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-purple-900 via-violet-800 to-indigo-900 bg-fixed bg-no-repeat bg-cover p-4 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxkZWZzPjxwYXR0ZXJuIGlkPSJwYXR0ZXJuIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHBhdHRlcm5UcmFuc2Zvcm09InJvdGF0ZSg0NSkiPjxjaXJjbGUgY3g9IjIwIiBjeT0iMjAiIHI9IjEuNSIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjA1KSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3QgeD0iMCIgeT0iMCIgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNwYXR0ZXJuKSIvPjwvc3ZnPg==')] opacity-30"></div>

      {/* Glowing orbs */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-pink-500/30 rounded-full filter blur-3xl opacity-30 animate-pulse"></div>
      <div
        className="absolute bottom-1/4 right-1/3 w-80 h-80 bg-blue-500/30 rounded-full filter blur-3xl opacity-30 animate-pulse"
        style={{ animationDelay: "1s" }}
      ></div>

      {/* Content container with glass effect */}
      <div className="relative z-10 bg-white/10 backdrop-blur-md rounded-2xl p-6 shadow-2xl border border-white/20 max-w-md w-full">
        <h2 className="text-2xl font-bold mb-6 text-white text-center">Employee Leave Status</h2>
        <div className="flex justify-center">
          <ButtonStack buttons={employeeItems} onButtonClick={handleButtonClick} />
        </div>
      </div>

      <footer className="mt-8 text-white/60 text-sm text-center relative z-10">
        Click on an employee to see the animation effect
      </footer>
    </div>
  )
}


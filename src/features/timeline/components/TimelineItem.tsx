import { useEffect, useState } from "react"
import { Clock, User, Calendar, BarChart } from "lucide-react"
import { cn } from "@/lib/utils"
import { TimelineEntry } from "@/types/types"

interface TimelineItemProps {
  entry: TimelineEntry
  index: number
}

export function TimelineItem({ entry, index }: TimelineItemProps) {
  const [isVisible, setIsVisible] = useState(false)

  const {
    name,
    profilePic,
    timestamp,
    hoursVolunteered,
    totalTimeVolunteered,
  } = entry

  // Animate entry
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, index * 150)

    return () => clearTimeout(timer)
  }, [index])

  return (
    <div
      className={cn(
        "flex gap-4 transform transition-all duration-500 ease-out",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      )}
    >
      {/* Avatar circle */}
      <div className="relative z-10 flex-shrink-0">
        <div className="w-14 h-14 rounded-full border-4 border-blue-100 dark:border-indigo-800 shadow-md overflow-hidden bg-white dark:bg-gray-800">
          <img
            src={profilePic || "/placeholder.svg"}
            alt={`${name}'s profile`}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Content card */}
      <div className="flex-grow bg-white/80 dark:bg-white/10 backdrop-blur-md rounded-lg shadow-md p-4 border border-gray-200 dark:border-white/20 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
        <div className="flex flex-col space-y-2">
          <div className="flex items-center gap-2">
            <User className="h-4 w-4 text-blue-500 dark:text-purple-400" />
            <h3 className="font-semibold text-gray-800 dark:text-white">{name}</h3>
          </div>

          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-blue-500 dark:text-purple-400" />
            <p className="text-sm text-gray-600 dark:text-white/60">{timestamp}</p>
          </div>

          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-blue-500 dark:text-purple-400" />
            <p className="text-sm text-gray-600 dark:text-white/60">
              Shift Hours: <span className="font-medium">{hoursVolunteered}</span>
            </p>
          </div>

          <div className="flex items-center gap-2">
            <BarChart className="h-4 w-4 text-blue-500 dark:text-purple-400" />
            <p className="text-sm text-gray-600 dark:text-white/60">
              Total: <span className="font-medium">{totalTimeVolunteered}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

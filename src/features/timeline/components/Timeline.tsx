import { useEffect, useState } from "react"
import { TimelineEntry } from "@/types/types"
import { formatDistanceToNow } from "date-fns"
import { TimelineItem } from "./TimelineItem"

interface TimelineProps {
  items: TimelineEntry[]
}

export function Timeline({ items }: TimelineProps) {
  const [visibleItems, setVisibleItems] = useState<TimelineEntry[]>([])

  // Animate items appearing one by one
  useEffect(() => {
    const timer = setTimeout(() => {
      if (visibleItems.length < items.length) {
        setVisibleItems(items.slice(0, visibleItems.length + 1))
      }
    }, 300)

    return () => clearTimeout(timer)
  }, [items, visibleItems])

  // Initialize with first item
  useEffect(() => {
    if (items.length > 0 && visibleItems.length === 0) {
      setVisibleItems([items[0]])
    }
  }, [items, visibleItems])

  return (
    <div className="relative">
      {/* Timeline line */}
      <div className="absolute left-7 top-0 bottom-0 w-0.5 bg-purple-200 dark:bg-purple-700" />

      {/* Timeline items */}
      <div className="space-y-8">
        {visibleItems.map((item, index) => (
          <TimelineItem
            key={item.id}
            entry={{
              ...item,
              timestamp: formatDistanceToNow(new Date(item.timestamp), { addSuffix: true }),
            }}
            index={index}
          />
        ))}
      </div>
    </div>
  )
}

import { useEffect, useState } from "react"
import { TimelineEntry } from "@/types/types"

export const useTimeline = () => {
  const [timeline, setTimeline] = useState<TimelineEntry[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchTimeline = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/queue/timeline`)
        if (!res.ok) throw new Error("Failed to fetch timeline")
        const data = await res.json()
        setTimeline(data)
      } catch (err: any) {
        setError(err.message || "Unknown error")
      } finally {
        setLoading(false)
      }
    }

    fetchTimeline()
  }, [])

  return { timeline, loading, error }
}

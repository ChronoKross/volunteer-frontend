import { useTimeline } from "../hooks/useTimeline"
import { Timeline } from "../components/Timeline"
import { ThemeToggle } from "@/components/ui/ThemeToggle"

export default function TimelinePage() {
  const { timeline, loading, error } = useTimeline()

  if (loading) return <p className="text-center text-white">Loading timeline...</p>
  if (error) return <p className="text-center text-red-500">Error: {error}</p>

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 md:p-8 bg-gradient-to-br from-blue-100 via-white to-purple-100 dark:from-purple-900 dark:via-violet-800 dark:to-indigo-900 transition-colors">
      <ThemeToggle />
      <div className="w-full max-w-3xl mx-auto bg-white/80 dark:bg-white/10 backdrop-blur-md rounded-2xl p-6 shadow-2xl border border-gray-200 dark:border-white/20">
        <h1 className="text-2xl md:text-3xl font-bold mb-6 text-gray-800 dark:text-white text-center">
          Employee Volunteer Timeline
        </h1>
        <Timeline items={timeline} />
      </div>
      <footer className="mt-8 text-gray-600 dark:text-white/60 text-sm text-center">
        Track employee volunteer hours 🕒
      </footer>
    </main>
  )
}

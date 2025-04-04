import { BrowserRouter, Routes, Route } from "react-router-dom"
import QueuePage from "@/features/queue/pages/QueuePage"
import TimelinePage from "@/features/timeline/pages/TimelinePage"
import { NavToggle } from "@/components/ui/NavToggle"

export default function App() {
  return (
    <BrowserRouter>
      <div className="flex justify-center">
        {/* Add NavToggle here */}
        <NavToggle />
      </div>
      <Routes>
        <Route path="/" element={<QueuePage />} />
        <Route path="/timeline" element={<TimelinePage />} />
      </Routes>
    </BrowserRouter>
  )
}

import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function NavToggle() {
  const [isQueue, setIsQueue] = useState(true); // Keeps track of which page is active
  const navigate = useNavigate();

  const handleToggle = () => {
    setIsQueue(!isQueue);
    // Toggle between the two pages
    navigate(isQueue ? "/timeline" : "/");
  };

  return (
    <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-10"> {/* Centered at top */}
      <button
        onClick={handleToggle}
        className="bg-gradient-to-br from-blue-500 to-indigo-600 dark:from-blue-700 dark:to-indigo-800 text-white p-4 rounded-full shadow-lg hover:bg-gradient-to-br hover:from-blue-600 hover:to-indigo-700 dark:hover:from-blue-800 dark:hover:to-indigo-900 transition-all duration-300"
      >
        {isQueue ? "Go to Timeline" : "Go to Queue"}
      </button>
    </div>
  );
}

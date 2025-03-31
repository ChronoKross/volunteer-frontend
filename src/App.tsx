import { useEffect, useState } from "react";
import { ButtonStack } from "./components/ButtonStack";
import { ThemeProvider } from "./components/ThemeProvider";
import { ThemeToggle } from "./components/ThemeToggle";
import { Employee } from "./types/types";
const apiURL = import.meta.env.VITE_BACKEND_URL
console.log(apiURL)

function App() {
  const [employeeItems, setEmployeeItems] = useState<Employee[]>([]);
  const getALLEndpoint = `${apiURL}/api/queue/`;
  const updateEndpoint = `${apiURL}/api/queue/volunteer`;

  // ⬇ Fetch all employees
  const fetchEmployees = async () => {
    try {
      const res = await fetch(getALLEndpoint);
      if (!res.ok) throw new Error("Failed to fetch employees");
      const data = await res.json();
      
      setEmployeeItems(data);
      
    } catch (err) {
      console.error("Error fetching employees:", err);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  

  // ⬇ Volunteer logic
const volunteer = async (id: number) => {
  try {
    const res = await fetch(`${apiURL}/api/queue/volunteer`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });

    if (!res.ok) throw new Error("Volunteer action failed");
    console.log(`✅ Volunteer success for employee ID: ${id}`);
    await fetchEmployees();
  } catch (err) {
    console.error("Error volunteering:", err);
  }
};


  // ⬇ On button click
  const handleButtonClick = async (employee: Employee) => {
    await volunteer(employee.id);
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 via-white to-purple-100 dark:from-purple-900 dark:via-violet-800 dark:to-indigo-900 bg-fixed bg-no-repeat bg-cover p-4 relative overflow-hidden transition-colors duration-500">
        {/* Decorative background */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,...')] opacity-30 dark:opacity-30"></div>
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-pink-500/10 dark:bg-pink-500/30 rounded-full filter blur-3xl opacity-0 dark:opacity-30 animate-pulse transition-opacity duration-500"></div>
        <div
          className="absolute bottom-1/4 right-1/3 w-80 h-80 bg-blue-500/10 dark:bg-blue-500/30 rounded-full filter blur-3xl opacity-0 dark:opacity-30 animate-pulse transition-opacity duration-500"
          style={{ animationDelay: "1s" }}
        ></div>

        <ThemeToggle />

        <div className="relative z-10 bg-white/80 dark:bg-white/10 backdrop-blur-md rounded-2xl p-6 shadow-2xl border border-gray-200 dark:border-white/20 max-w-md w-full transition-colors duration-500">
          <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white text-center transition-colors duration-500">
            Employee Leave Status
          </h2>
          <div className="flex justify-center">
            <ButtonStack buttons={employeeItems} onButtonClick={handleButtonClick} />
          </div>
        </div>

        <footer className="mt-8 text-gray-600 dark:text-white/60 text-sm text-center relative z-10 transition-colors duration-500">
          Click on an employee to send them home 😌
        </footer>
      </div>
    </ThemeProvider>
  );
}

export default App;

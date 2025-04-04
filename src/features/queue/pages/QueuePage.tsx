import { useQueue } from "../hooks/useQueue";
import { ButtonStack } from "../components/ButtonStack";
import { ThemeProvider } from "@/components/ui/ThemeProvider";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

export default function QueuePage() {
  const { authenticated, employeeItems, handleVolunteer } = useQueue();

  return (
    <ThemeProvider>
      <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gradient-to-br from-blue-100 via-white to-purple-100 dark:from-purple-900 dark:via-violet-800 dark:to-indigo-900 transition-colors">
        <ThemeToggle />
        <div className="bg-white/80 dark:bg-white/10 backdrop-blur-md rounded-2xl p-6 shadow-2xl border border-gray-200 dark:border-white/20 max-w-md w-full">
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-white">
            Employee Leave Status
          </h2>
          {/* Conditionally render the ButtonStack only if authenticated */}
          {authenticated ? (
            <div className="flex justify-center">
              <ButtonStack
                buttons={employeeItems}
                onButtonClick={(employee) => handleVolunteer(employee.id)} // Handle volunteer
              />
            </div>
          ) : (
            <div className="text-center text-gray-600 dark:text-white/60">
              <p>You need to authenticate to edit the queue.</p>
            </div>
          )}
        </div>
        <footer className="mt-8 text-gray-600 dark:text-white/60 text-sm text-center">
          Click on an employee to send them home 😌
        </footer>
      </div>
    </ThemeProvider>
  );
}

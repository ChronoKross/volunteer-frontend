import { useState, useEffect } from "react";
import { fetchEmployees, volunteerEmployee } from "../api";
import { Employee } from "@/types/types";
import { calculateHoursVolunteered } from "@/utils/timeHelpers";

export const useQueue = () => {
  const [employeeItems, setEmployeeItems] = useState<Employee[]>([]);
  const [authenticated, setAuthenticated] = useState(false);

  // Check localStorage for the authentication status on first load
  useEffect(() => {
    const storedAuth = localStorage.getItem("authenticated");
    if (storedAuth === "true") {
      setAuthenticated(true);
      getEmployees();  // Get employees if already authenticated
    } else {
      const pass = prompt("🔐 Enter the passkey:");
      if (pass === "1299") {
        setAuthenticated(true);
        localStorage.setItem("authenticated", "true");  // Save to localStorage
        getEmployees();
      } else {
        alert("❌ Incorrect passkey. Access denied.");
      }
    }
  }, []);

  // Fetch employees if authenticated
  const getEmployees = async () => {
    try {
      const data = await fetchEmployees();
      setEmployeeItems(data);
    } catch (err) {
      console.error("Error fetching employees:", err);
    }
  };

  // Function to handle volunteer action
  const handleVolunteer = async (id: number) => {
    if (!authenticated) return;

    const leaveTime = new Date();
    const hoursVolunteered = calculateHoursVolunteered(leaveTime);

    try {
      await volunteerEmployee(id, hoursVolunteered); // Pass hoursVolunteered to the backend
      await getEmployees(); // Refresh the queue
    } catch (err) {
      console.error("Error volunteering:", err);
    }
  };

  return {
    authenticated,
    employeeItems,
    handleVolunteer,
  };
};

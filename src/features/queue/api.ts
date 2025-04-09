// features/queue/api.ts
import { Employee } from "@/types/types";

const apiURL = import.meta.env.VITE_BACKEND_URL;

export const fetchEmployees = async (): Promise<Employee[]> => {
  const res = await fetch(`${apiURL}/api/queue/`);
  if (!res.ok) throw new Error("Failed to fetch employees");
  return res.json();
};

export const volunteerEmployee = async (id: number, hoursVolunteered: number): Promise<void> => {
  const res = await fetch(`${apiURL}/api/queue/volunteer`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id, hoursVolunteered }),
  });

  if (!res.ok) throw new Error("Volunteer action failed");
};

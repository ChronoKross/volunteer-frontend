export interface Employee {
  id: number | string;
  name: string;
  profilePic?: string;
  position?: number;
  wentHome?: number;
  declined?: number;
  lastVolunteeredOn?: string | null;
}

export interface IFormValues {
  name: string;
  email: string;
  password: string;
}

export interface IFormAppValues {
  id?: string | null;
  company: string;
  title: string;
  salary: number;
  status: "" | "applied" | "interview" | "offer" | "rejected" | "ghosted";
  notes: string;
  date?: Date | Timestamp;
  location?: string | null;
}

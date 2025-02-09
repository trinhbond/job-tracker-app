export interface IFormValues {
  name: string;
  email: string;
  password: string;
}

export interface IFormAppValues {
  id?: string;
  company: string;
  title: string;
  link?: string;
  salary: number;
  status: "" | "applied" | "interview" | "offer" | "rejected" | "ghosted";
  notes: string;
  date?: Date | Timestamp;
  location?: string;
}

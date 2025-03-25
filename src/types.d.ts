export interface UserForm {
  name: string;
  email: string;
  password: string;
}

export interface AppForm {
  id: string;
  company: string;
  title: string;
  link?: string;
  salary: number;
  status:
    | ""
    | "all"
    | "applied"
    | "interview"
    | "offer"
    | "rejected"
    | "ghosted";
  notes: string;
  date?: Date | Timestamp;
  location?: string;
}

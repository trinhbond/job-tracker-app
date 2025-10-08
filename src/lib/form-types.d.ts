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
    | "screening"
    | "assessment";
  notes: string;
  date?: Date | Timestamp;
  location?: string;
}

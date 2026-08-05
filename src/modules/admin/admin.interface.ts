import { Status } from "../../../generated/prisma/enums";

export interface ICategory {
  name: string;
  description: string;
}

export interface IStatus {
  status: Status;
}

export interface IQuery {
  limit?: number;
  page?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  searchTerm?: string;
}

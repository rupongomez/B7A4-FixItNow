import { BookingStatus } from "../../../generated/prisma/enums";

export interface ITechnician {
  categoryId: string;
  bio: string;
  service: string;
  experience: number;
  hourlyRate: number;
  description: string;
  price: number;
  duration: number;
  location: string;
}

export interface ITechnicianQuery {
  limit?: number;
  page?: number;
  sortBy?: number;
  sortOrder?: number;
  hourlyRate?: string;
  minAverageRating?: number;
  minCompletedJobs?: number;
  location?: string;
  isAvailable?: boolean;
  searchTerms?: string;
}

export interface IStatus {
  status: BookingStatus;
}

import { Category } from "../../../generated/prisma/client";
import { ServiceWhereInput } from "../../../generated/prisma/models";

export interface IService {
  categoryId: string;
  technicianId: string;
  serviceTitle: string;
  description: string;
  price: number;
  duration: number;
  location: string;
}

export interface IServiceQuery extends ServiceWhereInput {
  categoryId?: string;
  location?: string;
  minRating?: number;
  maxPrice?: number;
  page?: string;
  limit?: string;
  sortOrder?: string;
  sortBy?: string;
  type?: string;
  minPrice?: string;
  searchTerms?: string;
}

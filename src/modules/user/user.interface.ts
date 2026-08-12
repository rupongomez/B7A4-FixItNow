type Role = "CUSTOMER" | "TECHNICIAN" | "ADMIN";

export interface RegisterUserPayload {
  name: string;
  email: string;
  password: string;
  location: string;
  phone: string;
  profileImage?: string;
  role: Role;
}

export interface IGoogleUser {
  id: string;
  email: string;
  verified_email: boolean;
  name: string;
  picture: string;
}

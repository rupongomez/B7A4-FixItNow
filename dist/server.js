

   import { createRequire } from 'module';

   const require = createRequire(import.meta.url);

  
var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// src/app.ts
import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors";

// src/config/index.ts
import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.join(process.cwd(), ".env") });
var config_default = {
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL,
  app_url: process.env.APP_URL,
  bcrypt_salt_rounds: process.env.BCRYPT_SALT_ROUNDS,
  jwt_access_secret: process.env.JWT_ACCESS_SECRET,
  jwt_refresh_secret: process.env.JWT_REFRESH_SECRET,
  jwt_access_expires_in: process.env.JWT_ACCESS_EXPIRES_IN,
  jwt_refresh_expires_in: process.env.JWT_REFRESH_EXPIRES_IN,
  stripe_product_price_id: process.env.STRIPE_PRODUCT_PRICE_ID,
  stripe_secret_key: process.env.STRIPE_SECRET_KEY,
  stripe_webhook_secret: process.env.STRIPE_WEBHOOK_SECRET
};

// src/modules/user/user.route.ts
import { Router } from "express";

// src/utils/catchAsync.ts
var catchAsync = (fn) => {
  return async (req, res, next) => {
    try {
      await fn(req, res, next);
    } catch (error) {
      next(error);
    }
  };
};
var sendResponse = (res, data) => {
  res.status(data.statusCode).json({
    success: data.success,
    statusCode: data.statusCode,
    message: data.message,
    data: data.data,
    meta: data.meta
  });
};

// src/modules/user/user.service.ts
import bcrypt from "bcryptjs";

// src/lib/prisma.ts
import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";

// generated/prisma/client.ts
import * as path2 from "path";
import { fileURLToPath } from "url";

// generated/prisma/internal/class.ts
import * as runtime from "@prisma/client/runtime/client";
var config = {
  "previewFeatures": [],
  "clientVersion": "7.8.0",
  "engineVersion": "3c6e192761c0362d496ed980de936e2f3cebcd3a",
  "activeProvider": "postgresql",
  "inlineSchema": 'model Availability {\n  id                  String            @id @default(uuid())\n  technicianProfileId String\n  technicianProfile   TechnicianProfile @relation(fields: [technicianProfileId], references: [id], onDelete: Cascade)\n  date                DateTime\n  startTime           DateTime\n  endTime             DateTime\n  isBooked            Boolean           @default(false)\n\n  booking Booking[]\n\n  @@map("availability")\n}\n\nmodel Booking {\n  id                 String            @id @default(uuid())\n  customerId         String\n  customer           User              @relation(fields: [customerId], references: [id], onDelete: Cascade)\n  technicianId       String\n  technician         TechnicianProfile @relation(fields: [technicianId], references: [id], onDelete: Cascade)\n  serviceId          String\n  service            Service           @relation(fields: [serviceId], references: [id], onDelete: Cascade)\n  availabilitySlotId String\n  availability       Availability      @relation(fields: [availabilitySlotId], references: [id], onDelete: Cascade)\n  bookingTime        DateTime\n  customerAddress    String\n  note               String?           @db.Text\n  totalPrice         Decimal           @db.Decimal(10, 2)\n  status             BookingStatus     @default(REQUESTED)\n\n  payments Payment[]\n  reviews  Review[]\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @default(now())\n\n  @@map("bookings")\n}\n\nmodel Category {\n  id          String   @id @default(uuid())\n  name        String\n  description String   @db.VarChar(255)\n  createdAt   DateTime @default(now())\n\n  service Service[]\n\n  @@map("category")\n}\n\nenum Role {\n  CUSTOMER\n  TECHNICIAN\n  ADMIN\n}\n\nenum Status {\n  ACTIVE\n  BANNED\n}\n\nenum BookingStatus {\n  REQUESTED\n  ACCEPTED\n  DECLINED\n  PAID\n  IN_PROGRESS\n  COMPLETED\n  CANCELLED\n}\n\nenum PaymentStatus {\n  PENDING\n  COMPLETED\n  FAILED\n}\n\nmodel Payment {\n  id String @id @default(uuid())\n\n  bookingId String  @unique\n  booking   Booking @relation(fields: [bookingId], references: [id], onDelete: Cascade)\n\n  customerId String\n  customer   User   @relation(fields: [customerId], references: [id], onDelete: Cascade)\n\n  transactionId    String @unique\n  stripeCustomerId String\n\n  amount   Decimal @db.Decimal(10, 2)\n  currency String  @default("USD")\n\n  status PaymentStatus @default(PENDING)\n\n  paidAt DateTime? @default(now())\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n\n  @@map("payments")\n}\n\nmodel Review {\n  id                  String            @id @default(uuid())\n  bookingId           String            @unique\n  booking             Booking           @relation(fields: [bookingId], references: [id], onDelete: Cascade)\n  customerId          String\n  customer            User              @relation(fields: [customerId], references: [id], onDelete: Cascade)\n  technicianProfileId String\n  technician          TechnicianProfile @relation(fields: [technicianProfileId], references: [id], onDelete: Cascade)\n  rating              Int\n  comment             String?           @db.Text\n  createdAt           DateTime          @default(now())\n}\n\n// This is your Prisma schema file,\n// learn more about it in the docs: https://pris.ly/d/prisma-schema\n\n// Get a free hosted Postgres database in seconds: `npx create-db`\n\ngenerator client {\n  provider = "prisma-client"\n  output   = "../../generated/prisma"\n}\n\ndatasource db {\n  provider = "postgresql"\n}\n\nmodel Service {\n  id                  String            @id @default(uuid())\n  technicianProfileId String\n  technicianProfile   TechnicianProfile @relation(fields: [technicianProfileId], references: [id], onDelete: Cascade)\n  categoryId          String\n  category            Category          @relation(fields: [categoryId], references: [id], onDelete: Cascade)\n  title               String            @db.VarChar(255)\n  description         String            @db.Text\n  price               Decimal           @db.Decimal(10, 2)\n  duration            Int\n  location            String\n  imageUrl            String            @db.Text\n\n  booking Booking[]\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @default(now())\n\n  @@map("services")\n}\n\nmodel TechnicianProfile {\n  id            String  @id @default(uuid())\n  userId        String  @unique\n  user          User    @relation(fields: [userId], references: [id], onDelete: Cascade)\n  bio           String  @db.Text\n  experience    Int\n  hourlyRate    Decimal @db.Decimal(10, 2)\n  averageRating Float   @default(0)\n  completedJobs Int     @default(0)\n  location      String\n  isAvailable   Boolean @default(true)\n\n  service      Service[]\n  availability Availability[]\n  reviews      Review[]\n  booking      Booking[]\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @default(now())\n\n  @@map("technicianProfile")\n}\n\nmodel User {\n  id                String             @id @default(uuid())\n  name              String             @db.VarChar(255)\n  email             String             @unique\n  password          String\n  phone             String\n  location          String             @db.VarChar(255)\n  role              Role               @default(CUSTOMER)\n  status            Status             @default(ACTIVE)\n  profileImage      String?            @db.VarChar(255)\n  stripeCustomerId  String?            @unique\n  technicianProfile TechnicianProfile?\n  bookings          Booking[]\n  payments          Payment[]\n  reviews           Review[]\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @default(now())\n\n  @@map("users")\n}\n',
  "runtimeDataModel": {
    "models": {},
    "enums": {},
    "types": {}
  },
  "parameterizationSchema": {
    "strings": [],
    "graph": ""
  }
};
config.runtimeDataModel = JSON.parse('{"models":{"Availability":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"technicianProfileId","kind":"scalar","type":"String"},{"name":"technicianProfile","kind":"object","type":"TechnicianProfile","relationName":"AvailabilityToTechnicianProfile"},{"name":"date","kind":"scalar","type":"DateTime"},{"name":"startTime","kind":"scalar","type":"DateTime"},{"name":"endTime","kind":"scalar","type":"DateTime"},{"name":"isBooked","kind":"scalar","type":"Boolean"},{"name":"booking","kind":"object","type":"Booking","relationName":"AvailabilityToBooking"}],"dbName":"availability"},"Booking":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"customerId","kind":"scalar","type":"String"},{"name":"customer","kind":"object","type":"User","relationName":"BookingToUser"},{"name":"technicianId","kind":"scalar","type":"String"},{"name":"technician","kind":"object","type":"TechnicianProfile","relationName":"BookingToTechnicianProfile"},{"name":"serviceId","kind":"scalar","type":"String"},{"name":"service","kind":"object","type":"Service","relationName":"BookingToService"},{"name":"availabilitySlotId","kind":"scalar","type":"String"},{"name":"availability","kind":"object","type":"Availability","relationName":"AvailabilityToBooking"},{"name":"bookingTime","kind":"scalar","type":"DateTime"},{"name":"customerAddress","kind":"scalar","type":"String"},{"name":"note","kind":"scalar","type":"String"},{"name":"totalPrice","kind":"scalar","type":"Decimal"},{"name":"status","kind":"enum","type":"BookingStatus"},{"name":"payments","kind":"object","type":"Payment","relationName":"BookingToPayment"},{"name":"reviews","kind":"object","type":"Review","relationName":"BookingToReview"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":"bookings"},"Category":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"name","kind":"scalar","type":"String"},{"name":"description","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"service","kind":"object","type":"Service","relationName":"CategoryToService"}],"dbName":"category"},"Payment":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"bookingId","kind":"scalar","type":"String"},{"name":"booking","kind":"object","type":"Booking","relationName":"BookingToPayment"},{"name":"customerId","kind":"scalar","type":"String"},{"name":"customer","kind":"object","type":"User","relationName":"PaymentToUser"},{"name":"transactionId","kind":"scalar","type":"String"},{"name":"stripeCustomerId","kind":"scalar","type":"String"},{"name":"amount","kind":"scalar","type":"Decimal"},{"name":"currency","kind":"scalar","type":"String"},{"name":"status","kind":"enum","type":"PaymentStatus"},{"name":"paidAt","kind":"scalar","type":"DateTime"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":"payments"},"Review":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"bookingId","kind":"scalar","type":"String"},{"name":"booking","kind":"object","type":"Booking","relationName":"BookingToReview"},{"name":"customerId","kind":"scalar","type":"String"},{"name":"customer","kind":"object","type":"User","relationName":"ReviewToUser"},{"name":"technicianProfileId","kind":"scalar","type":"String"},{"name":"technician","kind":"object","type":"TechnicianProfile","relationName":"ReviewToTechnicianProfile"},{"name":"rating","kind":"scalar","type":"Int"},{"name":"comment","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"}],"dbName":null},"Service":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"technicianProfileId","kind":"scalar","type":"String"},{"name":"technicianProfile","kind":"object","type":"TechnicianProfile","relationName":"ServiceToTechnicianProfile"},{"name":"categoryId","kind":"scalar","type":"String"},{"name":"category","kind":"object","type":"Category","relationName":"CategoryToService"},{"name":"title","kind":"scalar","type":"String"},{"name":"description","kind":"scalar","type":"String"},{"name":"price","kind":"scalar","type":"Decimal"},{"name":"duration","kind":"scalar","type":"Int"},{"name":"location","kind":"scalar","type":"String"},{"name":"imageUrl","kind":"scalar","type":"String"},{"name":"booking","kind":"object","type":"Booking","relationName":"BookingToService"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":"services"},"TechnicianProfile":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"userId","kind":"scalar","type":"String"},{"name":"user","kind":"object","type":"User","relationName":"TechnicianProfileToUser"},{"name":"bio","kind":"scalar","type":"String"},{"name":"experience","kind":"scalar","type":"Int"},{"name":"hourlyRate","kind":"scalar","type":"Decimal"},{"name":"averageRating","kind":"scalar","type":"Float"},{"name":"completedJobs","kind":"scalar","type":"Int"},{"name":"location","kind":"scalar","type":"String"},{"name":"isAvailable","kind":"scalar","type":"Boolean"},{"name":"service","kind":"object","type":"Service","relationName":"ServiceToTechnicianProfile"},{"name":"availability","kind":"object","type":"Availability","relationName":"AvailabilityToTechnicianProfile"},{"name":"reviews","kind":"object","type":"Review","relationName":"ReviewToTechnicianProfile"},{"name":"booking","kind":"object","type":"Booking","relationName":"BookingToTechnicianProfile"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":"technicianProfile"},"User":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"name","kind":"scalar","type":"String"},{"name":"email","kind":"scalar","type":"String"},{"name":"password","kind":"scalar","type":"String"},{"name":"phone","kind":"scalar","type":"String"},{"name":"location","kind":"scalar","type":"String"},{"name":"role","kind":"enum","type":"Role"},{"name":"status","kind":"enum","type":"Status"},{"name":"profileImage","kind":"scalar","type":"String"},{"name":"stripeCustomerId","kind":"scalar","type":"String"},{"name":"technicianProfile","kind":"object","type":"TechnicianProfile","relationName":"TechnicianProfileToUser"},{"name":"bookings","kind":"object","type":"Booking","relationName":"BookingToUser"},{"name":"payments","kind":"object","type":"Payment","relationName":"PaymentToUser"},{"name":"reviews","kind":"object","type":"Review","relationName":"ReviewToUser"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":"users"}},"enums":{},"types":{}}');
config.parameterizationSchema = {
  strings: JSON.parse('["where","technicianProfile","orderBy","cursor","customer","technician","service","_count","category","booking","availability","payments","reviews","bookings","user","Availability.findUnique","Availability.findUniqueOrThrow","Availability.findFirst","Availability.findFirstOrThrow","Availability.findMany","data","Availability.createOne","Availability.createMany","Availability.createManyAndReturn","Availability.updateOne","Availability.updateMany","Availability.updateManyAndReturn","create","update","Availability.upsertOne","Availability.deleteOne","Availability.deleteMany","having","_min","_max","Availability.groupBy","Availability.aggregate","Booking.findUnique","Booking.findUniqueOrThrow","Booking.findFirst","Booking.findFirstOrThrow","Booking.findMany","Booking.createOne","Booking.createMany","Booking.createManyAndReturn","Booking.updateOne","Booking.updateMany","Booking.updateManyAndReturn","Booking.upsertOne","Booking.deleteOne","Booking.deleteMany","_avg","_sum","Booking.groupBy","Booking.aggregate","Category.findUnique","Category.findUniqueOrThrow","Category.findFirst","Category.findFirstOrThrow","Category.findMany","Category.createOne","Category.createMany","Category.createManyAndReturn","Category.updateOne","Category.updateMany","Category.updateManyAndReturn","Category.upsertOne","Category.deleteOne","Category.deleteMany","Category.groupBy","Category.aggregate","Payment.findUnique","Payment.findUniqueOrThrow","Payment.findFirst","Payment.findFirstOrThrow","Payment.findMany","Payment.createOne","Payment.createMany","Payment.createManyAndReturn","Payment.updateOne","Payment.updateMany","Payment.updateManyAndReturn","Payment.upsertOne","Payment.deleteOne","Payment.deleteMany","Payment.groupBy","Payment.aggregate","Review.findUnique","Review.findUniqueOrThrow","Review.findFirst","Review.findFirstOrThrow","Review.findMany","Review.createOne","Review.createMany","Review.createManyAndReturn","Review.updateOne","Review.updateMany","Review.updateManyAndReturn","Review.upsertOne","Review.deleteOne","Review.deleteMany","Review.groupBy","Review.aggregate","Service.findUnique","Service.findUniqueOrThrow","Service.findFirst","Service.findFirstOrThrow","Service.findMany","Service.createOne","Service.createMany","Service.createManyAndReturn","Service.updateOne","Service.updateMany","Service.updateManyAndReturn","Service.upsertOne","Service.deleteOne","Service.deleteMany","Service.groupBy","Service.aggregate","TechnicianProfile.findUnique","TechnicianProfile.findUniqueOrThrow","TechnicianProfile.findFirst","TechnicianProfile.findFirstOrThrow","TechnicianProfile.findMany","TechnicianProfile.createOne","TechnicianProfile.createMany","TechnicianProfile.createManyAndReturn","TechnicianProfile.updateOne","TechnicianProfile.updateMany","TechnicianProfile.updateManyAndReturn","TechnicianProfile.upsertOne","TechnicianProfile.deleteOne","TechnicianProfile.deleteMany","TechnicianProfile.groupBy","TechnicianProfile.aggregate","User.findUnique","User.findUniqueOrThrow","User.findFirst","User.findFirstOrThrow","User.findMany","User.createOne","User.createMany","User.createManyAndReturn","User.updateOne","User.updateMany","User.updateManyAndReturn","User.upsertOne","User.deleteOne","User.deleteMany","User.groupBy","User.aggregate","AND","OR","NOT","id","name","email","password","phone","location","Role","role","Status","status","profileImage","stripeCustomerId","createdAt","updatedAt","equals","in","notIn","lt","lte","gt","gte","not","contains","startsWith","endsWith","every","some","none","userId","bio","experience","hourlyRate","averageRating","completedJobs","isAvailable","technicianProfileId","categoryId","title","description","price","duration","imageUrl","bookingId","customerId","rating","comment","transactionId","amount","currency","PaymentStatus","paidAt","technicianId","serviceId","availabilitySlotId","bookingTime","customerAddress","note","totalPrice","BookingStatus","date","startTime","endTime","isBooked","is","isNot","connectOrCreate","upsert","createMany","set","disconnect","delete","connect","updateMany","deleteMany","increment","decrement","multiply","divide"]'),
  graph: "6QRRgAELAQAAowIAIAkAAPsBACCXAQAAogIAMJgBAAAgABCZAQAAogIAMJoBAQAAAAG9AQEA9QEAIdUBQAD5AQAh1gFAAPkBACHXAUAA-QEAIdgBIACOAgAhAQAAAAEAIBMGAACQAgAgCQAA-wEAIAoAAJECACAMAAD9AQAgDgAAjwIAIJcBAACKAgAwmAEAAAMAEJkBAACKAgAwmgEBAPUBACGfAQEA9QEAIaYBQAD5AQAhpwFAAPkBACG2AQEA9QEAIbcBAQD1AQAhuAECAIsCACG5ARAAjAIAIboBCACNAgAhuwECAIsCACG8ASAAjgIAIQEAAAADACAVBAAAjwIAIAUAAKMCACAGAACtAgAgCgAArgIAIAsAAPwBACAMAAD9AQAglwEAAKsCADCYAQAABQAQmQEAAKsCADCaAQEA9QEAIaMBAACsAtUBIqYBQAD5AQAhpwFAAPkBACHFAQEA9QEAIc0BAQD1AQAhzgEBAPUBACHPAQEA9QEAIdABQAD5AQAh0QEBAPUBACHSAQEA-AEAIdMBEACMAgAhBwQAAO0DACAFAADiAwAgBgAAmwQAIAoAAJwEACALAADkAwAgDAAA5QMAINIBAACvAgAgFQQAAI8CACAFAACjAgAgBgAArQIAIAoAAK4CACALAAD8AQAgDAAA_QEAIJcBAACrAgAwmAEAAAUAEJkBAACrAgAwmgEBAAAAAaMBAACsAtUBIqYBQAD5AQAhpwFAAPkBACHFAQEA9QEAIc0BAQD1AQAhzgEBAPUBACHPAQEA9QEAIdABQAD5AQAh0QEBAPUBACHSAQEA-AEAIdMBEACMAgAhAwAAAAUAIAIAAAYAMAMAAAcAIBEBAACjAgAgCAAAqgIAIAkAAPsBACCXAQAAqQIAMJgBAAAJABCZAQAAqQIAMJoBAQD1AQAhnwEBAPUBACGmAUAA-QEAIacBQAD5AQAhvQEBAPUBACG-AQEA9QEAIb8BAQD1AQAhwAEBAPUBACHBARAAjAIAIcIBAgCLAgAhwwEBAPUBACEDAQAA4gMAIAgAAJoEACAJAADjAwAgEQEAAKMCACAIAACqAgAgCQAA-wEAIJcBAACpAgAwmAEAAAkAEJkBAACpAgAwmgEBAAAAAZ8BAQD1AQAhpgFAAPkBACGnAUAA-QEAIb0BAQD1AQAhvgEBAPUBACG_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_AMAICEAAP8DACAiAAD-AwAgMwAA_QMAIDQAAIAEACDMAQAArwIAIA6XAQAAlAIAMJgBAACCAQAQmQEAAJQCADCaAQEA4wEAIaMBAACVAswBIqUBAQDjAQAhpgFAAOcBACGnAUAA5wEAIcQBAQDjAQAhxQEBAOMBACHIAQEA4wEAIckBEACAAgAhygEBAOMBACHMAUAAlgIAIQMAAAAQACACAACBAQAwIAAAggEAIAMAAAAQACACAAARADADAAASACABAAAAFgAgAQAAABYAIAMAAAAUACACAAAVADADAAAWACADAAAAFAAgAgAAFQAwAwAAFgAgAwAAABQAIAIAABUAMAMAABYAIAoEAAD5AgAgBQAAzAIAIAkAAMsCACCaAQEAAAABpgFAAAAAAb0BAQAAAAHEAQEAAAABxQEBAAAAAcYBAgAAAAHHAQEAAAABARQAAIoBACAHmgEBAAAAAaYBQAAAAAG9AQEAAAABxAEBAAAAAcUBAQAAAAHGAQIAAAABxwEBAAAAAQEUAACMAQAwARQAAIwBADAKBAAA9wIAIAUAAMkCACAJAADIAgAgmgEBALMCACGmAUAAtwIAIb0BAQCzAgAhxAEBALMCACHFAQEAswIAIcYBAgDGAgAhxwEBALYCACECAAAAFgAgFAAAjwEAIAeaAQEAswIAIaYBQAC3AgAhvQEBALMCACHEAQEAswIAIcUBAQCzAgAhxgECAMYCACHHAQEAtgIAIQIAAAAUACAUAACRAQAgAgAAABQAIBQAAJEBACADAAAAFgAgGwAAigEAIBwAAI8BACABAAAAFgAgAQAAABQAIAYHAAD3AwAgIQAA-gMAICIAAPkDACAzAAD4AwAgNAAA-wMAIMcBAACvAgAgCpcBAACTAgAwmAEAAJgBABCZAQAAkwIAMJoBAQDjAQAhpgFAAOcBACG9AQEA4wEAIcQBAQDjAQAhxQEBAOMBACHGAQIA_wEAIccBAQDmAQAhAwAAABQAIAIAAJcBADAgAACYAQAgAwAAABQAIAIAABUAMAMAABYAIAEAAAALACABAAAACwAgAwAAAAkAIAIAAAoAMAMAAAsAIAMAAAAJACACAAAKADADAAALACADAAAACQAgAgAACgAwAwAACwAgDgEAAPYDACAIAADYAwAgCQAA2QMAIJoBAQAAAAGfAQEAAAABpgFAAAAAAacBQAAAAAG9AQEAAAABvgEBAAAAAb8BAQAAAAHAAQEAAAABwQEQAAAAAcIBAgAAAAHDAQEAAAABARQAAKABACALmgEBAAAAAZ8BAQAAAAGmAUAAAAABpwFAAAAAAb0BAQAAAAG-AQEAAAABvwEBAAAAAcABAQAAAAHBARAAAAABwgECAAAAAcMBAQAAAAEBFAAAogEAMAEUAACiAQAwDgEAAPUDACAIAADMAwAgCQAAzQMAIJoBAQCzAgAhnwEBALMCACGmAUAAtwIAIacBQAC3AgAhvQEBALMCACG-AQEAswIAIb8BAQCzAgAhwAEBALMCACHBARAA1wIAIcIBAgDGAgAhwwEBALMCACECAAAACwAgFAAApQEAIAuaAQEAswIAIZ8BAQCzAgAhpgFAALcCACGnAUAAtwIAIb0BAQCzAgAhvgEBALMCACG_AQEAswIAIcABAQCzAgAhwQEQANcCACHCAQIAxgIAIcMBAQCzAgAhAgAAAAkAIBQAAKcBACACAAAACQAgFAAApwEAIAMAAAALACAbAACgAQAgHAAApQEAIAEAAAALACABAAAACQAgBQcAAPADACAhAADzAwAgIgAA8gMAIDMAAPEDACA0AAD0AwAgDpcBAACSAgAwmAEAAK4BABCZAQAAkgIAMJoBAQDjAQAhnwEBAOMBACGmAUAA5wEAIacBQADnAQAhvQEBAOMBACG-AQEA4wEAIb8BAQDjAQAhwAEBAOMBACHBARAAgAIAIcIBAgD_AQAhwwEBAOMBACEDAAAACQAgAgAArQEAMCAAAK4BACADAAAACQAgAgAACgAwAwAACwAgEwYAAJACACAJAAD7AQAgCgAAkQIAIAwAAP0BACAOAACPAgAglwEAAIoCADCYAQAAAwAQmQEAAIoCADCaAQEAAAABnwEBAPUBACGmAUAA-QEAIacBQAD5AQAhtgEBAAAAAbcBAQD1AQAhuAECAIsCACG5ARAAjAIAIboBCACNAgAhuwECAIsCACG8ASAAjgIAIQEAAACxAQAgAQAAALEBACAFBgAA7gMAIAkAAOMDACAKAADvAwAgDAAA5QMAIA4AAO0DACADAAAAAwAgAgAAtAEAMAMAALEBACADAAAAAwAgAgAAtAEAMAMAALEBACADAAAAAwAgAgAAtAEAMAMAALEBACAQBgAA2gMAIAkAAN0DACAKAADbAwAgDAAA3AMAIA4AAOwDACCaAQEAAAABnwEBAAAAAaYBQAAAAAGnAUAAAAABtgEBAAAAAbcBAQAAAAG4AQIAAAABuQEQAAAAAboBCAAAAAG7AQIAAAABvAEgAAAAAQEUAAC4AQAgC5oBAQAAAAGfAQEAAAABpgFAAAAAAacBQAAAAAG2AQEAAAABtwEBAAAAAbgBAgAAAAG5ARAAAAABugEIAAAAAbsBAgAAAAG8ASAAAAABARQAALoBADABFAAAugEAMBAGAACSAwAgCQAAlQMAIAoAAJMDACAMAACUAwAgDgAA6wMAIJoBAQCzAgAhnwEBALMCACGmAUAAtwIAIacBQAC3AgAhtgEBALMCACG3AQEAswIAIbgBAgDGAgAhuQEQANcCACG6AQgAkAMAIbsBAgDGAgAhvAEgAJEDACECAAAAsQEAIBQAAL0BACALmgEBALMCACGfAQEAswIAIaYBQAC3AgAhpwFAALcCACG2AQEAswIAIbcBAQCzAgAhuAECAMYCACG5ARAA1wIAIboBCACQAwAhuwECAMYCACG8ASAAkQMAIQIAAAADACAUAAC_AQAgAgAAAAMAIBQAAL8BACADAAAAsQEAIBsAALgBACAcAAC9AQAgAQAAALEBACABAAAAAwAgBQcAAOYDACAhAADpAwAgIgAA6AMAIDMAAOcDACA0AADqAwAgDpcBAAD-AQAwmAEAAMYBABCZAQAA_gEAMJoBAQDjAQAhnwEBAOMBACGmAUAA5wEAIacBQADnAQAhtgEBAOMBACG3AQEA4wEAIbgBAgD_AQAhuQEQAIACACG6AQgAgQIAIbsBAgD_AQAhvAEgAIICACEDAAAAAwAgAgAAxQEAMCAAAMYBACADAAAAAwAgAgAAtAEAMAMAALEBACATAQAA-gEAIAsAAPwBACAMAAD9AQAgDQAA-wEAIJcBAAD0AQAwmAEAAMwBABCZAQAA9AEAMJoBAQAAAAGbAQEA9QEAIZwBAQAAAAGdAQEA9QEAIZ4BAQD1AQAhnwEBAPUBACGhAQAA9gGhASKjAQAA9wGjASKkAQEA-AEAIaUBAQAAAAGmAUAA-QEAIacBQAD5AQAhAQAAAMkBACABAAAAyQEAIBMBAAD6AQAgCwAA_AEAIAwAAP0BACANAAD7AQAglwEAAPQBADCYAQAAzAEAEJkBAAD0AQAwmgEBAPUBACGbAQEA9QEAIZwBAQD1AQAhnQEBAPUBACGeAQEA9QEAIZ8BAQD1AQAhoQEAAPYBoQEiowEAAPcBowEipAEBAPgBACGlAQEA-AEAIaYBQAD5AQAhpwFAAPkBACEGAQAA4gMAIAsAAOQDACAMAADlAwAgDQAA4wMAIKQBAACvAgAgpQEAAK8CACADAAAAzAEAIAIAAM0BADADAADJAQAgAwAAAMwBACACAADNAQAwAwAAyQEAIAMAAADMAQAgAgAAzQEAMAMAAMkBACAQAQAA3gMAIAsAAOADACAMAADhAwAgDQAA3wMAIJoBAQAAAAGbAQEAAAABnAEBAAAAAZ0BAQAAAAGeAQEAAAABnwEBAAAAAaEBAAAAoQECowEAAACjAQKkAQEAAAABpQEBAAAAAaYBQAAAAAGnAUAAAAABARQAANEBACAMmgEBAAAAAZsBAQAAAAGcAQEAAAABnQEBAAAAAZ4BAQAAAAGfAQEAAAABoQEAAAChAQKjAQAAAKMBAqQBAQAAAAGlAQEAAAABpgFAAAAAAacBQAAAAAEBFAAA0wEAMAEUAADTAQAwEAEAALgCACALAAC6AgAgDAAAuwIAIA0AALkCACCaAQEAswIAIZsBAQCzAgAhnAEBALMCACGdAQEAswIAIZ4BAQCzAgAhnwEBALMCACGhAQAAtAKhASKjAQAAtQKjASKkAQEAtgIAIaUBAQC2AgAhpgFAALcCACGnAUAAtwIAIQIAAADJAQAgFAAA1gEAIAyaAQEAswIAIZsBAQCzAgAhnAEBALMCACGdAQEAswIAIZ4BAQCzAgAhnwEBALMCACGhAQAAtAKhASKjAQAAtQKjASKkAQEAtgIAIaUBAQC2AgAhpgFAALcCACGnAUAAtwIAIQIAAADMAQAgFAAA2AEAIAIAAADMAQAgFAAA2AEAIAMAAADJAQAgGwAA0QEAIBwAANYBACABAAAAyQEAIAEAAADMAQAgBQcAALACACAhAACyAgAgIgAAsQIAIKQBAACvAgAgpQEAAK8CACAPlwEAAOIBADCYAQAA3wEAEJkBAADiAQAwmgEBAOMBACGbAQEA4wEAIZwBAQDjAQAhnQEBAOMBACGeAQEA4wEAIZ8BAQDjAQAhoQEAAOQBoQEiowEAAOUBowEipAEBAOYBACGlAQEA5gEAIaYBQADnAQAhpwFAAOcBACEDAAAAzAEAIAIAAN4BADAgAADfAQAgAwAAAMwBACACAADNAQAwAwAAyQEAIA-XAQAA4gEAMJgBAADfAQAQmQEAAOIBADCaAQEA4wEAIZsBAQDjAQAhnAEBAOMBACGdAQEA4wEAIZ4BAQDjAQAhnwEBAOMBACGhAQAA5AGhASKjAQAA5QGjASKkAQEA5gEAIaUBAQDmAQAhpgFAAOcBACGnAUAA5wEAIQ4HAADpAQAgIQAA8wEAICIAAPMBACCoAQEAAAABqQEBAAAABKoBAQAAAASrAQEAAAABrAEBAAAAAa0BAQAAAAGuAQEAAAABrwEBAPIBACGwAQEAAAABsQEBAAAAAbIBAQAAAAEHBwAA6QEAICEAAPEBACAiAADxAQAgqAEAAAChAQKpAQAAAKEBCKoBAAAAoQEIrwEAAPABoQEiBwcAAOkBACAhAADvAQAgIgAA7wEAIKgBAAAAowECqQEAAACjAQiqAQAAAKMBCK8BAADuAaMBIg4HAADsAQAgIQAA7QEAICIAAO0BACCoAQEAAAABqQEBAAAABaoBAQAAAAWrAQEAAAABrAEBAAAAAa0BAQAAAAGuAQEAAAABrwEBAOsBACGwAQEAAAABsQEBAAAAAbIBAQAAAAELBwAA6QEAICEAAOoBACAiAADqAQAgqAFAAAAAAakBQAAAAASqAUAAAAAEqwFAAAAAAawBQAAAAAGtAUAAAAABrgFAAAAAAa8BQADoAQAhCwcAAOkBACAhAADqAQAgIgAA6gEAIKgBQAAAAAGpAUAAAAAEqgFAAAAABKsBQAAAAAGsAUAAAAABrQFAAAAAAa4BQAAAAAGvAUAA6AEAIQioAQIAAAABqQECAAAABKoBAgAAAASrAQIAAAABrAECAAAAAa0BAgAAAAGuAQIAAAABrwECAOkBACEIqAFAAAAAAakBQAAAAASqAUAAAAAEqwFAAAAAAawBQAAAAAGtAUAAAAABrgFAAAAAAa8BQADqAQAhDgcAAOwBACAhAADtAQAgIgAA7QEAIKgBAQAAAAGpAQEAAAAFqgEBAAAABasBAQAAAAGsAQEAAAABrQEBAAAAAa4BAQAAAAGvAQEA6wEAIbABAQAAAAGxAQEAAAABsgEBAAAAAQioAQIAAAABqQECAAAABaoBAgAAAAWrAQIAAAABrAECAAAAAa0BAgAAAAGuAQIAAAABrwECAOwBACELqAEBAAAAAakBAQAAAAWqAQEAAAAFqwEBAAAAAawBAQAAAAGtAQEAAAABrgEBAAAAAa8BAQDtAQAhsAEBAAAAAbEBAQAAAAGyAQEAAAABBwcAAOkBACAhAADvAQAgIgAA7wEAIKgBAAAAowECqQEAAACjAQiqAQAAAKMBCK8BAADuAaMBIgSoAQAAAKMBAqkBAAAAowEIqgEAAACjAQivAQAA7wGjASIHBwAA6QEAICEAAPEBACAiAADxAQAgqAEAAAChAQKpAQAAAKEBCKoBAAAAoQEIrwEAAPABoQEiBKgBAAAAoQECqQEAAAChAQiqAQAAAKEBCK8BAADxAaEBIg4HAADpAQAgIQAA8wEAICIAAPMBACCoAQEAAAABqQEBAAAABKoBAQAAAASrAQEAAAABrAEBAAAAAa0BAQAAAAGuAQEAAAABrwEBAPIBACGwAQEAAAABsQEBAAAAAbIBAQAAAAELqAEBAAAAAakBAQAAAASqAQEAAAAEqwEBAAAAAawBAQAAAAGtAQEAAAABrgEBAAAAAa8BAQDzAQAhsAEBAAAAAbEBAQAAAAGyAQEAAAABEwEAAPoBACALAAD8AQAgDAAA_QEAIA0AAPsBACCXAQAA9AEAMJgBAADMAQAQmQEAAPQBADCaAQEA9QEAIZsBAQD1AQAhnAEBAPUBACGdAQEA9QEAIZ4BAQD1AQAhnwEBAPUBACGhAQAA9gGhASKjAQAA9wGjASKkAQEA-AEAIaUBAQD4AQAhpgFAAPkBACGnAUAA-QEAIQuoAQEAAAABqQEBAAAABKoBAQAAAASrAQEAAAABrAEBAAAAAa0BAQAAAAGuAQEAAAABrwEBAPMBACGwAQEAAAABsQEBAAAAAbIBAQAAAAEEqAEAAAChAQKpAQAAAKEBCKoBAAAAoQEIrwEAAPEBoQEiBKgBAAAAowECqQEAAACjAQiqAQAAAKMBCK8BAADvAaMBIguoAQEAAAABqQEBAAAABaoBAQAAAAWrAQEAAAABrAEBAAAAAa0BAQAAAAGuAQEAAAABrwEBAO0BACGwAQEAAAABsQEBAAAAAbIBAQAAAAEIqAFAAAAAAakBQAAAAASqAUAAAAAEqwFAAAAAAawBQAAAAAGtAUAAAAABrgFAAAAAAa8BQADqAQAhFQYAAJACACAJAAD7AQAgCgAAkQIAIAwAAP0BACAOAACPAgAglwEAAIoCADCYAQAAAwAQmQEAAIoCADCaAQEA9QEAIZ8BAQD1AQAhpgFAAPkBACGnAUAA-QEAIbYBAQD1AQAhtwEBAPUBACG4AQIAiwIAIbkBEACMAgAhugEIAI0CACG7AQIAiwIAIbwBIACOAgAh2QEAAAMAINoBAAADACADswEAAAUAILQBAAAFACC1AQAABQAgA7MBAAAQACC0AQAAEAAgtQEAABAAIAOzAQAAFAAgtAEAABQAILUBAAAUACAOlwEAAP4BADCYAQAAxgEAEJkBAAD-AQAwmgEBAOMBACGfAQEA4wEAIaYBQADnAQAhpwFAAOcBACG2AQEA4wEAIbcBAQDjAQAhuAECAP8BACG5ARAAgAIAIboBCACBAgAhuwECAP8BACG8ASAAggIAIQ0HAADpAQAgIQAA6QEAICIAAOkBACAzAACGAgAgNAAA6QEAIKgBAgAAAAGpAQIAAAAEqgECAAAABKsBAgAAAAGsAQIAAAABrQECAAAAAa4BAgAAAAGvAQIAiQIAIQ0HAADpAQAgIQAAiAIAICIAAIgCACAzAACIAgAgNAAAiAIAIKgBEAAAAAGpARAAAAAEqgEQAAAABKsBEAAAAAGsARAAAAABrQEQAAAAAa4BEAAAAAGvARAAhwIAIQ0HAADpAQAgIQAAhgIAICIAAIYCACAzAACGAgAgNAAAhgIAIKgBCAAAAAGpAQgAAAAEqgEIAAAABKsBCAAAAAGsAQgAAAABrQEIAAAAAa4BCAAAAAGvAQgAhQIAIQUHAADpAQAgIQAAhAIAICIAAIQCACCoASAAAAABrwEgAIMCACEFBwAA6QEAICEAAIQCACAiAACEAgAgqAEgAAAAAa8BIACDAgAhAqgBIAAAAAGvASAAhAIAIQ0HAADpAQAgIQAAhgIAICIAAIYCACAzAACGAgAgNAAAhgIAIKgBCAAAAAGpAQgAAAAEqgEIAAAABKsBCAAAAAGsAQgAAAABrQEIAAAAAa4BCAAAAAGvAQgAhQIAIQioAQgAAAABqQEIAAAABKoBCAAAAASrAQgAAAABrAEIAAAAAa0BCAAAAAGuAQgAAAABrwEIAIYCACENBwAA6QEAICEAAIgCACAiAACIAgAgMwAAiAIAIDQAAIgCACCoARAAAAABqQEQAAAABKoBEAAAAASrARAAAAABrAEQAAAAAa0BEAAAAAGuARAAAAABrwEQAIcCACEIqAEQAAAAAakBEAAAAASqARAAAAAEqwEQAAAAAawBEAAAAAGtARAAAAABrgEQAAAAAa8BEACIAgAhDQcAAOkBACAhAADpAQAgIgAA6QEAIDMAAIYCACA0AADpAQAgqAECAAAAAakBAgAAAASqAQIAAAAEqwECAAAAAawBAgAAAAGtAQIAAAABrgECAAAAAa8BAgCJAgAhEwYAAJACACAJAAD7AQAgCgAAkQIAIAwAAP0BACAOAACPAgAglwEAAIoCADCYAQAAAwAQmQEAAIoCADCaAQEA9QEAIZ8BAQD1AQAhpgFAAPkBACGnAUAA-QEAIbYBAQD1AQAhtwEBAPUBACG4AQIAiwIAIbkBEACMAgAhugEIAI0CACG7AQIAiwIAIbwBIACOAgAhCKgBAgAAAAGpAQIAAAAEqgECAAAABKsBAgAAAAGsAQIAAAABrQECAAAAAa4BAgAAAAGvAQIA6QEAIQioARAAAAABqQEQAAAABKoBEAAAAASrARAAAAABrAEQAAAAAa0BEAAAAAGuARAAAAABrwEQAIgCACEIqAEIAAAAAakBCAAAAASqAQgAAAAEqwEIAAAAAawBCAAAAAGtAQgAAAABrgEIAAAAAa8BCACGAgAhAqgBIAAAAAGvASAAhAIAIRUBAAD6AQAgCwAA_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_AEAIAwAAP0BACCXAQAAqwIAMJgBAAAFABCZAQAAqwIAMJoBAQD1AQAhowEAAKwC1QEipgFAAPkBACGnAUAA-QEAIcUBAQD1AQAhzQEBAPUBACHOAQEA9QEAIc8BAQD1AQAh0AFAAPkBACHRAQEA9QEAIdIBAQD4AQAh0wEQAIwCACHZAQAABQAg2gEAAAUAIBAEAACPAgAgCQAApQIAIJcBAACmAgAwmAEAABAAEJkBAACmAgAwmgEBAPUBACGjAQAApwLMASKlAQEA9QEAIaYBQAD5AQAhpwFAAPkBACHEAQEA9QEAIcUBAQD1AQAhyAEBAPUBACHJARAAjAIAIcoBAQD1AQAhzAFAAKgCACEEqAEAAADMAQKpAQAAAMwBCKoBAAAAzAEIrwEAAJoCzAEiCKgBQAAAAAGpAUAAAAAFqgFAAAAABasBQAAAAAGsAUAAAAABrQFAAAAAAa4BQAAAAAGvAUAAmAIAIREBAACjAgAgCAAAqgIAIAkAAPsBACCXAQAAqQIAMJgBAAAJABCZAQAAqQIAMJoBAQD1AQAhnwEBAPUBACGmAUAA-QEAIacBQAD5AQAhvQEBAPUBACG-AQEA9QEAIb8BAQD1AQAhwAEBAPUBACHBARAAjAIAIcIBAgCLAgAhwwEBAPUBACEKBgAAkAIAIJcBAACcAgAwmAEAAFkAEJkBAACcAgAwmgEBAPUBACGbAQEA9QEAIaYBQAD5AQAhwAEBAPUBACHZAQAAWQAg2gEAAFkAIBUEAACPAgAgBQAAowIAIAYAAK0CACAKAACuAgAgCwAA_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_AEAIAwAAP0BACCXAQAAqwIAMJgBAAAFABCZAQAAqwIAMJoBAQAAAAGjAQAArALVASKmAUAA-QEAIacBQAD5AQAhxQEBAPUBACHNAQEA9QEAIc4BAQD1AQAhzwEBAPUBACHQAUAA-QEAIdEBAQD1AQAh0gEBAPgBACHTARAAjAIAIQIAAAAHACAUAADpAgAgAgAAAOYCACAUAADnAgAgD5cBAADlAgAwmAEAAOYCABCZAQAA5QIAMJoBAQD1AQAhowEAAKwC1QEipgFAAPkBACGnAUAA-QEAIcUBAQD1AQAhzQEBAPUBACHOAQEA9QEAIc8BAQD1AQAh0AFAAPkBACHRAQEA9QEAIdIBAQD4AQAh0wEQAIwCACEPlwEAAOUCADCYAQAA5gIAEJkBAADlAgAwmgEBAPUBACGjAQAArALVASKmAUAA-QEAIacBQAD5AQAhxQEBAPUBACHNAQEA9QEAIc4BAQD1AQAhzwEBAPUBACHQAUAA-QEAIdEBAQD1AQAh0gEBAPgBACHTARAAjAIAIQuaAQEAswIAIaMBAADoAtUBIqYBQAC3AgAhpwFAALcCACHNAQEAswIAIc4BAQCzAgAhzwEBALMCACHQAUAAtwIAIdEBAQCzAgAh0gEBALYCACHTARAA1wIAIQHeAQAAANUBAhAFAADqAgAgBgAA6wIAIAoAAOwCACALAADtAgAgDAAA7gIAIJoBAQCzAgAhowEAAOgC1QEipgFAALcCACGnAUAAtwIAIc0BAQCzAgAhzgEBALMCACHPAQEAswIAIdABQAC3AgAh0QEBALMCACHSAQEAtgIAIdMBEADXAgAhBRsAAMEEACAcAADWBAAg2wEAAMIEACDcAQAA1QQAIOEBAACxAQAgBRsAAL8EACAcAADTBAAg2wEAAMAEACDcAQAA0gQAIOEBAAALACAFGwAAvQQAIBwAANAEACDbAQAAvgQAINwBAADPBAAg4QEAAAEAIAsbAAD6AgAwHAAA_gIAMNsBAAD7AgAw3AEAAPwCADDdAQAA_QIAIN4BAADRAgAw3wEAANECADDgAQAA0QIAMOEBAADRAgAw4gEAAP8CADDjAQAA1AIAMAsbAADvAgAwHAAA8wIAMNsBAADwAgAw3AEAAPECADDdAQAA8gIAIN4BAADAAgAw3wEAAMACADDgAQAAwAIAMOEBAADAAgAw4gEAAPQCADDjAQAAwwIAMAgEAAD5AgAgBQAAzAIAIJoBAQAAAAGmAUAAAAABvQEBAAAAAcUBAQAAAAHGAQIAAAABxwEBAAAAAQIAAAAWACAbAAD4AgAgAwAAABYAIBsAAPgCACAcAAD2AgAgARQAAM4EADACAAAAFgAgFAAA9gIAIAIAAADEAgAgFAAA9QIAIAaaAQEAswIAIaYBQAC3AgAhvQEBALMCACHFAQEAswIAIcYBAgDGAgAhxwEBALYCACEIBAAA9wIAIAUAAMkCACCaAQEAswIAIaYBQAC3AgAhvQEBALMCACHFAQEAswIAIcYBAgDGAgAhxwEBALYCACEFGwAAyQQAIBwAAMwEACDbAQAAygQAINwBAADLBAAg4QEAAMkBACAIBAAA-QIAIAUAAMwCACCaAQEAAAABpgFAAAAAAb0BAQAAAAHFAQEAAAABxgECAAAAAccBAQAAAAEDGwAAyQQAINsBAADKBAAg4QEAAMkBACALBAAAhAMAIJoBAQAAAAGjAQAAAMwBAqUBAQAAAAGmAUAAAAABpwFAAAAAAcUBAQAAAAHIAQEAAAAByQEQAAAAAcoBAQAAAAHMAUAAAAABAgAAABIAIBsAAIMDACADAAAAEgAgGwAAgwMAIBwAAIEDACABFAAAyAQAMAIAAAASACAUAACBAwAgAgAAANUCACAUAACAAwAgCpoBAQCzAgAhowEAANgCzAEipQEBALMCACGmAUAAtwIAIacBQAC3AgAhxQEBALMCACHIAQEAswIAIckBEADXAgAhygEBALMCACHMAUAA2QIAIQsEAACCAwAgmgEBALMCACGjAQAA2ALMASKlAQEAswIAIaYBQAC3AgAhpwFAALcCACHFAQEAswIAIcgBAQCzAgAhyQEQANcCACHKAQEAswIAIcwBQADZAgAhBRsAAMMEACAcAADGBAAg2wEAAMQEACDcAQAAxQQAIOEBAADJAQAgCwQAAIQDACCaAQEAAAABowEAAADMAQKlAQEAAAABpgFAAAAAAacBQAAAAAHFAQEAAAAByAEBAAAAAckBEAAAAAHKAQEAAAABzAFAAAAAAQMbAADDBAAg2wEAAMQEACDhAQAAyQEAIBAFAACGAwAgBgAAhwMAIAoAAIgDACALAACJAwAgDAAAigMAIJoBAQAAAAGjAQAAANUBAqYBQAAAAAGnAUAAAAABzQEBAAAAAc4BAQAAAAHPAQEAAAAB0AFAAAAAAdEBAQAAAAHSAQEAAAAB0wEQAAAAAQMbAADBBAAg2wEAAMIEACDhAQAAsQEAIAMbAAC_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-QEAIb0BAQD1AQAhvgEBAPUBACG_AQEA9QEAIcABAQD1AQAhwQEQAIwCACHCAQIAiwIAIcMBAQD1AQAhAgAAAAsAIBQAAMsDACACAAAAyQMAIBQAAMoDACAOlwEAAMgDADCYAQAAyQMAEJkBAADIAwAwmgEBAPUBACGfAQEA9QEAIaYBQAD5AQAhpwFAAPkBACG9AQEA9QEAIb4BAQD1AQAhvwEBAPUBACHAAQEA9QEAIcEBEACMAgAhwgECAIsCACHDAQEA9QEAIQ6XAQAAyAMAMJgBAADJAwAQmQEAAMgDADCaAQEA9QEAIZ8BAQD1AQAhpgFAAPkBACGnAUAA-QEAIb0BAQD1AQAhvgEBAPUBACG_AQEA9QEAIcABAQD1AQAhwQEQAIwCACHCAQIAiwIAIcMBAQD1AQAhCpoBAQCzAgAhnwEBALMCACGmAUAAtwIAIacBQAC3AgAhvgEBALMCACG_AQEAswIAIcABAQCzAgAhwQEQANcCACHCAQIAxgIAIcMBAQCzAgAhDAgAAMwDACAJAADNAwAgmgEBALMCACGfAQEAswIAIaYBQAC3AgAhpwFAALcCACG-AQEAswIAIb8BAQCzAgAhwAEBALMCACHBARAA1wIAIcIBAgDGAgAhwwEBALMCACEFGwAArQQAIBwAALEEACDbAQAArgQAINwBAACwBAAg4QEAAFYAIAsbAADOAwAwHAAA0gMAMNsBAADPAwAw3AEAANADADDdAQAA0QMAIN4BAADiAgAw3wEAAOICADDgAQAA4gIAMOEBAADiAgAw4gEAANMDADDjAQAA5QIAMBAEAACgAwAgBQAAhgMAIAoAAIgDACALAACJAwAgDAAAigMAIJoBAQAAAAGjAQAAANUBAqYBQAAAAAGnAUAAAAABxQEBAAAAAc0BAQAAAAHPAQEAAAAB0AFAAAAAAdEBAQAAAAHSAQEAAAAB0wEQAAAAAQIAAAAHACAbAADWAwAgAwAAAAcAIBsAANYDACAcAADVAwAgARQAAK8EADACAAAABwAgFAAA1QMAIAIAAADmAgAgFAAA1AMAIAuaAQEAswIAIaMBAADoAtUBIqYBQAC3AgAhpwFAALcCACHFAQEAswIAIc0BAQCzAgAhzwEBALMCACHQAUAAtwIAIdEBAQCzAgAh0gEBALYCACHTARAA1wIAIRAEAACeAwAgBQAA6gIAIAoAAOwCACALAADtAgAgDAAA7gIAIJoBAQCzAgAhowEAAOgC1QEipgFAALcCACGnAUAAtwIAIcUBAQCzAgAhzQEBALMCACHPAQEAswIAIdABQAC3AgAh0QEBALMCACHSAQEAtgIAIdMBEADXAgAhEAQAAKADACAFAACGAwAgCgAAiAMAIAsAAIkDACAMAACKAwAgmgEBAAAAAaMBAAAA1QECpgFAAAAAAacBQAAAAAHFAQEAAAABzQEBAAAAAc8BAQAAAAHQAUAAAAAB0QEBAAAAAdIBAQAAAAHTARAAAAABDAgAANgDACAJAADZAwAgmgEBAAAAAZ8BAQAAAAGmAUAAAAABpwFAAAAAAb4BAQAAAAG_AQEAAAABwAEBAAAAAcEBEAAAAAHCAQIAAAABwwEBAAAAAQMbAACtBAAg2wEAAK4EACDhAQAAVgAgBBsAAM4DADDbAQAAzwMAMN0BAADRAwAg4QEAAOICADAEGwAAwQMAMNsBAADCAwAw3QEAAMQDACDhAQAAxQMAMAQbAACqAwAw2wEAAKsDADDdAQAArQMAIOEBAACuAwAwBBsAAKEDADDbAQAAogMAMN0BAACkAwAg4QEAAMACADAEGwAAlgMAMNsBAACXAwAw3QEAAJkDACDhAQAA4gIAMAMbAACLAwAg2wEAAIwDACDhAQAAsQEAIAQbAADeAgAw2wEAAN8CADDdAQAA4QIAIOEBAADiAgAwBBsAAM0CADDbAQAAzgIAMN0BAADQAgAg4QEAANECADAEGwAAvAIAMNsBAAC9AgAw3QEAAL8CACDhAQAAwAIAMAUGAADuAwAgCQAA4wMAIAoAAO8DACAMAADlAwAgDgAA7QMAIAAAAAAAAAAABRsAAKgEACAcAACrBAAg2wEAAKkEACDcAQAAqgQAIOEBAADJAQAgAxsAAKgEACDbAQAAqQQAIOEBAADJAQAgBgEAAOIDACALAADkAwAgDAAA5QMAIA0AAOMDACCkAQAArwIAIKUBAACvAgAgAAAAAAAAAAUbAACjBAAgHAAApgQAINsBAACkBAAg3AEAAKUEACDhAQAAsQEAIAMbAACjBAAg2wEAAKQEACDhAQAAsQEAIAAAAAAAAAAAAAAAAAALGwAAhQQAMBwAAIkEADDbAQAAhgQAMNwBAACHBAAw3QEAAIgEACDeAQAAxQMAMN8BAADFAwAw4AEAAMUDADDhAQAAxQMAMOIBAACKBAAw4wEAAMgDADAMAQAA9gMAIAkAANkDACCaAQEAAAABnwEBAAAAAaYBQAAAAAGnAUAAAAABvQEBAAAAAb8BAQAAAAHAAQEAAAABwQEQAAAAAcIBAgAAAAHDAQEAAAABAgAAAAsAIBsAAI0EACADAAAACwAgGwAAjQQAIBwAAIwEACABFAAAogQAMAIAAAALACAUAACMBAAgAgAAAMkDACAUAACLBAAgCpoBAQCzAgAhnwEBALMCACGmAUAAtwIAIacBQAC3AgAhvQEBALMCACG_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_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-YiA_ZAZAZg9BZyFCaAZDaQZEag9FbSJGbiZHbwlIcAlJcQlKcglLcwlMdQlNdw9OeCdPeglQfA9RfShSfglTfwlUgAEPVYMBKVaEAS9XhQEKWIYBClmHAQpaiAEKW4kBClyLAQpdjQEPXo4BMF-QAQpgkgEPYZMBMWKUAQpjlQEKZJYBD2WZATJmmgE4Z5sBBWicAQVpnQEFap4BBWufAQVsoQEFbaMBD26kATlvpgEFcKgBD3GpATpyqgEFc6sBBXSsAQ91rwE7drABQXeyAQJ4swECebUBAnq2AQJ7twECfLkBAn27AQ9-vAFCf74BAoABwAEPgQHBAUOCAcIBAoMBwwEChAHEAQ-FAccBRIYByAFKhwHKAQOIAcsBA4kBzgEDigHPAQOLAdABA4wB0gEDjQHUAQ-OAdUBS48B1wEDkAHZAQ-RAdoBTJIB2wEDkwHcAQOUAd0BD5UB4AFNlgHhAVE"
};
async function decodeBase64AsWasm(wasmBase64) {
  const { Buffer: Buffer2 } = await import("buffer");
  const wasmArray = Buffer2.from(wasmBase64, "base64");
  return new WebAssembly.Module(wasmArray);
}
config.compilerWasm = {
  getRuntime: async () => await import("@prisma/client/runtime/query_compiler_fast_bg.postgresql.mjs"),
  getQueryCompilerWasmModule: async () => {
    const { wasm } = await import("@prisma/client/runtime/query_compiler_fast_bg.postgresql.wasm-base64.mjs");
    return await decodeBase64AsWasm(wasm);
  },
  importName: "./query_compiler_fast_bg.js"
};
function getPrismaClientClass() {
  return runtime.getPrismaClient(config);
}

// generated/prisma/internal/prismaNamespace.ts
var prismaNamespace_exports = {};
__export(prismaNamespace_exports, {
  AnyNull: () => AnyNull2,
  AvailabilityScalarFieldEnum: () => AvailabilityScalarFieldEnum,
  BookingScalarFieldEnum: () => BookingScalarFieldEnum,
  CategoryScalarFieldEnum: () => CategoryScalarFieldEnum,
  DbNull: () => DbNull2,
  Decimal: () => Decimal2,
  JsonNull: () => JsonNull2,
  ModelName: () => ModelName,
  NullTypes: () => NullTypes2,
  NullsOrder: () => NullsOrder,
  PaymentScalarFieldEnum: () => PaymentScalarFieldEnum,
  PrismaClientInitializationError: () => PrismaClientInitializationError2,
  PrismaClientKnownRequestError: () => PrismaClientKnownRequestError2,
  PrismaClientRustPanicError: () => PrismaClientRustPanicError2,
  PrismaClientUnknownRequestError: () => PrismaClientUnknownRequestError2,
  PrismaClientValidationError: () => PrismaClientValidationError2,
  QueryMode: () => QueryMode,
  ReviewScalarFieldEnum: () => ReviewScalarFieldEnum,
  ServiceScalarFieldEnum: () => ServiceScalarFieldEnum,
  SortOrder: () => SortOrder,
  Sql: () => Sql2,
  TechnicianProfileScalarFieldEnum: () => TechnicianProfileScalarFieldEnum,
  TransactionIsolationLevel: () => TransactionIsolationLevel,
  UserScalarFieldEnum: () => UserScalarFieldEnum,
  defineExtension: () => defineExtension,
  empty: () => empty2,
  getExtensionContext: () => getExtensionContext,
  join: () => join2,
  prismaVersion: () => prismaVersion,
  raw: () => raw2,
  sql: () => sql
});
import * as runtime2 from "@prisma/client/runtime/client";
var PrismaClientKnownRequestError2 = runtime2.PrismaClientKnownRequestError;
var PrismaClientUnknownRequestError2 = runtime2.PrismaClientUnknownRequestError;
var PrismaClientRustPanicError2 = runtime2.PrismaClientRustPanicError;
var PrismaClientInitializationError2 = runtime2.PrismaClientInitializationError;
var PrismaClientValidationError2 = runtime2.PrismaClientValidationError;
var sql = runtime2.sqltag;
var empty2 = runtime2.empty;
var join2 = runtime2.join;
var raw2 = runtime2.raw;
var Sql2 = runtime2.Sql;
var Decimal2 = runtime2.Decimal;
var getExtensionContext = runtime2.Extensions.getExtensionContext;
var prismaVersion = {
  client: "7.8.0",
  engine: "3c6e192761c0362d496ed980de936e2f3cebcd3a"
};
var NullTypes2 = {
  DbNull: runtime2.NullTypes.DbNull,
  JsonNull: runtime2.NullTypes.JsonNull,
  AnyNull: runtime2.NullTypes.AnyNull
};
var DbNull2 = runtime2.DbNull;
var JsonNull2 = runtime2.JsonNull;
var AnyNull2 = runtime2.AnyNull;
var ModelName = {
  Availability: "Availability",
  Booking: "Booking",
  Category: "Category",
  Payment: "Payment",
  Review: "Review",
  Service: "Service",
  TechnicianProfile: "TechnicianProfile",
  User: "User"
};
var TransactionIsolationLevel = runtime2.makeStrictEnum({
  ReadUncommitted: "ReadUncommitted",
  ReadCommitted: "ReadCommitted",
  RepeatableRead: "RepeatableRead",
  Serializable: "Serializable"
});
var AvailabilityScalarFieldEnum = {
  id: "id",
  technicianProfileId: "technicianProfileId",
  date: "date",
  startTime: "startTime",
  endTime: "endTime",
  isBooked: "isBooked"
};
var BookingScalarFieldEnum = {
  id: "id",
  customerId: "customerId",
  technicianId: "technicianId",
  serviceId: "serviceId",
  availabilitySlotId: "availabilitySlotId",
  bookingTime: "bookingTime",
  customerAddress: "customerAddress",
  note: "note",
  totalPrice: "totalPrice",
  status: "status",
  createdAt: "createdAt",
  updatedAt: "updatedAt"
};
var CategoryScalarFieldEnum = {
  id: "id",
  name: "name",
  description: "description",
  createdAt: "createdAt"
};
var PaymentScalarFieldEnum = {
  id: "id",
  bookingId: "bookingId",
  customerId: "customerId",
  transactionId: "transactionId",
  stripeCustomerId: "stripeCustomerId",
  amount: "amount",
  currency: "currency",
  status: "status",
  paidAt: "paidAt",
  createdAt: "createdAt",
  updatedAt: "updatedAt"
};
var ReviewScalarFieldEnum = {
  id: "id",
  bookingId: "bookingId",
  customerId: "customerId",
  technicianProfileId: "technicianProfileId",
  rating: "rating",
  comment: "comment",
  createdAt: "createdAt"
};
var ServiceScalarFieldEnum = {
  id: "id",
  technicianProfileId: "technicianProfileId",
  categoryId: "categoryId",
  title: "title",
  description: "description",
  price: "price",
  duration: "duration",
  location: "location",
  imageUrl: "imageUrl",
  createdAt: "createdAt",
  updatedAt: "updatedAt"
};
var TechnicianProfileScalarFieldEnum = {
  id: "id",
  userId: "userId",
  bio: "bio",
  experience: "experience",
  hourlyRate: "hourlyRate",
  averageRating: "averageRating",
  completedJobs: "completedJobs",
  location: "location",
  isAvailable: "isAvailable",
  createdAt: "createdAt",
  updatedAt: "updatedAt"
};
var UserScalarFieldEnum = {
  id: "id",
  name: "name",
  email: "email",
  password: "password",
  phone: "phone",
  location: "location",
  role: "role",
  status: "status",
  profileImage: "profileImage",
  stripeCustomerId: "stripeCustomerId",
  createdAt: "createdAt",
  updatedAt: "updatedAt"
};
var SortOrder = {
  asc: "asc",
  desc: "desc"
};
var QueryMode = {
  default: "default",
  insensitive: "insensitive"
};
var NullsOrder = {
  first: "first",
  last: "last"
};
var defineExtension = runtime2.Extensions.defineExtension;

// generated/prisma/enums.ts
var Role = {
  CUSTOMER: "CUSTOMER",
  TECHNICIAN: "TECHNICIAN",
  ADMIN: "ADMIN"
};

// generated/prisma/client.ts
globalThis["__dirname"] = path2.dirname(fileURLToPath(import.meta.url));
var PrismaClient = getPrismaClientClass();

// src/lib/prisma.ts
var connectionString = `${process.env.DATABASE_URL}`;
var adapter = new PrismaPg({ connectionString });
var prisma = new PrismaClient({ adapter });

// src/utils/jwt.ts
import jwt from "jsonwebtoken";
var createToken = (payload, secret, expiresIn) => {
  const token = jwt.sign(payload, secret);
  return token;
};
var verifyToken = (token, secret) => {
  try {
    const verifiedToken = jwt.verify(token, secret);
    return {
      success: true,
      data: verifiedToken
    };
  } catch (error) {
    console.log("Token verification failed:", error);
    return {
      success: false,
      error: error.message
    };
  }
};
var jwtUtils = {
  createToken,
  verifyToken
};

// src/modules/user/user.service.ts
import jwt2 from "jsonwebtoken";
var registerUserIntoDb = async (payload) => {
  const { name, location, email, password, phone, role, profileImage } = payload;
  if (!name && !location && !email && !password && !phone && !role) {
    throw new Error("Required field can not be empty");
  }
  const isExist = await prisma.user.findUnique({
    where: {
      email
    }
  });
  if (isExist) {
    throw new Error("User with this email location already exist!");
  }
  const roleToUpperCase = role.toUpperCase();
  if (roleToUpperCase === "ADMIN") {
    throw new Error("You are not allowed to set this role");
  }
  const hashedPassword = await bcrypt.hash(
    password,
    Number(config_default.bcrypt_salt_rounds)
  );
  let user;
  if (roleToUpperCase === "CUSTOMER") {
    user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        location,
        phone,
        role: roleToUpperCase,
        profileImage
      },
      omit: { password: true }
    });
  }
  if (roleToUpperCase === "TECHNICIAN") {
    user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        location,
        phone,
        role: roleToUpperCase,
        profileImage
      },
      omit: { password: true }
    });
  }
  return user;
};
var getProfileFromDb = async (userId) => {
  const user = await prisma.user.findUniqueOrThrow({
    where: { id: userId },
    omit: { password: true }
  });
  return user;
};
var googleLoginIntoDb = async (idToken) => {
  try {
    const decoded = jwt2.decode(idToken);
    if (!decoded || !decoded.email) {
      throw new Error("Invalid Google token");
    }
    const { email, name, picture } = decoded;
    let user = await prisma.user.findUnique({
      where: { email }
    });
    if (!user) {
      user = await prisma.user.create({
        data: {
          email,
          name: name || email.split("@")[0],
          password: "",
          role: "CUSTOMER",
          status: "ACTIVE",
          profileImage: picture || null,
          location: "",
          phone: ""
        }
      });
    }
    if (user.status === "BANNED") {
      throw new Error("You are banned on this site");
    }
    const jwtPayload = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role
    };
    const accessToken = jwtUtils.createToken(
      jwtPayload,
      config_default.jwt_access_secret,
      config_default.jwt_access_expires_in
    );
    const refreshToken = jwtUtils.createToken(
      jwtPayload,
      config_default.jwt_refresh_secret,
      config_default.jwt_refresh_expires_in
    );
    return { accessToken, refreshToken };
  } catch (error) {
    throw new Error("Google login failed");
  }
};
var updateUserProfileIntoDb = async (payload, id) => {
  const { name, location, phone, profileImage } = payload;
  const isExist = await prisma.user.findUnique({
    where: {
      id
    }
  });
  if (!isExist) {
    throw new Error("User doesn't exist!");
  }
  const updatedUser = await prisma.user.update({
    where: {
      id
    },
    data: {
      name,
      location,
      phone,
      profileImage
    }
  });
  return updatedUser;
};
var userService = {
  registerUserIntoDb,
  getProfileFromDb,
  googleLoginIntoDb,
  updateUserProfileIntoDb
};

// src/modules/user/user.controller.ts
import httpStatus from "http-status";
var registerUser = catchAsync(
  async (req, res, next) => {
    const payload = req.body;
    const user = await userService.registerUserIntoDb(payload);
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "User registered Successfully",
      data: { user }
    });
  }
);
var updateUser = catchAsync(
  async (req, res, next) => {
    const payload = req.body;
    const id = req.user?.id;
    const user = await userService.updateUserProfileIntoDb(
      payload,
      id
    );
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "User profile updated Successfully",
      data: { user }
    });
  }
);
var getMyProfile = catchAsync(
  async (req, res, next) => {
    const getMyProfile2 = await userService.getProfileFromDb(
      req.user?.id
    );
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Profile retrieved successfully",
      data: getMyProfile2
    });
  }
);
var googleLogin = catchAsync(
  async (req, res, next) => {
    const { idToken } = req.body;
    if (!idToken) {
      throw new Error("Google ID token is required");
    }
    const result = await userService.googleLoginIntoDb(idToken);
    return sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Google login successful",
      data: result
    });
  }
);
var userController = {
  registerUser,
  getMyProfile,
  googleLogin,
  updateUser
};

// src/middlewares/auth.ts
var auth = (...requiredRoles) => {
  return catchAsync(async (req, res, next) => {
    const token = req.cookies.accessToken ? req.cookies.accessToken : req.headers.authorization;
    if (!token) {
      throw new Error(
        "You are not logged in. Please Login to access this content"
      );
    }
    const verifiedToken = jwtUtils.verifyToken(token, config_default.jwt_access_secret);
    if (!verifiedToken.success) {
      throw new Error(verifiedToken.error);
    }
    const { email, name, id, role } = verifiedToken.data;
    if (requiredRoles.length && !requiredRoles.includes(role)) {
      throw new Error(
        "Forbidden. You don't have permission to access this resource"
      );
    }
    const user = await prisma.user.findUnique({
      where: {
        id,
        email,
        name,
        role
      }
    });
    if (!user) {
      throw new Error("User not found. Please login again");
    }
    req.user = {
      email,
      id,
      name,
      role
    };
    next();
  });
};

// src/modules/user/user.route.ts
var router = Router();
router.post("/register", userController.registerUser);
router.get(
  "/me",
  auth(Role.ADMIN, Role.CUSTOMER, Role.TECHNICIAN),
  userController.getMyProfile
);
router.put(
  "/update",
  auth(Role.ADMIN, Role.CUSTOMER, Role.TECHNICIAN),
  userController.updateUser
);
router.post("/google", userController.googleLogin);
var userRouter = router;

// src/middlewares/globalErrorHandler.ts
import httpStatus2 from "http-status";
var globalErrorHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || httpStatus2.INTERNAL_SERVER_ERROR;
  let message = err.message || "Internal server error";
  res.status(statusCode).json({
    success: false,
    message,
    errorDetails: {
      statusCode,
      path: req.originalUrl,
      timestamp: (/* @__PURE__ */ new Date()).toISOString(),
      ...process.env.NODE_ENV === "development" && { stack: err.stack }
    }
  });
};

// src/modules/auth/auth.route.ts
import { Router as Router2 } from "express";

// src/modules/auth/auth.service.ts
import bcrypt2 from "bcryptjs";
var loginUserIntoDb = async (payload) => {
  const { email, password } = payload;
  if (!email && !password) {
    throw new Error("Credentials can not be empty");
  }
  const user = await prisma.user.findUnique({
    where: { email }
  });
  if (!user) {
    throw new Error("User not Found! Please register to continue");
  }
  if (user.status === "BANNED") {
    throw new Error("You are banned on this site. Please contact support");
  }
  const isPasswordMatched = await bcrypt2.compare(password, user.password);
  if (!isPasswordMatched) {
    throw new Error("Incorrect credentials");
  }
  const jwtPayload = {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role
  };
  const accessToken = jwtUtils.createToken(
    jwtPayload,
    config_default.jwt_access_secret,
    config_default.jwt_access_expires_in
  );
  const refreshToken = jwtUtils.createToken(
    jwtPayload,
    config_default.jwt_refresh_secret,
    config_default.jwt_refresh_expires_in
  );
  return { accessToken, refreshToken };
};
var regenerateAccessToken = async (refreshToken) => {
  const decoded = jwtUtils.verifyToken(
    refreshToken,
    config_default.jwt_refresh_secret
  );
  const user = await prisma.user.findUniqueOrThrow({
    where: { id: decoded.data.id }
  });
  if (!user) {
    throw new Error("User not Found! Please register to continue");
  }
  const jwtPayload = {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role
  };
  const accessToken = jwtUtils.createToken(
    jwtPayload,
    config_default.jwt_access_secret,
    config_default.jwt_access_expires_in
  );
  return { accessToken };
};
var authService = {
  loginUserIntoDb,
  regenerateAccessToken
};

// src/modules/auth/auth.controller.ts
import httpStatus3 from "http-status";
var loginUser = catchAsync(
  async (req, res, next) => {
    const payload = req.body;
    const { accessToken, refreshToken } = await authService.loginUserIntoDb(payload);
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: false,
      sameSite: "none",
      maxAge: 1e3 * 60 * 60 * 24
    });
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "none",
      maxAge: 1e3 * 60 * 60 * 24 * 7
    });
    sendResponse(res, {
      success: true,
      statusCode: httpStatus3.OK,
      message: "User Logged in successfully",
      data: { accessToken, refreshToken }
    });
  }
);
var getNewAccessToken = catchAsync(
  async (req, res, next) => {
    const { refreshToken } = req.cookies;
    if (!refreshToken) {
      throw new Error("Refresh token not found. Please login again");
    }
    const { accessToken } = await authService.regenerateAccessToken(refreshToken);
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: false,
      sameSite: "none",
      maxAge: 1e3 * 60 * 60 * 24
    });
    sendResponse(res, {
      success: true,
      statusCode: httpStatus3.OK,
      message: "New access token generated successfully",
      data: { accessToken }
    });
  }
);
var authController = {
  loginUser,
  getNewAccessToken
};

// src/modules/auth/auth.route.ts
var router2 = Router2();
router2.post("/login", authController.loginUser);
router2.get(
  "/refresh-token",
  authController.getNewAccessToken
);
var authRouter = router2;

// src/modules/technician/technician.route.ts
import { Router as Router3 } from "express";

// src/modules/technician/technician.service.ts
var createTechnicianProfileIntoDb = async (payload, userId) => {
  const transactionResult = await prisma.$transaction(async (tx) => {
    const isUserExist = await tx.user.findUniqueOrThrow({
      where: {
        id: userId
      }
    });
    const isTechnicianProfileExist = await prisma.technicianProfile.findUnique({
      where: {
        userId
      }
    });
    if (isTechnicianProfileExist) {
      throw new Error("Technician profile already exist");
    }
    const { location, name, id } = isUserExist;
    const { bio, experience, hourlyRate, service } = payload;
    if (!service) {
      throw new Error("Please insert a service to create profile");
    }
    const createProfile = await tx.technicianProfile.create({
      data: {
        userId: id,
        bio,
        experience,
        hourlyRate,
        location
      }
    });
    return createProfile;
  });
  return transactionResult;
};
var getAllTechnicianFromDb = async (query) => {
  const limit = query.limit ? Number(query.limit) : 6;
  const page = query.page ? Number(query.page) : 1;
  const skip = (page - 1) * limit;
  const sortBy = query.sortBy ? query.sortBy : "createdAt";
  const sortOrder = query.sortOrder ? query.sortOrder : "desc";
  const andConditions = [];
  if (query.searchTerms) {
    andConditions.push({
      OR: [
        { bio: { contains: query.searchTerms, mode: "insensitive" } },
        { location: { contains: query.searchTerms, mode: "insensitive" } }
      ]
    });
  }
  if (query.minAverageRating) {
    andConditions.push({
      averageRating: { gte: Number(query.minAverageRating) }
    });
  }
  if (query.hourlyRate) {
    andConditions.push({
      hourlyRate: Number(query.hourlyRate)
    });
  }
  if (query.isAvailable !== void 0) {
    const isAvailableParse = String(query.isAvailable).toLowerCase() === "true";
    andConditions.push({
      isAvailable: isAvailableParse
    });
  }
  if (query.location) {
    andConditions.push({
      location: query.location
    });
  }
  if (query.minCompletedJobs) {
    andConditions.push({
      completedJobs: { gte: Number(query.minCompletedJobs) }
    });
  }
  const result = await prisma.technicianProfile.findMany({
    where: {
      AND: andConditions
    },
    include: {
      user: {
        omit: { password: true }
      }
    },
    take: limit,
    skip,
    orderBy: {
      [sortBy]: sortOrder
    }
  });
  const totalTechnicians = await prisma.technicianProfile.count();
  return { result, totalTechnicians };
};
var getTechnicianByIdFromDb = async (userId) => {
  const result = await prisma.technicianProfile.findUnique({
    where: {
      userId
    },
    include: {
      reviews: true
    }
  });
  if (!result) {
    throw new Error("Technician Profile not found!");
  }
  return result;
};
var updateTechnicianProfileIntoDb = async (payload, id) => {
  const { bio, location, experience, hourlyRate } = payload;
  const updatedProfile = await prisma.technicianProfile.update({
    where: {
      userId: id
    },
    data: {
      userId: id,
      bio,
      experience,
      hourlyRate,
      location
    }
  });
  return updatedProfile;
};
var getMyTechnicianProfileFromDb = async (userId) => {
  const myTechnicianProfile = await prisma.technicianProfile.findUniqueOrThrow({
    where: {
      userId
    },
    include: {
      availability: true
    }
  });
  return myTechnicianProfile;
};
var getTechniciansBookings = async (userId) => {
  const getTechnician = await prisma.technicianProfile.findUniqueOrThrow({
    where: {
      userId
    }
  });
  const bookings = await prisma.booking.findMany({
    where: {
      technicianId: getTechnician.id
    }
  });
  if (!bookings) {
    throw new Error("No booking found for this technician");
  }
  return bookings;
};
var updateBookingStatusInDb = async (bookingId, payload) => {
  const transactionResult = await prisma.$transaction(async (tx) => {
    const status = payload.status.toUpperCase();
    if (status !== "ACCEPTED" && status !== "DECLINED" && status !== "IN_PROGRESS" && status !== "COMPLETED") {
      throw new Error(
        "Status type not allowed. Please select accept or decline"
      );
    }
    const updateStatus = await tx.booking.update({
      where: {
        id: bookingId
      },
      data: {
        status
      }
    });
    const updateAvailabilityStatus = await tx.availability.update({
      where: {
        id: updateStatus.availabilitySlotId
      },
      data: {
        isBooked: true
      }
    });
    return { updateStatus, updateAvailabilityStatus };
  });
  return transactionResult;
};
var getAllServicesForLoggedInTechnicianFromDb = async (userId) => {
  const technician = await prisma.technicianProfile.findFirst({
    where: { userId }
  });
  if (!technician) {
    throw new Error("Technician not found");
  }
  const result = await prisma.service.findMany({
    where: { technicianProfileId: technician.id }
  });
  return result;
};
var technicianService = {
  createTechnicianProfileIntoDb,
  getAllTechnicianFromDb,
  getTechnicianByIdFromDb,
  updateTechnicianProfileIntoDb,
  getMyTechnicianProfileFromDb,
  getTechniciansBookings,
  updateBookingStatusInDb,
  getAllServicesForLoggedInTechnicianFromDb
};

// src/modules/technician/technician.controller.ts
import httpStatus4 from "http-status";
var createTechnicianProfile = catchAsync(
  async (req, res, next) => {
    const payload = req.body;
    const { id } = req.user;
    const createProfile = await technicianService.createTechnicianProfileIntoDb(
      payload,
      id
    );
    sendResponse(res, {
      success: true,
      statusCode: httpStatus4.OK,
      message: "Technician Profile Created Successfully",
      data: createProfile
    });
  }
);
var getAllTechnician = catchAsync(
  async (req, res, next) => {
    const query = req.query;
    const result = await technicianService.getAllTechnicianFromDb(query);
    sendResponse(res, {
      success: true,
      statusCode: httpStatus4.OK,
      message: "All Technician Retrieved ",
      data: result
    });
  }
);
var getTechnicianById = catchAsync(
  async (req, res, next) => {
    const id = req.params.id;
    const result = await technicianService.getTechnicianByIdFromDb(
      id
    );
    sendResponse(res, {
      success: true,
      statusCode: httpStatus4.OK,
      message: "Technician Profile retrieved",
      data: result
    });
  }
);
var updateTechnicianProfile = catchAsync(
  async (req, res, next) => {
    const payload = req.body;
    const id = req.user?.id;
    const result = await technicianService.updateTechnicianProfileIntoDb(
      payload,
      id
    );
    sendResponse(res, {
      success: true,
      statusCode: httpStatus4.OK,
      message: "Technician Profile updated Successfully",
      data: result
    });
  }
);
var getMyTechnicianProfile = catchAsync(
  async (req, res, next) => {
    const userId = req.user?.id;
    const result = await technicianService.getMyTechnicianProfileFromDb(
      userId
    );
    sendResponse(res, {
      success: true,
      statusCode: httpStatus4.OK,
      message: "Technician Profile retrieved Successfully",
      data: result
    });
  }
);
var getTechniciansBookings2 = catchAsync(
  async (req, res, next) => {
    const userId = req.user?.id;
    const result = await technicianService.getTechniciansBookings(userId);
    sendResponse(res, {
      success: true,
      statusCode: httpStatus4.OK,
      message: "All bookings for logged in technician retrieved",
      data: result
    });
  }
);
var updateBookingStatus = catchAsync(
  async (req, res, next) => {
    const bookingId = req.params.id;
    const payload = req.body;
    const result = await technicianService.updateBookingStatusInDb(
      bookingId,
      payload
    );
    sendResponse(res, {
      success: true,
      statusCode: httpStatus4.OK,
      message: "Booking status updated successfully",
      data: result
    });
  }
);
var getServicesForLoggedInTechnician = catchAsync(
  async (req, res, next) => {
    const userId = req.user?.id;
    const result = await technicianService.getAllServicesForLoggedInTechnicianFromDb(
      userId
    );
    sendResponse(res, {
      success: true,
      statusCode: httpStatus4.OK,
      message: "Booking status updated successfully",
      data: result
    });
  }
);
var technicianController = {
  createTechnicianProfile,
  getAllTechnician,
  getTechnicianById,
  updateTechnicianProfile,
  getMyTechnicianProfile,
  getTechniciansBookings: getTechniciansBookings2,
  updateBookingStatus,
  getServicesForLoggedInTechnician
};

// src/modules/technician/technician.route.ts
var router3 = Router3();
router3.post(
  "/create-profile",
  auth(Role.TECHNICIAN),
  technicianController.createTechnicianProfile
);
router3.get("/", technicianController.getAllTechnician);
router3.get("/profile/:id", technicianController.getTechnicianById);
router3.get(
  "/me",
  auth(Role.TECHNICIAN),
  technicianController.getMyTechnicianProfile
);
router3.get(
  "/services",
  auth(Role.TECHNICIAN),
  technicianController.getServicesForLoggedInTechnician
);
router3.put(
  "/update-profile",
  auth(Role.TECHNICIAN),
  technicianController.updateTechnicianProfile
);
router3.get(
  "/bookings",
  auth(Role.TECHNICIAN),
  technicianController.getTechniciansBookings
);
router3.patch(
  "/booking/:id",
  auth(Role.TECHNICIAN),
  technicianController.updateBookingStatus
);
var technicianRouter = router3;

// src/modules/services/services.route.ts
import { Router as Router4 } from "express";

// src/modules/services/services.service.ts
var createServiceInToDB = async (payload) => {
  const {
    categoryId,
    serviceTitle,
    description,
    price,
    duration,
    technicianId,
    location,
    imageUrl
  } = payload;
  if (!technicianId) {
    throw new Error("Technician Id required");
  }
  if (!categoryId) {
    throw new Error("category Id required");
  }
  if (!description) {
    throw new Error("description  required");
  }
  if (!price && price >= 1) {
    throw new Error("price can not be less than 1");
  }
  if (!duration) {
    throw new Error("Duration required");
  }
  if (!serviceTitle) {
    throw new Error("Service Title  required");
  }
  if (!location) {
    throw new Error("Location required");
  }
  if (!imageUrl) {
    throw new Error("Image is required");
  }
  const createService2 = await prisma.service.create({
    data: {
      technicianProfileId: technicianId,
      categoryId,
      title: serviceTitle,
      description,
      price,
      duration,
      location,
      imageUrl
    }
  });
  return createService2;
};
var getAllServicesFromDb = async (query) => {
  const limit = query.limit ? Number(query.limit) : 5;
  const page = query.page ? Number(query.page) : 1;
  const skip = (page - 1) * limit;
  const sortBy = query.sortBy ? query.sortBy : "createdAt";
  const sortOrder = query.sortOrder ? query.sortOrder : "desc";
  const andConditions = [];
  if (query.searchTerms) {
    andConditions.push({
      OR: [
        { title: { contains: query.searchTerms, mode: "insensitive" } },
        { description: { contains: query.searchTerms, mode: "insensitive" } },
        { location: { contains: query.searchTerms, mode: "insensitive" } }
      ]
    });
  }
  if (query.minPrice) {
    andConditions.push({
      price: { gte: Number(query.minPrice) }
    });
  }
  if (query.maxPrice) {
    andConditions.push({
      price: { lte: Number(query.maxPrice) }
    });
  }
  if (query.categoryId) {
    andConditions.push({
      categoryId: query.categoryId
    });
  }
  if (query.location) {
    andConditions.push({
      location: query.location
    });
  }
  if (query.type) {
    andConditions.push({
      title: query.type
    });
  }
  const result = await prisma.service.findMany({
    where: {
      AND: andConditions
    },
    take: limit,
    skip,
    orderBy: {
      [sortBy]: sortOrder
    }
  });
  const totalServiceCount = await prisma.service.count();
  return { result, totalServiceCount };
};
var getAllServicesForSingleTechnicianFromDB = async (userId) => {
  const getTechnician = await prisma.technicianProfile.findUniqueOrThrow({
    where: {
      userId
    }
  });
  const technicianId = getTechnician.id;
  const result = await prisma.service.findMany({
    where: {
      technicianProfileId: technicianId
    },
    include: { technicianProfile: true }
  });
  return result;
};
var getServiceByIdFromDB = async (serviceId) => {
  const result = await prisma.service.findUniqueOrThrow({
    where: {
      id: serviceId
    }
  });
  return result;
};
var updateServiceByTechnicianIntoDb = async (payload, serviceId, userId) => {
  const user = await prisma.technicianProfile.findFirst({
    where: { userId }
  });
  const existingService = await prisma.service.findFirst({
    where: {
      id: serviceId,
      technicianProfileId: user?.id
    }
  });
  if (!existingService) {
    throw new Error(
      "Service not found or you don't have permission to update it"
    );
  }
  const { description, duration, imageUrl, location, price, serviceTitle } = payload;
  const result = await prisma.service.update({
    where: { id: serviceId },
    data: {
      description,
      duration,
      imageUrl,
      location,
      price,
      title: serviceTitle
    }
  });
  return result;
};
var servicesService = {
  getAllServicesFromDb,
  createServiceInToDB,
  getAllServicesForSingleTechnicianFromDB,
  getServiceByIdFromDB,
  updateServiceByTechnicianIntoDb
};

// src/modules/services/services.controller.ts
import httpStatus5 from "http-status";
var createService = catchAsync(
  async (req, res, next) => {
    const payload = req.body;
    const result = await servicesService.createServiceInToDB(payload);
    sendResponse(res, {
      success: true,
      statusCode: httpStatus5.OK,
      message: "Service created successfully",
      data: result
    });
  }
);
var getAllServices = catchAsync(
  async (req, res, next) => {
    const query = req?.query;
    const result = await servicesService.getAllServicesFromDb(query);
    sendResponse(res, {
      success: true,
      statusCode: httpStatus5.OK,
      message: "All services retrieved successfully",
      data: result
    });
  }
);
var getAllServicesForSingleTechnician = catchAsync(
  async (req, res, next) => {
    const id = req.params.id;
    const result = await servicesService.getAllServicesForSingleTechnicianFromDB(
      id
    );
    sendResponse(res, {
      success: true,
      statusCode: httpStatus5.OK,
      message: "Service offered by this Technician retrieved successfully",
      data: result
    });
  }
);
var getServiceById = catchAsync(
  async (req, res, next) => {
    const id = req.params.id;
    const result = await servicesService.getServiceByIdFromDB(id);
    sendResponse(res, {
      success: true,
      statusCode: httpStatus5.OK,
      message: "Service retrieved successfully",
      data: result
    });
  }
);
var updateServiceByTechnician = catchAsync(
  async (req, res, next) => {
    const payload = req.body;
    const serviceId = req.params.serviceId;
    const userId = req.user?.id;
    const result = await servicesService.updateServiceByTechnicianIntoDb(
      payload,
      serviceId,
      userId
    );
    sendResponse(res, {
      success: true,
      statusCode: httpStatus5.OK,
      message: "Service Updated successfully",
      data: result
    });
  }
);
var serviceController = {
  getAllServices,
  createService,
  getAllServicesForSingleTechnician,
  getServiceById,
  updateServiceByTechnician
};

// src/modules/services/services.route.ts
var router4 = Router4();
router4.post("/", auth(Role.TECHNICIAN), serviceController.createService);
router4.get("/", serviceController.getAllServices);
router4.get("/:id", serviceController.getAllServicesForSingleTechnician);
router4.get(
  "/details/:id",
  serviceController.getServiceById
);
router4.put(
  "/update/:serviceId",
  auth(Role.TECHNICIAN),
  serviceController.updateServiceByTechnician
);
var serviceRouter = router4;

// src/modules/availability/availability.route.ts
import { Router as Router5 } from "express";

// src/modules/availability/availability.controller.ts
import httpStatus6 from "http-status";

// src/modules/availability/availability.service.ts
var createAvailabilityIntoDb = async (payload, userId) => {
  const transactionResult = await prisma.$transaction(async (tx) => {
    const { date, endTime, isBooked, startTime } = payload;
    const getTechnicianProfile = await tx.technicianProfile.findUniqueOrThrow({
      where: {
        userId
      }
    });
    const createAvailability2 = await tx.availability.create({
      data: {
        technicianProfileId: getTechnicianProfile.id,
        date,
        endTime,
        isBooked,
        startTime
      }
    });
    return createAvailability2;
  });
  return transactionResult;
};
var updateAvailabilityIntoDb = async (payload, id) => {
  const { date, endTime, isBooked, startTime } = payload;
  const updateAvailability2 = await prisma.availability.update({
    where: {
      id
    },
    data: {
      date,
      endTime,
      isBooked,
      startTime
    }
  });
  return updateAvailability2;
};
var getAvailabilityById = async (id) => {
  if (!id) {
    throw new Error("Technician profile id is required");
  }
  const getAvailability = await prisma.availability.findMany({
    where: { technicianProfileId: id }
  });
  return getAvailability;
};
var availabilityService = {
  createAvailabilityIntoDb,
  updateAvailabilityIntoDb,
  getAvailabilityById
};

// src/modules/availability/availability.controller.ts
var createAvailability = catchAsync(
  async (req, res, next) => {
    const payload = req.body;
    const userId = req.user?.id;
    const result = await availabilityService.createAvailabilityIntoDb(
      payload,
      userId
    );
    sendResponse(res, {
      success: true,
      statusCode: httpStatus6.OK,
      message: "Availability slot creation successful",
      data: result
    });
  }
);
var updateAvailability = catchAsync(
  async (req, res, next) => {
    const payload = req.body;
    const id = req.body.id;
    const result = await availabilityService.updateAvailabilityIntoDb(
      payload,
      id
    );
    sendResponse(res, {
      success: true,
      statusCode: httpStatus6.OK,
      message: "Availability updated successfully",
      data: result
    });
  }
);
var getAvailabilityById2 = catchAsync(
  async (req, res, next) => {
    const id = req.params.id;
    const result = await availabilityService.getAvailabilityById(id);
    sendResponse(res, {
      success: true,
      statusCode: httpStatus6.OK,
      message: "Availability fetched successfully",
      data: result
    });
  }
);
var availabilityController = {
  createAvailability,
  updateAvailability,
  getAvailabilityById: getAvailabilityById2
};

// src/modules/availability/availability.route.ts
var router5 = Router5();
router5.post(
  "/",
  auth(Role.TECHNICIAN),
  availabilityController.createAvailability
);
router5.put(
  "/",
  auth(Role.TECHNICIAN),
  availabilityController.updateAvailability
);
router5.get("/:id", availabilityController.getAvailabilityById);
var availabilityRouter = router5;

// src/middlewares/notFound.ts
import httpStatus7 from "http-status";
var notFound = (req, res) => {
  res.status(httpStatus7.NOT_FOUND).json({
    success: false,
    message: "Route not found!",
    errorDetails: {
      statusCode: httpStatus7.NOT_FOUND,
      path: req.originalUrl,
      method: req.method,
      timestamp: (/* @__PURE__ */ new Date()).toISOString()
    }
  });
};

// src/modules/booking/booking.router.ts
import { Router as Router6 } from "express";

// src/modules/booking/booking.service.ts
var createBookingIntoDb = async (payload, customerId) => {
  const {
    technicianIdToBook,
    serviceId,
    availabilitySlotId,
    bookingTime,
    customerAddress,
    note
  } = payload;
  const isBookingExist = await prisma.booking.findFirst({
    where: {
      availabilitySlotId,
      technicianId: technicianIdToBook
    }
  });
  if (isBookingExist) {
    throw new Error("This technician is not available at this given time");
  }
  const getBookingPrice = await prisma.service.findUniqueOrThrow({
    where: {
      id: serviceId
    }
  });
  const createBooking2 = await prisma.booking.create({
    data: {
      customerId,
      availabilitySlotId,
      technicianId: technicianIdToBook,
      bookingTime,
      customerAddress,
      note,
      totalPrice: getBookingPrice.price,
      serviceId
    }
  });
  return createBooking2;
};
var getUsersBookingFromDb = async (customerId) => {
  const getUsersBooking2 = await prisma.booking.findMany({
    where: {
      customerId
    }
  });
  if (!getUsersBooking2) {
    throw new Error("User has not booked any service yet");
  }
  return getUsersBooking2;
};
var getBookingByIdFromDb = async (bookingId) => {
  const bookingData = await prisma.booking.findUniqueOrThrow({
    where: {
      id: bookingId
    },
    include: {
      technician: true
    }
  });
  return bookingData;
};
var updateBookingStatusInDb2 = async (bookingId, status, customerId) => {
  const updateBookingStatus3 = await prisma.booking.update({
    where: {
      id: bookingId,
      customerId
    },
    data: {
      status
    }
  });
  return updateBookingStatus3;
};
var bookingService = {
  createBookingIntoDb,
  getUsersBookingFromDb,
  getBookingByIdFromDb,
  updateBookingStatusInDb: updateBookingStatusInDb2
};

// src/modules/booking/booking.controller.ts
import httpStatus8 from "http-status";
var createBooking = catchAsync(
  async (req, res, next) => {
    const payload = req.body;
    const customerId = req.user?.id;
    const result = await bookingService.createBookingIntoDb(
      payload,
      customerId
    );
    sendResponse(res, {
      success: true,
      statusCode: httpStatus8.OK,
      message: "Service booked successfully",
      data: result
    });
  }
);
var getUsersBooking = catchAsync(
  async (req, res, next) => {
    const customerId = req.user?.id;
    const result = await bookingService.getUsersBookingFromDb(customerId);
    sendResponse(res, {
      success: true,
      statusCode: httpStatus8.OK,
      message: "All bookings for logged in customer retrieved",
      data: result
    });
  }
);
var getBookingById = catchAsync(
  async (req, res, next) => {
    const bookingId = req.params.id;
    const result = await bookingService.getBookingByIdFromDb(bookingId);
    sendResponse(res, {
      success: true,
      statusCode: httpStatus8.OK,
      message: "Booking details retrieved",
      data: result
    });
  }
);
var updateBookingStatus2 = catchAsync(
  async (req, res, next) => {
    const customerId = req.user?.id;
    const bookingId = req.params.bookingId;
    const status = req.body.status;
    const result = await bookingService.updateBookingStatusInDb(
      bookingId,
      status,
      customerId
    );
    sendResponse(res, {
      success: true,
      statusCode: httpStatus8.OK,
      message: "Booking status updated",
      data: result
    });
  }
);
var bookingController = {
  createBooking,
  getUsersBooking,
  getBookingById,
  updateBookingStatus: updateBookingStatus2
};

// src/modules/booking/booking.router.ts
var router6 = Router6();
router6.post("/", auth(Role.CUSTOMER), bookingController.createBooking);
router6.get("/", auth(Role.CUSTOMER), bookingController.getUsersBooking);
router6.get(
  "/details/:id",
  auth(Role.ADMIN, Role.TECHNICIAN, Role.CUSTOMER),
  bookingController.getBookingById
);
router6.patch(
  "/update-status/:bookingId",
  auth(Role.CUSTOMER),
  bookingController.updateBookingStatus
);
var bookingRouter = router6;

// src/modules/reviews/review.route.ts
import { Router as Router7 } from "express";

// src/modules/reviews/review.controller.ts
import httpStatus9 from "http-status";

// src/modules/reviews/review.service.ts
var createReviewIntoDB = async (userId, payload) => {
  const { bookingId, comment, rating, technicianProfileId } = payload;
  const transactionResult = await prisma.$transaction(async (tx) => {
    const didThisCustomerBook = await tx.booking.findFirst({
      where: {
        id: bookingId,
        technicianId: technicianProfileId,
        customerId: userId
      }
    });
    if (!didThisCustomerBook) {
      throw new Error("Not valid reviewer");
    }
    if (didThisCustomerBook.status !== "COMPLETED") {
      throw new Error("You can review only after getting service");
    }
    if (rating > 5) {
      throw new Error("Rating can not be more than 5");
    }
    const isReviewExist = await tx.review.findFirst({
      where: {
        bookingId
      }
    });
    if (isReviewExist) {
      throw new Error("Review for this booking already exist");
    }
    const postReview = await tx.review.create({
      data: {
        bookingId,
        comment,
        rating,
        technicianProfileId,
        customerId: userId
      }
    });
    const agg = await tx.review.aggregate({
      where: { technicianProfileId },
      _avg: { rating: true }
    });
    await tx.technicianProfile.update({
      where: { id: technicianProfileId },
      data: { averageRating: agg._avg.rating ?? 0 }
    });
    return postReview;
  });
  return transactionResult;
};
var getReviewGivenOnBookingId = async (bookingId) => {
  const reviews = await prisma.review.findMany({
    where: {
      bookingId
    }
  });
  return reviews;
};
var getAllReviewsFromDb = async () => {
  const reviews = await prisma.review.findMany({
    include: {
      customer: true
    }
  });
  return reviews;
};
var getAllReviewsByLoggedInUserFromDb = async (id) => {
  const result = await prisma.review.findMany({
    where: { customerId: id }
  });
  return result;
};
var getAllReviewsForTechnicianFromDb = async (technicianId) => {
  const result = await prisma.review.findMany({
    where: { technicianProfileId: technicianId }
  });
  const averageRating = await prisma.technicianProfile.findFirst({
    where: {
      id: technicianId
    }
  });
  const totalReviews = await prisma.review.count({
    where: { technicianProfileId: technicianId }
  });
  return { result, averageRating, totalReviews };
};
var reviewService = {
  createReviewIntoDB,
  getReviewGivenOnBookingId,
  getAllReviewsFromDb,
  getAllReviewsByLoggedInUserFromDb,
  getAllReviewsForTechnicianFromDb
};

// src/modules/reviews/review.controller.ts
var createReview = catchAsync(
  async (req, res, next) => {
    const userId = req.user?.id;
    const payload = req.body;
    const result = await reviewService.createReviewIntoDB(userId, payload);
    sendResponse(res, {
      success: true,
      statusCode: httpStatus9.OK,
      message: "Review posted successfully",
      data: result
    });
  }
);
var getReviewGivenByCustomer = catchAsync(
  async (req, res, next) => {
    const bookingId = req.params.bookingId;
    const result = await reviewService.getReviewGivenOnBookingId(
      bookingId
    );
    sendResponse(res, {
      success: true,
      statusCode: httpStatus9.OK,
      message: "Review retrieved successfully",
      data: result
    });
  }
);
var getAllReviews = catchAsync(
  async (req, res, next) => {
    const result = await reviewService.getAllReviewsFromDb();
    sendResponse(res, {
      success: true,
      statusCode: httpStatus9.OK,
      message: "All Reviews retrieved successfully",
      data: result
    });
  }
);
var getAllReviewsByLoggedInUser = async (req, res, next) => {
  const userId = req.user?.id;
  const result = await reviewService.getAllReviewsByLoggedInUserFromDb(
    userId
  );
  sendResponse(res, {
    success: true,
    statusCode: httpStatus9.OK,
    message: "All Reviews retrieved successfully",
    data: result
  });
};
var getAllReviewsForTechnician = async (req, res, next) => {
  const technicianId = req.params.technicianId;
  const result = await reviewService.getAllReviewsForTechnicianFromDb(
    technicianId
  );
  sendResponse(res, {
    success: true,
    statusCode: httpStatus9.OK,
    message: "All Reviews retrieved successfully",
    data: result
  });
};
var reviewController = {
  createReview,
  getReviewGivenByCustomer,
  getAllReviews,
  getAllReviewsByLoggedInUser,
  getAllReviewsForTechnician
};

// src/modules/reviews/review.route.ts
var router7 = Router7();
router7.post("/", auth(Role.CUSTOMER), reviewController.createReview);
router7.get("/booking/:bookingId", reviewController.getReviewGivenByCustomer);
router7.get("/all", reviewController.getAllReviews);
router7.get(
  "/user",
  auth(Role.CUSTOMER),
  reviewController.getAllReviewsByLoggedInUser
);
router7.get(
  "/technician/:technicianId",
  reviewController.getAllReviewsForTechnician
);
var reviewRouter = router7;

// src/modules/admin/admin.route.ts
import { Router as Router8 } from "express";

// src/modules/admin/admin.controller.ts
import httpStatus10 from "http-status";

// src/modules/admin/admin.service.ts
var getAllUsersFromDb = async (query) => {
  const limit = query.limit ? Number(query.limit) : 5;
  const page = query.page ? Number(query.page) : 1;
  const skip = (page - 1) * limit;
  const andCondition = [];
  if (query.searchTerm) {
    andCondition.push({
      OR: [
        {
          email: {
            contains: query.searchTerm,
            mode: "insensitive"
          }
        },
        {
          name: {
            contains: query.searchTerm,
            mode: "insensitive"
          }
        },
        {
          phone: {
            contains: query.searchTerm,
            mode: "insensitive"
          }
        },
        {
          location: {
            contains: query.searchTerm,
            mode: "insensitive"
          }
        }
      ]
    });
  }
  const allUsers = await prisma.user.findMany({
    where: {
      AND: andCondition
    },
    skip,
    take: limit,
    omit: { password: true }
  });
  const totalUserCount = await prisma.user.count();
  return { allUsers, totalUserCount };
};
var updateUserStatusIntoDb = async (payload, userId) => {
  const { status } = payload;
  const updateStatus = status.toUpperCase();
  if (updateStatus !== "ACTIVE" && updateStatus !== "BANNED") {
    throw new Error("You can only change status to active or banned");
  }
  const updateUser2 = await prisma.user.update({
    where: {
      id: userId
    },
    data: { status: updateStatus }
  });
  return updateUser2;
};
var getAllBookings = async () => {
  const allBookings = await prisma.booking.findMany();
  return allBookings;
};
var createCategoryIntoDb = async (payload) => {
  const { name, description } = payload;
  if (!name && !description) {
    throw new Error("Required field can not be empty");
  }
  const createCategory2 = await prisma.category.create({
    data: {
      name,
      description
    }
  });
  return createCategory2;
};
var getAllCategoriesFromDb = async () => {
  const allCategory = await prisma.category.findMany();
  return allCategory;
};
var deleteServiceFromDb = async (serviceId) => {
  const result = await prisma.service.delete({
    where: { id: serviceId }
  });
  return null;
};
var adminService = {
  getAllUsersFromDb,
  updateUserStatusIntoDb,
  getAllBookings,
  createCategoryIntoDb,
  getAllCategoriesFromDb,
  deleteServiceFromDb
};

// src/modules/admin/admin.controller.ts
var getAllUsers = catchAsync(
  async (req, res, next) => {
    const query = req.query;
    const result = await adminService.getAllUsersFromDb(query);
    sendResponse(res, {
      success: true,
      statusCode: httpStatus10.OK,
      message: "All users retrieved",
      data: result
    });
  }
);
var updateUserStatus = catchAsync(
  async (req, res, next) => {
    const payload = req.body;
    const userId = req.params.id;
    const result = await adminService.updateUserStatusIntoDb(payload, userId);
    sendResponse(res, {
      success: true,
      statusCode: httpStatus10.OK,
      message: "User status updated successfully",
      data: result
    });
  }
);
var getAllBookings2 = catchAsync(
  async (req, res, next) => {
    const result = await adminService.getAllBookings();
    sendResponse(res, {
      success: true,
      statusCode: httpStatus10.OK,
      message: "All bookings retrieved successfully",
      data: result
    });
  }
);
var createCategory = catchAsync(
  async (req, res, next) => {
    const payload = req.body;
    const result = await adminService.createCategoryIntoDb(payload);
    sendResponse(res, {
      success: true,
      statusCode: httpStatus10.OK,
      message: "Category created successfully",
      data: result
    });
  }
);
var getAllCategory = catchAsync(
  async (req, res, next) => {
    const result = await adminService.getAllCategoriesFromDb();
    sendResponse(res, {
      success: true,
      statusCode: httpStatus10.OK,
      message: "All category retrieved successfully",
      data: result
    });
  }
);
var deleteService = catchAsync(
  async (req, res, next) => {
    const id = req.params.id;
    const result = await adminService.deleteServiceFromDb(id);
    sendResponse(res, {
      success: true,
      statusCode: httpStatus10.OK,
      message: "Service Deleted successfully",
      data: result
    });
  }
);
var adminController = {
  createCategory,
  getAllCategory,
  getAllUsers,
  updateUserStatus,
  getAllBookings: getAllBookings2,
  deleteService
};

// src/modules/admin/admin.route.ts
var router8 = Router8();
router8.post("/categories", auth(Role.ADMIN), adminController.createCategory);
router8.get("/categories", adminController.getAllCategory);
router8.get("/users", auth(Role.ADMIN), adminController.getAllUsers);
router8.patch("/users/:id", auth(Role.ADMIN), adminController.updateUserStatus);
router8.get("/bookings", auth(Role.ADMIN), adminController.getAllBookings);
router8.delete("/delete/:id", auth(Role.ADMIN), adminController.deleteService);
var adminRouter = router8;

// src/modules/payments/payment.router.ts
import { Router as Router9 } from "express";

// src/lib/stripe.ts
import Stripe from "stripe";
var stripe = new Stripe(config_default.stripe_secret_key);

// src/modules/payments/payment.utils.ts
var handleCheckOutCompleted = async (session) => {
  const userId = session.metadata?.userId;
  const stripeCustomerId = session.customer;
  const transactionId = session.payment_intent;
  const bookingId = session.metadata?.bookingId;
  if (!userId || !stripeCustomerId || !transactionId || !bookingId) {
    console.log("Webhook: Missing values for creating checkout session");
    return;
  }
  const amountInCents = session.amount_total;
  if (!amountInCents) return;
  const amount = new prismaNamespace_exports.Decimal(amountInCents / 100);
  await prisma.payment.upsert({
    where: { bookingId },
    create: {
      customerId: userId,
      stripeCustomerId,
      transactionId,
      status: "COMPLETED",
      amount,
      bookingId
    },
    update: {
      stripeCustomerId,
      status: "COMPLETED",
      amount,
      transactionId
    }
  });
  await prisma.booking.update({
    where: { id: bookingId },
    data: {
      status: "PAID"
    }
  });
};

// src/modules/payments/payment.service.ts
var createCheckOutSessionIntoDB = async (userId, payload) => {
  const { bookingId } = payload;
  const transactionResult = await prisma.$transaction(async (tx) => {
    const user = await tx.user.findUniqueOrThrow({
      where: {
        id: userId
      },
      include: {
        payments: true
      }
    });
    let stripeCustomerId = user.stripeCustomerId;
    if (!stripeCustomerId) {
      const customer = await stripe.customers.create({
        email: user.email,
        name: user.name,
        metadata: { userId: user.id }
      });
      stripeCustomerId = customer.id;
    }
    const bookingDetails = await tx.booking.findUnique({
      where: {
        id: bookingId
      }
    });
    if (!bookingDetails || bookingDetails.status !== "ACCEPTED") {
      throw new Error(
        "The booking you are trying to pay, was not found or accepted"
      );
    }
    const serviceDetails = await tx.service.findUnique({
      where: {
        id: bookingDetails.serviceId
      }
    });
    if (!serviceDetails) {
      throw new Error("Service details not found");
    }
    const price = Math.round(Number(bookingDetails.totalPrice) * 100);
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: "usd",
            product_data: {
              name: serviceDetails.title
            },
            unit_amount: price
          }
        }
      ],
      customer: stripeCustomerId,
      success_url: `${config_default.app_url}/paid?success=true`,
      cancel_url: `${config_default.app_url}/paid?success=false`,
      metadata: { userId: user.id, bookingId }
    });
    return session.url;
  });
  return {
    paymentUrl: transactionResult
  };
};
var handleWebhook = async (payload, signature) => {
  const endpointSecret = config_default.stripe_webhook_secret;
  try {
    const event = stripe.webhooks.constructEvent(
      payload,
      signature,
      endpointSecret
    );
    switch (event.type) {
      case "checkout.session.completed":
        await handleCheckOutCompleted(event.data.object);
        break;
      case "payment_intent.succeeded":
        await handleCheckOutCompleted(event.data.object);
        break;
      default:
        console.log(`No events matched to ${event.type}`);
    }
  } catch (error) {
    console.log("Stripe webhook verify error:", error.message);
    throw error;
  }
};
var getPaymentsFromDb = async (userId) => {
  const getPayments = await prisma.payment.findMany({
    where: {
      customerId: userId
    }
  });
  return getPayments;
};
var getPaymentByIdFromDB = async (paymentId) => {
  const getPaymentDetails2 = await prisma.payment.findUniqueOrThrow({
    where: {
      id: paymentId
    }
  });
  return getPaymentDetails2;
};
var getAllPaymentsByCustomerId = async (customerId) => {
  const payments = await prisma.payment.findMany({
    where: {
      customerId
    }
  });
  return payments;
};
var paymentService = {
  createCheckOutSessionIntoDB,
  handleWebhook,
  getPaymentsFromDb,
  getPaymentByIdFromDB,
  getAllPaymentsByCustomerId
};

// src/modules/payments/payment.controller.ts
import httpStatus11 from "http-status";
var createCheckOutSession = catchAsync(
  async (req, res, next) => {
    const userId = req.user?.id;
    const payload = req.body;
    const result = await paymentService.createCheckOutSessionIntoDB(
      userId,
      payload
    );
    sendResponse(res, {
      success: true,
      statusCode: httpStatus11.OK,
      message: "Checkout completed successfully",
      data: result
    });
  }
);
var handleWebhook2 = catchAsync(
  async (req, res, next) => {
    const event = req.body;
    const signature = req.headers["stripe-signature"];
    await paymentService.handleWebhook(event, signature);
    sendResponse(res, {
      success: true,
      statusCode: httpStatus11.OK,
      message: "Webhook triggered successfully",
      data: null
    });
  }
);
var getPayment = catchAsync(
  async (req, res, next) => {
    const userId = req.user?.id;
    const result = await paymentService.getPaymentsFromDb(userId);
    sendResponse(res, {
      success: true,
      statusCode: httpStatus11.OK,
      message: "payments  retrieved successfully",
      data: result
    });
  }
);
var getPaymentDetails = catchAsync(
  async (req, res, next) => {
    const paymentId = req.params.id;
    const result = await paymentService.getPaymentByIdFromDB(paymentId);
    sendResponse(res, {
      success: true,
      statusCode: httpStatus11.OK,
      message: "payments details retrieved successfully",
      data: result
    });
  }
);
var getPaymentHistory = catchAsync(
  async (req, res, next) => {
    const customerId = req.user?.id;
    const result = await paymentService.getAllPaymentsByCustomerId(customerId);
    sendResponse(res, {
      success: true,
      statusCode: httpStatus11.OK,
      message: "Payment history retrieved successfully",
      data: result
    });
  }
);
var paymentController = {
  createCheckOutSession,
  handleWebhook: handleWebhook2,
  getPayment,
  getPaymentDetails,
  getPaymentHistory
};

// src/modules/payments/payment.router.ts
var router9 = Router9();
router9.post(
  "/checkout",
  auth(Role.ADMIN, Role.CUSTOMER, Role.TECHNICIAN),
  paymentController.createCheckOutSession
);
router9.post("/webhook", paymentController.handleWebhook);
router9.get("/", auth(Role.CUSTOMER), paymentController.getPayment);
router9.get("/details/:id", paymentController.getPaymentDetails);
router9.get(
  "/history",
  auth(Role.CUSTOMER),
  paymentController.getPaymentHistory
);
var paymentRouter = router9;

// src/app.ts
var app = express();
app.use("/api/payments/webhook", express.raw({ type: "application/json" }));
app.use(
  cors({
    origin: config_default.app_url,
    credentials: true
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.get("/", (req, res) => {
  res.send("Hello, World!");
});
app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/technician", technicianRouter);
app.use("/api/admin/", adminRouter);
app.use("/api/services", serviceRouter);
app.use("/api/availability", availabilityRouter);
app.use("/api/booking", bookingRouter);
app.use("/api/payments", paymentRouter);
app.use("/api/reviews", reviewRouter);
app.use(notFound);
app.use(globalErrorHandler);
var app_default = app;

// src/server.ts
var PORT = process.env.PORT || 5e3;
async function main() {
  try {
    await prisma.$connect();
    app_default.listen(PORT, () => {
      console.log(`Server is running on ${PORT}`);
    });
  } catch (error) {
    await prisma.$disconnect();
    process.exit(1);
  }
}
main();
//# sourceMappingURL=server.js.map
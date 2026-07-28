

   import { createRequire } from 'module';

   const require = createRequire(import.meta.url);

  
"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// src/app.ts
var import_cookie_parser = __toESM(require("cookie-parser"), 1);
var import_express10 = __toESM(require("express"), 1);
var import_cors = __toESM(require("cors"), 1);

// src/config/index.ts
var import_dotenv = __toESM(require("dotenv"), 1);
var import_path = __toESM(require("path"), 1);
import_dotenv.default.config({ path: import_path.default.join(process.cwd(), ".env") });
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
var import_express = require("express");

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
var import_bcryptjs = __toESM(require("bcryptjs"), 1);

// src/lib/prisma.ts
var import_config = require("dotenv/config");
var import_adapter_pg = require("@prisma/adapter-pg");

// generated/prisma/client.ts
var path2 = __toESM(require("path"), 1);
var import_node_url = require("url");

// generated/prisma/internal/class.ts
var runtime = __toESM(require("@prisma/client/runtime/client"), 1);
var config = {
  "previewFeatures": [],
  "clientVersion": "7.8.0",
  "engineVersion": "3c6e192761c0362d496ed980de936e2f3cebcd3a",
  "activeProvider": "postgresql",
  "inlineSchema": 'model Availability {\n  id                  String            @id @default(uuid())\n  technicianProfileId String\n  technicianProfile   TechnicianProfile @relation(fields: [technicianProfileId], references: [id], onDelete: Cascade)\n  date                DateTime\n  startTime           DateTime\n  endTime             DateTime\n  isBooked            Boolean           @default(false)\n\n  booking Booking[]\n\n  @@map("availability")\n}\n\nmodel Booking {\n  id                 String            @id @default(uuid())\n  customerId         String\n  customer           User              @relation(fields: [customerId], references: [id], onDelete: Cascade)\n  technicianId       String\n  technician         TechnicianProfile @relation(fields: [technicianId], references: [id], onDelete: Cascade)\n  serviceId          String\n  service            Service           @relation(fields: [serviceId], references: [id], onDelete: Cascade)\n  availabilitySlotId String\n  availability       Availability      @relation(fields: [availabilitySlotId], references: [id], onDelete: Cascade)\n  bookingTime        DateTime\n  customerAddress    String\n  note               String?           @db.Text\n  totalPrice         Decimal           @db.Decimal(10, 2)\n  status             BookingStatus     @default(REQUESTED)\n\n  payments Payment[]\n  reviews  Review[]\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @default(now())\n\n  @@map("bookings")\n}\n\nmodel Category {\n  id          String   @id @default(uuid())\n  name        String\n  description String   @db.VarChar(255)\n  createdAt   DateTime @default(now())\n\n  service Service[]\n\n  @@map("category")\n}\n\nenum Role {\n  CUSTOMER\n  TECHNICIAN\n  ADMIN\n}\n\nenum Status {\n  ACTIVE\n  BANNED\n}\n\nenum BookingStatus {\n  REQUESTED\n  ACCEPTED\n  DECLINED\n  PAID\n  IN_PROGRESS\n  COMPLETED\n  CANCELLED\n}\n\nenum PaymentStatus {\n  PENDING\n  COMPLETED\n  FAILED\n}\n\nmodel Payment {\n  id String @id @default(uuid())\n\n  bookingId String  @unique\n  booking   Booking @relation(fields: [bookingId], references: [id], onDelete: Cascade)\n\n  customerId String\n  customer   User   @relation(fields: [customerId], references: [id], onDelete: Cascade)\n\n  transactionId    String @unique\n  stripeCustomerId String\n\n  amount   Decimal @db.Decimal(10, 2)\n  currency String  @default("USD")\n\n  status PaymentStatus @default(PENDING)\n\n  paidAt DateTime? @default(now())\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n\n  @@map("payments")\n}\n\nmodel Review {\n  id                  String            @id @default(uuid())\n  bookingId           String            @unique\n  booking             Booking           @relation(fields: [bookingId], references: [id], onDelete: Cascade)\n  customerId          String\n  customer            User              @relation(fields: [customerId], references: [id], onDelete: Cascade)\n  technicianProfileId String\n  technician          TechnicianProfile @relation(fields: [technicianProfileId], references: [id], onDelete: Cascade)\n  rating              Int\n  comment             String?           @db.Text\n  createdAt           DateTime          @default(now())\n}\n\n// This is your Prisma schema file,\n// learn more about it in the docs: https://pris.ly/d/prisma-schema\n\n// Get a free hosted Postgres database in seconds: `npx create-db`\n\ngenerator client {\n  provider = "prisma-client"\n  output   = "../../generated/prisma"\n}\n\ndatasource db {\n  provider = "postgresql"\n}\n\nmodel Service {\n  id                  String            @id @default(uuid())\n  technicianProfileId String\n  technicianProfile   TechnicianProfile @relation(fields: [technicianProfileId], references: [id], onDelete: Cascade)\n  categoryId          String\n  category            Category          @relation(fields: [categoryId], references: [id], onDelete: Cascade)\n  title               String            @db.VarChar(255)\n  description         String            @db.Text\n  price               Decimal           @db.Decimal(10, 2)\n  duration            Int\n  location            String\n\n  booking Booking[]\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @default(now())\n\n  @@map("services")\n}\n\nmodel TechnicianProfile {\n  id            String  @id @default(uuid())\n  userId        String  @unique\n  user          User    @relation(fields: [userId], references: [id], onDelete: Cascade)\n  bio           String  @db.Text\n  experience    Int\n  hourlyRate    Decimal @db.Decimal(10, 2)\n  averageRating Float   @default(0)\n  completedJobs Int     @default(0)\n  location      String\n  isAvailable   Boolean @default(true)\n\n  service      Service[]\n  availability Availability[]\n  reviews      Review[]\n  booking      Booking[]\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @default(now())\n\n  @@map("technicianProfile")\n}\n\nmodel User {\n  id                String             @id @default(uuid())\n  name              String             @db.VarChar(255)\n  email             String             @unique\n  password          String\n  phone             String\n  location          String             @db.VarChar(255)\n  role              Role               @default(CUSTOMER)\n  status            Status             @default(ACTIVE)\n  profileImage      String?            @db.VarChar(255)\n  stripeCustomerId  String?            @unique\n  technicianProfile TechnicianProfile?\n  bookings          Booking[]\n  payments          Payment[]\n  reviews           Review[]\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @default(now())\n\n  @@map("users")\n}\n',
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
config.runtimeDataModel = JSON.parse('{"models":{"Availability":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"technicianProfileId","kind":"scalar","type":"String"},{"name":"technicianProfile","kind":"object","type":"TechnicianProfile","relationName":"AvailabilityToTechnicianProfile"},{"name":"date","kind":"scalar","type":"DateTime"},{"name":"startTime","kind":"scalar","type":"DateTime"},{"name":"endTime","kind":"scalar","type":"DateTime"},{"name":"isBooked","kind":"scalar","type":"Boolean"},{"name":"booking","kind":"object","type":"Booking","relationName":"AvailabilityToBooking"}],"dbName":"availability"},"Booking":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"customerId","kind":"scalar","type":"String"},{"name":"customer","kind":"object","type":"User","relationName":"BookingToUser"},{"name":"technicianId","kind":"scalar","type":"String"},{"name":"technician","kind":"object","type":"TechnicianProfile","relationName":"BookingToTechnicianProfile"},{"name":"serviceId","kind":"scalar","type":"String"},{"name":"service","kind":"object","type":"Service","relationName":"BookingToService"},{"name":"availabilitySlotId","kind":"scalar","type":"String"},{"name":"availability","kind":"object","type":"Availability","relationName":"AvailabilityToBooking"},{"name":"bookingTime","kind":"scalar","type":"DateTime"},{"name":"customerAddress","kind":"scalar","type":"String"},{"name":"note","kind":"scalar","type":"String"},{"name":"totalPrice","kind":"scalar","type":"Decimal"},{"name":"status","kind":"enum","type":"BookingStatus"},{"name":"payments","kind":"object","type":"Payment","relationName":"BookingToPayment"},{"name":"reviews","kind":"object","type":"Review","relationName":"BookingToReview"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":"bookings"},"Category":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"name","kind":"scalar","type":"String"},{"name":"description","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"service","kind":"object","type":"Service","relationName":"CategoryToService"}],"dbName":"category"},"Payment":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"bookingId","kind":"scalar","type":"String"},{"name":"booking","kind":"object","type":"Booking","relationName":"BookingToPayment"},{"name":"customerId","kind":"scalar","type":"String"},{"name":"customer","kind":"object","type":"User","relationName":"PaymentToUser"},{"name":"transactionId","kind":"scalar","type":"String"},{"name":"stripeCustomerId","kind":"scalar","type":"String"},{"name":"amount","kind":"scalar","type":"Decimal"},{"name":"currency","kind":"scalar","type":"String"},{"name":"status","kind":"enum","type":"PaymentStatus"},{"name":"paidAt","kind":"scalar","type":"DateTime"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":"payments"},"Review":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"bookingId","kind":"scalar","type":"String"},{"name":"booking","kind":"object","type":"Booking","relationName":"BookingToReview"},{"name":"customerId","kind":"scalar","type":"String"},{"name":"customer","kind":"object","type":"User","relationName":"ReviewToUser"},{"name":"technicianProfileId","kind":"scalar","type":"String"},{"name":"technician","kind":"object","type":"TechnicianProfile","relationName":"ReviewToTechnicianProfile"},{"name":"rating","kind":"scalar","type":"Int"},{"name":"comment","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"}],"dbName":null},"Service":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"technicianProfileId","kind":"scalar","type":"String"},{"name":"technicianProfile","kind":"object","type":"TechnicianProfile","relationName":"ServiceToTechnicianProfile"},{"name":"categoryId","kind":"scalar","type":"String"},{"name":"category","kind":"object","type":"Category","relationName":"CategoryToService"},{"name":"title","kind":"scalar","type":"String"},{"name":"description","kind":"scalar","type":"String"},{"name":"price","kind":"scalar","type":"Decimal"},{"name":"duration","kind":"scalar","type":"Int"},{"name":"location","kind":"scalar","type":"String"},{"name":"booking","kind":"object","type":"Booking","relationName":"BookingToService"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":"services"},"TechnicianProfile":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"userId","kind":"scalar","type":"String"},{"name":"user","kind":"object","type":"User","relationName":"TechnicianProfileToUser"},{"name":"bio","kind":"scalar","type":"String"},{"name":"experience","kind":"scalar","type":"Int"},{"name":"hourlyRate","kind":"scalar","type":"Decimal"},{"name":"averageRating","kind":"scalar","type":"Float"},{"name":"completedJobs","kind":"scalar","type":"Int"},{"name":"location","kind":"scalar","type":"String"},{"name":"isAvailable","kind":"scalar","type":"Boolean"},{"name":"service","kind":"object","type":"Service","relationName":"ServiceToTechnicianProfile"},{"name":"availability","kind":"object","type":"Availability","relationName":"AvailabilityToTechnicianProfile"},{"name":"reviews","kind":"object","type":"Review","relationName":"ReviewToTechnicianProfile"},{"name":"booking","kind":"object","type":"Booking","relationName":"BookingToTechnicianProfile"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":"technicianProfile"},"User":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"name","kind":"scalar","type":"String"},{"name":"email","kind":"scalar","type":"String"},{"name":"password","kind":"scalar","type":"String"},{"name":"phone","kind":"scalar","type":"String"},{"name":"location","kind":"scalar","type":"String"},{"name":"role","kind":"enum","type":"Role"},{"name":"status","kind":"enum","type":"Status"},{"name":"profileImage","kind":"scalar","type":"String"},{"name":"stripeCustomerId","kind":"scalar","type":"String"},{"name":"technicianProfile","kind":"object","type":"TechnicianProfile","relationName":"TechnicianProfileToUser"},{"name":"bookings","kind":"object","type":"Booking","relationName":"BookingToUser"},{"name":"payments","kind":"object","type":"Payment","relationName":"PaymentToUser"},{"name":"reviews","kind":"object","type":"Review","relationName":"ReviewToUser"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":"users"}},"enums":{},"types":{}}');
config.parameterizationSchema = {
  strings: JSON.parse('["where","technicianProfile","orderBy","cursor","customer","technician","service","_count","category","booking","availability","payments","reviews","bookings","user","Availability.findUnique","Availability.findUniqueOrThrow","Availability.findFirst","Availability.findFirstOrThrow","Availability.findMany","data","Availability.createOne","Availability.createMany","Availability.createManyAndReturn","Availability.updateOne","Availability.updateMany","Availability.updateManyAndReturn","create","update","Availability.upsertOne","Availability.deleteOne","Availability.deleteMany","having","_min","_max","Availability.groupBy","Availability.aggregate","Booking.findUnique","Booking.findUniqueOrThrow","Booking.findFirst","Booking.findFirstOrThrow","Booking.findMany","Booking.createOne","Booking.createMany","Booking.createManyAndReturn","Booking.updateOne","Booking.updateMany","Booking.updateManyAndReturn","Booking.upsertOne","Booking.deleteOne","Booking.deleteMany","_avg","_sum","Booking.groupBy","Booking.aggregate","Category.findUnique","Category.findUniqueOrThrow","Category.findFirst","Category.findFirstOrThrow","Category.findMany","Category.createOne","Category.createMany","Category.createManyAndReturn","Category.updateOne","Category.updateMany","Category.updateManyAndReturn","Category.upsertOne","Category.deleteOne","Category.deleteMany","Category.groupBy","Category.aggregate","Payment.findUnique","Payment.findUniqueOrThrow","Payment.findFirst","Payment.findFirstOrThrow","Payment.findMany","Payment.createOne","Payment.createMany","Payment.createManyAndReturn","Payment.updateOne","Payment.updateMany","Payment.updateManyAndReturn","Payment.upsertOne","Payment.deleteOne","Payment.deleteMany","Payment.groupBy","Payment.aggregate","Review.findUnique","Review.findUniqueOrThrow","Review.findFirst","Review.findFirstOrThrow","Review.findMany","Review.createOne","Review.createMany","Review.createManyAndReturn","Review.updateOne","Review.updateMany","Review.updateManyAndReturn","Review.upsertOne","Review.deleteOne","Review.deleteMany","Review.groupBy","Review.aggregate","Service.findUnique","Service.findUniqueOrThrow","Service.findFirst","Service.findFirstOrThrow","Service.findMany","Service.createOne","Service.createMany","Service.createManyAndReturn","Service.updateOne","Service.updateMany","Service.updateManyAndReturn","Service.upsertOne","Service.deleteOne","Service.deleteMany","Service.groupBy","Service.aggregate","TechnicianProfile.findUnique","TechnicianProfile.findUniqueOrThrow","TechnicianProfile.findFirst","TechnicianProfile.findFirstOrThrow","TechnicianProfile.findMany","TechnicianProfile.createOne","TechnicianProfile.createMany","TechnicianProfile.createManyAndReturn","TechnicianProfile.updateOne","TechnicianProfile.updateMany","TechnicianProfile.updateManyAndReturn","TechnicianProfile.upsertOne","TechnicianProfile.deleteOne","TechnicianProfile.deleteMany","TechnicianProfile.groupBy","TechnicianProfile.aggregate","User.findUnique","User.findUniqueOrThrow","User.findFirst","User.findFirstOrThrow","User.findMany","User.createOne","User.createMany","User.createManyAndReturn","User.updateOne","User.updateMany","User.updateManyAndReturn","User.upsertOne","User.deleteOne","User.deleteMany","User.groupBy","User.aggregate","AND","OR","NOT","id","name","email","password","phone","location","Role","role","Status","status","profileImage","stripeCustomerId","createdAt","updatedAt","equals","in","notIn","lt","lte","gt","gte","not","contains","startsWith","endsWith","every","some","none","userId","bio","experience","hourlyRate","averageRating","completedJobs","isAvailable","technicianProfileId","categoryId","title","description","price","duration","bookingId","customerId","rating","comment","transactionId","amount","currency","PaymentStatus","paidAt","technicianId","serviceId","availabilitySlotId","bookingTime","customerAddress","note","totalPrice","BookingStatus","date","startTime","endTime","isBooked","is","isNot","connectOrCreate","upsert","createMany","set","disconnect","delete","connect","updateMany","deleteMany","increment","decrement","multiply","divide"]'),
  graph: "6QRRgAELAQAAowIAIAkAAPsBACCXAQAAogIAMJgBAAAgABCZAQAAogIAMJoBAQAAAAG9AQEA9QEAIdQBQAD5AQAh1QFAAPkBACHWAUAA-QEAIdcBIACOAgAhAQAAAAEAIBMGAACQAgAgCQAA-wEAIAoAAJECACAMAAD9AQAgDgAAjwIAIJcBAACKAgAwmAEAAAMAEJkBAACKAgAwmgEBAPUBACGfAQEA9QEAIaYBQAD5AQAhpwFAAPkBACG2AQEA9QEAIbcBAQD1AQAhuAECAIsCACG5ARAAjAIAIboBCACNAgAhuwECAIsCACG8ASAAjgIAIQEAAAADACAVBAAAjwIAIAUAAKMCACAGAACtAgAgCgAArgIAIAsAAPwBACAMAAD9AQAglwEAAKsCADCYAQAABQAQmQEAAKsCADCaAQEA9QEAIaMBAACsAtQBIqYBQAD5AQAhpwFAAPkBACHEAQEA9QEAIcwBAQD1AQAhzQEBAPUBACHOAQEA9QEAIc8BQAD5AQAh0AEBAPUBACHRAQEA-AEAIdIBEACMAgAhBwQAAO0DACAFAADiAwAgBgAAmwQAIAoAAJwEACALAADkAwAgDAAA5QMAINEBAACvAgAgFQQAAI8CACAFAACjAgAgBgAArQIAIAoAAK4CACALAAD8AQAgDAAA_QEAIJcBAACrAgAwmAEAAAUAEJkBAACrAgAwmgEBAAAAAaMBAACsAtQBIqYBQAD5AQAhpwFAAPkBACHEAQEA9QEAIcwBAQD1AQAhzQEBAPUBACHOAQEA9QEAIc8BQAD5AQAh0AEBAPUBACHRAQEA-AEAIdIBEACMAgAhAwAAAAUAIAIAAAYAMAMAAAcAIBABAACjAgAgCAAAqgIAIAkAAPsBACCXAQAAqQIAMJgBAAAJABCZAQAAqQIAMJoBAQD1AQAhnwEBAPUBACGmAUAA-QEAIacBQAD5AQAhvQEBAPUBACG-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ASaAQEAswIAIZsBAQCzAgAhpgFAALcCACHAAQEAswIAIQIAAABZACAUAABlACACAAAAWQAgFAAAZQAgAwAAAFYAIBsAAF4AIBwAAGMAIAEAAABWACABAAAAWQAgAwcAAIEEACAhAACDBAAgIgAAggQAIAeXAQAAmwIAMJgBAABsABCZAQAAmwIAMJoBAQDjAQAhmwEBAOMBACGmAUAA5wEAIcABAQDjAQAhAwAAAFkAIAIAAGsAMCAAAGwAIAMAAABZACACAABaADADAABWACABAAAAEgAgAQAAABIAIAMAAAAQACACAAARADADAAASACADAAAAEAAgAgAAEQAwAwAAEgAgAwAAABAAIAIAABEAMAMAABIAIA0EAACEAwAgCQAA3QIAIJoBAQAAAAGjAQAAAMsBAqUBAQAAAAGmAUAAAAABpwFAAAAAAcMBAQAAAAHEAQEAAAABxwEBAAAAAcgBEAAAAAHJAQEAAAABywFAAAAAAQEUAAB0ACALmgEBAAAAAaMBAAAAywECpQEBAAAAAaYBQAAAAAGnAUAAAAABwwEBAAAAAcQBAQAAAAHHAQEAAAAByAEQAAAAAckBAQAAAAHLAUAAAAABARQAAHYAMAEUAAB2ADANBAAAggMAIAkAANsCACCaAQEAswIAIaMBAADYAssBIqUBAQCzAgAhpgFAALcCACGnAUAAtwIAIcMBAQCzAgAhxAEBALMCACHHAQEAswIAIcgBEADXAgAhyQEBALMCACHLAUAA2QIAIQIAAAASACAUAAB5ACALmgEBALMCACGjAQAA2ALLASKlAQEAswIAIaYBQAC3AgAhpwFAALcCACHDAQEAswIAIcQBAQCzAgAhxwEBALMCACHIARAA1wIAIckBAQCzAgAhywFAANkCACECAAAAEAAgFAAAewAgAgAAABAAIBQAAHsAIAMAAAASACAbAAB0ACAcAAB5ACABAAAAEgAgAQAAABAAIAYHAAD8AwAgIQAA_wMAICIAAP4DACAzAAD9AwAgNAAAgAQAIMsBAACvAgAgDpcBAACUAgAwmAEAAIIBABCZAQAAlAIAMJoBAQDjAQAhowEAAJUCywEipQEBAOMBACGmAUAA5wEAIacBQADnAQAhwwEBAOMBACHEAQEA4wEAIccBAQDjAQAhyAEQAIACACHJAQEA4wEAIcsBQACWAgAhAwAAABAAIAIAAIEBADAgAACCAQAgAwAAABAAIAIAABEAMAMAABIAIAEAAAAWACABAAAAFgAgAwAAABQAIAIAABUAMAMAABYAIAMAAAAUACACAAAVADADAAAWACADAAAAFAAgAgAAFQAwAwAAFgAgCgQAAPkCACAFAADMAgAgCQAAywIAIJoBAQAAAAGmAUAAAAABvQEBAAAAAcMBAQAAAAHEAQEAAAABxQECAAAAAcYBAQAAAAEBFAAAigEAIAeaAQEAAAABpgFAAAAAAb0BAQAAAAHDAQEAAAABxAEBAAAAAcUBAgAAAAHGAQEAAAABARQAAIwBADABFAAAjAEAMAoEAAD3AgAgBQAAyQIAIAkAAMgCACCaAQEAswIAIaYBQAC3AgAhvQEBALMCACHDAQEAswIAIcQBAQCzAgAhxQECAMYCACHGAQEAtgIAIQIAAAAWACAUAACPAQAgB5oBAQCzAgAhpgFAALcCACG9AQEAswIAIcMBAQCzAgAhxAEBALMCACHFAQIAxgIAIcYBAQC2AgAhAgAAABQAIBQAAJEBACACAAAAFAAgFAAAkQEAIAMAAAAWACAbAACKAQAgHAAAjwEAIAEAAAAWACABAAAAFAAgBgcAAPcDACAhAAD6AwAgIgAA-QMAIDMAAPgDACA0AAD7AwAgxgEAAK8CACAKlwEAAJMCADCYAQAAmAEAEJkBAACTAgAwmgEBAOMBACGmAUAA5wEAIb0BAQDjAQAhwwEBAOMBACHEAQEA4wEAIcUBAgD_AQAhxgEBAOYBACEDAAAAFAAgAgAAlwEAMCAAAJgBACADAAAAFAAgAgAAFQAwAwAAFgAgAQAAAAsAIAEAAAALACADAAAACQAgAgAACgAwAwAACwAgAwAAAAkAIAIAAAoAMAMAAAsAIAMAAAAJACACAAAKADADAAALACANAQAA9gMAIAgAANgDACAJAADZAwAgmgEBAAAAAZ8BAQAAAAGmAUAAAAABpwFAAAAAAb0BAQAAAAG-AQEAAAABvwEBAAAAAcABAQAAAAHBARAAAAABwgECAAAAAQEUAACgAQAgCpoBAQAAAAGfAQEAAAABpgFAAAAAAacBQAAAAAG9AQEAAAABvgEBAAAAAb8BAQAAAAHAAQEAAAABwQEQAAAAAcIBAgAAAAEBFAAAogEAMAEUAACiAQAwDQEAAPUDACAIAADMAwAgCQAAzQMAIJoBAQCzAgAhnwEBALMCACGmAUAAtwIAIacBQAC3AgAhvQEBALMCACG-AQEAswIAIb8BAQCzAgAhwAEBALMCACHBARAA1wIAIcIBAgDGAgAhAgAAAAsAIBQAAKUBACAKmgEBALMCACGfAQEAswIAIaYBQAC3AgAhpwFAALcCACG9AQEAswIAIb4BAQCzAgAhvwEBALMCACHAAQEAswIAIcEBEADXAgAhwgECAMYCACECAAAACQAgFAAApwEAIAIAAAAJACAUAACnAQAgAwAAAAsAIBsAAKABACAcAAClAQAgAQAAAAsAIAEAAAAJACAFBwAA8AMAICEAAPMDACAiAADyAwAgMwAA8QMAIDQAAPQDACANlwEAAJICADCYAQAArgEAEJkBAACSAgAwmgEBAOMBACGfAQEA4wEAIaYBQADnAQAhpwFAAOcBACG9AQEA4wEAIb4BAQDjAQAhvwEBAOMBACHAAQEA4wEAIcEBEACAAgAhwgECAP8BACEDAAAACQAgAgAArQEAMCAAAK4BACADAAAACQAgAgAACgAwAwAACwAgEwYAAJACACAJAAD7AQAgCgAAkQIAIAwAAP0BACAOAACPAgAglwEAAIoCADCYAQAAAwAQmQEAAIoCADCaAQEAAAABnwEBAPUBACGmAUAA-QEAIacBQAD5AQAhtgEBAAAAAbcBAQD1AQAhuAECAIsCACG5ARAAjAIAIboBCACNAgAhuwECAIsCACG8ASAAjgIAIQEAAACxAQAgAQAAALEBACAFBgAA7gMAIAkAAOMDACAKAADvAwAgDAAA5QMAIA4AAO0DACADAAAAAwAgAgAAtAEAMAMAALEBACADAAAAAwAgAgAAtAEAMAMAALEBACADAAAAAwAgAgAAtAEAMAMAALEBACAQBgAA2gMAIAkAAN0DACAKAADbAwAgDAAA3AMAIA4AAOwDACCaAQEAAAABnwEBAAAAAaYBQAAAAAGnAUAAAAABtgEBAAAAAbcBAQAAAAG4AQIAAAABuQEQAAAAAboBCAAAAAG7AQIAAAABvAEgAAAAAQEUAAC4AQAgC5oBAQAAAAGfAQEAAAABpgFAAAAAAacBQAAAAAG2AQEAAAABtwEBAAAAAbgBAgAAAAG5ARAAAAABugEIAAAAAbsBAgAAAAG8ASAAAAABARQAALoBADABFAAAugEAMBAGAACSAwAgCQAAlQMAIAoAAJMDACAMAACUAwAgDgAA6wMAIJoBAQCzAgAhnwEBALMCACGmAUAAtwIAIacBQAC3AgAhtgEBALMCACG3AQEAswIAIbgBAgDGAgAhuQEQANcCACG6AQgAkAMAIbsBAgDGAgAhvAEgAJEDACECAAAAsQEAIBQAAL0BACALmgEBALMCACGfAQEAswIAIaYBQAC3AgAhpwFAALcCACG2AQEAswIAIbcBAQCzAgAhuAECAMYCACG5ARAA1wIAIboBCACQAwAhuwECAMYCACG8ASAAkQMAIQIAAAADACAUAAC_AQAgAgAAAAMAIBQAAL8BACADAAAAsQEAIBsAALgBACAcAAC9AQAgAQAAALEBACABAAAAAwAgBQcAAOYDACAhAADpAwAgIgAA6AMAIDMAAOcDACA0AADqAwAgDpcBAAD-AQAwmAEAAMYBABCZAQAA_gEAMJoBAQDjAQAhnwEBAOMBACGmAUAA5wEAIacBQADnAQAhtgEBAOMBACG3AQEA4wEAIbgBAgD_AQAhuQEQAIACACG6AQgAgQIAIbsBAgD_AQAhvAEgAIICACEDAAAAAwAgAgAAxQEAMCAAAMYBACADAAAAAwAgAgAAtAEAMAMAALEBACATAQAA-gEAIAsAAPwBACAMAAD9AQAgDQAA-wEAIJcBAAD0AQAwmAEAAMwBABCZAQAA9AEAMJoBAQAAAAGbAQEA9QEAIZwBAQAAAAGdAQEA9QEAIZ4BAQD1AQAhnwEBAPUBACGhAQAA9gGhASKjAQAA9wGjASKkAQEA-AEAIaUBAQAAAAGmAUAA-QEAIacBQAD5AQAhAQAAAMkBACABAAAAyQEAIBMBAAD6AQAgCwAA_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_QEAIA0AAPsBACCXAQAA9AEAMJgBAADMAQAQmQEAAPQBADCaAQEA9QEAIZsBAQD1AQAhnAEBAPUBACGdAQEA9QEAIZ4BAQD1AQAhnwEBAPUBACGhAQAA9gGhASKjAQAA9wGjASKkAQEA-AEAIaUBAQD4AQAhpgFAAPkBACGnAUAA-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_AEAIAwAAP0BACANAAD7AQAglwEAAPQBADCYAQAAzAEAEJkBAAD0AQAwmgEBAPUBACGbAQEA9QEAIZwBAQD1AQAhnQEBAPUBACGeAQEA9QEAIZ8BAQD1AQAhoQEAAPYBoQEiowEAAPcBowEipAEBAPgBACGlAQEA-AEAIaYBQAD5AQAhpwFAAPkBACHYAQAAzAEAINkBAADMAQAgA7MBAAAJACC0AQAACQAgtQEAAAkAIAOzAQAAIAAgtAEAACAAILUBAAAgACANlwEAAJICADCYAQAArgEAEJkBAACSAgAwmgEBAOMBACGfAQEA4wEAIaYBQADnAQAhpwFAAOcBACG9AQEA4wEAIb4BAQDjAQAhvwEBAOMBACHAAQEA4wEAIcEBEACAAgAhwgECAP8BACEKlwEAAJMCADCYAQAAmAEAEJkBAACTAgAwmgEBAOMBACGmAUAA5wEAIb0BAQDjAQAhwwEBAOMBACHEAQEA4wEAIcUBAgD_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-QEAIb0BAQD1AQAhvgEBAPUBACG_AQEA9QEAIcABAQD1AQAhwQEQAIwCACHCAQIAiwIAIQoGAACQAgAglwEAAJwCADCYAQAAWQAQmQEAAJwCADCaAQEA9QEAIZsBAQD1AQAhpgFAAPkBACHAAQEA9QEAIdgBAABZACDZAQAAWQAgFQQAAI8CACAFAACjAgAgBgAArQIAIAoAAK4CACALAAD8AQAgDAAA_QEAIJcBAACrAgAwmAEAAAUAEJkBAACrAgAwmgEBAPUBACGjAQAArALUASKmAUAA-QEAIacBQAD5AQAhxAEBAPUBACHMAQEA9QEAIc0BAQD1AQAhzgEBAPUBACHPAUAA-QEAIdABAQD1AQAh0QEBAPgBACHSARAAjAIAIQSoAQAAANQBAqkBAAAA1AEIqgEAAADUAQivAQAAoALUASISAQAAowIAIAgAAKoCACAJAAD7AQAglwEAAKkCADCYAQAACQAQmQEAAKkCADCaAQEA9QEAIZ8BAQD1AQAhpgFAAPkBACGnAUAA-QEAIb0BAQD1AQAhvgEBAPUBACG_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_AEAIAwAAP0BACCXAQAAqwIAMJgBAAAFABCZAQAAqwIAMJoBAQAAAAGjAQAArALUASKmAUAA-QEAIacBQAD5AQAhxAEBAPUBACHMAQEA9QEAIc0BAQD1AQAhzgEBAPUBACHPAUAA-QEAIdABAQD1AQAh0QEBAPgBACHSARAAjAIAIQIAAAAHACAUAADpAgAgAgAAAOYCACAUAADnAgAgD5cBAADlAgAwmAEAAOYCABCZAQAA5QIAMJoBAQD1AQAhowEAAKwC1AEipgFAAPkBACGnAUAA-QEAIcQBAQD1AQAhzAEBAPUBACHNAQEA9QEAIc4BAQD1AQAhzwFAAPkBACHQAQEA9QEAIdEBAQD4AQAh0gEQAIwCACEPlwEAAOUCADCYAQAA5gIAEJkBAADlAgAwmgEBAPUBACGjAQAArALUASKmAUAA-QEAIacBQAD5AQAhxAEBAPUBACHMAQEA9QEAIc0BAQD1AQAhzgEBAPUBACHPAUAA-QEAIdABAQD1AQAh0QEBAPgBACHSARAAjAIAIQuaAQEAswIAIaMBAADoAtQBIqYBQAC3AgAhpwFAALcCACHMAQEAswIAIc0BAQCzAgAhzgEBALMCACHPAUAAtwIAIdABAQCzAgAh0QEBALYCACHSARAA1wIAIQHdAQAAANQBAhAFAADqAgAgBgAA6wIAIAoAAOwCACALAADtAgAgDAAA7gIAIJoBAQCzAgAhowEAAOgC1AEipgFAALcCACGnAUAAtwIAIcwBAQCzAgAhzQEBALMCACHOAQEAswIAIc8BQAC3AgAh0AEBALMCACHRAQEAtgIAIdIBEADXAgAhBRsAAMEEACAcAADWBAAg2gEAAMIEACDbAQAA1QQAIOABAACxAQAgBRsAAL8EACAcAADTBAAg2gEAAMAEACDbAQAA0gQAIOABAAALACAFGwAAvQQAIBwAANAEACDaAQAAvgQAINsBAADPBAAg4AEAAAEAIAsbAAD6AgAwHAAA_gIAMNoBAAD7AgAw2wEAAPwCADDcAQAA_QIAIN0BAADRAgAw3gEAANECADDfAQAA0QIAMOABAADRAgAw4QEAAP8CADDiAQAA1AIAMAsbAADvAgAwHAAA8wIAMNoBAADwAgAw2wEAAPECADDcAQAA8gIAIN0BAADAAgAw3gEAAMACADDfAQAAwAIAMOABAADAAgAw4QEAAPQCADDiAQAAwwIAMAgEAAD5AgAgBQAAzAIAIJoBAQAAAAGmAUAAAAABvQEBAAAAAcQBAQAAAAHFAQIAAAABxgEBAAAAAQIAAAAWACAbAAD4AgAgAwAAABYAIBsAAPgCACAcAAD2AgAgARQAAM4EADACAAAAFgAgFAAA9gIAIAIAAADEAgAgFAAA9QIAIAaaAQEAswIAIaYBQAC3AgAhvQEBALMCACHEAQEAswIAIcUBAgDGAgAhxgEBALYCACEIBAAA9wIAIAUAAMkCACCaAQEAswIAIaYBQAC3AgAhvQEBALMCACHEAQEAswIAIcUBAgDGAgAhxgEBALYCACEFGwAAyQQAIBwAAMwEACDaAQAAygQAINsBAADLBAAg4AEAAMkBACAIBAAA-QIAIAUAAMwCACCaAQEAAAABpgFAAAAAAb0BAQAAAAHEAQEAAAABxQECAAAAAcYBAQAAAAEDGwAAyQQAINoBAADKBAAg4AEAAMkBACALBAAAhAMAIJoBAQAAAAGjAQAAAMsBAqUBAQAAAAGmAUAAAAABpwFAAAAAAcQBAQAAAAHHAQEAAAAByAEQAAAAAckBAQAAAAHLAUAAAAABAgAAABIAIBsAAIMDACADAAAAEgAgGwAAgwMAIBwAAIEDACABFAAAyAQAMAIAAAASACAUAACBAwAgAgAAANUCACAUAACAAwAgCpoBAQCzAgAhowEAANgCywEipQEBALMCACGmAUAAtwIAIacBQAC3AgAhxAEBALMCACHHAQEAswIAIcgBEADXAgAhyQEBALMCACHLAUAA2QIAIQsEAACCAwAgmgEBALMCACGjAQAA2ALLASKlAQEAswIAIaYBQAC3AgAhpwFAALcCACHEAQEAswIAIccBAQCzAgAhyAEQANcCACHJAQEAswIAIcsBQADZAgAhBRsAAMMEACAcAADGBAAg2gEAAMQEACDbAQAAxQQAIOABAADJAQAgCwQAAIQDACCaAQEAAAABowEAAADLAQKlAQEAAAABpgFAAAAAAacBQAAAAAHEAQEAAAABxwEBAAAAAcgBEAAAAAHJAQEAAAABywFAAAAAAQMbAADDBAAg2gEAAMQEACDgAQAAyQEAIBAFAACGAwAgBgAAhwMAIAoAAIgDACALAACJAwAgDAAAigMAIJoBAQAAAAGjAQAAANQBAqYBQAAAAAGnAUAAAAABzAEBAAAAAc0BAQAAAAHOAQEAAAABzwFAAAAAAdABAQAAAAHRAQEAAAAB0gEQAAAAAQMbAADBBAAg2gEAAMIEACDgAQAAsQEAIAMbAAC_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-QEAIacBQAD5AQAhvQEBAPUBACG-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_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_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_IgBAMwA9NAA-AAAAAAAFBwA8IQA_IgBAMwA9NAA-AQ4AAwEOAAMFBwBFIQBIIgBJMwBGNABHAAAAAAAFBwBFIQBIIgBJMwBGNABHAAADBwBOIQBPIgBQAAAAAwcATiEATyIAUA8CARArAREsARItARMuARUwARYyDxczEBg1ARk3Dxo4ER05AR46AR87DyM-EiQ_FiVABCZBBCdCBChDBClEBCpGBCtIDyxJFy1LBC5NDy9OGDBPBDFQBDJRDzVUGTZVHzdXBjhYBjlbBjpcBjtdBjxfBj1hDz5iID9kBkBmD0FnIUJoBkNpBkRqD0VtIkZuJkdvCUhwCUlxCUpyCUtzCUx1CU13D054J096CVB8D1F9KFJ-CVN_CVSAAQ9VgwEpVoQBL1eFAQpYhgEKWYcBClqIAQpbiQEKXIsBCl2NAQ9ejgEwX5ABCmCSAQ9hkwExYpQBCmOVAQpklgEPZZkBMmaaAThnmwEFaJwBBWmdAQVqngEFa58BBWyhAQVtowEPbqQBOW-mAQVwqAEPcakBOnKqAQVzqwEFdKwBD3WvATt2sAFBd7IBAnizAQJ5tQECerYBAnu3AQJ8uQECfbsBD368AUJ_vgECgAHAAQ-BAcEBQ4IBwgECgwHDAQKEAcQBD4UBxwFEhgHIAUqHAcoBA4gBywEDiQHOAQOKAc8BA4sB0AEDjAHSAQONAdQBD44B1QFLjwHXAQOQAdkBD5EB2gFMkgHbAQOTAdwBA5QB3QEPlQHgAU2WAeEBUQ"
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
var runtime2 = __toESM(require("@prisma/client/runtime/client"), 1);
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
var import_meta = {};
globalThis["__dirname"] = path2.dirname((0, import_node_url.fileURLToPath)(import_meta.url));
var PrismaClient = getPrismaClientClass();

// src/lib/prisma.ts
var connectionString = `${process.env.DATABASE_URL}`;
var adapter = new import_adapter_pg.PrismaPg({ connectionString });
var prisma = new PrismaClient({ adapter });

// src/modules/user/user.service.ts
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
  const hashedPassword = await import_bcryptjs.default.hash(
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
var userService = {
  registerUserIntoDb,
  getProfileFromDb
};

// src/modules/user/user.controller.ts
var import_http_status = __toESM(require("http-status"), 1);
var registerUser = catchAsync(
  async (req, res, next) => {
    const payload = req.body;
    const user = await userService.registerUserIntoDb(payload);
    sendResponse(res, {
      success: true,
      statusCode: import_http_status.default.OK,
      message: "User registered Successfully",
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
      statusCode: import_http_status.default.OK,
      message: "Profile retreieved successfully",
      data: getMyProfile2
    });
  }
);
var userController = {
  registerUser,
  getMyProfile
};

// src/utils/jwt.ts
var import_jsonwebtoken = __toESM(require("jsonwebtoken"), 1);
var createToken = (payload, secret, expiresIn) => {
  const token = import_jsonwebtoken.default.sign(payload, secret);
  return token;
};
var verifyToken = (token, secret) => {
  try {
    const verifiedToken = import_jsonwebtoken.default.verify(token, secret);
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
var router = (0, import_express.Router)();
router.post("/register", userController.registerUser);
router.get(
  "/me",
  auth(Role.ADMIN, Role.CUSTOMER, Role.TECHNICIAN),
  userController.getMyProfile
);
var userRouter = router;

// src/middlewares/globalErrorHandler.ts
var import_http_status2 = __toESM(require("http-status"), 1);
var globalErrorHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || import_http_status2.default.INTERNAL_SERVER_ERROR;
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
var import_express2 = require("express");

// src/modules/auth/auth.service.ts
var import_bcryptjs2 = __toESM(require("bcryptjs"), 1);
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
  const isPasswordMatched = await import_bcryptjs2.default.compare(password, user.password);
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
var authService = {
  loginUserIntoDb
};

// src/modules/auth/auth.controller.ts
var import_http_status3 = __toESM(require("http-status"), 1);
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
      statusCode: import_http_status3.default.OK,
      message: "User Logged in successfully",
      data: { accessToken, refreshToken }
    });
  }
);
var authController = {
  loginUser
};

// src/modules/auth/auth.route.ts
var router2 = (0, import_express2.Router)();
router2.post("/login", authController.loginUser);
var authRouter = router2;

// src/modules/technician/technician.route.ts
var import_express3 = require("express");

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
  const limit = query.limit ? Number(query.limit) : 10;
  const page = query.page ? Number(query.page) : 1;
  const skip = (page - 1) * limit;
  const sortBy = query.sortBy ? query.sortBy : "createdAt";
  const sortOrder = query.sortOrder ? query.sortOrder : "desc";
  const andConditions = [];
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
    include: { user: true },
    take: limit,
    skip,
    orderBy: {
      [sortBy]: sortOrder
    }
  });
  return result;
};
var getTechnicianByIdFromDb = async (technicianId) => {
  const result = await prisma.technicianProfile.findUnique({
    where: {
      id: technicianId
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
    if (status !== "ACCEPTED" && status !== "DECLINED" && status !== "COMPLETED") {
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
var technicianService = {
  createTechnicianProfileIntoDb,
  getAllTechnicianFromDb,
  getTechnicianByIdFromDb,
  updateTechnicianProfileIntoDb,
  getMyTechnicianProfileFromDb,
  getTechniciansBookings,
  updateBookingStatusInDb
};

// src/modules/technician/technician.controller.ts
var import_http_status4 = __toESM(require("http-status"), 1);
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
      statusCode: import_http_status4.default.OK,
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
      statusCode: import_http_status4.default.OK,
      message: "Technician Profile Created Successfully",
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
      statusCode: import_http_status4.default.OK,
      message: "Technician Profile Created Successfully",
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
      statusCode: import_http_status4.default.OK,
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
      statusCode: import_http_status4.default.OK,
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
      statusCode: import_http_status4.default.OK,
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
      statusCode: import_http_status4.default.OK,
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
  updateBookingStatus
};

// src/modules/technician/technician.route.ts
var router3 = (0, import_express3.Router)();
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
var import_express4 = require("express");

// src/modules/services/services.service.ts
var createServiceInToDB = async (payload) => {
  const {
    categoryId,
    serviceTitle,
    description,
    price,
    duration,
    technicianId,
    location
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
  const createService2 = await prisma.service.create({
    data: {
      technicianProfileId: technicianId,
      categoryId,
      title: serviceTitle,
      description,
      price,
      duration,
      location
    }
  });
  return createService2;
};
var getAllServicesFromDb = async (query) => {
  const limit = query.limit ? Number(query.limit) : 10;
  const page = query.page ? Number(query.page) : 1;
  const skip = (page - 1) * limit;
  const sortBy = query.sortBy ? query.sortBy : "createdAt";
  const sortOrder = query.sortOrder ? query.sortOrder : "desc";
  const andConditions = [];
  if (query.price) {
    andConditions.push({
      price: Number(query.price)
    });
  }
  if (query.maxPrice) {
    andConditions.push({
      price: { lte: Number(query.maxPrice) }
    });
  }
  if (query.category) {
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
  return result;
};
var servicesService = {
  getAllServicesFromDb,
  createServiceInToDB
};

// src/modules/services/services.controller.ts
var import_http_status5 = __toESM(require("http-status"), 1);
var createService = catchAsync(
  async (req, res, next) => {
    const payload = req.body;
    const result = await servicesService.createServiceInToDB(payload);
    sendResponse(res, {
      success: true,
      statusCode: import_http_status5.default.OK,
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
      statusCode: import_http_status5.default.OK,
      message: "All services retrieved successfully",
      data: result
    });
  }
);
var serviceController = {
  getAllServices,
  createService
};

// src/modules/services/services.route.ts
var router4 = (0, import_express4.Router)();
router4.post("/", auth(Role.TECHNICIAN), serviceController.createService);
router4.get("/", serviceController.getAllServices);
var serviceRouter = router4;

// src/modules/availability/availability.route.ts
var import_express5 = require("express");

// src/modules/availability/availability.controller.ts
var import_http_status6 = __toESM(require("http-status"), 1);

// src/modules/availability/availability.service.ts
var createAvailabilityIntoDb = async (payload, userId) => {
  const transactionResult = await prisma.$transaction(async (tx) => {
    const { date, endTime, isBooked, startTime } = payload;
    const getTechnicianProfile = await tx.technicianProfile.findUniqueOrThrow({
      where: {
        userId
      }
    });
    const isAvailabilityExist = await tx.availability.findFirst({
      where: { technicianProfileId: getTechnicianProfile.id }
    });
    if (isAvailabilityExist) {
      throw new Error("You have already set your available slots");
    }
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
var availabilityService = {
  createAvailabilityIntoDb,
  updateAvailabilityIntoDb
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
      statusCode: import_http_status6.default.OK,
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
      statusCode: import_http_status6.default.OK,
      message: "Availability updated successfully",
      data: result
    });
  }
);
var availabilityController = {
  createAvailability,
  updateAvailability
};

// src/modules/availability/availability.route.ts
var router5 = (0, import_express5.Router)();
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
var availabilityRouter = router5;

// src/middlewares/notFound.ts
var import_http_status7 = __toESM(require("http-status"), 1);
var notFound = (req, res) => {
  res.status(import_http_status7.default.NOT_FOUND).json({
    success: false,
    message: "Route not found!",
    errorDetails: {
      statusCode: import_http_status7.default.NOT_FOUND,
      path: req.originalUrl,
      method: req.method,
      timestamp: (/* @__PURE__ */ new Date()).toISOString()
    }
  });
};

// src/modules/booking/booking.router.ts
var import_express6 = require("express");

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
var bookingService = {
  createBookingIntoDb,
  getUsersBookingFromDb,
  getBookingByIdFromDb
};

// src/modules/booking/booking.controller.ts
var import_http_status8 = __toESM(require("http-status"), 1);
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
      statusCode: import_http_status8.default.OK,
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
      statusCode: import_http_status8.default.OK,
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
      statusCode: import_http_status8.default.OK,
      message: "Booking details retrieved",
      data: result
    });
  }
);
var bookingController = {
  createBooking,
  getUsersBooking,
  getBookingById
};

// src/modules/booking/booking.router.ts
var router6 = (0, import_express6.Router)();
router6.post("/", auth(Role.CUSTOMER), bookingController.createBooking);
router6.get("/", auth(Role.CUSTOMER), bookingController.getUsersBooking);
router6.get(
  "/details/:id",
  auth(Role.ADMIN, Role.TECHNICIAN, Role.CUSTOMER),
  bookingController.getBookingById
);
var bookingRouter = router6;

// src/modules/reviews/review.route.ts
var import_express7 = require("express");

// src/modules/reviews/review.controller.ts
var import_http_status9 = __toESM(require("http-status"), 1);

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
var reviewService = {
  createReviewIntoDB
};

// src/modules/reviews/review.controller.ts
var createReview = catchAsync(
  async (req, res, next) => {
    const userId = req.user?.id;
    const payload = req.body;
    const result = await reviewService.createReviewIntoDB(userId, payload);
    sendResponse(res, {
      success: true,
      statusCode: import_http_status9.default.OK,
      message: "Review posted successfully",
      data: result
    });
  }
);
var reviewController = {
  createReview
};

// src/modules/reviews/review.route.ts
var router7 = (0, import_express7.Router)();
router7.post("/", auth(Role.CUSTOMER), reviewController.createReview);
var reviewRouter = router7;

// src/modules/admin/admin.route.ts
var import_express8 = require("express");

// src/modules/admin/admin.controller.ts
var import_http_status10 = __toESM(require("http-status"), 1);

// src/modules/admin/admin.service.ts
var getAllUsersFromDb = async () => {
  const allUsers = await prisma.user.findMany();
  return allUsers;
};
var updateUserStatusIntoDb = async (payload, userId) => {
  const { status } = payload;
  const updateStatus = status.toUpperCase();
  if (updateStatus !== "ACTIVE" && updateStatus !== "BANNED") {
    throw new Error("You can only chance status to active or banned");
  }
  const updateUser = await prisma.user.update({
    where: {
      id: userId
    },
    data: { status: updateStatus }
  });
  return updateUser;
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
var adminService = {
  getAllUsersFromDb,
  updateUserStatusIntoDb,
  getAllBookings,
  createCategoryIntoDb,
  getAllCategoriesFromDb
};

// src/modules/admin/admin.controller.ts
var getAllUsers = catchAsync(
  async (req, res, next) => {
    const result = await adminService.getAllUsersFromDb();
    sendResponse(res, {
      success: true,
      statusCode: import_http_status10.default.OK,
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
      statusCode: import_http_status10.default.OK,
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
      statusCode: import_http_status10.default.OK,
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
      statusCode: import_http_status10.default.OK,
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
      statusCode: import_http_status10.default.OK,
      message: "All category retrieved successfully",
      data: result
    });
  }
);
var adminController = {
  createCategory,
  getAllCategory,
  getAllUsers,
  updateUserStatus,
  getAllBookings: getAllBookings2
};

// src/modules/admin/admin.route.ts
var router8 = (0, import_express8.Router)();
router8.post("/categories", auth(Role.ADMIN), adminController.createCategory);
router8.get("/categories", adminController.getAllCategory);
router8.get("/users", auth(Role.ADMIN), adminController.getAllUsers);
router8.patch("/users/:id", auth(Role.ADMIN), adminController.updateUserStatus);
router8.get("/bookings", auth(Role.ADMIN), adminController.getAllBookings);
var adminRouter = router8;

// src/modules/payments/payment.router.ts
var import_express9 = require("express");

// src/lib/stripe.ts
var import_stripe = __toESM(require("stripe"), 1);
var stripe = new import_stripe.default(config_default.stripe_secret_key);

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
    where: {
      transactionId
    },
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
      amount
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
var paymentService = {
  createCheckOutSessionIntoDB,
  handleWebhook,
  getPaymentsFromDb,
  getPaymentByIdFromDB
};

// src/modules/payments/payment.controller.ts
var import_http_status11 = __toESM(require("http-status"), 1);
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
      statusCode: import_http_status11.default.OK,
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
      statusCode: import_http_status11.default.OK,
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
      statusCode: import_http_status11.default.OK,
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
      statusCode: import_http_status11.default.OK,
      message: "payments details retrieved successfully",
      data: result
    });
  }
);
var paymentController = {
  createCheckOutSession,
  handleWebhook: handleWebhook2,
  getPayment,
  getPaymentDetails
};

// src/modules/payments/payment.router.ts
var router9 = (0, import_express9.Router)();
router9.post(
  "/checkout",
  auth(Role.ADMIN, Role.CUSTOMER, Role.TECHNICIAN),
  paymentController.createCheckOutSession
);
router9.post("/webhook", paymentController.handleWebhook);
router9.get("/", auth(Role.CUSTOMER), paymentController.getPayment);
router9.get("/details/:id", paymentController.getPaymentDetails);
var paymentRouter = router9;

// src/app.ts
var app = (0, import_express10.default)();
app.use("/api/payments/webhook", import_express10.default.raw({ type: "application/json" }));
app.use(
  (0, import_cors.default)({
    origin: config_default.app_url,
    credentials: true
  })
);
app.use(import_express10.default.json());
app.use(import_express10.default.urlencoded({ extended: true }));
app.use((0, import_cookie_parser.default)());
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
var PORT = 5e3;
async function main() {
  try {
    await prisma.$connect();
    console.log("Connected to the database successfully");
    app_default.listen(PORT, () => {
      console.log(`Server is running on ${PORT}`);
    });
  } catch (error) {
    console.log("Couldn't start the server");
    await prisma.$disconnect();
    process.exit(1);
  }
}
main();
//# sourceMappingURL=server.cjs.map
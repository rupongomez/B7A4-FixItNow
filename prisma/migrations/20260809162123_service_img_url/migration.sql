/*
  Warnings:

  - Added the required column `imageUrl` to the `services` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "services" ADD COLUMN     "imageUrl" TEXT NOT NULL;

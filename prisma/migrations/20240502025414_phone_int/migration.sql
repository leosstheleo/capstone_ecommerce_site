/*
  Warnings:

  - You are about to alter the column `Phone` on the `User` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.

*/
-- AlterTable
ALTER TABLE "User" ALTER COLUMN "Phone" SET DATA TYPE INTEGER;

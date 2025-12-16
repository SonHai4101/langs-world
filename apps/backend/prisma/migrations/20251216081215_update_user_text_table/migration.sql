/*
  Warnings:

  - You are about to drop the column `language` on the `UserText` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `UserText` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "UserText_language_idx";

-- AlterTable
ALTER TABLE "UserText" DROP COLUMN "language",
DROP COLUMN "title";

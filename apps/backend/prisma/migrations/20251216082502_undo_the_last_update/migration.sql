/*
  Warnings:

  - Added the required column `language` to the `UserText` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "UserText" ADD COLUMN     "language" "Language" NOT NULL,
ADD COLUMN     "title" TEXT;

-- CreateIndex
CREATE INDEX "UserText_language_idx" ON "UserText"("language");

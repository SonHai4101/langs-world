/*
  Warnings:

  - A unique constraint covering the columns `[normalized,language]` on the table `Word` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Word_text_language_key";

-- CreateIndex
CREATE UNIQUE INDEX "Word_normalized_language_key" ON "Word"("normalized", "language");

/*
  Warnings:

  - Added the required column `size` to the `Dataset` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `Dataset` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Dataset" ADD COLUMN     "base64" TEXT,
ADD COLUMN     "path" TEXT,
ADD COLUMN     "size" INTEGER NOT NULL,
ADD COLUMN     "type" TEXT NOT NULL;

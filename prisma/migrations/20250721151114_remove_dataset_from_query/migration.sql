/*
  Warnings:

  - You are about to drop the column `dataset_id` on the `Query` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Query" DROP CONSTRAINT "Query_dataset_id_fkey";

-- AlterTable
ALTER TABLE "Query" DROP COLUMN "dataset_id";

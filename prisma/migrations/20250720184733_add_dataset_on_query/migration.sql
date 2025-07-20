/*
  Warnings:

  - Added the required column `dataset_id` to the `Query` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Query" ADD COLUMN     "dataset_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Query" ADD CONSTRAINT "Query_dataset_id_fkey" FOREIGN KEY ("dataset_id") REFERENCES "Dataset"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

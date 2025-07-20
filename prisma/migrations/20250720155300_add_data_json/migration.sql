/*
  Warnings:

  - Made the column `path` on table `Dataset` required. This step will fail if there are existing NULL values in that column.
  - Changed the type of `data_json` on the `Record` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Dataset" ALTER COLUMN "path" SET NOT NULL;

-- AlterTable
ALTER TABLE "Record" DROP COLUMN "data_json",
ADD COLUMN     "data_json" JSONB NOT NULL;

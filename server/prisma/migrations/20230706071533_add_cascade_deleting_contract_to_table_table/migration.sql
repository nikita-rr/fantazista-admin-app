-- DropForeignKey
ALTER TABLE "Table" DROP CONSTRAINT "Table_contractId_fkey";

-- AddForeignKey
ALTER TABLE "Table" ADD CONSTRAINT "Table_contractId_fkey" FOREIGN KEY ("contractId") REFERENCES "Contract"("id") ON DELETE CASCADE ON UPDATE CASCADE;

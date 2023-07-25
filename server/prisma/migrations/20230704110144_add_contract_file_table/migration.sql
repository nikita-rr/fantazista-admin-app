-- CreateTable
CREATE TABLE "ContractFile" (
    "id" TEXT NOT NULL DEFAULT gen_random_uuid(),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3),
    "contractId" TEXT NOT NULL,
    "target_path" TEXT NOT NULL,
    "size" DOUBLE PRECISION NOT NULL,
    "extension" TEXT NOT NULL,
    "original_name" TEXT NOT NULL,
    "mimetype" TEXT NOT NULL,

    CONSTRAINT "ContractFile_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ContractFile" ADD CONSTRAINT "ContractFile_contractId_fkey" FOREIGN KEY ("contractId") REFERENCES "Contract"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

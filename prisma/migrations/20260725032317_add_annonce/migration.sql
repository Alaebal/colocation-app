-- CreateTable
CREATE TABLE "Annonce" (
    "id" TEXT NOT NULL,
    "titre" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "prix" INTEGER NOT NULL,
    "ville" TEXT NOT NULL,
    "adresse" TEXT NOT NULL,
    "nbChambres" INTEGER NOT NULL,
    "images" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ownerId" TEXT NOT NULL,

    CONSTRAINT "Annonce_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Annonce" ADD CONSTRAINT "Annonce_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

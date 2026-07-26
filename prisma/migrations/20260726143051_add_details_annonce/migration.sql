-- AlterTable
ALTER TABLE "Annonce" ADD COLUMN     "autresEquipements" TEXT[],
ADD COLUMN     "barbecue" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "coinLoungeExterieur" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "cuisineEquipee" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "distancePlage" DOUBLE PRECISION,
ADD COLUMN     "environnement" TEXT NOT NULL DEFAULT 'calme',
ADD COLUMN     "jacuzzi" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "latitude" DOUBLE PRECISION,
ADD COLUMN     "longitude" DOUBLE PRECISION,
ADD COLUMN     "nbSallesEau" INTEGER NOT NULL DEFAULT 1,
ADD COLUMN     "piscine" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "terrasse" BOOLEAN NOT NULL DEFAULT false;

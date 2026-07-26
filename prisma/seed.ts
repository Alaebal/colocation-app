import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {

  await prisma.annonce.deleteMany();

  await prisma.annonce.createMany({
    data: [
      {
        titre: "Villa avec piscine à Djerba",
        description: "Belle villa proche plage",
        prix: 350,
        ville: "Djerba",
        adresse: "Zone touristique",
        nbChambres: 4,
        images: [
          "/images/villa1.jpg"
        ],
        nbSallesEau: 3,
        cuisineEquipee: true,
        terrasse: true,
        coinLoungeExterieur: true,
        piscine: true,
        jacuzzi: true,
        barbecue: true,
        autresEquipements: [
          "WiFi",
          "Parking"
        ],
        ownerId: "cmrzsj93x0000ycv1g1j0nvi4"
      }
    ]
  });
}

main()
.then(() => console.log("Seed terminé"))
.catch(e => console.error(e))
.finally(() => prisma.$disconnect());
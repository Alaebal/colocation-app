// lib/annonces.ts
import { Prisma } from "@/lib/generated/prisma/client";
import { prisma } from "@/lib/prisma";

export type Annonce = {
  id: string;
  title: string;
  desc: string;
  image?: string;
};

export async function getAnnonces(): Promise<Annonce[]> {
  const annonces = await prisma.annonce.findMany({
    orderBy: { createdAt: "desc" },
  });

  return annonces.map((a) => ({
    id: a.id,
    title: a.titre,
    desc: a.description,
    image: a.images[0],
  }));
}
export async function getAnnonceById(id: string) {
  return prisma.annonce.findUnique({
    where: { id },
    include: {
      reservations: true,
      owner: true,
    },
  });
}
export type AnnonceFilters = {
  prixMin?: number;
  prixMax?: number;
  ville?: string;
};

export async function getAnnoncesFiltered(filters: AnnonceFilters) {
  const annonces = await prisma.annonce.findMany({
    where: {
      prix: {
        gte: filters.prixMin,
        lte: filters.prixMax,
      },
      ville: filters.ville
        ? { contains: filters.ville, mode: "insensitive" }
        : undefined,
    },
    orderBy: { createdAt: "desc" },
  });

  return annonces;
}
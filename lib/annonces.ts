// lib/annonces.ts
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
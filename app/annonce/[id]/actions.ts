"use server";

import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export async function supprimerAnnonce(annonceId: string) {
  const user = await getCurrentUser();
  if (!user) {
    throw new Error("Non autorisé.");
  }

  const annonce = await prisma.annonce.findUnique({ where: { id: annonceId } });
  if (!annonce || annonce.ownerId !== user.id) {
    throw new Error("Vous ne pouvez supprimer que vos propres annonces.");
  }

  await prisma.annonce.delete({ where: { id: annonceId } });
  revalidatePath("/maisons");
}
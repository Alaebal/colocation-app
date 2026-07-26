"use server";

import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";

export type ReservationState = { error: string | null; success?: boolean };

async function getCurrentUser() {
  const userId = (await cookies()).get("userId")?.value;
  if (!userId) return null;

  return prisma.user.findUnique({ where: { id: userId } });
}

export async function creerReservation(
  annonceId: string,
  prevState: ReservationState,
  formData: FormData
): Promise<ReservationState> {
  const user = await getCurrentUser();
  if (!user) {
    return { error: "Vous devez être connecté pour réserver." };
  }

  const dateDebutStr = formData.get("dateDebut") as string;
  const dateFinStr = formData.get("dateFin") as string;

  if (!dateDebutStr || !dateFinStr) {
    return { error: "Merci de sélectionner une date d'arrivée et une date de départ." };
  }

  const dateDebut = new Date(dateDebutStr);
  const dateFin = new Date(dateFinStr);

  if (dateFin <= dateDebut) {
    return { error: "La date de départ doit être après la date d'arrivée." };
  }

  const conflits = await prisma.reservation.findMany({
    where: {
      annonceId,
      dateDebut: { lt: dateFin },
      dateFin: { gt: dateDebut },
    },
  });

  if (conflits.length > 0) {
    return { error: "Ces dates ne sont plus disponibles." };
  }

  await prisma.reservation.create({
    data: { annonceId, dateDebut, dateFin, locataireId: user.id },
  });

  return { error: null, success: true };
}
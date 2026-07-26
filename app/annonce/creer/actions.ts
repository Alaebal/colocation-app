"use server";

import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";

export type CreerAnnonceState = { error: string | null };

export async function creerAnnonce(
  prevState: CreerAnnonceState,
  formData: FormData
): Promise<CreerAnnonceState> {
  const user = await getCurrentUser();
  if (!user) {
    return { error: "Vous devez être connecté pour publier une annonce." };
  }

  const titre = formData.get("titre") as string;
  const description = formData.get("description") as string;
  const prix = Number(formData.get("prix"));
  const ville = formData.get("ville") as string;
  const adresse = formData.get("adresse") as string;
  const nbChambres = Number(formData.get("nbChambres"));
  const nbSallesEau = Number(formData.get("nbSallesEau"));
  const environnement = formData.get("environnement") as string;
  const distancePlageRaw = formData.get("distancePlage") as string;
  const distancePlage = distancePlageRaw ? Number(distancePlageRaw) : null;

  const cuisineEquipee = formData.get("cuisineEquipee") === "on";
  const terrasse = formData.get("terrasse") === "on";
  const coinLoungeExterieur = formData.get("coinLoungeExterieur") === "on";
  const piscine = formData.get("piscine") === "on";
  const jacuzzi = formData.get("jacuzzi") === "on";
  const barbecue = formData.get("barbecue") === "on";

  const imagesRaw = formData.get("images") as string;
  const images: string[] = imagesRaw ? JSON.parse(imagesRaw) : [];

  const autresEquipementsRaw = formData.get("autresEquipements") as string;
  const autresEquipements = autresEquipementsRaw
    ? autresEquipementsRaw.split(",").map((e) => e.trim()).filter(Boolean)
    : [];

  if (!titre || !description || !prix || !ville || !adresse || !nbChambres || !nbSallesEau) {
    return { error: "Merci de remplir tous les champs obligatoires." };
  }

  if (images.length === 0) {
    return { error: "Ajoute au moins une photo." };
  }

  const annonce = await prisma.annonce.create({
    data: {
      titre,
      description,
      prix,
      ville,
      adresse,
      nbChambres,
      nbSallesEau,
      environnement,
      distancePlage,
      cuisineEquipee,
      terrasse,
      coinLoungeExterieur,
      piscine,
      jacuzzi,
      barbecue,
      images,
      autresEquipements,
      ownerId: user.id,
    },
  });

  redirect(`/annonce/${annonce.id}`);
}
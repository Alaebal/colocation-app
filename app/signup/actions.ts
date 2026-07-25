"use server";

import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export type SignupState = { error: string | null };

export async function signup(prevState: SignupState, formData: FormData): Promise<SignupState> {
  const name = formData.get("name") as string;
  const familyname = formData.get("familyname") as string;
  const email = formData.get("email") as string;
  const phone = formData.get("phone") as string;
  const address = formData.get("address") as string;
  const password = formData.get("password") as string;

  if (!name || !familyname || !email || !phone || !address || !password) {
    return { error: "Tous les champs sont obligatoires." };
  }

  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    return { error: "Un compte existe déjà avec cet email." };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: { name, familyname, email, phone, address, password: hashedPassword },
  });

  // Connexion automatique après inscription
  (await cookies()).set("userId", user.id, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
  });

  redirect("/");
}
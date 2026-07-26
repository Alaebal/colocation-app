import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";

export async function getCurrentUser() {
  const userId = (await cookies()).get("userId")?.value;
  if (!userId) return null;

  return prisma.user.findUnique({ where: { id: userId } });
}
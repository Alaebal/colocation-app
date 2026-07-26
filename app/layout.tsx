import "./globals.css";
import { Manrope, Playfair_Display } from "next/font/google";
import { cookies } from "next/headers";
import Navbar from "../components/Navbar";
import Footer from "../components/footer";
import { prisma } from "@/lib/prisma";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-body",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const userId = cookieStore.get("userId")?.value;

  const userName = userId
    ? (
        await prisma.user.findUnique({
          where: { id: userId },
          select: { name: true },
        })
      )?.name ?? null
    : null;

  return (
    <html lang="fr">
      <body className={`${manrope.variable} ${playfair.variable} antialiased`}>
        <Navbar userName={userName} />

        <main>{children}</main>

        <Footer />
      </body>
    </html>
  );
}
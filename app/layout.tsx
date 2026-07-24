import "./globals.css";
import { Manrope, Playfair_Display } from "next/font/google";
import Navbar from "../components/Navbar";
import Footer from "../components/footer";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-body",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className={`${manrope.variable} ${playfair.variable} antialiased`}>
        <Navbar />

        <main>{children}</main>

        <Footer />
      </body>
    </html>
  );
}
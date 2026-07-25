"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Playfair_Display } from "next/font/google";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  const isHomeHero = pathname === "/" && !isScrolled;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = [
    { label: "Accueil", href: "/" },
    { label: "Annonces", href: "/maisons" },
    { label: "Réservation", href: "/reservation" },
    { label: "Contact", href: "/#contact" },
  ];

  return (
    <>
      <nav className="fixed inset-x-0 top-0 z-50 px-4 pt-5 md:px-8">
        <div
          className={`mx-auto flex h-16 max-w-7xl items-center justify-between rounded-full border px-8 backdrop-blur-2xl transition-all duration-300 ${
            isHomeHero
              ? "border-white/10 bg-white/5 shadow-none"
              : "border-black/10 bg-white/75 shadow-[0_12px_40px_rgba(0,0,0,0.08)]"
          }`}
        >

          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-3 transition-opacity hover:opacity-90"
          >
            <Image
              src="/logo.svg"
              alt="Logo Sunora"
              width={42}
              height={42}
              priority
              className="h-10 w-10 rounded-full"
            />
            <span
              className={`${playfair.className} hidden text-2xl tracking-wide transition-colors xl:block ${
                isHomeHero ? "text-[var(--olive-200)]" : "text-[var(--olive-800)]"
              }`}
            >
              Sunora
            </span>
          </Link>

          {/* Desktop */}
          <div className="hidden items-center gap-8 md:flex">
            {links.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className={`relative text-xs uppercase tracking-[0.22em] transition after:absolute after:left-0 after:-bottom-1 after:h-[1px] after:w-0 after:transition-all hover:after:w-full ${
                  isHomeHero
                    ? "text-white/80 hover:text-white after:bg-white"
                    : "text-neutral-700 hover:text-neutral-950 after:bg-neutral-950"
                }`}
              >
                {link.label}
              </Link>
            ))}

            <Link
              href="/login"
              className={`rounded-full border px-5 py-2 text-xs uppercase tracking-[0.18em] transition ${
                isHomeHero
                  ? "border-white/40 text-white hover:bg-white hover:text-black"
                  : "border-black/15 bg-neutral-950 text-white hover:bg-neutral-800"
              }`}
            >
              Connexion
            </Link>
          </div>

          {/* Bouton Mobile */}
          <button
            onClick={() => setOpen(!open)}
            className={`rounded-full border p-2 md:hidden ${
              isHomeHero
                ? "border-white/20 bg-white/10 text-white"
                : "border-black/10 bg-white/80 text-neutral-950"
            }`}
          >
            {open ? "✕" : "☰"}
          </button>
        </div>
      </nav>

      {/* Menu Mobile */}
      {open && (
        <div
          className={`fixed left-4 right-4 top-24 z-40 rounded-3xl border py-8 backdrop-blur-2xl md:hidden ${
            isHomeHero
              ? "border-white/10 bg-black/80"
              : "border-black/10 bg-white/88"
          }`}
        >
          <div className="flex flex-col items-center gap-8">
            {links.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setOpen(false)}
                className={`text-sm uppercase tracking-[0.2em] transition ${
                  isHomeHero ? "text-white/90 hover:text-white" : "text-neutral-800 hover:text-neutral-950"
                }`}
              >
                {link.label}
              </Link>
            ))}

            <Link
              href="/login"
              onClick={() => setOpen(false)}
              className={`rounded-full border px-6 py-3 text-sm uppercase tracking-[0.18em] transition ${
                isHomeHero
                  ? "border-white/40 text-white hover:bg-white hover:text-black"
                  : "border-black/10 bg-neutral-950 text-white hover:bg-neutral-800"
              }`}
            >
              Connexion
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
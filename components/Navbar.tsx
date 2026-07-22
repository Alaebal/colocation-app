// components/navbar.tsx
"use client";

import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const links = [
    { label: "Accueil", href: "/" },
    { label: "Annonces", href: "/maisons" },
    { label: "Réservation", href: "#" },
    { label: "Contact", href: "/#contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-20 flex items-center justify-between px-6 md:px-10">
      <span className="text-white text-lg font-semibold tracking-wide">
       logo
      </span>

      {/* Liens desktop */}
      <div className="hidden md:flex gap-10 text-white text-sm tracking-widest uppercase">
        {links.map((link) => (
          <a key={link.label} href={link.href} className="hover:text-amber-300 transition">
            {link.label}
          </a>
        ))}
      </div>

      {/* Bouton menu mobile */}
      <button
        onClick={() => setOpen(!open)}
        className="md:hidden text-white text-2xl"
        aria-label="Menu"
      >
        {open ? "×" : "☰"}
      </button>

      {/* Menu mobile déplié */}
      {open && (
        <div className="absolute top-full left-0 right-0 bg-neutral-950/95 flex flex-col items-center gap-6 py-8 md:hidden">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-white text-sm tracking-widest uppercase hover:text-amber-300 transition"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}
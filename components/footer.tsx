// components/footer.tsx
export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-neutral-950 px-10 py-12 text-center text-white/70">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-center gap-10 md:flex-row md:items-start md:justify-between">
        {/* Marque */}
        <div className="flex flex-col items-center md:items-start">
          <span className="text-white text-lg font-semibold tracking-wide">Sunora</span>
          <p className="mt-3 text-sm max-w-xs">
            Trouvez votre colocation d&apos;été, entouré des bonnes personnes.
          </p>
        </div>

        {/* Liens */}
        <div>
          <h3 className="text-white text-sm uppercase tracking-widest mb-4">Navigation</h3>
          <ul className="flex flex-col gap-2 text-sm items-center md:items-start">
            <li><a href="#" className="hover:text-amber-50  transition">Accueil</a></li>
            <li><a href="#annonces" className="hover:text-amber-50  transition">Annonces</a></li>
            <li><a href="#contact" className="hover:text-amber-50  transition">Contact</a></li>
          </ul>
        </div>

        {/* Contact / réseaux */}
        <div>
          <h3 className="text-white text-sm uppercase tracking-widest mb-4">Contact</h3>
          <ul className="flex flex-col gap-2 text-sm items-center md:items-start">
            <li>contact@summerrent.com</li>
            <li>+216 92 344 363</li>
          </ul>
        </div>
      </div>

      {/* Copyright */}
      <div className="mx-auto mt-10 flex max-w-6xl flex-col gap-2 border-t border-white/10 pt-6 text-xs text-white/50 md:flex-row md:justify-between">
        <span>© {new Date().getFullYear()} SummerRent. Tous droits réservés.</span>
        <span>Fait avec Next.js</span>
      </div>
    </footer>
  );
}
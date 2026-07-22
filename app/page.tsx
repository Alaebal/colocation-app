// app/page.tsx
import Image from "next/image";
import Navbar from "../components/Navbar";
import Contact from "../components/Contact";
import Annonces from "../components/Annonces";

export default function Home() {
  return (
    <main className="relative min-h-screen">
      {/* Navbar en overlay transparent */}
      <Navbar />

      {/* Section Hero avec photo de fond plein écran */}
      <div className="relative h-screen w-full">
        <Image
          src="/colocation.jpg"
          alt="colocation background"
          fill
          priority
          className="object-cover z-0"
        />

        {/* Voile sombre pour la lisibilité du texte */}
        <div className="absolute inset-0 bg-black/45 z-10" />

        {/* Contenu au-dessus de l'image */}
        <div className="relative z-20 flex h-full flex-col items-center justify-center text-center px-6">
          <p className="text-white/80 text-sm tracking-[0.3em] uppercase mb-6">
            Colocation d&apos;été entre particuliers
          </p>

          <h1 className="font-serif text-white text-5xl md:text-7xl leading-tight max-w-4xl">
            Trouvez votre<br />colocation d&apos;été
          </h1>

          <p className="mt-6 text-white/85 max-w-xl">
            Réservez votre maison d&apos;été en quelques clics, entouré des bonnes personnes.
          </p>

          
            <a href="/maisons" className="mt-10 border border-white text-white px-10 py-4 rounded-full text-sm tracking-widest uppercase hover:bg-white hover:text-neutral-900 transition">
                     Découvrir les annonces
            </a>

          
        </div>
      </div>

      {/* Sections bas de page: Annonces et Contact */}
      <div className="relative z-10">
        <Annonces />
        <Contact />
      </div>
    </main>
  );
}
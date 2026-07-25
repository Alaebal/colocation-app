// app/page.tsx
import Contact from "../components/Contact";
import Annonces from "../components/Annonces";

export default function Home() {
  return (
    <main className="relative min-h-screen">
      {/* Section Hero avec photo de fond plein écran */}
      <div
        className="relative flex min-h-screen w-full items-center overflow-hidden bg-cover bg-center"
        style={{ backgroundImage: "url('/colocation.jpg')" }}
      >
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-black/72 via-black/46 to-black/68" />

        <div className="pointer-events-none absolute -left-12 top-24 z-0 h-56 w-56 rounded-full bg-white/15 blur-3xl" />
        <div className="pointer-events-none absolute bottom-8 right-8 z-0 h-72 w-72 rounded-full bg-white/10 blur-3xl" />

        {/* Contenu au-dessus de l'image */}
        <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col items-center px-6 py-36 text-center md:px-10 md:py-44 lg:py-52">
          <p className="inline-flex w-fit rounded-full border border-white/35 bg-white/10 px-4 py-2 text-[11px] uppercase tracking-[0.3em] text-white/90 backdrop-blur-md">
            Trouvez votre maison de vacances idéale
          </p>

          <h1 className="display-font mt-8 max-w-4xl text-5xl leading-[1.02] text-white md:text-7xl lg:text-[5.6rem]">
            Trouvez votre
            <br />
            location d&apos;été
          </h1>

          <p className="mt-7 max-w-2xl text-base leading-8 text-white/88 md:text-lg">
            Réservez votre maison d&apos;été en quelques clics et composez un séjour convivial, lumineux et simple avec les bonnes personnes.
          </p>

          <div className="mt-12 flex flex-wrap justify-center gap-4">
            <a
              href="/maisons"
              className="rounded-full border border-white/35 bg-white/92 px-7 py-3.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-neutral-950 hover:-translate-y-0.5 hover:bg-white"
            >
              Decouvrir les annonces
            </a>
            <a
              href="#annonces"
              className="rounded-full border border-white/40 bg-white/8 px-7 py-3.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-white backdrop-blur-md hover:bg-white hover:text-neutral-950"
            >
              Voir un apercu
            </a>
          </div>

          <div className="mt-16 grid max-w-4xl grid-cols-1 gap-4 md:grid-cols-3">
            <div className="rounded-3xl border border-white/18 bg-white/10 p-5 text-white backdrop-blur-xl">
              <p className="display-font text-3xl">20+</p>
              <p className="mt-1 text-sm text-white/78">Maisons disponibles</p>
            </div>
            <div className="rounded-3xl border border-white/18 bg-white/10 p-5 text-white backdrop-blur-xl">
              <p className="display-font text-3xl">95%</p>
              <p className="mt-1 text-sm text-white/78">Avis positifs</p>
            </div>
            <div className="rounded-3xl border border-white/18 bg-white/10 p-5 text-white backdrop-blur-xl">
              <p className="display-font text-3xl">24h</p>
              <p className="mt-1 text-sm text-white/78">Reponse moyenne</p>
            </div>
          </div>
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
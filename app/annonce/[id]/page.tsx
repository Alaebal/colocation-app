import Image from "next/image";
import { getAnnonceById } from "@/lib/annonces";
import { notFound } from "next/navigation";
import ReservationCalendar from "@/components/ReservationCalendar";
import PhotoCarousel from "@/components/PhotoCarousel";

export default async function AnnonceDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const annonce = await getAnnonceById(id);

  if (!annonce) {
    notFound();
  }

  const equipementsPrincipaux = [
    { label: "Piscine", actif: annonce.piscine },
    { label: "Jacuzzi", actif: annonce.jacuzzi },
    { label: "Barbecue", actif: annonce.barbecue },
    { label: "Cuisine équipée", actif: annonce.cuisineEquipee },
    { label: "Terrasse", actif: annonce.terrasse },
    { label: "Coin lounge extérieur", actif: annonce.coinLoungeExterieur },
  ].filter((e) => e.actif);

  const environnementLabel: Record<string, string> = {
    calme: "Zone calme",
    modere: "Zone modérée",
    bruyant: "Bord de route passante",
  };

  return (
<main className="px-6 py-28 md:py-32">
  <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-[1.4fr_1fr]">
    <section>
      {/* Galerie photos */}
      {annonce.images.length > 0 ? (
        

          <PhotoCarousel images={annonce.images} alt={annonce.titre} />
        
      ) : (
        <div className="mb-6 h-72 rounded-[2rem] bg-gradient-to-br from-neutral-900 via-neutral-700 to-neutral-500 md:h-96" />
      )}

      <p className="text-xs uppercase tracking-[0.28em] text-neutral-500">
        {annonce.ville}
      </p>

      <h1 className="display-font mt-3 text-4xl text-neutral-950 md:text-5xl">
        {annonce.titre}
      </h1>

      <p className="mt-4 text-lg font-semibold text-neutral-900">
        {annonce.prix} DT / nuit
      </p>

      <div className="mt-6 flex flex-wrap gap-3 text-sm text-neutral-600">
        <span className="rounded-full border border-neutral-900/10 bg-white/60 px-4 py-1.5">
          {annonce.nbChambres} chambres
        </span>

        <span className="rounded-full border border-neutral-900/10 bg-white/60 px-4 py-1.5">
          {annonce.nbSallesEau} salles d&apos;eau
        </span>

        <span className="rounded-full border border-neutral-900/10 bg-white/60 px-4 py-1.5">
          {environnementLabel[annonce.environnement] ??
            annonce.environnement}
        </span>

        {annonce.distancePlage != null && (
          <span className="rounded-full border border-neutral-900/10 bg-white/60 px-4 py-1.5">
            {annonce.distancePlage} km de la plage
          </span>
        )}
      </div>

      <p className="mt-6 text-sm text-neutral-500">
        {annonce.adresse}
      </p>

      {/* Description */}
      <div className="mt-8">
        <h2 className="text-xs font-semibold uppercase tracking-[0.22em] text-neutral-500">
          Description
        </h2>

        <p className="mt-3 leading-7 text-neutral-700">
          {annonce.description}
        </p>
      </div>

      {/* Équipements */}
      {equipementsPrincipaux.length > 0 && (
        <div className="mt-8">
          <h2 className="text-xs font-semibold uppercase tracking-[0.22em] text-neutral-500">
            Équipements
          </h2>

          <div className="mt-3 flex flex-wrap gap-2">
            {equipementsPrincipaux.map((e) => (
              <span
                key={e.label}
                className="rounded-full border border-[var(--olive-800)]/20 bg-[var(--olive-800)]/10 px-4 py-1.5 text-sm text-[var(--olive-900)]"
              >
                {e.label}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Autres équipements */}
      {annonce.autresEquipements.length > 0 && (
        <div className="mt-6">
          <h2 className="text-xs font-semibold uppercase tracking-[0.22em] text-neutral-500">
            Autres équipements
          </h2>

          <div className="mt-3 flex flex-wrap gap-2">
            {annonce.autresEquipements.map((eq) => (
              <span
                key={eq}
                className="rounded-full border border-neutral-900/10 bg-white/60 px-4 py-1.5 text-sm text-neutral-700"
              >
                {eq}
              </span>
            ))}
          </div>
        </div>
      )}
    </section>

    <aside>
      <ReservationCalendar
        annonceId={annonce.id}
        reservations={annonce.reservations.map((r) => ({
          dateDebut: new Date(r.dateDebut),
          dateFin: new Date(r.dateFin),
        }))}
      />

      {/* Contact propriétaire */}
      <div className="mt-6 rounded-[2rem] border border-[var(--sand)] bg-[rgba(255,255,255,0.82)] p-6 shadow-[0_18px_50px_rgba(22,22,22,0.08)] backdrop-blur-xl md:p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-neutral-500">
          Contacter le propriétaire
        </p>

        <p className="mt-3 text-lg font-semibold text-neutral-900">
          {annonce.owner.name} {annonce.owner.familyname}
        </p>

        <div className="mt-4 grid gap-3 text-sm">
          <a
            href={`mailto:${annonce.owner.email}`}
            className="flex items-center gap-2 text-neutral-700 hover:text-[var(--olive-800)]"
          >
            <svg
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>

            {annonce.owner.email}
          </a>

          <a
            href={`tel:${annonce.owner.phone}`}
            className="flex items-center gap-2 text-neutral-700 hover:text-[var(--olive-800)]"
          >
            <svg
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
              />
            </svg>

            {annonce.owner.phone}
          </a>
        </div>
      </div>
    </aside>
  </div>
   </main>
  );
}
import Link from "next/link";
import { getAnnoncesFiltered } from "@/lib/annonces";
import { getCurrentUser } from "@/lib/auth";
import AnnonceCard from "@/components/AnnonceCard";

type SearchParams = { prixMin?: string; prixMax?: string; ville?: string };

export default async function MaisonsPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  const user = await getCurrentUser();

  const annonces = await getAnnoncesFiltered({
    prixMin: params.prixMin ? Number(params.prixMin) : undefined,
    prixMax: params.prixMax ? Number(params.prixMax) : undefined,
    ville: params.ville,
  });

  // Épingle les annonces de l'utilisateur en premier
  const triees = user
    ? [...annonces].sort((a, b) => {
        if (a.ownerId === user.id && b.ownerId !== user.id) return -1;
        if (a.ownerId !== user.id && b.ownerId === user.id) return 1;
        return 0;
      })
    : annonces;

  return (
    <main className="px-6 py-28 md:py-32">
      <div className="mx-auto max-w-7xl">
        {/* Bouton créer une annonce */}
        <div className="mb-8 flex items-center justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.28em] text-neutral-500">Toutes les annonces</p>
            <h1 className="display-font mt-3 text-4xl text-neutral-950 md:text-5xl">Trouvez votre logement</h1>
          </div>

          {user && (
            <Link
              href="/annonce/creer"
              className="rounded-full border border-[var(--olive-900)] bg-[var(--olive-900)] px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-white hover:bg-[var(--olive-800)]"
            >
              Publier une annonce
            </Link>
          )}
        </div>

        {/* Filtres */}
        <form className="mb-10 grid gap-3 rounded-[1.8rem] border border-neutral-900/10 bg-white/70 p-5 backdrop-blur-sm md:grid-cols-4">
          <input
            name="ville"
            type="text"
            placeholder="Localisation"
            defaultValue={params.ville ?? ""}
            className="rounded-full border border-neutral-900/10 bg-white px-4 py-2.5 text-sm placeholder:text-neutral-500 focus:border-[var(--olive-800)] focus:outline-none"
          />
          <input
            name="prixMin"
            type="number"
            placeholder="Prix min"
            defaultValue={params.prixMin ?? ""}
            className="rounded-full border border-neutral-900/10 bg-white px-4 py-2.5 text-sm placeholder:text-neutral-500 focus:border-[var(--olive-800)] focus:outline-none"
          />
          <input
            name="prixMax"
            type="number"
            placeholder="Prix max"
            defaultValue={params.prixMax ?? ""}
            className="rounded-full border border-neutral-900/10 bg-white px-4 py-2.5 text-sm placeholder:text-neutral-500 focus:border-[var(--olive-800)] focus:outline-none"
          />
          <button
            type="submit"
            className="rounded-full border border-neutral-900/15 bg-neutral-950 px-4 py-2.5 text-sm font-semibold text-white hover:bg-neutral-800"
          >
            Filtrer
          </button>
        </form>

        {/* Liste des annonces */}
        {triees.length === 0 ? (
          <p className="text-neutral-600">Aucune annonce ne correspond à ces critères.</p>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {triees.map((annonce) => (
              <AnnonceCard
                key={annonce.id}
                annonce={annonce}
                isOwner={user?.id === annonce.ownerId}
              />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
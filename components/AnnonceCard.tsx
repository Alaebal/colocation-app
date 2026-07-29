import Link from "next/link";
import Image from "next/image";
import { supprimerAnnonce } from "@/app/annonce/[id]/actions";

type AnnonceCardProps = {
  annonce: {
    id: string;
    titre: string;
    description: string;
    prix: number;
    ville: string;
    images: string[];
  };
  isOwner: boolean;
};

export default function AnnonceCard({ annonce, isOwner }: AnnonceCardProps) {
  const supprimerAvecId = supprimerAnnonce.bind(null, annonce.id);

  return (
    <article className="group rounded-[1.8rem] border border-neutral-900/8 bg-white/72 p-5 shadow-[0_18px_50px_rgba(22,22,22,0.08)] backdrop-blur-sm">
      {isOwner && (
        <span className="mb-3 inline-block rounded-full bg-[var(--olive-900)] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-white">
          Votre annonce
        </span>
      )}

      <div className="relative mb-5 h-44 overflow-hidden rounded-[1.5rem] bg-neutral-200">
        {annonce.images.length > 0 ? (
          <Image
            src={annonce.images[0]}
            alt={annonce.titre}
            fill
            className="object-cover"
          />
        ) : (
          <div className="h-full w-full bg-gradient-to-br from-neutral-900 via-neutral-700 to-neutral-500" />
        )}
      </div>

      <h3 className="display-font mb-2 text-2xl text-neutral-950">{annonce.titre}</h3>
      <p className="text-sm text-neutral-600">{annonce.ville} · {annonce.prix} DT / nuit</p>
      <p className="mt-2 text-sm leading-6 text-neutral-700">{annonce.description}</p>

      <div className="mt-5 flex items-center justify-between">
        <Link
          href={`/annonce/${annonce.id}`}
          className="text-[11px] font-semibold uppercase tracking-[0.2em] text-neutral-900 group-hover:translate-x-0.5"
        >
          Voir l&apos;annonce
        </Link>

        {isOwner && (
          <div className="flex gap-2">
            <Link
              href={`/annonce/${annonce.id}/modifier`}
              className="rounded-full border border-neutral-900/15 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-neutral-700 hover:bg-neutral-100"
            >
              Modifier
            </Link>
            <form action={supprimerAvecId}>
              <button
                type="submit"
                className="rounded-full border border-red-200 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-red-600 hover:bg-red-50"
              >
                Supprimer
              </button>
            </form>
          </div>
        )}
      </div>
    </article>
  );
}
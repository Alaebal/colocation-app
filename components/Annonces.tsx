import { annonces } from "../lib/annonces";

export default function Annonces() {
  const preview = annonces.slice(0, 3); // juste un aperçu sur la home

  return (
    <section id="annonces" className="bg-[rgba(255,255,255,0.22)] px-6 py-24 text-neutral-900 backdrop-blur-sm md:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex items-end justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.28em] text-neutral-500">Selection</p>
            <h2 className="display-font mt-3 text-4xl font-semibold text-neutral-950 md:text-5xl">Annonces recentes</h2>
          </div>
          <a
            href="/maisons"
            className="hidden rounded-full border border-neutral-900/30 bg-white/60 px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-neutral-950 backdrop-blur hover:bg-neutral-950 hover:text-white md:inline-flex"
          >
            Toutes les annonces
          </a>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {preview.map((s, index) => (
            <article
              key={s.id}
              className="group rounded-[1.8rem] border border-neutral-900/8 bg-white/72 p-5 shadow-[0_18px_50px_rgba(22,22,22,0.08)] backdrop-blur-sm"
            >
              <div className="mb-5 flex h-44 items-end rounded-[1.5rem] bg-gradient-to-br from-neutral-900 via-neutral-700 to-neutral-500 p-4">
                <span className="rounded-full border border-white/18 bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-white backdrop-blur-sm">
                  Offre {index + 1}
                </span>
              </div>
              <h3 className="display-font mb-2 text-2xl text-neutral-950">{s.title}</h3>
              <p className="text-sm leading-6 text-neutral-700">{s.desc}</p>
              <a
                href="/maisons"
                className="mt-5 inline-flex items-center text-[11px] font-semibold uppercase tracking-[0.2em] text-neutral-900 group-hover:translate-x-0.5"
              >
                Voir l&apos;annonce
              </a>
            </article>
          ))}
        </div>

        <a
          href="/maisons"
          className="mt-8 inline-flex rounded-full border border-neutral-900/25 bg-white/60 px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-neutral-950 backdrop-blur hover:bg-neutral-950 hover:text-white md:hidden"
        >
          Toutes les annonces
        </a>
      </div>
    </section>
  );
}
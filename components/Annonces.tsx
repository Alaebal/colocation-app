import { annonces } from "../lib/annonces";

export default function Annonces() {
  const preview = annonces.slice(0, 3); // juste un aperçu sur la home

  return (
    <section id="annonces" className="bg-white text-neutral-900 py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-semibold mb-6">Annonces récentes</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {preview.map((s) => (
            <article key={s.id} className="border rounded-lg p-4 shadow-sm">
              <div className="h-40 bg-neutral-200 rounded mb-3" />
              <h3 className="font-semibold mb-1">{s.title}</h3>
              <p className="text-sm text-neutral-600">{s.desc}</p>
              <a href="/maisons" className="inline-block mt-4 text-amber-500 font-medium">
                Voir l'annonce
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
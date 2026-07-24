import { annonces } from "../../lib/annonces";

export default function Maisons() {
  return (
    <main className="py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-semibold mb-6">
          Toutes les annonces
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {annonces.map((s) => (
            <article key={s.id} className="border rounded-lg p-4 shadow-sm">
              <div className="h-40 bg-neutral-200 rounded mb-3" />
              <h3 className="font-semibold mb-1">{s.title}</h3>
              <p className="text-sm text-neutral-600">{s.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
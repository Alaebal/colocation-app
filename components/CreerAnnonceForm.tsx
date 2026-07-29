// components/CreerAnnonceForm.tsx
"use client";

import { useActionState, useState, FormEvent } from "react";
import { creerAnnonce, type CreerAnnonceState } from "@/app/annonce/creer/actions";
import ImageUploader from "@/components/ImageUploader";

const initialState: CreerAnnonceState = { error: null };

const inputClass =
  "rounded-full border border-neutral-900/10 bg-white px-5 py-3 placeholder:text-neutral-500 focus:border-[var(--olive-800)] focus:outline-none";

export default function CreerAnnonceForm() {
  const [state, formAction, isPending] = useActionState(creerAnnonce, initialState);
  const [images, setImages] = useState<string[]>([]);
  const [formError, setFormError] = useState<string>("");

  const handleImagesUploaded = (newImages: string[]) => {
    setImages((prev: string[]) => [...prev, ...newImages]);
    setFormError('');
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    if (images.length === 0) {
      e.preventDefault();
      setFormError('Veuillez ajouter au moins une photo');
      return;
    }
    // Le formulaire va se soumettre normalement
  };

  return (
    <form action={formAction} onSubmit={handleSubmit} className="grid gap-4">
      <input name="titre" type="text" placeholder="Titre de l'annonce" required className={inputClass} />

      <textarea
        name="description"
        placeholder="Description"
        required
        rows={4}
        className="rounded-[1.5rem] border border-neutral-900/10 bg-white px-5 py-3 placeholder:text-neutral-500 focus:border-[var(--olive-800)] focus:outline-none"
      />

      <div className="grid gap-4 md:grid-cols-2">
        <input name="prix" type="number" placeholder="Prix par nuit (DT)" required className={inputClass} />
        <input name="ville" type="text" placeholder="Ville" required className={inputClass} />
      </div>

      <input name="adresse" type="text" placeholder="Adresse" required className={inputClass} />

      <div className="grid gap-4 md:grid-cols-3">
        <input name="nbChambres" type="number" placeholder="Nb chambres" required className={inputClass} />
        <input name="nbSallesEau" type="number" placeholder="Nb salles d'eau" required className={inputClass} />
        <input name="distancePlage" type="number" step="0.1" placeholder="Distance plage (km)" className={inputClass} />
      </div>

      <select name="environnement" required className={inputClass} defaultValue="">
        <option value="" disabled>Environnement</option>
        <option value="calme">Calme</option>
        <option value="modere">Modéré</option>
        <option value="bruyant">Bruyant / sur route</option>
      </select>

      <div className="grid grid-cols-2 gap-3 rounded-[1.5rem] border border-neutral-900/10 bg-white/60 p-5 md:grid-cols-3">
        {[
          { name: "cuisineEquipee", label: "Cuisine équipée" },
          { name: "terrasse", label: "Terrasse" },
          { name: "coinLoungeExterieur", label: "Coin lounge extérieur" },
          { name: "piscine", label: "Piscine" },
          { name: "jacuzzi", label: "Jacuzzi" },
          { name: "barbecue", label: "Barbecue" },
        ].map((eq) => (
          <label key={eq.name} className="flex items-center gap-2 text-sm text-neutral-700">
            <input type="checkbox" name={eq.name} className="h-4 w-4 accent-[var(--olive-800)]" />
            {eq.label}
          </label>
        ))}
      </div>

      <input
        name="autresEquipements"
        type="text"
        placeholder="Autres équipements (séparés par des virgules)"
        className={inputClass}
      />

      <div>
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">
          Photos
        </p>
        <ImageUploader onImagesUploaded={handleImagesUploaded} />
        <input type="hidden" name="images" value={JSON.stringify(images)} />
        {formError && (
          <p className="text-sm font-medium text-red-600 mt-2">{formError}</p>
        )}
      </div>

      {state.error && <p className="text-sm font-medium text-red-600">{state.error}</p>}

      <button
        type="submit"
        disabled={isPending}
        className="mt-2 rounded-full border border-[var(--olive-900)] bg-[var(--olive-900)] px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-white hover:bg-[var(--olive-800)] disabled:opacity-60"
      >
        {isPending ? "Publication..." : "Publier l'annonce"}
      </button>
    </form>
  );
}
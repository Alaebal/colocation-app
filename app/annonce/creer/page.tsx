import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import CreerAnnonceForm from "@/components/CreerAnnonceForm";

export default async function CreerAnnoncePage() {
  const user = await getCurrentUser();
  if (!user) {
    redirect("/login");
  }

  return (
    <main className="px-6 py-28 md:py-32">
      <section className="mx-auto max-w-2xl rounded-[2rem] border border-[var(--sand)] bg-[rgba(255,255,255,0.82)] p-8 shadow-[0_18px_50px_rgba(22,22,22,0.08)] backdrop-blur-xl md:p-12">
        <p className="text-xs uppercase tracking-[0.28em] text-neutral-500">Nouvelle annonce</p>
        <h1 className="display-font mt-4 text-4xl text-neutral-950 md:text-5xl">Publier un logement</h1>
        <p className="mt-5 max-w-xl text-neutral-600">
          Remplis les informations pour publier ton annonce sur SummerRent.
        </p>

        <div className="mt-8">
          <CreerAnnonceForm />
        </div>
      </section>
    </main>
  );
}
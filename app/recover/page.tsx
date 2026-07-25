import Link from "next/link";

export default function RecoverPage() {
	return (
		<main className="px-6 py-28 md:py-32">
			<section className="mx-auto max-w-2xl rounded-[2rem] border border-[var(--sand)] bg-[rgba(255,255,255,0.82)] p-8 shadow-[0_18px_50px_rgba(22,22,22,0.08)] backdrop-blur-xl md:p-12">
				<p className="text-xs uppercase tracking-[0.28em] text-neutral-500">Récupération</p>
				<h1 className="display-font mt-4 text-4xl text-neutral-950 md:text-5xl">Mot de passe oublié ?</h1>
				<p className="mt-5 max-w-lg text-neutral-600">
					Entrez votre adresse e-mail et nous vous enverrons les instructions pour réinitialiser votre mot de passe.
				</p>

				<form className="mt-8 grid gap-4">
					<input type="email" placeholder="Adresse e-mail" className="rounded-full border border-neutral-900/10 bg-white px-5 py-3 placeholder:text-neutral-500 focus:border-[var(--olive-800)] focus:outline-none" />
					<button className="rounded-full border border-[var(--olive-900)] bg-[var(--olive-900)] px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-white hover:bg-[var(--olive-800)]">
						Envoyer le lien
					</button>
				</form>

				<div className="mt-8 flex flex-wrap gap-4 border-t border-neutral-900/10 pt-6 text-sm">
					<Link href="/login" className="font-semibold text-[var(--olive-800)] hover:text-[var(--olive-900)]">
						Retour à la connexion
					</Link>
					<Link href="/signup" className="font-semibold text-[var(--olive-800)] hover:text-[var(--olive-900)]">
						Créer un compte
					</Link>
				</div>
			</section>
		</main>
	);
}
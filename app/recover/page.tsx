import Link from "next/link";

export default function RecoverPage() {
	return (
		<main className="relative min-h-screen overflow-hidden px-6 py-28 md:py-32">
			<div
				className="absolute inset-0 bg-cover bg-center"
				style={{ backgroundImage: "url('/colocation.jpg')" }}
			/>
			<div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.14),transparent_42%),linear-gradient(180deg,rgba(12,12,12,0.74),rgba(40,48,31,0.66))]" />
			<div className="pointer-events-none absolute left-10 top-10 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
			<div className="pointer-events-none absolute bottom-0 right-10 h-80 w-80 rounded-full bg-[var(--olive-200)]/10 blur-3xl" />

			<section className="relative mx-auto grid max-w-5xl gap-8 lg:grid-cols-[1fr_0.95fr] lg:items-center">
				<section className="hidden rounded-[2.25rem] border border-white/12 bg-white/8 p-8 text-white shadow-[0_30px_80px_rgba(0,0,0,0.22)] backdrop-blur-2xl lg:block">
					<p className="text-xs uppercase tracking-[0.3em] text-white/70">Récupération</p>
					<h1 className="display-font mt-4 text-5xl leading-tight text-white">Réinitialiser votre mot de passe</h1>
					<p className="mt-5 max-w-md text-white/78">
						Recevez un lien sécurisé pour retrouver l’accès à votre compte en quelques instants.
					</p>
					<div className="mt-10 space-y-4 text-sm text-white/80">
						<p>• Vérification par e-mail</p>
						<p>• Lien de reset sécurisé</p>
						<p>• Retour simple vers la connexion</p>
					</div>
				</section>

				<section className="rounded-[2.25rem] border border-white/14 bg-[rgba(255,255,255,0.84)] p-8 shadow-[0_24px_80px_rgba(0,0,0,0.18)] backdrop-blur-2xl md:p-12">
					<p className="text-xs uppercase tracking-[0.28em] text-neutral-500">Récupération</p>
					<h2 className="display-font mt-4 text-4xl text-neutral-950 md:text-5xl">Mot de passe oublié ?</h2>
					<p className="mt-5 max-w-lg text-neutral-600">
						Entrez votre adresse e-mail et nous vous enverrons les instructions pour réinitialiser votre mot de passe.
					</p>

					<form className="mt-8 grid gap-4">
						<input type="email" placeholder="Adresse e-mail" className="rounded-full border border-neutral-900/10 bg-white/92 px-5 py-3 placeholder:text-neutral-500 focus:border-[var(--olive-800)] focus:outline-none" />
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
			</section>
		</main>
	);
}
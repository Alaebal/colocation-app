import Link from "next/link";

export default function LoginPage() {
	return (
		<main className="px-6 py-28 md:py-32">
			<section className="mx-auto max-w-xl rounded-[2rem] border border-[var(--sand)] bg-[rgba(255,255,255,0.82)] p-8 shadow-[0_18px_50px_rgba(22,22,22,0.08)] backdrop-blur-xl md:p-12">
				<p className="text-xs uppercase tracking-[0.28em] text-neutral-500">Connexion</p>
				<h1 className="display-font mt-4 text-4xl text-neutral-950 md:text-5xl">Se connecter</h1>
				<p className="mt-5 max-w-lg text-neutral-600">
					Saisissez votre adresse e-mail et votre mot de passe pour accéder à votre espace.
				</p>

				<form className="mt-8 grid gap-4">
					<input
						type="email"
						placeholder="Adresse e-mail"
						className="rounded-full border border-neutral-900/10 bg-white px-5 py-3 text-neutral-950 placeholder:text-neutral-500 focus:border-[var(--olive-800)] focus:outline-none"
					/>
					<input
						type="password"
						placeholder="Mot de passe"
						className="rounded-full border border-neutral-900/10 bg-white px-5 py-3 text-neutral-950 placeholder:text-neutral-500 focus:border-[var(--olive-800)] focus:outline-none"
					/>

					<div className="flex items-center justify-between gap-4 text-sm text-neutral-600">
						<label className="flex items-center gap-2">
							<input type="checkbox" className="h-4 w-4 accent-[var(--olive-800)]" />
							Se souvenir de moi
						</label>
						<Link href="/recover" className="font-semibold text-[var(--olive-800)] hover:text-[var(--olive-900)]">
							Mot de passe oublié ?
						</Link>
					</div>

					<button className="mt-2 rounded-full border border-[var(--olive-900)] bg-[var(--olive-900)] px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-white hover:bg-[var(--olive-800)]">
						Se connecter
					</button>
				</form>

				<div className="mt-8 border-t border-neutral-900/10 pt-6 text-sm text-neutral-600">
					Vous n&apos;avez pas encore de compte ?{" "}
					<Link href="/signup" className="font-semibold text-[var(--olive-800)] hover:text-[var(--olive-900)]">
						Créer un compte
					</Link>
				</div>
			</section>
		</main>
	);
}

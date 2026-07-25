import Link from "next/link";
import LoginForm from "./LoginForm";

export default function LoginPage() {
	return (
		<main className="px-6 py-28 md:py-32">
			<section className="mx-auto max-w-xl rounded-[2rem] border border-[var(--sand)] bg-[rgba(255,255,255,0.82)] p-8 shadow-[0_18px_50px_rgba(22,22,22,0.08)] backdrop-blur-xl md:p-12">
				<p className="text-xs uppercase tracking-[0.28em] text-neutral-500">Connexion</p>
				<h1 className="display-font mt-4 text-4xl text-neutral-950 md:text-5xl">Se connecter</h1>
				<p className="mt-5 max-w-lg text-neutral-600">
					Saisissez votre adresse e-mail et votre mot de passe pour accéder à votre espace.
				</p>

				<LoginForm />

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
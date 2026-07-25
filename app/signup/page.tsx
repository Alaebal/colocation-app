import Link from "next/link";
import SignUpForm from "./SignUpForm";

export default function SignUpPage() {
	return (
		<main className="px-6 py-28 md:py-32">
			<section className="mx-auto max-w-2xl rounded-[2rem] border border-[var(--sand)] bg-[rgba(255,255,255,0.82)] p-8 shadow-[0_18px_50px_rgba(22,22,22,0.08)] backdrop-blur-xl md:p-12">
				<p className="text-xs uppercase tracking-[0.28em] text-neutral-500">Créer un compte</p>
				<h1 className="display-font mt-4 text-4xl text-neutral-950 md:text-5xl">Rejoindre Sunora</h1>
				<p className="mt-5 max-w-xl text-neutral-600">
					Renseignez vos informations pour créer votre espace personnel.
				</p>

				<SignUpForm />

				<div className="mt-8 border-t border-neutral-900/10 pt-6 text-sm text-neutral-600">
					Déjà un compte ?{" "}
					<Link href="/login" className="font-semibold text-[var(--olive-800)] hover:text-[var(--olive-900)]">
						Se connecter
					</Link>
				</div>
			</section>
		</main>
	);
}
"use client";

import { useActionState } from "react";
import { signup, type SignupState } from "./actions";

const initialState: SignupState = { error: null };

export default function SignUpForm() {
	const [state, formAction, isPending] = useActionState(signup, initialState);

	return (
		<form action={formAction} className="mt-8 grid gap-4">
			<div className="grid gap-4 md:grid-cols-2">
				<input name="name" type="text" placeholder="Nom" required className="rounded-full border border-neutral-900/10 bg-white px-5 py-3 placeholder:text-neutral-500 focus:border-[var(--olive-800)] focus:outline-none" />
				<input name="familyname" type="text" placeholder="Prénom" required className="rounded-full border border-neutral-900/10 bg-white px-5 py-3 placeholder:text-neutral-500 focus:border-[var(--olive-800)] focus:outline-none" />
			</div>
			<input name="email" type="email" placeholder="Adresse e-mail" required className="rounded-full border border-neutral-900/10 bg-white px-5 py-3 placeholder:text-neutral-500 focus:border-[var(--olive-800)] focus:outline-none" />
			<input name="phone" type="tel" placeholder="Numéro de téléphone" required className="rounded-full border border-neutral-900/10 bg-white px-5 py-3 placeholder:text-neutral-500 focus:border-[var(--olive-800)] focus:outline-none" />
			<input name="address" type="text" placeholder="Adresse" required className="rounded-full border border-neutral-900/10 bg-white px-5 py-3 placeholder:text-neutral-500 focus:border-[var(--olive-800)] focus:outline-none" />
			<input name="password" type="password" placeholder="Mot de passe" required className="rounded-full border border-neutral-900/10 bg-white px-5 py-3 placeholder:text-neutral-500 focus:border-[var(--olive-800)] focus:outline-none" />

			{state.error && (
				<p className="text-sm font-medium text-red-600">{state.error}</p>
			)}

			<button
				type="submit"
				disabled={isPending}
				className="mt-2 rounded-full border border-[var(--olive-900)] bg-[var(--olive-900)] px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-white hover:bg-[var(--olive-800)] disabled:opacity-60"
			>
				{isPending ? "Création..." : "Créer mon compte"}
			</button>
		</form>
	);
}
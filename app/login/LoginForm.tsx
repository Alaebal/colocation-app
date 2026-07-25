"use client";

import Link from "next/link";
import { useActionState } from "react";
import { login, type LoginState } from "./actions";

const initialState: LoginState = { error: null };

export default function LoginForm() {
	const [state, formAction, isPending] = useActionState(login, initialState);

	return (
		<form action={formAction} className="mt-8 grid gap-4">
			<input
				name="email"
				type="email"
				placeholder="Adresse e-mail"
				required
				className="rounded-full border border-neutral-900/10 bg-white px-5 py-3 text-neutral-950 placeholder:text-neutral-500 focus:border-[var(--olive-800)] focus:outline-none"
			/>
			<input
				name="password"
				type="password"
				placeholder="Mot de passe"
				required
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

			{state.error && (
				<p className="text-sm font-medium text-red-600">{state.error}</p>
			)}

			<button
				type="submit"
				disabled={isPending}
				className="mt-2 rounded-full border border-[var(--olive-900)] bg-[var(--olive-900)] px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-white hover:bg-[var(--olive-800)] disabled:opacity-60"
			>
				{isPending ? "Connexion..." : "Se connecter"}
			</button>
		</form>
	);
}
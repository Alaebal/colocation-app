"use client";

import { useState, useActionState } from "react";
import { creerReservation, type ReservationState } from "@/app/reservation/actions";

type ReservationCalendarProps = {
  annonceId: string;
  reservations: { dateDebut: Date; dateFin: Date }[];
};

const JOURS = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];
const MOIS = [
  "Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
  "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre",
];

function isSameDay(a: Date, b: Date) {
  return a.toDateString() === b.toDateString();
}

function isDateReserved(date: Date, reservations: { dateDebut: Date; dateFin: Date }[]) {
  return reservations.some((r) => date >= r.dateDebut && date < r.dateFin);
}

function isDateInRange(date: Date, start: Date | null, end: Date | null) {
  if (!start || !end) return false;
  return date > start && date < end;
}

const initialState: ReservationState = { error: null };

export default function ReservationCalendar({ annonceId, reservations }: ReservationCalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedStart, setSelectedStart] = useState<Date | null>(null);
  const [selectedEnd, setSelectedEnd] = useState<Date | null>(null);

  const creerReservationAvecId = creerReservation.bind(null, annonceId);
  const [state, formAction, isPending] = useActionState(creerReservationAvecId, initialState);

  const annee = currentMonth.getFullYear();
  const mois = currentMonth.getMonth();

  const premierJourMois = new Date(annee, mois, 1);
  const dernierJourMois = new Date(annee, mois + 1, 0);
  const nbJours = dernierJourMois.getDate();

  // Décalage pour que la semaine commence le lundi (0 = dimanche en JS, on veut 0 = lundi)
  const decalage = (premierJourMois.getDay() + 6) % 7;

  const jours: (Date | null)[] = [
    ...Array(decalage).fill(null),
    ...Array.from({ length: nbJours }, (_, i) => new Date(annee, mois, i + 1)),
  ];

  const aujourdHui = new Date();
  aujourdHui.setHours(0, 0, 0, 0);

  function handleDayClick(date: Date) {
    if (date < aujourdHui || isDateReserved(date, reservations)) return;

    if (!selectedStart || (selectedStart && selectedEnd)) {
      setSelectedStart(date);
      setSelectedEnd(null);
      return;
    }

    if (date <= selectedStart) {
      setSelectedStart(date);
      return;
    }

    setSelectedEnd(date);
  }

  function changerMois(delta: number) {
    setCurrentMonth(new Date(annee, mois + delta, 1));
  }

  return (
    <div className="rounded-[2rem] border border-[var(--sand)] bg-[rgba(255,255,255,0.82)] p-6 shadow-[0_18px_50px_rgba(22,22,22,0.08)] backdrop-blur-xl md:p-8">
      <div className="mb-4 flex items-center justify-between">
        <button
          type="button"
          onClick={() => changerMois(-1)}
          className="rounded-full border border-neutral-900/10 px-3 py-1 text-sm hover:bg-neutral-100"
        >
          ←
        </button>
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-neutral-800">
          {MOIS[mois]} {annee}
        </p>
        <button
          type="button"
          onClick={() => changerMois(1)}
          className="rounded-full border border-neutral-900/10 px-3 py-1 text-sm hover:bg-neutral-100"
        >
          →
        </button>
      </div>

      <div className="mb-2 grid grid-cols-7 gap-1 text-center text-xs uppercase tracking-wide text-neutral-500">
        {JOURS.map((j) => (
          <span key={j}>{j}</span>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {jours.map((date, i) => {
          if (!date) return <div key={`vide-${i}`} />;

          const passe = date < aujourdHui;
          const reserve = isDateReserved(date, reservations);
          const estDebut = selectedStart && isSameDay(date, selectedStart);
          const estFin = selectedEnd && isSameDay(date, selectedEnd);
          const dansPlage = isDateInRange(date, selectedStart, selectedEnd);
          const desactive = passe || reserve;

          return (
            <button
              type="button"
              key={date.toISOString()}
              disabled={desactive}
              onClick={() => handleDayClick(date)}
              className={`aspect-square rounded-lg text-sm transition ${
                desactive
                  ? "cursor-not-allowed text-neutral-300 line-through"
                  : estDebut || estFin
                  ? "bg-[var(--olive-900)] text-white"
                  : dansPlage
                  ? "bg-[var(--olive-800)]/20 text-neutral-900"
                  : "text-neutral-800 hover:bg-neutral-100"
              }`}
            >
              {date.getDate()}
            </button>
          );
        })}
      </div>

      <form action={formAction} className="mt-6 grid gap-3">
        <input type="hidden" name="dateDebut" value={selectedStart ? selectedStart.toISOString() : ""} />
        <input type="hidden" name="dateFin" value={selectedEnd ? selectedEnd.toISOString() : ""} />

        {selectedStart && (
          <p className="text-sm text-neutral-600">
            Du <strong>{selectedStart.toLocaleDateString("fr-FR")}</strong>
            {selectedEnd && (
              <> au <strong>{selectedEnd.toLocaleDateString("fr-FR")}</strong></>
            )}
          </p>
        )}

        {state.error && <p className="text-sm font-medium text-red-600">{state.error}</p>}
        {state.success && <p className="text-sm font-medium text-green-700">Réservation confirmée !</p>}

        <button
          type="submit"
          disabled={!selectedStart || !selectedEnd || isPending}
          className="mt-2 rounded-full border border-[var(--olive-900)] bg-[var(--olive-900)] px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-white hover:bg-[var(--olive-800)] disabled:cursor-not-allowed disabled:opacity-40"
        >
          {isPending ? "Réservation..." : "Réserver"}
        </button>
      </form>
    </div>
  );
}
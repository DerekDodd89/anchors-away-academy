"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

const weeks = Array.from({ length: 12 }, (_, index) => {
  const number = index + 1;

  return {
    number,
    label:
      number === 6
        ? "Week 6 — September 21–25"
        : `Week ${number}`,
  };
});

export default function WeekControls() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const weekFromUrl = Number(searchParams.get("week"));
  const selectedWeek =
    weekFromUrl >= 1 && weekFromUrl <= 12
      ? weekFromUrl
      : 6;

  function handleWeekChange(
    event: React.ChangeEvent<HTMLSelectElement>
  ) {
    const newWeek = Number(event.target.value);

    router.push(`/bible?week=${newWeek}`);
  }

  const previousWeek = selectedWeek - 1;
  const nextWeek = selectedWeek + 1;

  return (
    <section className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-[1500px] flex-wrap items-end gap-4 px-5 py-5">

        {/* School Year */}
        <label className="min-w-[180px] flex-1">
          <span className="mb-1 block text-xs font-bold uppercase tracking-wide text-slate-600">
            School Year
          </span>

          <select className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3">
            <option>2026 – 2027</option>
          </select>
        </label>

        {/* Semester */}
        <label className="min-w-[180px] flex-1">
          <span className="mb-1 block text-xs font-bold uppercase tracking-wide text-slate-600">
            Semester
          </span>

          <select className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3">
            <option>Semester 1</option>
          </select>
        </label>

        {/* Week */}
        <label className="min-w-[260px] flex-[2]">
          <span className="mb-1 block text-xs font-bold uppercase tracking-wide text-slate-600">
            Week
          </span>

          <select
            value={selectedWeek}
            onChange={handleWeekChange}
            className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3"
          >
            {weeks.map((week) => (
              <option
                key={week.number}
                value={week.number}
              >
                {week.label}
              </option>
            ))}
          </select>
        </label>

        {/* Previous Week */}
        {selectedWeek > 1 ? (
          <Link
            href={`/bible?week=${previousWeek}`}
            className="rounded-lg border border-[#0b4a73] bg-white px-5 py-3 font-semibold text-[#0b4a73] transition hover:bg-[#edf5f9]"
          >
            ← Previous Week
          </Link>
        ) : (
          <span className="cursor-not-allowed rounded-lg border border-slate-300 bg-white px-5 py-3 font-semibold text-slate-300">
            ← Previous Week
          </span>
        )}

        {/* Next Week */}
        {selectedWeek < 12 ? (
          <Link
            href={`/bible?week=${nextWeek}`}
            className="rounded-lg border border-[#0b4a73] bg-white px-5 py-3 font-semibold text-[#0b4a73] transition hover:bg-[#edf5f9]"
          >
            Next Week →
          </Link>
        ) : (
          <span className="cursor-not-allowed rounded-lg border border-slate-300 bg-white px-5 py-3 font-semibold text-slate-300">
            Next Week →
          </span>
        )}

        {/* Current Week */}
        <Link
          href="/bible?week=6"
          className="rounded-lg bg-[#0b4a73] px-5 py-3 font-semibold text-white transition hover:bg-[#073753]"
        >
          📅 Go to Current Week
        </Link>
      </div>
    </section>
  );
}
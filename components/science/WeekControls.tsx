"use client";

import { useSearchParams } from "next/navigation";

const weeks = [
  { number: 1, dates: "August 17–21" },
  { number: 2, dates: "August 24–28" },
  { number: 3, dates: "August 31–September 4" },
  { number: 4, dates: "September 7–11" },
  { number: 5, dates: "September 14–18" },
  { number: 6, dates: "September 21–25" },
  { number: 7, dates: "September 28–October 2" },
  { number: 8, dates: "October 5–9" },
  { number: 9, dates: "October 12–16" },
  { number: 10, dates: "October 19–23" },
  { number: 11, dates: "October 26–30" },
  { number: 12, dates: "November 2–6" },
];

export default function WeekControls() {
  const searchParams = useSearchParams();

  const requestedWeek = Number(
    searchParams.get("week")
  );

  const selectedWeek =
    requestedWeek >= 1 && requestedWeek <= 12
      ? requestedWeek
      : 6;

  function goToWeek(week: number) {
    if (week < 1 || week > 12) {
      return;
    }

    window.location.href = `/science?week=${week}`;
  }

  function handleWeekChange(
    event: React.ChangeEvent<HTMLSelectElement>
  ) {
    goToWeek(Number(event.target.value));
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

          <select
            className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3"
            defaultValue="2026-2027"
          >
            <option value="2026-2027">
              2026 – 2027
            </option>
          </select>
        </label>

        {/* Semester */}
        <label className="min-w-[180px] flex-1">
          <span className="mb-1 block text-xs font-bold uppercase tracking-wide text-slate-600">
            Semester
          </span>

          <select
            className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3"
            defaultValue="1"
          >
            <option value="1">
              Semester 1
            </option>
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
                Week {week.number} — {week.dates}
              </option>
            ))}
          </select>
        </label>

        {/* Previous Week */}
        {selectedWeek > 1 ? (
          <a
            href={`/science?week=${previousWeek}`}
            className="rounded-lg border border-[#39705a] bg-white px-5 py-3 font-semibold text-[#39705a] transition hover:bg-[#edf6f1]"
          >
            ← Previous Week
          </a>
        ) : (
          <span className="cursor-not-allowed rounded-lg border border-slate-200 bg-white px-5 py-3 font-semibold text-slate-300">
            ← Previous Week
          </span>
        )}

        {/* Next Week */}
        {selectedWeek < 12 ? (
          <a
            href={`/science?week=${nextWeek}`}
            className="rounded-lg border border-[#39705a] bg-white px-5 py-3 font-semibold text-[#39705a] transition hover:bg-[#edf6f1]"
          >
            Next Week →
          </a>
        ) : (
          <span className="cursor-not-allowed rounded-lg border border-slate-200 bg-white px-5 py-3 font-semibold text-slate-300">
            Next Week →
          </span>
        )}

        {/* Current Week */}
        <a
          href="/science?week=6"
          className="rounded-lg bg-[#39705a] px-5 py-3 font-semibold text-white transition hover:bg-[#2c5947]"
        >
          📅 Go to Current Week
        </a>

      </div>
    </section>
  );
}
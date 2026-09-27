"use client";

import { useSearchParams } from "next/navigation";

const weeks = [
  { week: 1, dates: "August 17–21" },
  { week: 2, dates: "August 24–28" },
  { week: 3, dates: "August 31–September 4" },
  { week: 4, dates: "September 7–11" },
  { week: 5, dates: "September 14–18" },
  { week: 6, dates: "September 21–25" },
  { week: 7, dates: "September 28–October 2" },
  { week: 8, dates: "October 5–9" },
  { week: 9, dates: "October 12–16" },
  { week: 10, dates: "October 19–23" },
  { week: 11, dates: "October 26–30" },
  { week: 12, dates: "November 2–6" },
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

  const previousWeek =
    selectedWeek > 1
      ? selectedWeek - 1
      : null;

  const nextWeek =
    selectedWeek < 12
      ? selectedWeek + 1
      : null;

  function changeWeek(
    event: React.ChangeEvent<HTMLSelectElement>
  ) {
    window.location.href =
      `/language-arts?week=${event.target.value}`;
  }

  return (
    <section className="border-b border-slate-200 bg-white">
      <div className="mx-auto max-w-[1280px] px-5 py-4">
        <div className="grid items-end gap-3 lg:grid-cols-[183px_183px_1fr_auto_auto_auto]">

          {/* SCHOOL YEAR */}
          <label>
            <span className="mb-2 block text-xs font-bold uppercase tracking-wide text-[#684660]">
              School Year
            </span>

            <select
              className="h-11 w-full rounded-lg border border-slate-300 bg-white px-4 font-semibold text-[#082f52] outline-none"
              defaultValue="2026-2027"
            >
              <option value="2026-2027">
                2026 – 2027
              </option>
            </select>
          </label>

          {/* SEMESTER */}
          <label>
            <span className="mb-2 block text-xs font-bold uppercase tracking-wide text-[#684660]">
              Semester
            </span>

            <select
              className="h-11 w-full rounded-lg border border-slate-300 bg-white px-4 font-semibold text-[#082f52] outline-none"
              defaultValue="1"
            >
              <option value="1">
                Semester 1
              </option>
            </select>
          </label>

          {/* WEEK */}
          <label>
            <span className="mb-2 block text-xs font-bold uppercase tracking-wide text-[#684660]">
              Week
            </span>

            <select
              value={selectedWeek}
              onChange={changeWeek}
              className="h-11 w-full rounded-lg border border-slate-300 bg-white px-4 font-semibold text-[#082f52] outline-none"
            >
              {weeks.map((item) => (
                <option
                  key={item.week}
                  value={item.week}
                >
                  Week {item.week} — {item.dates}
                </option>
              ))}
            </select>
          </label>

          {/* PREVIOUS */}
          {previousWeek ? (
            <a
              href={`/language-arts?week=${previousWeek}`}
              className="flex h-11 items-center justify-center rounded-lg border border-[#7a4f72] bg-white px-5 font-bold text-[#684660] transition hover:bg-[#f8eef5]"
            >
              ← Previous Week
            </a>
          ) : (
            <span className="flex h-11 cursor-not-allowed items-center justify-center rounded-lg border border-slate-200 bg-slate-100 px-5 font-bold text-slate-400">
              ← Previous Week
            </span>
          )}

          {/* NEXT */}
          {nextWeek ? (
            <a
              href={`/language-arts?week=${nextWeek}`}
              className="flex h-11 items-center justify-center rounded-lg border border-[#7a4f72] bg-white px-5 font-bold text-[#684660] transition hover:bg-[#f8eef5]"
            >
              Next Week →
            </a>
          ) : (
            <span className="flex h-11 cursor-not-allowed items-center justify-center rounded-lg border border-slate-200 bg-slate-100 px-5 font-bold text-slate-400">
              Next Week →
            </span>
          )}

          {/* CURRENT */}
          <a
            href="/language-arts?week=6"
            className="flex h-11 items-center justify-center whitespace-nowrap rounded-lg bg-[#7a4f72] px-5 font-bold text-white shadow-sm transition hover:bg-[#684660]"
          >
            ▣ Go to Current Week
          </a>

        </div>
      </div>
    </section>
  );
}
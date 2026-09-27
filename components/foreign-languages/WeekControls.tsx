"use client";

import {
  useSearchParams,
} from "next/navigation";

import {
  useState,
} from "react";

const LANGUAGES = [
  {
    slug: "english",
    name: "English",
  },
  {
    slug: "spanish",
    name: "Spanish",
  },
  {
    slug: "french",
    name: "French",
  },
  {
    slug: "german",
    name: "German",
  },
  {
    slug: "latin",
    name: "Latin",
  },
  {
    slug: "koine-greek",
    name: "Koine Greek",
  },
  {
    slug: "modern-greek",
    name: "Modern Greek",
  },
  {
    slug: "biblical-hebrew",
    name: "Biblical Hebrew",
  },
  {
    slug: "chinese",
    name: "Chinese",
  },
] as const;

const WEEKS = [
  {
    week: 1,
    dates: "August 17–21",
  },
  {
    week: 2,
    dates: "August 24–28",
  },
  {
    week: 3,
    dates: "August 31–September 4",
  },
  {
    week: 4,
    dates: "September 7–11",
  },
  {
    week: 5,
    dates: "September 14–18",
  },
  {
    week: 6,
    dates: "September 21–25",
  },
  {
    week: 7,
    dates: "September 28–October 2",
  },
  {
    week: 8,
    dates: "October 5–9",
  },
  {
    week: 9,
    dates: "October 12–16",
  },
  {
    week: 10,
    dates: "October 19–23",
  },
  {
    week: 11,
    dates: "October 26–30",
  },
  {
    week: 12,
    dates: "November 2–6",
  },
] as const;

const CURRENT_WEEK = 6;
const DEFAULT_LANGUAGE = "spanish";

/* =========================================================
   HELPERS
   ========================================================= */

function cleanLanguages(
  values: string[]
) {
  return Array.from(
    new Set(
      values.filter((value) =>
        LANGUAGES.some(
          (language) =>
            language.slug === value
        )
      )
    )
  );
}

function buildUrl(
  week: number,
  languages: string[]
) {
  const params =
    new URLSearchParams();

  params.set(
    "week",
    String(week)
  );

  params.set(
    "languages",
    languages.join(",")
  );

  return `/foreign-languages?${params.toString()}`;
}

/* =========================================================
   COMPONENT
   ========================================================= */

export default function WeekControls() {
  const searchParams =
    useSearchParams();

  const [menuOpen, setMenuOpen] =
    useState(false);

  /* -------------------------------------------------------
     CURRENT WEEK
     ------------------------------------------------------- */

  const weekParam =
    Number(
      searchParams.get("week") ??
        CURRENT_WEEK
    );

  const currentWeek =
    weekParam >= 1 &&
    weekParam <= 12
      ? weekParam
      : CURRENT_WEEK;

  const currentWeekInfo =
    WEEKS.find(
      (item) =>
        item.week === currentWeek
    ) ?? WEEKS[5];

  /* -------------------------------------------------------
     SELECTED LANGUAGES
     ------------------------------------------------------- */

  const languageParam =
    searchParams.get(
      "languages"
    );

  const requestedLanguages =
    cleanLanguages(
      languageParam
        ? languageParam.split(",")
        : [DEFAULT_LANGUAGE]
    );

  const selectedLanguages =
    requestedLanguages.length > 0
      ? requestedLanguages
      : [DEFAULT_LANGUAGE];

  const selectedNames =
    selectedLanguages
      .map(
        (slug) =>
          LANGUAGES.find(
            (language) =>
              language.slug === slug
          )?.name
      )
      .filter(Boolean);

  /* -------------------------------------------------------
     LANGUAGE TOGGLE
     ------------------------------------------------------- */

  function toggleLanguage(
    languageSlug: string
  ) {
    let nextLanguages:
      string[];

    if (
      selectedLanguages.includes(
        languageSlug
      )
    ) {
      nextLanguages =
        selectedLanguages.filter(
          (slug) =>
            slug !== languageSlug
        );

      // Always keep at least
      // one language selected.
      if (
        nextLanguages.length === 0
      ) {
        return;
      }
    } else {
      nextLanguages = [
        ...selectedLanguages,
        languageSlug,
      ];
    }

    window.location.href =
      buildUrl(
        currentWeek,
        nextLanguages
      );
  }

  /* -------------------------------------------------------
     WEEK CHANGE
     ------------------------------------------------------- */

  function changeWeek(
    newWeek: number
  ) {
    window.location.href =
      buildUrl(
        newWeek,
        selectedLanguages
      );
  }

  const previousWeek =
    currentWeek > 1
      ? currentWeek - 1
      : null;

  const nextWeek =
    currentWeek < 12
      ? currentWeek + 1
      : null;

  /* =========================================================
     RENDER
     ========================================================= */

  return (
    <section className="border-b border-[#d8c8a7] bg-white shadow-sm">
      <div className="mx-auto max-w-[1280px] px-5 py-5">
        {/* ===============================================
            MAIN CONTROL ROW
           =============================================== */}

        <div className="grid gap-4 lg:grid-cols-[minmax(260px,1.5fr)_170px_170px_minmax(260px,1.2fr)]">
          {/* =============================================
              LANGUAGES
             ============================================= */}

          <div className="relative">
            <label className="mb-2 block text-[10px] font-bold uppercase tracking-[0.2em] text-[#9b6a2e]">
              Languages
            </label>

            <button
              type="button"
              onClick={() =>
                setMenuOpen(
                  (open) => !open
                )
              }
              className="flex min-h-[52px] w-full items-center justify-between gap-4 rounded-xl border border-[#d8c8a7] bg-[#f9f6ef] px-4 py-3 text-left transition hover:border-[#9b6a2e]"
            >
              <div className="min-w-0">
                <p className="text-sm font-bold text-[#082f52]">
                  {selectedLanguages.length ===
                  1
                    ? selectedNames[0]
                    : `${selectedLanguages.length} Languages Selected`}
                </p>

                {selectedLanguages.length >
                  1 && (
                  <p className="mt-0.5 truncate text-xs text-slate-500">
                    {selectedNames.join(
                      " • "
                    )}
                  </p>
                )}
              </div>

              <span
                className={`shrink-0 text-sm text-[#9b6a2e] transition ${
                  menuOpen
                    ? "rotate-180"
                    : ""
                }`}
              >
                ▼
              </span>
            </button>

            {/* LANGUAGE DROPDOWN */}

            {menuOpen && (
              <div className="absolute left-0 top-full z-50 mt-2 w-full min-w-[300px] overflow-hidden rounded-2xl border border-[#d8c8a7] bg-white shadow-2xl">
                <div className="border-b border-slate-100 bg-[#f9f6ef] px-4 py-3">
                  <p className="text-xs font-bold text-[#082f52]">
                    Choose Languages
                  </p>

                  <p className="mt-1 text-[11px] leading-relaxed text-slate-500">
                    Select one or more
                    languages for the
                    weekly schedule.
                  </p>
                </div>

                <div className="max-h-[380px] overflow-y-auto p-2">
                  {LANGUAGES.map(
                    (language) => {
                      const selected =
                        selectedLanguages.includes(
                          language.slug
                        );

                      return (
                        <button
                          key={
                            language.slug
                          }
                          type="button"
                          onClick={() =>
                            toggleLanguage(
                              language.slug
                            )
                          }
                          className="flex min-h-[44px] w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition hover:bg-[#f4f1e9]"
                        >
                          <span
                            className={`flex h-5 w-5 shrink-0 items-center justify-center rounded border text-xs font-bold ${
                              selected
                                ? "border-[#082f52] bg-[#082f52] text-white"
                                : "border-slate-300 bg-white text-transparent"
                            }`}
                          >
                            ✓
                          </span>

                          <span className="text-sm font-semibold text-slate-700">
                            {
                              language.name
                            }
                          </span>
                        </button>
                      );
                    }
                  )}
                </div>

                <div className="border-t border-slate-100 bg-[#f9f6ef] px-4 py-3">
                  <p className="text-[11px] font-semibold text-slate-500">
                    {
                      selectedLanguages.length
                    }{" "}
                    {selectedLanguages.length ===
                    1
                      ? "language"
                      : "languages"}{" "}
                    selected
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* =============================================
              SCHOOL YEAR
             ============================================= */}

          <div>
            <label className="mb-2 block text-[10px] font-bold uppercase tracking-[0.2em] text-[#9b6a2e]">
              School Year
            </label>

            <div className="flex min-h-[52px] items-center rounded-xl border border-[#d8c8a7] bg-[#f9f6ef] px-4 text-sm font-bold text-[#082f52]">
              2026–2027
            </div>
          </div>

          {/* =============================================
              SEMESTER
             ============================================= */}

          <div>
            <label className="mb-2 block text-[10px] font-bold uppercase tracking-[0.2em] text-[#9b6a2e]">
              Semester
            </label>

            <div className="flex min-h-[52px] items-center rounded-xl border border-[#d8c8a7] bg-[#f9f6ef] px-4 text-sm font-bold text-[#082f52]">
              Semester 1
            </div>
          </div>

          {/* =============================================
              WEEK
             ============================================= */}

          <div>
            <label
              htmlFor="foreign-language-week"
              className="mb-2 block text-[10px] font-bold uppercase tracking-[0.2em] text-[#9b6a2e]"
            >
              Week
            </label>

            <select
              id="foreign-language-week"
              value={currentWeek}
              onChange={(event) =>
                changeWeek(
                  Number(
                    event.target.value
                  )
                )
              }
              className="min-h-[52px] w-full rounded-xl border border-[#d8c8a7] bg-[#f9f6ef] px-4 text-sm font-bold text-[#082f52] outline-none transition focus:border-[#9b6a2e]"
            >
              {WEEKS.map(
                (week) => (
                  <option
                    key={week.week}
                    value={week.week}
                  >
                    Week {week.week} —{" "}
                    {week.dates}
                  </option>
                )
              )}
            </select>
          </div>
        </div>

        {/* ===============================================
            SELECTED LANGUAGES
           =============================================== */}

        <div className="mt-4 flex flex-wrap items-center gap-2">
          <span className="mr-1 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">
            Showing
          </span>

          {selectedLanguages.map(
            (slug) => {
              const language =
                LANGUAGES.find(
                  (item) =>
                    item.slug === slug
                );

              if (!language) {
                return null;
              }

              return (
                <span
                  key={slug}
                  className="rounded-full border border-[#d8c8a7] bg-[#f4f1e9] px-3 py-1.5 text-xs font-bold text-[#082f52]"
                >
                  {language.name}
                </span>
              );
            }
          )}
        </div>

        {/* ===============================================
            WEEK NAVIGATION
           =============================================== */}

        <div className="mt-4 flex flex-col gap-3 border-t border-slate-100 pt-4 sm:flex-row sm:items-center sm:justify-between">
          {/* CURRENT WEEK INFO */}

          <div className="text-sm text-slate-500">
            <span className="font-bold text-[#082f52]">
              Week {currentWeek}
            </span>

            {" • "}

            {currentWeekInfo.dates}
          </div>

          {/* NAVIGATION BUTTONS */}

          <div className="flex flex-wrap items-center gap-2">
            {previousWeek ? (
              <a
                href={buildUrl(
                  previousWeek,
                  selectedLanguages
                )}
                className="inline-flex min-h-[40px] items-center rounded-lg border border-[#d8c8a7] bg-white px-4 py-2 text-xs font-bold text-[#082f52] transition hover:bg-[#f4f1e9]"
              >
                ← Previous Week
              </a>
            ) : (
              <span className="inline-flex min-h-[40px] cursor-not-allowed items-center rounded-lg border border-slate-200 bg-slate-50 px-4 py-2 text-xs font-bold text-slate-300">
                ← Previous Week
              </span>
            )}

            {nextWeek ? (
              <a
                href={buildUrl(
                  nextWeek,
                  selectedLanguages
                )}
                className="inline-flex min-h-[40px] items-center rounded-lg border border-[#d8c8a7] bg-white px-4 py-2 text-xs font-bold text-[#082f52] transition hover:bg-[#f4f1e9]"
              >
                Next Week →
              </a>
            ) : (
              <span className="inline-flex min-h-[40px] cursor-not-allowed items-center rounded-lg border border-slate-200 bg-slate-50 px-4 py-2 text-xs font-bold text-slate-300">
                Next Week →
              </span>
            )}

            <a
              href={buildUrl(
                CURRENT_WEEK,
                selectedLanguages
              )}
              className="inline-flex min-h-[40px] items-center rounded-lg bg-[#082f52] px-4 py-2 text-xs font-bold text-white transition hover:bg-[#0b4a73]"
            >
              Go to Current Week
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
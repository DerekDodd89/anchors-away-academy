import AcademyFooter from "@/components/home/AcademyFooter";
import AcademyHeader from "@/components/home/AcademyHeader";

import WeekControls from "@/components/foreign-languages/WeekControls";
import WeekDashboard from "@/components/foreign-languages/WeekDashboard";

import {
  FOREIGN_LANGUAGES,
  FOREIGN_LANGUAGE_WEEKS,
  type ForeignLanguageSlug,
} from "@/lib/foreignLanguageLessons";

const CURRENT_WEEK = 6;

const DEFAULT_LANGUAGE: ForeignLanguageSlug =
  "spanish";

/* =========================================================
   HELPERS
   ========================================================= */

function getWeekNumber(
  value: string | undefined
) {
  const week = Number(value);

  if (
    Number.isInteger(week) &&
    week >= 1 &&
    week <= 12
  ) {
    return week;
  }

  return CURRENT_WEEK;
}

function getSelectedLanguages(
  value: string | undefined
): ForeignLanguageSlug[] {
  if (!value) {
    return [DEFAULT_LANGUAGE];
  }

  const requested =
    value.split(",");

  const selected =
    FOREIGN_LANGUAGES.filter(
      (language) =>
        requested.includes(
          language.slug
        )
    ).map(
      (language) =>
        language.slug as ForeignLanguageSlug
    );

  return selected.length > 0
    ? selected
    : [DEFAULT_LANGUAGE];
}

/* =========================================================
   PAGE
   ========================================================= */

export default async function ForeignLanguagesPage({
  searchParams,
}: {
  searchParams: Promise<{
    week?: string;
    languages?: string;
  }>;
}) {
  const params =
    await searchParams;

  const week =
    getWeekNumber(
      params.week
    );

  const selectedLanguages =
    getSelectedLanguages(
      params.languages
    );

  const weekInfo =
    FOREIGN_LANGUAGE_WEEKS.find(
      (item) =>
        item.week === week
    );

  return (
    <main className="min-h-screen bg-[#f4f1e9] text-slate-900">
      <AcademyHeader />

      {/* =========================================
          FOREIGN LANGUAGES HERO
         ========================================= */}

      <section className="relative overflow-hidden border-b border-[#d8c8a7] bg-[#082f52]">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -left-20 -top-24 h-80 w-80 rounded-full border-[40px] border-white" />

          <div className="absolute -bottom-32 right-10 h-96 w-96 rounded-full border-[50px] border-[#f4e7c9]" />
        </div>

        <div className="relative mx-auto max-w-[1280px] px-5 py-12 text-center sm:py-14">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#d8b878]">
            Anchors Away Homeschool Academy
          </p>

          <h1 className="mt-3 font-serif text-4xl font-bold text-white sm:text-5xl">
            Foreign Languages
          </h1>

          <p className="mx-auto mt-4 max-w-3xl font-serif text-lg italic leading-relaxed text-[#f4e7c9]">
            Explore languages. Understand
            cultures. Learn to communicate,
            read, and discover the words that
            shaped history and Scripture.
          </p>
        </div>
      </section>

      {/* =========================================
          LANGUAGE + WEEK CONTROLS
         ========================================= */}

      <WeekControls />

      {/* =========================================
          CURRENT WEEK INTRODUCTION
         ========================================= */}

      <section className="mx-auto max-w-[1280px] px-5 pb-2 pt-9 text-center">
        <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#9b6a2e]">
          Semester 1
        </p>

        <h2 className="mt-2 font-serif text-4xl font-bold text-[#082f52]">
          Week {week}
        </h2>

        <p className="mt-2 text-sm font-semibold text-slate-500">
          {weekInfo?.dates}
        </p>

        <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-slate-600">
          Select one or more languages
          above. Each selected language
          will appear inside the
          Monday–Friday schedule.
        </p>
      </section>

      {/* =========================================
          WEEK DASHBOARD
         ========================================= */}

      <WeekDashboard
        week={week}
        selectedLanguages={
          selectedLanguages
        }
      />

      {/* =========================================
          GUEST ACCESS
         ========================================= */}

      <section className="mx-auto max-w-[1280px] px-5 pb-12">
        <div className="rounded-2xl border border-[#d8c8a7] bg-white/70 px-6 py-5">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="font-serif text-lg font-bold text-[#082f52]">
                Browse as a Guest
              </p>

              <p className="mt-1 max-w-3xl text-sm leading-relaxed text-slate-600">
                No account or student
                profile is required. Choose
                any combination of languages
                and browse the available
                Academy curriculum.
              </p>
            </div>

            <div className="shrink-0">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#9b6a2e]">
                Open Academy Curriculum
              </p>
            </div>
          </div>
        </div>
      </section>

      <AcademyFooter />
    </main>
  );
}
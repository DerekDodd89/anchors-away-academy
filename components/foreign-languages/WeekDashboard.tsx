import {
  FOREIGN_LANGUAGES,
  getForeignLanguageWeekLessons,
  type ForeignLanguageSlug,
} from "@/lib/foreignLanguageLessons";

const DAYS = [
  { slug: "monday", name: "Monday" },
  { slug: "tuesday", name: "Tuesday" },
  { slug: "wednesday", name: "Wednesday" },
  { slug: "thursday", name: "Thursday" },
  { slug: "friday", name: "Friday" },
] as const;

const LANGUAGE_VISUALS = {
  english: {
    symbol: "ABC",
    accent: "#315d7a",
    light: "#edf4f8",
  },

  spanish: {
    symbol: "¡Hola!",
    accent: "#a55b32",
    light: "#f8efe9",
  },

  french: {
    symbol: "Bonjour",
    accent: "#536b91",
    light: "#eef1f6",
  },

  german: {
    symbol: "Hallo",
    accent: "#765c42",
    light: "#f4efe9",
  },

  latin: {
    symbol: "LATIN",
    accent: "#8a6334",
    light: "#f6f0e5",
  },

  "koine-greek": {
    symbol: "Ἑλληνική",
    accent: "#655783",
    light: "#f2eff7",
  },

  "modern-greek": {
    symbol: "Ελληνικά",
    accent: "#46708a",
    light: "#edf4f7",
  },

  "biblical-hebrew": {
    symbol: "עִבְרִית",
    accent: "#80663f",
    light: "#f5f0e7",
  },

  chinese: {
    symbol: "中文",
    accent: "#94504b",
    light: "#f7eded",
  },
} as const;

/* =========================================================
   LANGUAGE LESSON BLOCK
   ========================================================= */

function LanguageLessonBlock({
  language,
  week,
  day,
}: {
  language: ForeignLanguageSlug;
  week: number;
  day: string;
}) {
  const languageInfo =
    FOREIGN_LANGUAGES.find(
      (item) => item.slug === language
    );

  if (!languageInfo) {
    return null;
  }

  const visual =
    LANGUAGE_VISUALS[language];

  const weekLessons =
    getForeignLanguageWeekLessons(
      language,
      week
    );

  const dayData =
    weekLessons.find(
      (item) => item.day === day
    );

  const lesson =
    dayData?.lesson ?? null;

  /* =======================================================
     NOTHING PUBLISHED
     ======================================================= */

  if (!lesson) {
    return (
      <div
        className="overflow-hidden rounded-2xl border"
        style={{
          borderColor: `${visual.accent}35`,
          backgroundColor: visual.light,
        }}
      >
        <div className="p-4">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p
                className="text-[10px] font-bold uppercase tracking-[0.18em]"
                style={{
                  color: visual.accent,
                }}
              >
                {languageInfo.name}
              </p>

              <p className="mt-1 font-serif text-lg font-bold leading-tight text-[#082f52]">
                Nothing Scheduled
              </p>
            </div>

            <div
              className="flex min-h-10 min-w-10 items-center justify-center rounded-xl px-2 text-center font-serif text-[10px] font-bold"
              style={{
                backgroundColor: `${visual.accent}12`,
                color: visual.accent,
              }}
            >
              {visual.symbol}
            </div>
          </div>

          <p className="mt-3 text-xs leading-relaxed text-slate-500">
            No {languageInfo.name} lesson has
            been published for this day yet.
          </p>
        </div>
      </div>
    );
  }

  /* =======================================================
     PUBLISHED LESSON
     ======================================================= */

  const availableLevels =
    Object.keys(
      lesson.levels ?? {}
    );

  const resourceCount =
    Object.values(
      lesson.resources ?? {}
    ).reduce(
      (total, group) =>
        total +
        (Array.isArray(group)
          ? group.length
          : 0),
      0
    );

  return (
    <a
      href={`/foreign-languages/lessons/${lesson.id}`}
      className="group block overflow-hidden rounded-2xl border bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
      style={{
        borderColor: `${visual.accent}45`,
      }}
    >
      <div
        className="h-2"
        style={{
          backgroundColor:
            visual.accent,
        }}
      />

      <div className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p
              className="text-[10px] font-bold uppercase tracking-[0.18em]"
              style={{
                color:
                  visual.accent,
              }}
            >
              {languageInfo.name}
            </p>

            <h4 className="mt-1 font-serif text-lg font-bold leading-tight text-[#082f52]">
              {lesson.title}
            </h4>

            {lesson.subtitle && (
              <p className="mt-1 text-xs font-semibold text-slate-500">
                {lesson.subtitle}
              </p>
            )}
          </div>

          <div
            className="flex min-h-10 min-w-10 items-center justify-center rounded-xl px-2 text-center font-serif text-[10px] font-bold"
            style={{
              backgroundColor:
                visual.light,
              color:
                visual.accent,
            }}
          >
            {visual.symbol}
          </div>
        </div>

        {(lesson.summary ||
          lesson.focus) && (
          <p className="mt-3 line-clamp-3 text-xs leading-relaxed text-slate-600">
            {lesson.summary ??
              lesson.focus}
          </p>
        )}

        {/* LEVELS */}

        {availableLevels.length >
          0 && (
          <div className="mt-4 flex flex-wrap gap-1.5">
            {availableLevels.map(
              (level) => (
                <span
                  key={level}
                  className="rounded-full bg-slate-100 px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider text-slate-500"
                >
                  {level ===
                  "middle-school"
                    ? "Middle School"
                    : level ===
                        "elementary"
                      ? "Elementary"
                      : "Advanced"}
                </span>
              )
            )}
          </div>
        )}

        {/* RESOURCE COUNT */}

        {resourceCount > 0 && (
          <div className="mt-2">
            <span className="rounded-full bg-[#f4e7c9] px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider text-[#7b5526]">
              {resourceCount}{" "}
              {resourceCount === 1
                ? "Resource"
                : "Resources"}
            </span>
          </div>
        )}

        {/* OPEN LESSON */}

        <div
          className="mt-4 flex items-center justify-between border-t pt-3 text-xs font-bold"
          style={{
            borderColor:
              `${visual.accent}20`,
            color:
              visual.accent,
          }}
        >
          <span>Open Lesson</span>

          <span className="transition group-hover:translate-x-1">
            →
          </span>
        </div>
      </div>
    </a>
  );
}

/* =========================================================
   DAY CARD
   ========================================================= */

function DayCard({
  day,
  week,
  selectedLanguages,
}: {
  day: (typeof DAYS)[number];
  week: number;
  selectedLanguages:
    ForeignLanguageSlug[];
}) {
  return (
    <article className="self-start overflow-hidden rounded-3xl border border-[#d8c8a7] bg-white shadow-sm">
      {/* DAY HEADER */}

      <div className="border-b border-[#d8c8a7] bg-[#082f52] px-4 py-5 text-center">
        <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#d8b878]">
          Week {week}
        </p>

        <h3 className="mt-1 font-serif text-2xl font-bold text-white">
          {day.name}
        </h3>

        <p className="mt-1 text-xs text-white/60">
          {selectedLanguages.length}{" "}
          {selectedLanguages.length === 1
            ? "Language"
            : "Languages"}
        </p>
      </div>

      {/* SELECTED LANGUAGES */}

      <div className="space-y-3 p-3">
        {selectedLanguages.map(
          (language) => (
            <LanguageLessonBlock
              key={language}
              language={language}
              week={week}
              day={day.slug}
            />
          )
        )}
      </div>
    </article>
  );
}

/* =========================================================
   WEEK DASHBOARD
   ========================================================= */

export default function WeekDashboard({
  week,
  selectedLanguages,
}: {
  week: number;
  selectedLanguages:
    ForeignLanguageSlug[];
}) {
  const selectedNames =
    selectedLanguages
      .map(
        (slug) =>
          FOREIGN_LANGUAGES.find(
            (language) =>
              language.slug === slug
          )?.name
      )
      .filter(Boolean);

  return (
    <>
      {/* ===============================================
          DASHBOARD HEADER
         =============================================== */}

      <section className="mx-auto max-w-[1280px] px-5 pt-8">
        <div className="flex flex-wrap items-end justify-between gap-4 border-b border-[#d8c8a7] pb-4">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#9b6a2e]">
              Semester 1
            </p>

            <h2 className="mt-1 font-serif text-2xl font-bold text-[#082f52]">
              Week {week} Language Schedule
            </h2>

            <p className="mt-2 text-xs text-slate-500">
              Showing{" "}
              <span className="font-bold text-[#082f52]">
                {selectedNames.join(
                  " • "
                )}
              </span>
            </p>
          </div>

          <div className="text-right">
            <p className="text-sm font-semibold text-slate-500">
              Monday – Friday
            </p>

            <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.16em] text-[#9b6a2e]">
              {selectedLanguages.length}{" "}
              {selectedLanguages.length ===
              1
                ? "Language Selected"
                : "Languages Selected"}
            </p>
          </div>
        </div>
      </section>

      {/* ===============================================
          MONDAY – FRIDAY
         =============================================== */}

      <section className="mx-auto max-w-[1280px] px-5 py-7">
        <div className="grid items-start gap-5 md:grid-cols-2 xl:grid-cols-5">
          {DAYS.map((day) => (
            <DayCard
              key={day.slug}
              day={day}
              week={week}
              selectedLanguages={
                selectedLanguages
              }
            />
          ))}
        </div>
      </section>
    </>
  );
}
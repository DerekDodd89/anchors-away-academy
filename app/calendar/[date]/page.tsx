import AcademyHeader from "@/components/home/AcademyHeader";
import AcademyFooter from "@/components/home/AcademyFooter";

import {
  getAcademyDay,
  type DailySubject,
} from "@/lib/academyCalendar";

import { notFound } from "next/navigation";

type PageProps = {
  params: Promise<{
    date: string;
  }>;
};

/* =========================================================
   SUBJECT DISPLAY INFORMATION

   Keeps the daily cards visually related to the normal
   homepage subject cards.
   ========================================================= */

const subjectStyles: Record<
  string,
  {
    accent: string;
    light: string;
    label: string;
  }
> = {
  bible: {
    accent: "#9b6a2e",
    light: "#f8f0df",
    label: "Bible",
  },

  history: {
    accent: "#8a5a3b",
    light: "#f5ece5",
    label: "History",
  },

  science: {
    accent: "#486b58",
    light: "#edf3ef",
    label: "Science",
  },

  "foreign-languages": {
    accent: "#765783",
    light: "#f3edf5",
    label: "Foreign Languages",
  },

  art: {
    accent: "#9a6656",
    light: "#f7efec",
    label: "Art",
  },

  "language-arts": {
    accent: "#7b5364",
    light: "#f5edf1",
    label: "Language Arts",
  },

  math: {
    accent: "#49677b",
    light: "#edf2f5",
    label: "Math",
  },

  pe: {
    accent: "#56704a",
    light: "#f0f4ed",
    label: "P.E.",
  },
};


/* =========================================================
   DATE HELPERS
   ========================================================= */

function isValidDateString(
  dateString: string
) {
  if (
    !/^\d{4}-\d{2}-\d{2}$/.test(
      dateString
    )
  ) {
    return false;
  }

  const [
    year,
    month,
    day,
  ] = dateString
    .split("-")
    .map(Number);

  const date = new Date(
    Date.UTC(
      year,
      month - 1,
      day
    )
  );

  return (
    date.getUTCFullYear() ===
      year &&
    date.getUTCMonth() ===
      month - 1 &&
    date.getUTCDate() ===
      day
  );
}


function changeDate(
  dateString: string,
  amount: number
) {
  const [
    year,
    month,
    day,
  ] = dateString
    .split("-")
    .map(Number);

  const date = new Date(
    Date.UTC(
      year,
      month - 1,
      day
    )
  );

  date.setUTCDate(
    date.getUTCDate() +
      amount
  );

  const nextYear =
    date.getUTCFullYear();

  const nextMonth =
    String(
      date.getUTCMonth() + 1
    ).padStart(2, "0");

  const nextDay =
    String(
      date.getUTCDate()
    ).padStart(2, "0");

  return `${nextYear}-${nextMonth}-${nextDay}`;
}


/* =========================================================
   RESOURCE ROUTE

   Each subject uses the same general resource URL pattern.
   ========================================================= */

function getResourceHref(
  subject: DailySubject,
  file: string
) {
  if (!subject.lessonId) {
    return "#";
  }

  return `/${subject.slug}/resources/${subject.lessonId}/${encodeURIComponent(
    file
  )}`;
}


/* =========================================================
   DAILY SUBJECT CARD
   ========================================================= */

function DailySubjectCard({
  subject,
}: {
  subject: DailySubject;
}) {
  const style =
    subjectStyles[
      subject.slug
    ] ?? {
      accent: "#082f52",
      light: "#f4f1e9",
      label: subject.name,
    };

  return (
    <article className="flex min-h-[520px] flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-md">

      {/* SUBJECT HEADER */}

      <div
        className="px-5 py-4 text-center text-white"
        style={{
          backgroundColor:
            style.accent,
        }}
      >
        <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-white/75">
          Today&apos;s Class
        </p>

        <h2 className="mt-1 font-serif text-2xl font-bold">
          {style.label}
        </h2>
      </div>

      {/* SUBJECT ARTWORK */}

      <div
        className="relative h-[175px] border-b border-slate-100 bg-cover bg-center"
        style={{
          backgroundImage: `url('${subject.image}')`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/5 to-transparent" />

        <div className="absolute bottom-4 left-4 right-4">
          <span className="inline-block rounded-full bg-white/95 px-3 py-1 text-[10px] font-bold uppercase tracking-wider shadow-sm"
            style={{
              color:
                style.accent,
            }}
          >
            Anchors Away
          </span>
        </div>
      </div>

      {subject.published ? (
        <div className="flex flex-1 flex-col p-5">

          {/* PUBLISHED LESSON */}

          <div>
            <span
              className="inline-block rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider"
              style={{
                backgroundColor:
                  style.light,
                color:
                  style.accent,
              }}
            >
              Today&apos;s Lesson
            </span>

            <h3 className="mt-3 font-serif text-xl font-bold leading-tight text-[#082f52]">
              {subject.title}
            </h3>

            {subject.subtitle && (
              <p className="mt-1 text-sm italic leading-relaxed text-slate-500">
                {subject.subtitle}
              </p>
            )}

            {subject.summary && (
              <p className="mt-4 text-sm leading-relaxed text-slate-700">
                {subject.summary}
              </p>
            )}

            {/* MATERIALS */}

            <div className="mt-5">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <p
                  className="text-xs font-bold uppercase tracking-[0.18em]"
                  style={{
                    color:
                      style.accent,
                  }}
                >
                  Materials
                </p>

                <span
                  className="rounded-full px-2.5 py-1 text-xs font-bold"
                  style={{
                    backgroundColor:
                      style.light,
                    color:
                      style.accent,
                  }}
                >
                  {
                    subject.resourceCount
                  }
                </span>
              </div>

              {subject.resources.length >
              0 ? (
                <div className="mt-3 space-y-2">
                  {subject.resources
                    .slice(0, 4)
                    .map(
                      (
                        resource,
                        index
                      ) => (
                        <a
                          key={`${resource.file}-${index}`}
                          href={getResourceHref(
                            subject,
                            resource.file
                          )}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center gap-3 rounded-xl border border-slate-200 bg-[#faf9f6] px-3 py-2.5 text-sm font-semibold text-[#082f52] transition hover:border-[#9b6a2e]"
                        >
                          <span
                            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-white"
                            style={{
                              backgroundColor:
                                style.accent,
                            }}
                          >
                            ↓
                          </span>

                          <span className="min-w-0 flex-1">
                            {
                              resource.title
                            }
                          </span>
                        </a>
                      )
                    )}

                  {subject.resources
                    .length > 4 && (
                    <p className="pt-1 text-center text-xs font-semibold text-slate-400">
                      +
                      {subject.resources
                        .length -
                        4}{" "}
                      more material
                      {subject.resources
                        .length -
                        4 ===
                      1
                        ? ""
                        : "s"}{" "}
                      in the lesson
                    </p>
                  )}
                </div>
              ) : (
                <p className="mt-3 text-sm italic text-slate-400">
                  No printable
                  materials attached
                  today.
                </p>
              )}
            </div>
          </div>

          {/* OPEN LESSON */}

          <div className="mt-auto pt-6">
            <a
              href={subject.href}
              className="block w-full rounded-xl px-4 py-3 text-center text-sm font-bold text-white shadow-sm transition hover:opacity-90"
              style={{
                backgroundColor:
                  style.accent,
              }}
            >
              Open Today&apos;s{" "}
              {style.label} Lesson →
            </a>
          </div>
        </div>
      ) : (
        /* NO LESSON */

        <div className="flex flex-1 flex-col p-5">
          <div>
            <span className="inline-block rounded-full bg-slate-100 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-500">
              No Lesson
            </span>

            <h3 className="mt-3 font-serif text-xl font-bold text-[#082f52]">
              Nothing Scheduled
            </h3>

            <p className="mt-2 text-sm leading-relaxed text-slate-500">
              There is no published{" "}
              {style.label} lesson
              scheduled for this day.
            </p>

            <div
              className="mt-5 rounded-2xl border p-4"
              style={{
                borderColor: `${style.accent}30`,
                backgroundColor:
                  style.light,
              }}
            >
              <p
                className="text-xs font-bold uppercase tracking-[0.18em]"
                style={{
                  color:
                    style.accent,
                }}
              >
                {style.label}
              </p>

              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                The subject remains
                visible so the daily
                Academy layout stays
                consistent.
              </p>
            </div>
          </div>

          <div className="mt-auto pt-6">
            <a
              href={`/${subject.slug}`}
              className="block w-full rounded-xl border px-4 py-3 text-center text-sm font-bold transition hover:bg-white"
              style={{
                borderColor:
                  style.accent,
                color:
                  style.accent,
              }}
            >
              Open {style.label} →
            </a>
          </div>
        </div>
      )}
    </article>
  );
}


/* =========================================================
   DAILY ACADEMY PAGE
   ========================================================= */

export default async function CalendarDayPage({
  params,
}: PageProps) {
  const {
    date,
  } = await params;

  if (
    !isValidDateString(date)
  ) {
    notFound();
  }

  const academyDay =
    getAcademyDay(date);

  const previousDate =
    changeDate(date, -1);

  const nextDate =
    changeDate(date, 1);

  return (
    <main className="min-h-screen bg-[#f4f1e9] text-slate-900">
      <AcademyHeader />

      {/* DAILY HERO */}

      <section className="border-b border-[#d8c8a7] bg-gradient-to-b from-[#fffdf8] to-[#f4f1e9]">
        <div className="mx-auto max-w-[1280px] px-5 py-10 text-center sm:py-14">

          <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#9b6a2e]">
            Anchors Away
            Homeschool Academy
          </p>

          <h1 className="mt-3 font-serif text-4xl font-bold text-[#082f52] sm:text-5xl">
            {academyDay.dayName}
          </h1>

          <p className="mt-2 font-serif text-2xl text-[#0b4a73]">
            {
              academyDay.displayDate
            }
          </p>

          {academyDay.isWithinSemester &&
          academyDay.week ? (
            <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
              <span className="rounded-full border border-[#d8c8a7] bg-white px-4 py-2 text-xs font-bold uppercase tracking-wider text-[#082f52]">
                Semester{" "}
                {
                  academyDay.semester
                }
              </span>

              <span className="rounded-full border border-[#d8c8a7] bg-white px-4 py-2 text-xs font-bold uppercase tracking-wider text-[#082f52]">
                Week{" "}
                {academyDay.week}
              </span>

              <span className="rounded-full border border-[#d8c8a7] bg-white px-4 py-2 text-xs font-bold uppercase tracking-wider text-[#082f52]">
                {
                  academyDay.publishedSubjectCount
                }{" "}
                Classes
              </span>

              <span className="rounded-full border border-[#d8c8a7] bg-white px-4 py-2 text-xs font-bold uppercase tracking-wider text-[#082f52]">
                {
                  academyDay.resourceCount
                }{" "}
                Materials
              </span>
            </div>
          ) : (
            <p className="mt-5 text-sm font-semibold text-slate-500">
              This date is outside
              the current semester
              schedule.
            </p>
          )}

          <p className="mt-6 font-serif text-xl italic text-[#9b6a2e]">
            Today&apos;s School
          </p>
        </div>
      </section>

      {/* DATE NAVIGATION */}

      <section className="border-b border-[#d8c8a7] bg-white/70">
        <div className="mx-auto flex max-w-[1280px] flex-wrap items-center justify-between gap-3 px-5 py-4">

          <a
            href={`/calendar/${previousDate}`}
            className="rounded-xl border border-[#d8c8a7] bg-white px-4 py-2.5 text-sm font-bold text-[#082f52] transition hover:border-[#9b6a2e]"
          >
            ← Previous Day
          </a>

          <a
            href="/"
            className="rounded-xl bg-[#082f52] px-5 py-2.5 text-sm font-bold text-white transition hover:bg-[#0b4a73]"
          >
            📅 Choose Another Date
          </a>

          <a
            href={`/calendar/${nextDate}`}
            className="rounded-xl border border-[#d8c8a7] bg-white px-4 py-2.5 text-sm font-bold text-[#082f52] transition hover:border-[#9b6a2e]"
          >
            Next Day →
          </a>
        </div>
      </section>

      {/* DAILY SUBJECT GRID */}

      <section className="mx-auto max-w-[1280px] px-5 py-10">

        <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#9b6a2e]">
              Daily Dashboard
            </p>

            <h2 className="mt-1 font-serif text-3xl font-bold text-[#082f52]">
              Today&apos;s Classes
            </h2>
          </div>

          <p className="text-sm font-semibold text-slate-500">
            Select a subject to
            begin today&apos;s work.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {academyDay.subjects.map(
            (subject) => (
              <DailySubjectCard
                key={subject.slug}
                subject={subject}
              />
            )
          )}
        </div>
      </section>

      <AcademyFooter />
    </main>
  );
}
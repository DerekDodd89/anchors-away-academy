import type { LanguageArtsLesson } from "@/lib/languageArtsLessons";

type WeekDashboardProps = {
  selectedWeek: number;
  lessons: (LanguageArtsLesson | null)[];
};

const days = [
  {
    name: "Monday",
    accent: "#7a4f72",
    light: "#f5eaf2",
  },
  {
    name: "Tuesday",
    accent: "#86577d",
    light: "#f7edf4",
  },
  {
    name: "Wednesday",
    accent: "#684660",
    light: "#f1e7ef",
  },
  {
    name: "Thursday",
    accent: "#8b6684",
    light: "#f7eff5",
  },
  {
    name: "Friday",
    accent: "#76506f",
    light: "#f3e9f1",
  },
];

function countResources(
  lesson: LanguageArtsLesson
) {
  const resources = lesson.resources;

  if (!resources) {
    return 0;
  }

  return (
    (resources.reading?.length ?? 0) +
    (resources.grammar?.length ?? 0) +
    (resources.writing?.length ?? 0) +
    (resources.spelling?.length ?? 0) +
    (resources.vocabulary?.length ?? 0) +
    (resources.handwriting?.length ?? 0) +
    (resources.teacher?.length ?? 0)
  );
}

export default function WeekDashboard({
  selectedWeek,
  lessons,
}: WeekDashboardProps) {
  return (
    <section className="mt-8">

      {/* DASHBOARD HEADING */}
      <div className="mb-4 flex items-end justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#7a4f72]">
            Semester 1
          </p>

          <h2 className="mt-1 font-serif text-3xl font-bold text-[#082f52]">
            Week {selectedWeek}
          </h2>
        </div>

        <p className="text-sm font-medium text-slate-500">
          Monday – Friday
        </p>
      </div>

      {/* FIVE-DAY DASHBOARD */}
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        {days.map((day, index) => {
          const lesson = lessons[index];

          const resourceCount = lesson
            ? countResources(lesson)
            : 0;

          return (
            <article
              key={day.name}
              className="flex min-h-[510px] flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-md"
            >
              {/* DAY HEADER */}
              <div
                className="px-4 py-3 text-center text-white"
                style={{
                  backgroundColor: day.accent,
                }}
              >
                <h3 className="font-serif text-xl font-bold uppercase">
                  {day.name}
                </h3>

                <p className="text-xs font-semibold">
                  Week {selectedWeek}
                </p>
              </div>

              {/* LANGUAGE ARTS ARTWORK */}
              <div
                className="relative h-[130px] border-b border-slate-100 bg-cover bg-center"
                style={{
                  backgroundImage:
                    "url('/images/subjects/language-arts.png')",
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />

                <div className="absolute bottom-3 left-3">
                  <span className="rounded-full bg-white/95 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#684660] shadow">
                    Language Arts
                  </span>
                </div>
              </div>

              {lesson ? (
                /* PUBLISHED LESSON */
                <div className="flex flex-1 flex-col p-5">
                  <div>
                    <span
                      className="inline-block rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider"
                      style={{
                        backgroundColor: day.light,
                        color: day.accent,
                      }}
                    >
                      Published
                    </span>

                    <h4 className="mt-3 font-serif text-xl font-bold leading-tight text-[#082f52]">
                      {lesson.title}
                    </h4>

                    <p className="mt-1 text-sm italic leading-relaxed text-slate-500">
                      {lesson.subtitle}
                    </p>

                    <div className="mt-4 space-y-2 text-sm leading-relaxed text-slate-700">
                      {lesson.literature && (
                        <p>
                          <strong>Literature:</strong>{" "}
                          {lesson.literature}
                        </p>
                      )}

                      {lesson.reading && (
                        <p>
                          <strong>Reading:</strong>{" "}
                          {lesson.reading}
                        </p>
                      )}

                      {lesson.grammar && (
                        <p>
                          <strong>Grammar:</strong>{" "}
                          {lesson.grammar}
                        </p>
                      )}

                      {lesson.writing && (
                        <p>
                          <strong>Writing:</strong>{" "}
                          {lesson.writing}
                        </p>
                      )}

                      {lesson.spelling && (
                        <p>
                          <strong>Spelling:</strong>{" "}
                          {lesson.spelling}
                        </p>
                      )}

                      {lesson.vocabulary && (
                        <p>
                          <strong>Vocabulary:</strong>{" "}
                          {lesson.vocabulary}
                        </p>
                      )}

                      {lesson.handwriting && (
                        <p>
                          <strong>Handwriting:</strong>{" "}
                          {lesson.handwriting}
                        </p>
                      )}

                      {lesson.skillFocus && (
                        <p>
                          <strong>Skill Focus:</strong>{" "}
                          {lesson.skillFocus}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* PUBLISHED CARD FOOTER */}
                  <div className="mt-auto pt-5">
                    <div className="mb-3 flex items-center justify-between border-t border-slate-100 pt-4 text-xs">
                      <span className="font-semibold text-slate-500">
                        Resources
                      </span>

                      <span
                        className="rounded-full px-2.5 py-1 font-bold"
                        style={{
                          backgroundColor: day.light,
                          color: day.accent,
                        }}
                      >
                        {resourceCount}
                      </span>
                    </div>

                    <a
                      href={`/language-arts/lessons/${lesson.id}`}
                      className="block w-full rounded-lg px-4 py-3 text-center text-sm font-bold text-white shadow-sm transition hover:opacity-90"
                      style={{
                        backgroundColor: day.accent,
                      }}
                    >
                      Open Lesson →
                    </a>
                  </div>
                </div>
              ) : (
                /* UNPUBLISHED LESSON */
                <div className="flex flex-1 flex-col p-5">
                  <div>
                    <span className="inline-block rounded-full bg-slate-100 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-500">
                      Not Published
                    </span>

                    <h4 className="mt-3 font-serif text-xl font-bold text-[#082f52]">
                      Lesson Coming Soon
                    </h4>

                    <p className="mt-2 text-sm leading-relaxed text-slate-500">
                      No Language Arts lesson has been
                      published for this day yet.
                    </p>

                    <div
                      className="mt-5 rounded-xl border p-4"
                      style={{
                        borderColor: `${day.accent}30`,
                        backgroundColor: day.light,
                      }}
                    >
                      <p
                        className="text-xs font-bold uppercase tracking-wider"
                        style={{
                          color: day.accent,
                        }}
                      >
                        Language Arts
                      </p>

                      <ul className="mt-3 space-y-2 text-sm text-slate-600">
                        <li>
                          • Reading &amp; Literature
                        </li>
                        <li>
                          • Grammar &amp; Vocabulary
                        </li>
                        <li>
                          • Writing &amp; Composition
                        </li>
                        <li>
                          • Spelling &amp; Handwriting
                        </li>
                        <li>
                          • Student &amp; Teacher Resources
                        </li>
                      </ul>
                    </div>
                  </div>

                  {/* UNPUBLISHED CARD FOOTER */}
                  <div className="mt-auto border-t border-slate-100 pt-4 text-center text-xs font-semibold text-slate-400">
                    No resources yet
                  </div>
                </div>
              )}
            </article>
          );
        })}
      </div>
    </section>
  );
}
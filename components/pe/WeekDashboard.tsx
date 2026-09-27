import type { PELesson } from "@/lib/peLessons";

type WeekDashboardProps = {
  selectedWeek: number;
  lessons: (PELesson | null)[];
};

const days = [
  {
    name: "Monday",
    accent: "#56704a",
    light: "#f2f5ed",
  },
  {
    name: "Tuesday",
    accent: "#657d59",
    light: "#f3f6ef",
  },
  {
    name: "Wednesday",
    accent: "#48613e",
    light: "#edf2e9",
  },
  {
    name: "Thursday",
    accent: "#718665",
    light: "#f4f7f1",
  },
  {
    name: "Friday",
    accent: "#526b47",
    light: "#eff4eb",
  },
];

function countResources(
  lesson: PELesson
) {
  const resources =
    lesson.resources;

  if (!resources) {
    return 0;
  }

  return (
    (resources.student?.length ?? 0) +
    (resources.activities?.length ?? 0) +
    (resources.fitness?.length ?? 0) +
    (resources.games?.length ?? 0) +
    (resources.assessments?.length ?? 0) +
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
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#56704a]">
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
        {days.map(
          (day, index) => {
            const lesson =
              lessons[index];

            const resourceCount =
              lesson
                ? countResources(
                    lesson
                  )
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
                    backgroundColor:
                      day.accent,
                  }}
                >
                  <h3 className="font-serif text-xl font-bold uppercase">
                    {day.name}
                  </h3>

                  <p className="text-xs font-semibold">
                    Week{" "}
                    {selectedWeek}
                  </p>
                </div>

                {/* P.E. ARTWORK */}
                <div
                  className="relative h-[130px] border-b border-slate-100 bg-cover bg-center"
                  style={{
                    backgroundImage:
                      "url('/images/subjects/pe.png')",
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />

                  <div className="absolute bottom-3 left-3">
                    <span className="rounded-full bg-white/95 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#48613e] shadow">
                      Physical Education
                    </span>
                  </div>
                </div>

                {lesson ? (
                  /* PUBLISHED */
                  <div className="flex flex-1 flex-col p-5">
                    <div>
                      <span
                        className="inline-block rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider"
                        style={{
                          backgroundColor:
                            day.light,
                          color:
                            day.accent,
                        }}
                      >
                        Published
                      </span>

                      <h4 className="mt-3 font-serif text-xl font-bold leading-tight text-[#082f52]">
                        {lesson.title}
                      </h4>

                      <p className="mt-1 text-sm italic leading-relaxed text-slate-500">
                        {
                          lesson.subtitle
                        }
                      </p>

                      {/* LESSON INFORMATION */}
                      <div className="mt-4 space-y-2 text-sm leading-relaxed text-slate-700">
                        {lesson.activity && (
                          <p>
                            <strong>
                              Activity:
                            </strong>{" "}
                            {
                              lesson.activity
                            }
                          </p>
                        )}

                        {lesson.skillFocus && (
                          <p>
                            <strong>
                              Skill:
                            </strong>{" "}
                            {
                              lesson.skillFocus
                            }
                          </p>
                        )}

                        {lesson.fitnessFocus && (
                          <p>
                            <strong>
                              Fitness:
                            </strong>{" "}
                            {
                              lesson.fitnessFocus
                            }
                          </p>
                        )}

                        {lesson.workout && (
                          <p>
                            <strong>
                              Workout:
                            </strong>{" "}
                            {
                              lesson.workout
                            }
                          </p>
                        )}

                        {lesson.game && (
                          <p>
                            <strong>
                              Game:
                            </strong>{" "}
                            {lesson.game}
                          </p>
                        )}

                        {lesson.duration && (
                          <p>
                            <strong>
                              Duration:
                            </strong>{" "}
                            {
                              lesson.duration
                            }
                          </p>
                        )}

                        {lesson.equipment && (
                          <p>
                            <strong>
                              Equipment:
                            </strong>{" "}
                            {
                              lesson.equipment
                            }
                          </p>
                        )}
                      </div>

                      {/* STUDENT MODIFICATIONS */}
                      {lesson.studentModifications &&
                        lesson
                          .studentModifications
                          .length >
                          0 && (
                          <div
                            className="mt-4 rounded-xl border p-3"
                            style={{
                              borderColor:
                                `${day.accent}30`,
                              backgroundColor:
                                day.light,
                            }}
                          >
                            <p
                              className="text-[10px] font-bold uppercase tracking-[0.18em]"
                              style={{
                                color:
                                  day.accent,
                              }}
                            >
                              Student
                              Modifications
                            </p>

                            <div className="mt-2 space-y-3">
                              {lesson.studentModifications.map(
                                (
                                  modification
                                ) => (
                                  <div
                                    key={`${modification.student}-${modification.modification}`}
                                  >
                                    <p className="text-sm font-bold text-[#082f52]">
                                      {
                                        modification.student
                                      }
                                    </p>

                                    <p className="text-xs leading-relaxed text-slate-600">
                                      {
                                        modification.modification
                                      }
                                    </p>
                                  </div>
                                )
                              )}
                            </div>
                          </div>
                        )}
                    </div>

                    {/* CARD FOOTER */}
                    <div className="mt-auto pt-5">
                      <div className="mb-3 flex items-center justify-between border-t border-slate-100 pt-4 text-xs">
                        <span className="font-semibold text-slate-500">
                          Resources
                        </span>

                        <span
                          className="rounded-full px-2.5 py-1 font-bold"
                          style={{
                            backgroundColor:
                              day.light,
                            color:
                              day.accent,
                          }}
                        >
                          {
                            resourceCount
                          }
                        </span>
                      </div>

                      <a
                        href={`/pe/lessons/${lesson.id}`}
                        className="block w-full rounded-lg px-4 py-3 text-center text-sm font-bold text-white shadow-sm transition hover:opacity-90"
                        style={{
                          backgroundColor:
                            day.accent,
                        }}
                      >
                        Open Lesson →
                      </a>
                    </div>
                  </div>
                ) : (
                  /* UNPUBLISHED */
                  <div className="flex flex-1 flex-col p-5">
                    <div>
                      <span className="inline-block rounded-full bg-slate-100 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-500">
                        Not Published
                      </span>

                      <h4 className="mt-3 font-serif text-xl font-bold text-[#082f52]">
                        Activity Coming
                        Soon
                      </h4>

                      <p className="mt-2 text-sm leading-relaxed text-slate-500">
                        No P.E. lesson
                        has been
                        published for
                        this day yet.
                      </p>

                      <div
                        className="mt-5 rounded-xl border p-4"
                        style={{
                          borderColor:
                            `${day.accent}30`,
                          backgroundColor:
                            day.light,
                        }}
                      >
                        <p
                          className="text-xs font-bold uppercase tracking-wider"
                          style={{
                            color:
                              day.accent,
                          }}
                        >
                          Physical
                          Education
                        </p>

                        <ul className="mt-3 space-y-2 text-sm text-slate-600">
                          <li>
                            • Warm-Up
                          </li>
                          <li>
                            • Skill Focus
                          </li>
                          <li>
                            • Workout or
                            Game
                          </li>
                          <li>
                            • Fitness
                            Focus
                          </li>
                          <li>
                            • Cool-Down
                          </li>
                        </ul>
                      </div>
                    </div>

                    <div className="mt-auto border-t border-slate-100 pt-4 text-center text-xs font-semibold text-slate-400">
                      No resources yet
                    </div>
                  </div>
                )}
              </article>
            );
          }
        )}
      </div>
    </section>
  );
}
import type { MathLesson } from "@/lib/mathLessons";

type WeekDashboardProps = {
  selectedWeek: number;
  lessons: (MathLesson | null)[];
};

const days = [
  {
    name: "Monday",
    accent: "#426a7d",
    light: "#edf5f8",
  },
  {
    name: "Tuesday",
    accent: "#4f7485",
    light: "#eff6f8",
  },
  {
    name: "Wednesday",
    accent: "#31586b",
    light: "#e9f1f4",
  },
  {
    name: "Thursday",
    accent: "#587b8b",
    light: "#f0f6f8",
  },
  {
    name: "Friday",
    accent: "#3b6275",
    light: "#ebf3f6",
  },
];

function countResources(
  lesson: MathLesson
) {
  const resources = lesson.resources;

  if (!resources) {
    return 0;
  }

  return (
    (resources.elementary?.length ?? 0) +
    (resources.middleSchool?.length ?? 0) +
    (resources.practice?.length ?? 0) +
    (resources.activities?.length ?? 0) +
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
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#426a7d]">
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

              {/* MATH ARTWORK */}
              <div
                className="relative h-[130px] border-b border-slate-100 bg-cover bg-center"
                style={{
                  backgroundImage:
                    "url('/images/subjects/math.png')",
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />

                <div className="absolute bottom-3 left-3">
                  <span className="rounded-full bg-white/95 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#31586b] shadow">
                    Math
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

                    {/* MATH LESSON INFORMATION */}
                    <div className="mt-4 space-y-2 text-sm leading-relaxed text-slate-700">
                      {lesson.concept && (
                        <p>
                          <strong>Concept:</strong>{" "}
                          {lesson.concept}
                        </p>
                      )}

                      {lesson.skill && (
                        <p>
                          <strong>Skill:</strong>{" "}
                          {lesson.skill}
                        </p>
                      )}

                      {lesson.review && (
                        <p>
                          <strong>Review:</strong>{" "}
                          {lesson.review}
                        </p>
                      )}

                      {lesson.practice && (
                        <p>
                          <strong>Practice:</strong>{" "}
                          {lesson.practice}
                        </p>
                      )}

                      {lesson.application && (
                        <p>
                          <strong>Application:</strong>{" "}
                          {lesson.application}
                        </p>
                      )}

                      {lesson.challenge && (
                        <p>
                          <strong>Challenge:</strong>{" "}
                          {lesson.challenge}
                        </p>
                      )}
                    </div>

                    {/* STUDENT ASSIGNMENTS */}
                    {lesson.studentAssignments &&
                      lesson.studentAssignments.length > 0 && (
                        <div
                          className="mt-4 rounded-xl border p-3"
                          style={{
                            borderColor: `${day.accent}30`,
                            backgroundColor: day.light,
                          }}
                        >
                          <p
                            className="text-[10px] font-bold uppercase tracking-[0.18em]"
                            style={{
                              color: day.accent,
                            }}
                          >
                            Student Assignments
                          </p>

                          <div className="mt-2 space-y-3">
                            {lesson.studentAssignments.map(
                              (assignment) => (
                                <div
                                  key={`${assignment.student}-${assignment.assignment}`}
                                >
                                  <p className="text-sm font-bold text-[#082f52]">
                                    {assignment.student}

                                    {assignment.level && (
                                      <span className="ml-1 font-normal text-slate-500">
                                        ({assignment.level})
                                      </span>
                                    )}
                                  </p>

                                  <p className="text-xs leading-relaxed text-slate-600">
                                    {assignment.assignment}
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
                          backgroundColor: day.light,
                          color: day.accent,
                        }}
                      >
                        {resourceCount}
                      </span>
                    </div>

                    <a
                      href={`/math/lessons/${lesson.id}`}
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
                /* UNPUBLISHED */
                <div className="flex flex-1 flex-col p-5">
                  <div>
                    <span className="inline-block rounded-full bg-slate-100 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-500">
                      Not Published
                    </span>

                    <h4 className="mt-3 font-serif text-xl font-bold text-[#082f52]">
                      Lesson Coming Soon
                    </h4>

                    <p className="mt-2 text-sm leading-relaxed text-slate-500">
                      No Math lesson has been published
                      for this day yet.
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
                        Math
                      </p>

                      <ul className="mt-3 space-y-2 text-sm text-slate-600">
                        <li>• Concept &amp; Skill</li>
                        <li>• Review &amp; Practice</li>
                        <li>• Application &amp; Challenge</li>
                        <li>• Student Assignments</li>
                        <li>• Worksheets &amp; Resources</li>
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
        })}
      </div>
    </section>
  );
}
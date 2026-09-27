import Link from "next/link";

import type {
  ScienceLesson,
} from "@/lib/scienceLessons";

type WeekDashboardProps = {
  selectedWeek: number;
  lessons: (ScienceLesson | null)[];
};

const days = [
  {
    name: "MONDAY",
    slug: "monday",
    color: "bg-[#39705a]",
  },
  {
    name: "TUESDAY",
    slug: "tuesday",
    color: "bg-[#39705a]",
  },
  {
    name: "WEDNESDAY",
    slug: "wednesday",
    color: "bg-[#27623b]",
  },
  {
    name: "THURSDAY",
    slug: "thursday",
    color: "bg-[#39705a]",
  },
  {
    name: "FRIDAY",
    slug: "friday",
    color: "bg-[#315d4c]",
  },
];

function getResourceCount(
  lesson: ScienceLesson
): number {
  if (!lesson.resources) {
    return 0;
  }

  const elementary =
    lesson.resources.elementary?.length ?? 0;

  const middleSchool =
    lesson.resources.middleSchool?.length ?? 0;

  const teacher =
    lesson.resources.teacher?.length ?? 0;

  const experiments =
    lesson.resources.experiments?.length ?? 0;

  const journal =
    lesson.resources.journal?.length ?? 0;

  return (
    elementary +
    middleSchool +
    teacher +
    experiments +
    journal
  );
}

export default function WeekDashboard({
  selectedWeek,
  lessons,
}: WeekDashboardProps) {
  return (
    <div>
      {/* Week Heading */}
      <div className="mt-8 flex items-end justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#39705a]">
            Semester 1
          </p>

          <h2 className="font-serif text-3xl font-bold text-[#082f52]">
            Week {selectedWeek}
          </h2>
        </div>

        <p className="text-sm text-slate-500">
          Monday – Friday
        </p>
      </div>

      {/* Daily Cards */}
      <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        {days.map((day, index) => {
          const lesson = lessons[index];

          const resourceCount = lesson
            ? getResourceCount(lesson)
            : 0;

          return (
            <article
              key={`${selectedWeek}-${day.slug}`}
              className="flex min-h-[510px] flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-md"
            >
              {/* Day Header */}
              <header
                className={`${day.color} px-4 py-3 text-center text-white`}
              >
                <h3 className="font-serif text-xl font-bold">
                  {day.name}
                </h3>

                <p className="text-xs text-white/85">
                  {lesson
                    ? lesson.date
                    : `Week ${selectedWeek}`}
                </p>
              </header>

              {/* Science Image */}
              <div
                className="h-32 bg-cover bg-center"
                style={{
                  backgroundImage:
                    "url('/images/subjects/science.png')",
                }}
              />

              {/* Card Body */}
              <div className="flex flex-1 flex-col p-5">
                {lesson ? (
                  <>
                    {/* Published Lesson */}
                    <h4 className="font-serif text-2xl font-bold text-[#082f52]">
                      {lesson.title}
                    </h4>

                    {lesson.subtitle && (
                      <p className="mt-1 font-serif text-lg italic text-slate-600">
                        {lesson.subtitle}
                      </p>
                    )}

                    <div className="my-4 border-t border-slate-200" />

                    <div className="flex-1 space-y-3 text-sm leading-relaxed text-slate-700">
                      {lesson.course && (
                        <p>
                          <span className="font-semibold text-[#39705a]">
                            Course:
                          </span>{" "}
                          {lesson.course}
                        </p>
                      )}

                      {lesson.lessonNumber && (
                        <p>
                          <span className="font-semibold text-[#39705a]">
                            Lesson:
                          </span>{" "}
                          {lesson.lessonNumber}
                        </p>
                      )}

                      {lesson.unit && (
                        <p>
                          <span className="font-semibold text-[#39705a]">
                            Unit:
                          </span>{" "}
                          {lesson.unit}
                        </p>
                      )}

                      {lesson.field && (
                        <p>
                          <span className="font-semibold text-[#39705a]">
                            Field:
                          </span>{" "}
                          {lesson.field}
                        </p>
                      )}

                      {lesson.topic && (
                        <p>
                          <span className="font-semibold text-[#39705a]">
                            Topic:
                          </span>{" "}
                          {lesson.topic}
                        </p>
                      )}

                      {lesson.bigIdea && (
                        <p>
                          <span className="font-semibold text-[#39705a]">
                            Big Idea:
                          </span>{" "}
                          {lesson.bigIdea}
                        </p>
                      )}

                      {lesson.question && (
                        <p>
                          <span className="font-semibold text-[#39705a]">
                            Question:
                          </span>{" "}
                          {lesson.question}
                        </p>
                      )}
                    </div>

                    {/* Open Published Lesson */}
                    <Link
                      href={`/science/lessons/${lesson.id}`}
                      className={`mt-5 block w-full rounded-lg ${day.color} px-4 py-3 text-center font-semibold text-white transition hover:opacity-90`}
                    >
                      <span className="block">
                        Open Lesson →
                      </span>

                      <span className="text-xs font-normal text-white/80">
                        {resourceCount > 0
                          ? `${resourceCount} ${
                              resourceCount === 1
                                ? "Resource"
                                : "Resources"
                            }`
                          : "Lesson Overview"}
                      </span>
                    </Link>
                  </>
                ) : (
                  <>
                    {/* Unpublished Lesson */}
                    <h4 className="font-serif text-2xl font-bold text-[#082f52]">
                      Lesson Coming Soon
                    </h4>

                    <p className="mt-1 font-serif text-lg italic text-slate-600">
                      Science
                    </p>

                    <div className="my-4 border-t border-slate-200" />

                    <ul className="flex-1 space-y-3 text-sm leading-relaxed text-slate-700">
                      <li className="flex gap-2">
                        <span className="text-[#39705a]">
                          •
                        </span>

                        <span>
                          {day.name.charAt(0) +
                            day.name
                              .slice(1)
                              .toLowerCase()}{" "}
                          lesson package
                        </span>
                      </li>

                      <li className="flex gap-2">
                        <span className="text-[#39705a]">
                          •
                        </span>

                        <span>
                          Student resources will appear here
                        </span>
                      </li>

                      <li className="flex gap-2">
                        <span className="text-[#39705a]">
                          •
                        </span>

                        <span>
                          Experiments and activities will appear here
                        </span>
                      </li>

                      <li className="flex gap-2">
                        <span className="text-[#39705a]">
                          •
                        </span>

                        <span>
                          Teacher resources will appear here
                        </span>
                      </li>
                    </ul>

                    {/* Unpublished Button */}
                    <div className="mt-5 block w-full cursor-not-allowed rounded-lg bg-slate-200 px-4 py-3 text-center font-semibold text-slate-500">
                      <span className="block">
                        Not Published
                      </span>

                      <span className="text-xs font-normal text-slate-400">
                        No resources yet
                      </span>
                    </div>
                  </>
                )}
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
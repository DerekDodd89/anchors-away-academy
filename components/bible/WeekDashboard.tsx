import Link from "next/link";

import type {
  BibleLesson,
} from "@/lib/bibleLessons";

type WeekDashboardProps = {
  selectedWeek: number;
  lessons: (BibleLesson | null)[];
};

const days = [
  {
    name: "MONDAY",
    slug: "monday",
    color: "bg-[#0b4a73]",
  },
  {
    name: "TUESDAY",
    slug: "tuesday",
    color: "bg-[#27623b]",
  },
  {
    name: "WEDNESDAY",
    slug: "wednesday",
    color: "bg-[#0b4a73]",
  },
  {
    name: "THURSDAY",
    slug: "thursday",
    color: "bg-[#0b4a73]",
  },
  {
    name: "FRIDAY",
    slug: "friday",
    color: "bg-[#74351f]",
  },
];

function getResourceCount(
  lesson: BibleLesson
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

  return elementary + middleSchool + teacher;
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
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#9b6a2e]">
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

              {/* Bible Image */}
              <div
                className="h-32 bg-cover bg-center"
                style={{
                  backgroundImage:
                    "url('/images/subjects/bible.png')",
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
                          <span className="font-semibold text-[#082f52]">
                            Course:
                          </span>{" "}
                          {lesson.course}
                        </p>
                      )}

                      {lesson.lessonNumber && (
                        <p>
                          <span className="font-semibold text-[#082f52]">
                            Lesson:
                          </span>{" "}
                          {lesson.lessonNumber}
                        </p>
                      )}

                      {lesson.passage && (
                        <p>
                          <span className="font-semibold text-[#082f52]">
                            Primary Text:
                          </span>{" "}
                          {lesson.passage}
                        </p>
                      )}

                      {lesson.theme && (
                        <p>
                          <span className="font-semibold text-[#082f52]">
                            Theme:
                          </span>{" "}
                          {lesson.theme}
                        </p>
                      )}

                      {lesson.memoryVerse && (
                        <p>
                          <span className="font-semibold text-[#082f52]">
                            Memory Verse:
                          </span>{" "}
                          {lesson.memoryVerse}
                        </p>
                      )}
                    </div>

                    {/* Open Published Lesson */}
                    <Link
                      href={`/bible/lessons/${lesson.id}`}
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
                      Bible Class
                    </p>

                    <div className="my-4 border-t border-slate-200" />

                    <ul className="flex-1 space-y-3 text-sm leading-relaxed text-slate-700">
                      <li className="flex gap-2">
                        <span className="text-[#b27a35]">
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
                        <span className="text-[#b27a35]">
                          •
                        </span>

                        <span>
                          Student resources will appear here
                        </span>
                      </li>

                      <li className="flex gap-2">
                        <span className="text-[#b27a35]">
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
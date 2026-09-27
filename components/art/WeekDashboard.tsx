import Link from "next/link";

import type {
  ArtLesson,
} from "@/lib/artLessons";

type WeekDashboardProps = {
  selectedWeek: number;
  lessons: (ArtLesson | null)[];
};

const days = [
  {
    name: "MONDAY",
    slug: "monday",
    color: "bg-[#9b5c3f]",
  },
  {
    name: "TUESDAY",
    slug: "tuesday",
    color: "bg-[#a86b4c]",
  },
  {
    name: "WEDNESDAY",
    slug: "wednesday",
    color: "bg-[#8a4f38]",
  },
  {
    name: "THURSDAY",
    slug: "thursday",
    color: "bg-[#a86b4c]",
  },
  {
    name: "FRIDAY",
    slug: "friday",
    color: "bg-[#7e4934]",
  },
];

function getResourceCount(
  lesson: ArtLesson
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

  const projects =
    lesson.resources.projects?.length ?? 0;

  const artistStudy =
    lesson.resources.artistStudy?.length ?? 0;

  return (
    elementary +
    middleSchool +
    teacher +
    projects +
    artistStudy
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
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#9b5c3f]">
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

              {/* Art Image */}
              <div
                className="h-32 bg-cover bg-center"
                style={{
                  backgroundImage:
                    "url('/images/subjects/art.png')",
                }}
              />

              {/* Card Body */}
              <div className="flex flex-1 flex-col p-5">
                {lesson ? (
                  <>
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

                      {lesson.artist && (
                        <p>
                          <span className="font-semibold text-[#9b5c3f]">
                            Artist:
                          </span>{" "}
                          {lesson.artist}
                        </p>
                      )}

                      {lesson.artForm && (
                        <p>
                          <span className="font-semibold text-[#9b5c3f]">
                            Art Form:
                          </span>{" "}
                          {lesson.artForm}
                        </p>
                      )}

                      {lesson.medium && (
                        <p>
                          <span className="font-semibold text-[#9b5c3f]">
                            Medium:
                          </span>{" "}
                          {lesson.medium}
                        </p>
                      )}

                      {lesson.technique && (
                        <p>
                          <span className="font-semibold text-[#9b5c3f]">
                            Technique:
                          </span>{" "}
                          {lesson.technique}
                        </p>
                      )}

                      {lesson.project && (
                        <p>
                          <span className="font-semibold text-[#9b5c3f]">
                            Project:
                          </span>{" "}
                          {lesson.project}
                        </p>
                      )}

                      {lesson.creativeFocus && (
                        <p>
                          <span className="font-semibold text-[#9b5c3f]">
                            Creative Focus:
                          </span>{" "}
                          {lesson.creativeFocus}
                        </p>
                      )}
                    </div>

                    {/* Open Published Lesson */}
                    <Link
                      href={`/art/lessons/${lesson.id}`}
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
                      Art
                    </p>

                    <div className="my-4 border-t border-slate-200" />

                    <ul className="flex-1 space-y-3 text-sm leading-relaxed text-slate-700">
                      <li className="flex gap-2">
                        <span className="text-[#9b5c3f]">
                          •
                        </span>

                        <span>
                          Artist or art concept
                        </span>
                      </li>

                      <li className="flex gap-2">
                        <span className="text-[#9b5c3f]">
                          •
                        </span>

                        <span>
                          Technique and creative focus
                        </span>
                      </li>

                      <li className="flex gap-2">
                        <span className="text-[#9b5c3f]">
                          •
                        </span>

                        <span>
                          Hands-on art project
                        </span>
                      </li>

                      <li className="flex gap-2">
                        <span className="text-[#9b5c3f]">
                          •
                        </span>

                        <span>
                          Student and teacher resources
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
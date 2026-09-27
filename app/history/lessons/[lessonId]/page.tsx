import Link from "next/link";
import { notFound } from "next/navigation";

import AcademyHeader from "@/components/home/AcademyHeader";
import AcademyFooter from "@/components/home/AcademyFooter";

import {
  getHistoryLesson,
  type HistoryResource,
} from "@/lib/historyLessons";

type HistoryLessonPageProps = {
  params: Promise<{
    lessonId: string;
  }>;
};

type ResourceSectionProps = {
  title: string;
  description: string;
  resources: HistoryResource[];
  lessonId: string;
};

function ResourceSection({
  title,
  description,
  resources,
  lessonId,
}: ResourceSectionProps) {
  if (resources.length === 0) {
    return null;
  }

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="border-b border-slate-200 pb-4">
        <h2 className="font-serif text-2xl font-bold text-[#082f52]">
          {title}
        </h2>

        <p className="mt-1 text-sm text-slate-600">
          {description}
        </p>
      </div>

      <div className="mt-5 grid gap-3">
        {resources.map((resource) => {
          const resourceUrl =
            `/history/resources/${lessonId}/${encodeURIComponent(
              resource.file
            )}`;

          return (
            <a
              key={resource.file}
              href={resourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between gap-4 rounded-xl border border-slate-200 bg-[#faf8f2] px-5 py-4 transition hover:border-[#9b6a2e] hover:bg-[#f4e7c9]"
            >
              <div>
                <p className="font-semibold text-[#082f52]">
                  {resource.title}
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  {resource.file}
                </p>
              </div>

              <span className="shrink-0 rounded-lg bg-[#0b4a73] px-4 py-2 text-sm font-semibold text-white">
                Open →
              </span>
            </a>
          );
        })}
      </div>
    </section>
  );
}

export default async function HistoryLessonPage({
  params,
}: HistoryLessonPageProps) {
  const { lessonId } = await params;

  const lesson = getHistoryLesson(lessonId);

  if (!lesson) {
    notFound();
  }

  const elementaryResources =
    lesson.resources?.elementary ?? [];

  const middleSchoolResources =
    lesson.resources?.middleSchool ?? [];

  const teacherResources =
    lesson.resources?.teacher ?? [];

  const mapResources =
    lesson.resources?.maps ?? [];

  const activityResources =
    lesson.resources?.activities ?? [];

  const totalResources =
    elementaryResources.length +
    middleSchoolResources.length +
    teacherResources.length +
    mapResources.length +
    activityResources.length;

  return (
    <main className="min-h-screen bg-[#f4f1e9] text-slate-900">
      <AcademyHeader />

      {/* Lesson Hero */}
      <section
        className="relative overflow-hidden bg-cover bg-center"
        style={{
          backgroundImage:
            "url('/images/subjects/history.png')",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-black/40" />

        <div className="relative mx-auto max-w-[1400px] px-6 py-14 text-white">
          <Link
            href={`/history?week=${lesson.week}`}
            className="inline-flex items-center gap-2 text-sm font-semibold text-amber-100 transition hover:text-white"
          >
            ← Back to Week {lesson.week}
          </Link>

          <p className="mt-8 text-xs font-bold uppercase tracking-[0.3em] text-amber-200">
            Anchors Away History
          </p>

          <div className="mt-3 flex flex-wrap items-center gap-2 text-sm text-white/80">
            <span>
              Semester {lesson.semester}
            </span>

            <span>•</span>

            <span>
              Week {lesson.week}
            </span>

            <span>•</span>

            <span>
              {lesson.day}
            </span>

            <span>•</span>

            <span>
              {lesson.date}
            </span>
          </div>

          <h1 className="mt-4 max-w-4xl font-serif text-4xl font-bold leading-tight md:text-6xl">
            {lesson.title}
          </h1>

          {lesson.subtitle && (
            <p className="mt-3 max-w-3xl font-serif text-2xl italic text-amber-50">
              {lesson.subtitle}
            </p>
          )}

          {lesson.course && (
            <p className="mt-5 text-sm font-semibold uppercase tracking-[0.18em] text-white/75">
              {lesson.course}
              {lesson.lessonNumber
                ? ` • Lesson ${lesson.lessonNumber}`
                : ""}
            </p>
          )}
        </div>
      </section>

      {/* Main Content */}
      <section className="px-5 py-10">
        <div className="mx-auto max-w-[1400px]">
          <div className="grid gap-8 lg:grid-cols-[1fr_320px]">

            {/* Main Column */}
            <div className="space-y-6">

              {/* Lesson Overview */}
              <section className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
                <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#9b6a2e]">
                  Lesson Overview
                </p>

                <h2 className="mt-2 font-serif text-3xl font-bold text-[#082f52]">
                  Today&apos;s History Lesson
                </h2>

                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  {lesson.topic && (
                    <div className="rounded-xl bg-[#f4e7c9] p-5">
                      <p className="text-xs font-bold uppercase tracking-wide text-[#76552f]">
                        Topic
                      </p>

                      <p className="mt-2 font-serif text-lg font-semibold text-[#352516]">
                        {lesson.topic}
                      </p>
                    </div>
                  )}

                  {lesson.period && (
                    <div className="rounded-xl bg-[#edf5f9] p-5">
                      <p className="text-xs font-bold uppercase tracking-wide text-[#0b4a73]">
                        Historical Period
                      </p>

                      <p className="mt-2 font-serif text-lg font-semibold text-[#082f52]">
                        {lesson.period}
                      </p>
                    </div>
                  )}

                  {lesson.unit && (
                    <div className="rounded-xl bg-[#faf8f2] p-5">
                      <p className="text-xs font-bold uppercase tracking-wide text-[#76552f]">
                        Unit
                      </p>

                      <p className="mt-2 font-serif text-lg font-semibold text-[#352516]">
                        {lesson.unit}
                      </p>
                    </div>
                  )}

                  {lesson.lessonNumber && (
                    <div className="rounded-xl bg-[#faf8f2] p-5">
                      <p className="text-xs font-bold uppercase tracking-wide text-[#76552f]">
                        Lesson
                      </p>

                      <p className="mt-2 font-serif text-lg font-semibold text-[#352516]">
                        Lesson {lesson.lessonNumber}
                      </p>
                    </div>
                  )}
                </div>

                {lesson.theme && (
                  <div className="mt-6 border-t border-slate-200 pt-6">
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#9b6a2e]">
                      Lesson Focus
                    </p>

                    <p className="mt-2 font-serif text-xl leading-relaxed text-slate-700">
                      {lesson.theme}
                    </p>
                  </div>
                )}
              </section>

              {/* Elementary */}
              <ResourceSection
                title="Elementary"
                description="Student materials prepared for the elementary level."
                resources={elementaryResources}
                lessonId={lessonId}
              />

              {/* Middle School */}
              <ResourceSection
                title="Middle School"
                description="Student materials prepared for the middle-school level."
                resources={middleSchoolResources}
                lessonId={lessonId}
              />

              {/* Maps */}
              <ResourceSection
                title="Maps & Geography"
                description="Historical maps, geography pages, and location-based resources for this lesson."
                resources={mapResources}
                lessonId={lessonId}
              />

              {/* Activities */}
              <ResourceSection
                title="Activities"
                description="Hands-on activities, timelines, projects, and supplemental lesson resources."
                resources={activityResources}
                lessonId={lessonId}
              />

              {/* Teacher */}
              <ResourceSection
                title="Teacher Resources"
                description="Answer keys, teaching notes, lesson guides, and supporting materials."
                resources={teacherResources}
                lessonId={lessonId}
              />

              {totalResources === 0 && (
                <section className="rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center">
                  <h2 className="font-serif text-2xl font-bold text-[#082f52]">
                    Lesson Resources
                  </h2>

                  <p className="mt-2 text-slate-600">
                    No downloadable resources have been added to this lesson yet.
                  </p>
                </section>
              )}
            </div>

            {/* Sidebar */}
            <aside className="space-y-5">
              <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#9b6a2e]">
                  Lesson Details
                </p>

                <dl className="mt-5 space-y-4 text-sm">
                  <div>
                    <dt className="font-semibold text-[#082f52]">
                      Subject
                    </dt>

                    <dd className="mt-1 text-slate-600">
                      {lesson.subject}
                    </dd>
                  </div>

                  {lesson.course && (
                    <div>
                      <dt className="font-semibold text-[#082f52]">
                        Course
                      </dt>

                      <dd className="mt-1 text-slate-600">
                        {lesson.course}
                      </dd>
                    </div>
                  )}

                  <div>
                    <dt className="font-semibold text-[#082f52]">
                      School Year
                    </dt>

                    <dd className="mt-1 text-slate-600">
                      {lesson.schoolYear}
                    </dd>
                  </div>

                  <div>
                    <dt className="font-semibold text-[#082f52]">
                      Semester
                    </dt>

                    <dd className="mt-1 text-slate-600">
                      Semester {lesson.semester}
                    </dd>
                  </div>

                  <div>
                    <dt className="font-semibold text-[#082f52]">
                      Week
                    </dt>

                    <dd className="mt-1 text-slate-600">
                      Week {lesson.week}
                    </dd>
                  </div>

                  <div>
                    <dt className="font-semibold text-[#082f52]">
                      Date
                    </dt>

                    <dd className="mt-1 text-slate-600">
                      {lesson.date}
                    </dd>
                  </div>

                  <div>
                    <dt className="font-semibold text-[#082f52]">
                      Resources
                    </dt>

                    <dd className="mt-1 text-slate-600">
                      {totalResources}{" "}
                      {totalResources === 1
                        ? "resource"
                        : "resources"}
                    </dd>
                  </div>
                </dl>
              </section>

              <section className="rounded-2xl bg-[#082f52] p-6 text-white shadow-sm">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-200">
                  Anchors Away
                </p>

                <h3 className="mt-2 font-serif text-2xl font-bold">
                  History
                </h3>

                <p className="mt-3 text-sm leading-relaxed text-white/80">
                  Explore the people, places, events, and ideas that shaped the world.
                </p>

                <Link
                  href={`/history?week=${lesson.week}`}
                  className="mt-5 block rounded-lg bg-[#f4e7c9] px-4 py-3 text-center font-semibold text-[#352516] transition hover:bg-white"
                >
                  ← Week {lesson.week} Dashboard
                </Link>
              </section>
            </aside>
          </div>
        </div>
      </section>

      <AcademyFooter />
    </main>
  );
}
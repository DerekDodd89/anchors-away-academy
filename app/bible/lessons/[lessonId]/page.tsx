import Link from "next/link";
import { notFound } from "next/navigation";

import {
  getBibleLesson,
  type BibleResource,
} from "@/lib/bibleLessons";

export default async function BibleLessonPage({
  params,
}: {
  params: Promise<{ lessonId: string }>;
}) {
  const { lessonId } = await params;

  if (!lessonId) {
    notFound();
  }

  const lesson = getBibleLesson(lessonId);

  if (!lesson) {
    notFound();
  }

  const elementaryResources =
    lesson.resources?.elementary ?? [];

  const middleSchoolResources =
    lesson.resources?.middleSchool ?? [];

  const teacherResources =
    lesson.resources?.teacher ?? [];

  const hasMemoryVerse =
    lesson.memoryVerse.trim().length > 0;

  return (
    <main className="min-h-screen bg-[#f4f1e9] text-slate-900">
      {/* Top Bar */}
      <header className="border-b border-slate-200 bg-[#082f52] text-white">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-4">
          <Link
            href="/"
            className="font-serif text-xl font-bold"
          >
            Anchors Away Homeschool Academy
          </Link>

          <Link
            href={`/bible?week=${lesson.week}`}
            className="text-sm font-semibold text-white/90 hover:text-white"
          >
            Bible Class
          </Link>
        </div>
      </header>

      {/* Breadcrumb */}
      <div className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-[1400px] flex-wrap items-center gap-2 px-6 py-4 text-sm text-slate-600">
          <Link
            href={`/bible?week=${lesson.week}`}
            className="font-semibold text-[#0b4a73] hover:underline"
          >
            Bible Class
          </Link>

          <span>›</span>

          <span>
            Semester {lesson.semester}
          </span>

          <span>›</span>

          <span>
            Week {lesson.week}
          </span>

          <span>›</span>

          <span>{lesson.day}</span>
        </div>
      </div>

      {/* Hero */}
      <section
        className="relative overflow-hidden bg-cover bg-center"
        style={{
          backgroundImage:
            "url('/images/subjects/bible.png')",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-black/35" />

        <div className="relative mx-auto flex min-h-[360px] max-w-[1400px] items-center px-6 py-12 text-white">
          <div className="max-w-4xl">
            <div className="inline-block rounded-md bg-[#f4e7c9] px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-[#3c2a18]">
              {lesson.day} • {lesson.date}
            </div>

            <p className="mt-6 text-sm font-bold uppercase tracking-[0.3em] text-amber-200">
              Week {lesson.week} Bible Class
            </p>

            <h1 className="mt-2 font-serif text-5xl font-bold drop-shadow-lg md:text-6xl">
              {lesson.title}
            </h1>

            {lesson.subtitle && (
              <p className="mt-3 font-serif text-3xl italic text-amber-100">
                {lesson.subtitle}
              </p>
            )}

            {lesson.theme && (
              <p className="mt-6 max-w-3xl text-lg leading-relaxed text-white/90">
                {lesson.theme}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="px-6 py-10">
        <div className="mx-auto max-w-[1400px]">
          <div className="grid gap-6 lg:grid-cols-[1fr_320px]">

            {/* LEFT */}
            <div>

              {/* Overview */}
              <section className="rounded-xl border border-slate-200 bg-white p-7 shadow-sm">
                <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#9b6a2e]">
                  Today&apos;s Bible Class
                </p>

                <h2 className="mt-2 font-serif text-3xl font-bold text-[#082f52]">
                  Lesson Overview
                </h2>

                <div
                  className={`mt-6 grid gap-4 ${
                    hasMemoryVerse
                      ? "sm:grid-cols-2"
                      : "grid-cols-1"
                  }`}
                >
                  {/* Main Passage */}
                  <div className="rounded-lg bg-[#f7f3ea] p-5">
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
                      Main Passage
                    </p>

                    <p className="mt-2 font-serif text-xl font-bold text-[#082f52]">
                      {lesson.passage}
                    </p>
                  </div>

                  {/* Memory Verse */}
                  {hasMemoryVerse && (
                    <div className="rounded-lg bg-[#f7f3ea] p-5">
                      <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
                        Memory Verse
                      </p>

                      <p className="mt-2 font-serif text-xl font-bold text-[#082f52]">
                        {lesson.memoryVerse}
                      </p>
                    </div>
                  )}
                </div>

                {lesson.theme && (
                  <div className="mt-6">
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
                      Lesson Theme
                    </p>

                    <p className="mt-2 text-lg leading-relaxed text-slate-700">
                      {lesson.theme}
                    </p>
                  </div>
                )}
              </section>

              {/* Resources */}
              <section className="mt-6 rounded-xl border border-slate-200 bg-white p-7 shadow-sm">
                <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#9b6a2e]">
                  Lesson Package
                </p>

                <h2 className="mt-2 font-serif text-3xl font-bold text-[#082f52]">
                  View & Download Resources
                </h2>

                <p className="mt-2 text-slate-600">
                  Student lessons, worksheets,
                  teacher materials, and other
                  resources for today&apos;s Bible
                  class.
                </p>

                <div className="mt-7 grid gap-5 md:grid-cols-3">

                  {/* Elementary */}
                  <ResourceCard
                    icon="📘"
                    title="Elementary"
                    description="Student lesson, worksheet, and activities."
                    lessonId={lesson.id}
                    resources={elementaryResources}
                  />

                  {/* Middle School */}
                  <ResourceCard
                    icon="📖"
                    title="Middle School"
                    description="Student lesson, worksheet, and study materials."
                    lessonId={lesson.id}
                    resources={middleSchoolResources}
                  />

                  {/* Teacher */}
                  <ResourceCard
                    icon="📚"
                    title="Teacher Resources"
                    description="Teaching guides, answer keys, and presentation materials."
                    lessonId={lesson.id}
                    resources={teacherResources}
                  />

                </div>
              </section>
            </div>

            {/* RIGHT */}
            <aside className="space-y-5">

              {/* Memory Verse Sidebar */}
              {hasMemoryVerse && (
                <section className="rounded-xl border border-[#d6c39d] bg-[#f4e7c9] p-6 shadow-sm">
                  <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#9b6a2e]">
                    Memory Verse
                  </p>

                  <p className="mt-3 font-serif text-3xl font-bold text-[#342416]">
                    {lesson.memoryVerse}
                  </p>
                </section>
              )}

              {/* Lesson Details */}
              <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                <h2 className="font-serif text-2xl font-bold text-[#082f52]">
                  Lesson Details
                </h2>

                <dl className="mt-5 divide-y divide-slate-100">

                  {lesson.course && (
                    <Detail
                      label="Course"
                      value={lesson.course}
                    />
                  )}

                  {lesson.lessonNumber && (
                    <Detail
                      label="Lesson"
                      value={`Lesson ${lesson.lessonNumber}`}
                    />
                  )}

                  <Detail
                    label="School Year"
                    value={lesson.schoolYear}
                  />

                  <Detail
                    label="Semester"
                    value={`Semester ${lesson.semester}`}
                  />

                  <Detail
                    label="Week"
                    value={`Week ${lesson.week}`}
                  />

                  <Detail
                    label="Day"
                    value={lesson.day}
                  />

                  <Detail
                    label="Date"
                    value={lesson.date}
                  />

                </dl>
              </section>

              {/* Back */}
              <Link
                href={`/bible?week=${lesson.week}`}
                className="block rounded-lg bg-[#0b4a73] px-5 py-3 text-center font-semibold text-white transition hover:bg-[#073753]"
              >
                ← Back to Bible Class
              </Link>

            </aside>
          </div>
        </div>
      </section>
    </main>
  );
}

function ResourceCard({
  icon,
  title,
  description,
  lessonId,
  resources,
}: {
  icon: string;
  title: string;
  description: string;
  lessonId: string;
  resources: BibleResource[];
}) {
  return (
    <div className="flex flex-col rounded-xl border border-slate-200 bg-[#faf8f2] p-5">
      <div className="text-3xl">
        {icon}
      </div>

      <h3 className="mt-3 font-serif text-2xl font-bold text-[#082f52]">
        {title}
      </h3>

      <p className="mt-2 text-sm leading-relaxed text-slate-600">
        {description}
      </p>

      <div className="mt-5 flex flex-1 flex-col gap-3">
        {resources.length > 0 ? (
          resources.map((resource) => {
            const resourceUrl =
              `/bible/resources/${lessonId}/${encodeURIComponent(
                resource.file
              )}`;

            return (
              <a
                key={resource.file}
                href={resourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block rounded-lg border border-[#0b4a73]/20 bg-white px-4 py-3 transition hover:border-[#0b4a73] hover:bg-[#edf5f9]"
              >
                <span className="block font-semibold text-[#0b4a73]">
                  {resource.title}
                </span>

                <span className="mt-1 block text-xs text-slate-500">
                  View PDF →
                </span>
              </a>
            );
          })
        ) : (
          <div className="rounded-lg border border-dashed border-slate-300 bg-white p-4 text-center text-sm text-slate-500">
            No resources published
          </div>
        )}
      </div>
    </div>
  );
}

function Detail({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="py-3">
      <dt className="text-xs font-bold uppercase text-slate-500">
        {label}
      </dt>

      <dd className="mt-1">
        {value}
      </dd>
    </div>
  );
}
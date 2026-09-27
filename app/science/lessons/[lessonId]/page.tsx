import Link from "next/link";
import { notFound } from "next/navigation";

import AcademyHeader from "@/components/home/AcademyHeader";
import AcademyFooter from "@/components/home/AcademyFooter";

import {
  getScienceLesson,
  type ScienceResource,
} from "@/lib/scienceLessons";

type ScienceLessonPageProps = {
  params: Promise<{
    lessonId: string;
  }>;
};

type ResourceSectionProps = {
  title: string;
  description: string;
  resources: ScienceResource[];
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
            `/science/resources/${lessonId}/${encodeURIComponent(
              resource.file
            )}`;

          return (
            <a
              key={resource.file}
              href={resourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between gap-4 rounded-xl border border-slate-200 bg-[#f5faf7] px-5 py-4 transition hover:border-[#39705a] hover:bg-[#e5f1e9]"
            >
              <div>
                <p className="font-semibold text-[#315d4c]">
                  {resource.title}
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  {resource.file}
                </p>
              </div>

              <span className="shrink-0 rounded-lg bg-[#39705a] px-4 py-2 text-sm font-semibold text-white">
                Open →
              </span>
            </a>
          );
        })}
      </div>
    </section>
  );
}

export default async function ScienceLessonPage({
  params,
}: ScienceLessonPageProps) {
  const { lessonId } = await params;

  const lesson = getScienceLesson(lessonId);

  if (!lesson) {
    notFound();
  }

  const elementaryResources =
    lesson.resources?.elementary ?? [];

  const middleSchoolResources =
    lesson.resources?.middleSchool ?? [];

  const experimentResources =
    lesson.resources?.experiments ?? [];

  const journalResources =
    lesson.resources?.journal ?? [];

  const teacherResources =
    lesson.resources?.teacher ?? [];

  const totalResources =
    elementaryResources.length +
    middleSchoolResources.length +
    experimentResources.length +
    journalResources.length +
    teacherResources.length;

  return (
    <main className="min-h-screen bg-[#f4f1e9] text-slate-900">
      <AcademyHeader />

      {/* Science Lesson Hero */}
      <section
        className="relative overflow-hidden bg-cover bg-center"
        style={{
          backgroundImage:
            "url('/images/subjects/science.png')",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-black/40" />

        <div className="relative mx-auto max-w-[1400px] px-6 py-14 text-white">
          <Link
            href={`/science?week=${lesson.week}`}
            className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-100 transition hover:text-white"
          >
            ← Back to Week {lesson.week}
          </Link>

          <p className="mt-8 text-xs font-bold uppercase tracking-[0.3em] text-emerald-200">
            Anchors Away Science
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
            <p className="mt-3 max-w-3xl font-serif text-2xl italic text-emerald-50">
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

      {/* Main Lesson Content */}
      <section className="px-5 py-10">
        <div className="mx-auto max-w-[1400px]">
          <div className="grid gap-8 lg:grid-cols-[1fr_320px]">

            {/* Main Column */}
            <div className="space-y-6">

              {/* Lesson Overview */}
              <section className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
                <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#39705a]">
                  Lesson Overview
                </p>

                <h2 className="mt-2 font-serif text-3xl font-bold text-[#082f52]">
                  Today&apos;s Science Lesson
                </h2>

                <div className="mt-6 grid gap-4 sm:grid-cols-2">

                  {lesson.field && (
                    <div className="rounded-xl bg-[#e5f1e9] p-5">
                      <p className="text-xs font-bold uppercase tracking-wide text-[#39705a]">
                        Field of Science
                      </p>

                      <p className="mt-2 font-serif text-lg font-semibold text-[#234437]">
                        {lesson.field}
                      </p>
                    </div>
                  )}

                  {lesson.topic && (
                    <div className="rounded-xl bg-[#edf5f9] p-5">
                      <p className="text-xs font-bold uppercase tracking-wide text-[#0b4a73]">
                        Topic
                      </p>

                      <p className="mt-2 font-serif text-lg font-semibold text-[#082f52]">
                        {lesson.topic}
                      </p>
                    </div>
                  )}

                  {lesson.unit && (
                    <div className="rounded-xl bg-[#faf8f2] p-5">
                      <p className="text-xs font-bold uppercase tracking-wide text-[#39705a]">
                        Unit
                      </p>

                      <p className="mt-2 font-serif text-lg font-semibold text-[#234437]">
                        {lesson.unit}
                      </p>
                    </div>
                  )}

                  {lesson.lessonNumber && (
                    <div className="rounded-xl bg-[#faf8f2] p-5">
                      <p className="text-xs font-bold uppercase tracking-wide text-[#39705a]">
                        Lesson
                      </p>

                      <p className="mt-2 font-serif text-lg font-semibold text-[#234437]">
                        Lesson {lesson.lessonNumber}
                      </p>
                    </div>
                  )}
                </div>

                {/* Big Idea */}
                {lesson.bigIdea && (
                  <div className="mt-6 rounded-xl border border-[#b8d3c5] bg-[#f5faf7] p-5">
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#39705a]">
                      Big Idea
                    </p>

                    <p className="mt-2 font-serif text-xl leading-relaxed text-[#234437]">
                      {lesson.bigIdea}
                    </p>
                  </div>
                )}

                {/* Science Question */}
                {lesson.question && (
                  <div className="mt-4 rounded-xl border border-[#b8d3c5] bg-white p-5">
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#39705a]">
                      Question to Investigate
                    </p>

                    <p className="mt-2 font-serif text-xl font-semibold leading-relaxed text-[#082f52]">
                      {lesson.question}
                    </p>
                  </div>
                )}

                {/* Theme */}
                {lesson.theme && (
                  <div className="mt-6 border-t border-slate-200 pt-6">
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#39705a]">
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
                description="Science materials prepared for the elementary level."
                resources={elementaryResources}
                lessonId={lessonId}
              />

              {/* Middle School */}
              <ResourceSection
                title="Middle School"
                description="Science materials prepared for the middle-school level."
                resources={middleSchoolResources}
                lessonId={lessonId}
              />

              {/* Experiments */}
              <ResourceSection
                title="Experiments & Activities"
                description="Experiment instructions, scientific-method activities, observations, and hands-on investigations."
                resources={experimentResources}
                lessonId={lessonId}
              />

              {/* Science Journal */}
              <ResourceSection
                title="Science Journal"
                description="Observation pages, experiment records, drawings, conclusions, and science-journal resources."
                resources={journalResources}
                lessonId={lessonId}
              />

              {/* Teacher Resources */}
              <ResourceSection
                title="Teacher Resources"
                description="Teacher guides, answer keys, experiment notes, and supporting materials."
                resources={teacherResources}
                lessonId={lessonId}
              />

              {/* Empty State */}
              {totalResources === 0 && (
                <section className="rounded-2xl border border-dashed border-[#9dbcae] bg-white p-8 text-center">
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

              {/* Lesson Details */}
              <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#39705a]">
                  Lesson Details
                </p>

                <dl className="mt-5 space-y-4 text-sm">
                  <div>
                    <dt className="font-semibold text-[#315d4c]">
                      Subject
                    </dt>

                    <dd className="mt-1 text-slate-600">
                      {lesson.subject}
                    </dd>
                  </div>

                  {lesson.course && (
                    <div>
                      <dt className="font-semibold text-[#315d4c]">
                        Course
                      </dt>

                      <dd className="mt-1 text-slate-600">
                        {lesson.course}
                      </dd>
                    </div>
                  )}

                  {lesson.field && (
                    <div>
                      <dt className="font-semibold text-[#315d4c]">
                        Field
                      </dt>

                      <dd className="mt-1 text-slate-600">
                        {lesson.field}
                      </dd>
                    </div>
                  )}

                  <div>
                    <dt className="font-semibold text-[#315d4c]">
                      School Year
                    </dt>

                    <dd className="mt-1 text-slate-600">
                      {lesson.schoolYear}
                    </dd>
                  </div>

                  <div>
                    <dt className="font-semibold text-[#315d4c]">
                      Semester
                    </dt>

                    <dd className="mt-1 text-slate-600">
                      Semester {lesson.semester}
                    </dd>
                  </div>

                  <div>
                    <dt className="font-semibold text-[#315d4c]">
                      Week
                    </dt>

                    <dd className="mt-1 text-slate-600">
                      Week {lesson.week}
                    </dd>
                  </div>

                  <div>
                    <dt className="font-semibold text-[#315d4c]">
                      Date
                    </dt>

                    <dd className="mt-1 text-slate-600">
                      {lesson.date}
                    </dd>
                  </div>

                  <div>
                    <dt className="font-semibold text-[#315d4c]">
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

              {/* Science Identity */}
              <section className="rounded-2xl bg-[#315d4c] p-6 text-white shadow-sm">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-200">
                  Anchors Away
                </p>

                <h3 className="mt-2 font-serif text-2xl font-bold">
                  Science
                </h3>

                <p className="mt-3 text-sm leading-relaxed text-white/80">
                  Observe carefully, ask good questions, investigate creation,
                  and discover how the world works.
                </p>

                <Link
                  href={`/science?week=${lesson.week}`}
                  className="mt-5 block rounded-lg bg-[#e5f1e9] px-4 py-3 text-center font-semibold text-[#234437] transition hover:bg-white"
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
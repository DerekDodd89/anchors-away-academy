import Link from "next/link";
import { notFound } from "next/navigation";

import AcademyHeader from "@/components/home/AcademyHeader";
import AcademyFooter from "@/components/home/AcademyFooter";

import {
  getArtLesson,
  type ArtResource,
} from "@/lib/artLessons";

type ArtLessonPageProps = {
  params: Promise<{
    lessonId: string;
  }>;
};

type ResourceSectionProps = {
  title: string;
  description: string;
  resources: ArtResource[];
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
            `/art/resources/${lessonId}/${encodeURIComponent(
              resource.file
            )}`;

          return (
            <a
              key={resource.file}
              href={resourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between gap-4 rounded-xl border border-slate-200 bg-[#fff8f4] px-5 py-4 transition hover:border-[#9b5c3f] hover:bg-[#fff1e8]"
            >
              <div>
                <p className="font-semibold text-[#8a4f38]">
                  {resource.title}
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  {resource.file}
                </p>
              </div>

              <span className="shrink-0 rounded-lg bg-[#9b5c3f] px-4 py-2 text-sm font-semibold text-white">
                Open →
              </span>
            </a>
          );
        })}
      </div>
    </section>
  );
}

export default async function ArtLessonPage({
  params,
}: ArtLessonPageProps) {
  const { lessonId } = await params;

  const lesson = getArtLesson(lessonId);

  if (!lesson) {
    notFound();
  }

  const elementaryResources =
    lesson.resources?.elementary ?? [];

  const middleSchoolResources =
    lesson.resources?.middleSchool ?? [];

  const projectResources =
    lesson.resources?.projects ?? [];

  const artistStudyResources =
    lesson.resources?.artistStudy ?? [];

  const teacherResources =
    lesson.resources?.teacher ?? [];

  const totalResources =
    elementaryResources.length +
    middleSchoolResources.length +
    projectResources.length +
    artistStudyResources.length +
    teacherResources.length;

  return (
    <main className="min-h-screen bg-[#f4f1e9] text-slate-900">
      <AcademyHeader />

      {/* Art Lesson Hero */}
      <section
        className="relative overflow-hidden bg-cover bg-center"
        style={{
          backgroundImage:
            "url('/images/subjects/art.png')",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-black/40" />

        <div className="relative mx-auto max-w-[1400px] px-6 py-14 text-white">
          <Link
            href={`/art?week=${lesson.week}`}
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#f4d7c8] transition hover:text-white"
          >
            ← Back to Week {lesson.week}
          </Link>

          <p className="mt-8 text-xs font-bold uppercase tracking-[0.3em] text-[#f4d7c8]">
            Anchors Away Art
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
            <p className="mt-3 max-w-3xl font-serif text-2xl italic text-[#fff4ed]">
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
                <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#9b5c3f]">
                  Lesson Overview
                </p>

                <h2 className="mt-2 font-serif text-3xl font-bold text-[#082f52]">
                  Today&apos;s Art Lesson
                </h2>

                <div className="mt-6 grid gap-4 sm:grid-cols-2">

                  {lesson.artist && (
                    <div className="rounded-xl bg-[#fff1e8] p-5">
                      <p className="text-xs font-bold uppercase tracking-wide text-[#9b5c3f]">
                        Artist
                      </p>

                      <p className="mt-2 font-serif text-lg font-semibold text-[#6f3f2f]">
                        {lesson.artist}
                      </p>
                    </div>
                  )}

                  {lesson.artForm && (
                    <div className="rounded-xl bg-[#f4eee8] p-5">
                      <p className="text-xs font-bold uppercase tracking-wide text-[#8a4f38]">
                        Art Form
                      </p>

                      <p className="mt-2 font-serif text-lg font-semibold text-[#6f3f2f]">
                        {lesson.artForm}
                      </p>
                    </div>
                  )}

                  {lesson.medium && (
                    <div className="rounded-xl bg-[#faf8f2] p-5">
                      <p className="text-xs font-bold uppercase tracking-wide text-[#9b5c3f]">
                        Medium
                      </p>

                      <p className="mt-2 font-serif text-lg font-semibold text-[#6f3f2f]">
                        {lesson.medium}
                      </p>
                    </div>
                  )}

                  {lesson.technique && (
                    <div className="rounded-xl bg-[#faf8f2] p-5">
                      <p className="text-xs font-bold uppercase tracking-wide text-[#9b5c3f]">
                        Technique
                      </p>

                      <p className="mt-2 font-serif text-lg font-semibold text-[#6f3f2f]">
                        {lesson.technique}
                      </p>
                    </div>
                  )}
                </div>

                {/* Project */}
                {lesson.project && (
                  <div className="mt-6 rounded-xl border border-[#dfbba9] bg-[#fff8f4] p-5">
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#9b5c3f]">
                      Art Project
                    </p>

                    <p className="mt-2 font-serif text-xl font-semibold leading-relaxed text-[#6f3f2f]">
                      {lesson.project}
                    </p>
                  </div>
                )}

                {/* Creative Focus */}
                {lesson.creativeFocus && (
                  <div className="mt-4 rounded-xl border border-[#dfbba9] bg-white p-5">
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#9b5c3f]">
                      Creative Focus
                    </p>

                    <p className="mt-2 font-serif text-xl leading-relaxed text-[#082f52]">
                      {lesson.creativeFocus}
                    </p>
                  </div>
                )}

                {/* Materials */}
                {lesson.materials &&
                  lesson.materials.length > 0 && (
                    <div className="mt-6">
                      <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#9b5c3f]">
                        Materials
                      </p>

                      <div className="mt-3 grid gap-2 sm:grid-cols-2">
                        {lesson.materials.map(
                          (material) => (
                            <div
                              key={material}
                              className="flex items-center gap-3 rounded-lg bg-[#f7f3ed] px-4 py-3 text-sm text-slate-700"
                            >
                              <span className="text-[#9b5c3f]">
                                •
                              </span>

                              <span>
                                {material}
                              </span>
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  )}

                {/* Theme */}
                {lesson.theme && (
                  <div className="mt-6 border-t border-slate-200 pt-6">
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#9b5c3f]">
                      Lesson Focus
                    </p>

                    <p className="mt-2 font-serif text-xl leading-relaxed text-slate-700">
                      {lesson.theme}
                    </p>
                  </div>
                )}
              </section>

              {/* Artist Study */}
              <ResourceSection
                title="Artist Study"
                description="Artist biographies, artwork studies, observation activities, and related resources."
                resources={artistStudyResources}
                lessonId={lessonId}
              />

              {/* Elementary */}
              <ResourceSection
                title="Elementary"
                description="Art activities and student materials prepared for the elementary level."
                resources={elementaryResources}
                lessonId={lessonId}
              />

              {/* Middle School */}
              <ResourceSection
                title="Middle School"
                description="Art studies and student materials prepared for the middle-school level."
                resources={middleSchoolResources}
                lessonId={lessonId}
              />

              {/* Projects */}
              <ResourceSection
                title="Art Projects"
                description="Project instructions, templates, reference sheets, and hands-on creative activities."
                resources={projectResources}
                lessonId={lessonId}
              />

              {/* Teacher */}
              <ResourceSection
                title="Teacher Resources"
                description="Teaching notes, answer keys, project guidance, and supporting Art resources."
                resources={teacherResources}
                lessonId={lessonId}
              />

              {/* Empty State */}
              {totalResources === 0 && (
                <section className="rounded-2xl border border-dashed border-[#d2a995] bg-white p-8 text-center">
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

              {/* Details */}
              <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#9b5c3f]">
                  Lesson Details
                </p>

                <dl className="mt-5 space-y-4 text-sm">

                  <div>
                    <dt className="font-semibold text-[#8a4f38]">
                      Subject
                    </dt>

                    <dd className="mt-1 text-slate-600">
                      {lesson.subject}
                    </dd>
                  </div>

                  {lesson.course && (
                    <div>
                      <dt className="font-semibold text-[#8a4f38]">
                        Course
                      </dt>

                      <dd className="mt-1 text-slate-600">
                        {lesson.course}
                      </dd>
                    </div>
                  )}

                  {lesson.unit && (
                    <div>
                      <dt className="font-semibold text-[#8a4f38]">
                        Unit
                      </dt>

                      <dd className="mt-1 text-slate-600">
                        {lesson.unit}
                      </dd>
                    </div>
                  )}

                  <div>
                    <dt className="font-semibold text-[#8a4f38]">
                      School Year
                    </dt>

                    <dd className="mt-1 text-slate-600">
                      {lesson.schoolYear}
                    </dd>
                  </div>

                  <div>
                    <dt className="font-semibold text-[#8a4f38]">
                      Semester
                    </dt>

                    <dd className="mt-1 text-slate-600">
                      Semester {lesson.semester}
                    </dd>
                  </div>

                  <div>
                    <dt className="font-semibold text-[#8a4f38]">
                      Week
                    </dt>

                    <dd className="mt-1 text-slate-600">
                      Week {lesson.week}
                    </dd>
                  </div>

                  <div>
                    <dt className="font-semibold text-[#8a4f38]">
                      Date
                    </dt>

                    <dd className="mt-1 text-slate-600">
                      {lesson.date}
                    </dd>
                  </div>

                  <div>
                    <dt className="font-semibold text-[#8a4f38]">
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

              {/* Art Identity */}
              <section className="rounded-2xl bg-[#8a4f38] p-6 text-white shadow-sm">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#f4d7c8]">
                  Anchors Away
                </p>

                <h3 className="mt-2 font-serif text-2xl font-bold">
                  Art
                </h3>

                <p className="mt-3 text-sm leading-relaxed text-white/85">
                  Observe carefully, develop creative skills,
                  study great works of art, and enjoy the process
                  of making something beautiful.
                </p>

                <Link
                  href={`/art?week=${lesson.week}`}
                  className="mt-5 block rounded-lg bg-[#fff4ed] px-4 py-3 text-center font-semibold text-[#6f3f2f] transition hover:bg-white"
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
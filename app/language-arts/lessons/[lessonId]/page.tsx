import { notFound } from "next/navigation";

import AcademyHeader from "@/components/home/AcademyHeader";
import AcademyFooter from "@/components/home/AcademyFooter";

import {
  getLanguageArtsLesson,
  type LanguageArtsResource,
} from "@/lib/languageArtsLessons";

type PageProps = {
  params: Promise<{
    lessonId: string;
  }>;
};

type ResourceSectionProps = {
  title: string;
  description: string;
  resources?: LanguageArtsResource[];
  lessonId: string;
};

function ResourceSection({
  title,
  description,
  resources,
  lessonId,
}: ResourceSectionProps) {
  if (!resources || resources.length === 0) {
    return null;
  }

  return (
    <section className="rounded-2xl border border-[#d9cbd5] bg-white p-6 shadow-sm">
      <h2 className="font-serif text-2xl font-bold text-[#082f52]">
        {title}
      </h2>

      <p className="mt-1 text-sm text-slate-500">
        {description}
      </p>

      <div className="mt-4 space-y-3">
        {resources.map((resource) => (
          <a
            key={resource.file}
            href={`/language-arts/resources/${lessonId}/${encodeURIComponent(
              resource.file
            )}`}
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-between rounded-xl border border-[#e3d7e0] bg-[#faf6f9] px-4 py-3 transition hover:border-[#7a4f72] hover:bg-[#f5e9f2]"
          >
            <span className="font-semibold text-[#684660]">
              {resource.title}
            </span>

            <span className="ml-4 text-sm font-bold text-[#7a4f72]">
              Open →
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}

export default async function LanguageArtsLessonPage({
  params,
}: PageProps) {
  const { lessonId } = await params;

  const lesson = getLanguageArtsLesson(lessonId);

  if (!lesson) {
    notFound();
  }

  const resources = lesson.resources;

  const totalResources =
    (resources?.reading?.length ?? 0) +
    (resources?.grammar?.length ?? 0) +
    (resources?.writing?.length ?? 0) +
    (resources?.spelling?.length ?? 0) +
    (resources?.vocabulary?.length ?? 0) +
    (resources?.handwriting?.length ?? 0) +
    (resources?.teacher?.length ?? 0);

  return (
    <main className="min-h-screen bg-[#f4f1e9] text-slate-900">
      <AcademyHeader />

      {/* HERO */}
      <section
        className="relative min-h-[300px] overflow-hidden bg-cover bg-center"
        style={{
          backgroundImage:
            "url('/images/subjects/language-arts.png')",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-black/70" />

        <div className="relative mx-auto flex min-h-[300px] max-w-[1500px] items-end px-6 py-10 text-white">
          <div className="max-w-4xl">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#ead9e6]">
              Anchors Away Homeschool Academy
            </p>

            <p className="mt-2 text-sm font-semibold uppercase tracking-wider text-[#f8eef5]">
              Language Arts • Week {lesson.week} • {lesson.day}
            </p>

            <h1 className="mt-2 font-serif text-4xl font-bold leading-tight md:text-5xl">
              {lesson.title}
            </h1>

            <p className="mt-3 font-serif text-xl italic text-[#f8eef5]">
              {lesson.subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* PAGE CONTENT */}
      <div className="mx-auto max-w-[1500px] px-5 py-8">
        <div className="grid gap-8 xl:grid-cols-[1fr_320px]">

          {/* MAIN COLUMN */}
          <div className="space-y-6">

            {/* LESSON OVERVIEW */}
            <section className="rounded-2xl border border-[#d9cbd5] bg-white p-6 shadow-sm">
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#7a4f72]">
                Lesson Overview
              </p>

              <h2 className="mt-2 font-serif text-3xl font-bold text-[#082f52]">
                Today&apos;s Language Arts
              </h2>

              <div className="mt-6 grid gap-4 md:grid-cols-2">

                {lesson.literature && (
                  <OverviewCard
                    label="Literature"
                    value={lesson.literature}
                  />
                )}

                {lesson.reading && (
                  <OverviewCard
                    label="Reading"
                    value={lesson.reading}
                  />
                )}

                {lesson.grammar && (
                  <OverviewCard
                    label="Grammar"
                    value={lesson.grammar}
                  />
                )}

                {lesson.writing && (
                  <OverviewCard
                    label="Writing"
                    value={lesson.writing}
                  />
                )}

                {lesson.spelling && (
                  <OverviewCard
                    label="Spelling"
                    value={lesson.spelling}
                  />
                )}

                {lesson.vocabulary && (
                  <OverviewCard
                    label="Vocabulary"
                    value={lesson.vocabulary}
                  />
                )}

                {lesson.handwriting && (
                  <OverviewCard
                    label="Handwriting"
                    value={lesson.handwriting}
                  />
                )}

                {lesson.skillFocus && (
                  <OverviewCard
                    label="Skill Focus"
                    value={lesson.skillFocus}
                  />
                )}

              </div>
            </section>

            {/* THEME */}
            {lesson.theme && (
              <section className="rounded-2xl border border-[#d9cbd5] bg-[#f8eef5] p-6 shadow-sm">
                <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#7a4f72]">
                  Lesson Theme
                </p>

                <p className="mt-3 font-serif text-xl leading-relaxed text-[#5e3f58]">
                  {lesson.theme}
                </p>
              </section>
            )}

            {/* RESOURCE SECTIONS */}

            <ResourceSection
              title="Reading & Literature"
              description="Reading assignments, literature guides, comprehension work, and reading logs."
              resources={resources?.reading}
              lessonId={lessonId}
            />

            <ResourceSection
              title="Grammar"
              description="Grammar lessons, practice pages, and book-based grammar activities."
              resources={resources?.grammar}
              lessonId={lessonId}
            />

            <ResourceSection
              title="Writing & Composition"
              description="Writing assignments, composition exercises, outlines, and IEW-related work."
              resources={resources?.writing}
              lessonId={lessonId}
            />

            <ResourceSection
              title="Spelling"
              description="Weekly spelling lists, practice activities, and quizzes."
              resources={resources?.spelling}
              lessonId={lessonId}
            />

            <ResourceSection
              title="Vocabulary"
              description="Vocabulary study, word work, and related activities."
              resources={resources?.vocabulary}
              lessonId={lessonId}
            />

            <ResourceSection
              title="Handwriting"
              description="Penmanship, copywork, and handwriting practice."
              resources={resources?.handwriting}
              lessonId={lessonId}
            />

            <ResourceSection
              title="Teacher Resources"
              description="Answer keys, lesson guidance, teaching notes, and parent resources."
              resources={resources?.teacher}
              lessonId={lessonId}
            />

            {/* EMPTY RESOURCE STATE */}
            {totalResources === 0 && (
              <section className="rounded-2xl border border-dashed border-[#cdb8c7] bg-white p-8 text-center">
                <h2 className="font-serif text-2xl font-bold text-[#082f52]">
                  No Downloadable Resources Yet
                </h2>

                <p className="mx-auto mt-2 max-w-xl text-sm leading-relaxed text-slate-500">
                  This Language Arts lesson is published,
                  but no worksheets, reading materials,
                  spelling lists, writing assignments, or
                  teacher resources have been added yet.
                </p>
              </section>
            )}

          </div>

          {/* SIDEBAR */}
          <aside className="space-y-5">
            <section className="rounded-2xl border border-[#d9cbd5] bg-white p-5 shadow-sm">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#7a4f72]">
                Lesson Details
              </p>

              <dl className="mt-4 space-y-4 text-sm">

                <Detail
                  label="Date"
                  value={lesson.date}
                />

                <Detail
                  label="Week"
                  value={`Week ${lesson.week}`}
                />

                <Detail
                  label="Day"
                  value={lesson.day}
                />

                {lesson.course && (
                  <Detail
                    label="Course"
                    value={lesson.course}
                  />
                )}

                {lesson.unit && (
                  <Detail
                    label="Unit"
                    value={lesson.unit}
                  />
                )}

                {lesson.lessonNumber !== undefined && (
                  <Detail
                    label="Lesson"
                    value={String(
                      lesson.lessonNumber
                    )}
                  />
                )}

                <Detail
                  label="Resources"
                  value={String(totalResources)}
                />

              </dl>
            </section>

            <a
              href={`/language-arts?week=${lesson.week}`}
              className="block rounded-xl bg-[#7a4f72] px-5 py-3 text-center font-bold text-white shadow-sm transition hover:bg-[#684660]"
            >
              ← Back to Week {lesson.week}
            </a>
          </aside>

        </div>
      </div>

      <AcademyFooter />
    </main>
  );
}

/*
  Small reusable overview card.
*/
function OverviewCard({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl bg-[#f8eef5] p-4">
      <p className="text-xs font-bold uppercase tracking-wider text-[#7a4f72]">
        {label}
      </p>

      <p className="mt-1 font-semibold text-slate-700">
        {value}
      </p>
    </div>
  );
}

/*
  Sidebar detail row.
*/
function Detail({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div>
      <dt className="font-bold text-[#082f52]">
        {label}
      </dt>

      <dd className="mt-1 text-slate-600">
        {value}
      </dd>
    </div>
  );
}
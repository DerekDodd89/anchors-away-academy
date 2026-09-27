import { notFound } from "next/navigation";

import AcademyHeader from "@/components/home/AcademyHeader";
import AcademyFooter from "@/components/home/AcademyFooter";

import {
  getMathLesson,
  type MathResource,
} from "@/lib/mathLessons";

type PageProps = {
  params: Promise<{
    lessonId: string;
  }>;
};

type ResourceSectionProps = {
  title: string;
  description: string;
  resources?: MathResource[];
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
    <section className="rounded-2xl border border-[#cbd9df] bg-white p-6 shadow-sm">
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
            href={`/math/resources/${lessonId}/${encodeURIComponent(
              resource.file
            )}`}
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-between rounded-xl border border-[#d5e1e6] bg-[#f4f8fa] px-4 py-3 transition hover:border-[#426a7d] hover:bg-[#edf5f8]"
          >
            <span className="font-semibold text-[#31586b]">
              {resource.title}
            </span>

            <span className="ml-4 text-sm font-bold text-[#426a7d]">
              Open →
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}

function OverviewCard({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl bg-[#edf5f8] p-4">
      <p className="text-xs font-bold uppercase tracking-wider text-[#426a7d]">
        {label}
      </p>

      <p className="mt-1 font-semibold text-slate-700">
        {value}
      </p>
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

export default async function MathLessonPage({
  params,
}: PageProps) {
  const { lessonId } = await params;

  const lesson = getMathLesson(lessonId);

  if (!lesson) {
    notFound();
  }

  const resources = lesson.resources;

  const totalResources =
    (resources?.elementary?.length ?? 0) +
    (resources?.middleSchool?.length ?? 0) +
    (resources?.practice?.length ?? 0) +
    (resources?.activities?.length ?? 0) +
    (resources?.assessments?.length ?? 0) +
    (resources?.teacher?.length ?? 0);

  return (
    <main className="min-h-screen bg-[#f4f1e9] text-slate-900">
      <AcademyHeader />

      {/* HERO */}
      <section
        className="relative min-h-[300px] overflow-hidden bg-cover bg-center"
        style={{
          backgroundImage:
            "url('/images/subjects/math.png')",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-black/70" />

        <div className="relative mx-auto flex min-h-[300px] max-w-[1500px] items-end px-6 py-10 text-white">
          <div className="max-w-4xl">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#dceaf0]">
              Anchors Away Homeschool Academy
            </p>

            <p className="mt-2 text-sm font-semibold uppercase tracking-wider text-[#edf5f8]">
              Math • Week {lesson.week} • {lesson.day}
            </p>

            <h1 className="mt-2 font-serif text-4xl font-bold leading-tight md:text-5xl">
              {lesson.title}
            </h1>

            <p className="mt-3 font-serif text-xl italic text-[#edf5f8]">
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

            {/* OVERVIEW */}
            <section className="rounded-2xl border border-[#cbd9df] bg-white p-6 shadow-sm">
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#426a7d]">
                Lesson Overview
              </p>

              <h2 className="mt-2 font-serif text-3xl font-bold text-[#082f52]">
                Today&apos;s Math
              </h2>

              <div className="mt-6 grid gap-4 md:grid-cols-2">
                {lesson.concept && (
                  <OverviewCard
                    label="Concept"
                    value={lesson.concept}
                  />
                )}

                {lesson.skill && (
                  <OverviewCard
                    label="Skill"
                    value={lesson.skill}
                  />
                )}

                {lesson.review && (
                  <OverviewCard
                    label="Review"
                    value={lesson.review}
                  />
                )}

                {lesson.practice && (
                  <OverviewCard
                    label="Practice"
                    value={lesson.practice}
                  />
                )}

                {lesson.application && (
                  <OverviewCard
                    label="Application"
                    value={lesson.application}
                  />
                )}

                {lesson.challenge && (
                  <OverviewCard
                    label="Challenge"
                    value={lesson.challenge}
                  />
                )}
              </div>
            </section>

            {/* STUDENT ASSIGNMENTS */}
            {lesson.studentAssignments &&
              lesson.studentAssignments.length > 0 && (
                <section className="rounded-2xl border border-[#cbd9df] bg-white p-6 shadow-sm">
                  <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#426a7d]">
                    Student Assignments
                  </p>

                  <h2 className="mt-2 font-serif text-3xl font-bold text-[#082f52]">
                    Today&apos;s Work
                  </h2>

                  <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                    {lesson.studentAssignments.map(
                      (assignment) => (
                        <div
                          key={`${assignment.student}-${assignment.assignment}`}
                          className="rounded-xl border border-[#d5e1e6] bg-[#edf5f8] p-5"
                        >
                          <h3 className="font-serif text-xl font-bold text-[#082f52]">
                            {assignment.student}
                          </h3>

                          {assignment.level && (
                            <p className="mt-1 text-xs font-bold uppercase tracking-wider text-[#426a7d]">
                              {assignment.level}
                            </p>
                          )}

                          <p className="mt-3 text-sm leading-relaxed text-slate-700">
                            {assignment.assignment}
                          </p>
                        </div>
                      )
                    )}
                  </div>
                </section>
              )}

            {/* THEME */}
            {lesson.theme && (
              <section className="rounded-2xl border border-[#cbd9df] bg-[#edf5f8] p-6 shadow-sm">
                <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#426a7d]">
                  Lesson Theme
                </p>

                <p className="mt-3 font-serif text-xl leading-relaxed text-[#31586b]">
                  {lesson.theme}
                </p>
              </section>
            )}

            {/* RESOURCES */}
            <ResourceSection
              title="Elementary Math"
              description="Elementary worksheets, guided practice, and student materials."
              resources={resources?.elementary}
              lessonId={lessonId}
            />

            <ResourceSection
              title="Middle School Math"
              description="Middle school lessons, practice, and student materials."
              resources={resources?.middleSchool}
              lessonId={lessonId}
            />

            <ResourceSection
              title="Practice"
              description="Practice problems, review sheets, drills, and skill reinforcement."
              resources={resources?.practice}
              lessonId={lessonId}
            />

            <ResourceSection
              title="Activities & Applications"
              description="Hands-on math, games, real-world applications, and enrichment activities."
              resources={resources?.activities}
              lessonId={lessonId}
            />

            <ResourceSection
              title="Assessments"
              description="Quizzes, tests, mastery checks, and other assessments."
              resources={resources?.assessments}
              lessonId={lessonId}
            />

            <ResourceSection
              title="Teacher Resources"
              description="Answer keys, teaching notes, lesson guidance, and parent resources."
              resources={resources?.teacher}
              lessonId={lessonId}
            />

            {/* EMPTY RESOURCE STATE */}
            {totalResources === 0 && (
              <section className="rounded-2xl border border-dashed border-[#9fb5bf] bg-white p-8 text-center">
                <h2 className="font-serif text-2xl font-bold text-[#082f52]">
                  No Downloadable Resources Yet
                </h2>

                <p className="mx-auto mt-2 max-w-xl text-sm leading-relaxed text-slate-500">
                  This Math lesson is published, but no
                  worksheets, practice pages, activities,
                  assessments, or teacher resources have
                  been added yet.
                </p>
              </section>
            )}

          </div>

          {/* SIDEBAR */}
          <aside className="space-y-5">
            <section className="rounded-2xl border border-[#cbd9df] bg-white p-5 shadow-sm">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#426a7d]">
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
              href={`/math?week=${lesson.week}`}
              className="block rounded-xl bg-[#426a7d] px-5 py-3 text-center font-bold text-white shadow-sm transition hover:bg-[#31586b]"
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
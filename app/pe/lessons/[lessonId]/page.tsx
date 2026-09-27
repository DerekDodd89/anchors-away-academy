import { notFound } from "next/navigation";

import AcademyHeader from "@/components/home/AcademyHeader";
import AcademyFooter from "@/components/home/AcademyFooter";

import {
  getPELesson,
  type PEResource,
} from "@/lib/peLessons";

type PageProps = {
  params: Promise<{
    lessonId: string;
  }>;
};

type ResourceSectionProps = {
  title: string;
  description: string;
  resources?: PEResource[];
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
    <section className="rounded-2xl border border-[#d2ddcc] bg-white p-6 shadow-sm">
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
            href={`/pe/resources/${lessonId}/${encodeURIComponent(
              resource.file
            )}`}
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-between rounded-xl border border-[#d2ddcc] bg-[#f2f5ed] px-4 py-3 transition hover:border-[#56704a] hover:bg-[#edf2e9]"
          >
            <span className="font-semibold text-[#48613e]">
              {resource.title}
            </span>

            <span className="ml-4 text-sm font-bold text-[#56704a]">
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
    <div className="rounded-xl bg-[#f2f5ed] p-4">
      <p className="text-xs font-bold uppercase tracking-wider text-[#56704a]">
        {label}
      </p>

      <p className="mt-1 font-semibold leading-relaxed text-slate-700">
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

export default async function PELessonPage({
  params,
}: PageProps) {
  const { lessonId } = await params;

  const lesson = getPELesson(lessonId);

  if (!lesson) {
    notFound();
  }

  const resources = lesson.resources;

  const totalResources =
    (resources?.student?.length ?? 0) +
    (resources?.activities?.length ?? 0) +
    (resources?.fitness?.length ?? 0) +
    (resources?.games?.length ?? 0) +
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
            "url('/images/subjects/pe.png')",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/50 to-black/70" />

        <div className="relative mx-auto flex min-h-[300px] max-w-[1500px] items-end px-6 py-10 text-white">
          <div className="max-w-4xl">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#e2eadf]">
              Anchors Away Homeschool Academy
            </p>

            <p className="mt-2 text-sm font-semibold uppercase tracking-wider text-[#edf3e9]">
              Physical Education • Week {lesson.week} • {lesson.day}
            </p>

            <h1 className="mt-2 font-serif text-4xl font-bold leading-tight md:text-5xl">
              {lesson.title}
            </h1>

            <p className="mt-3 font-serif text-xl italic text-[#edf3e9]">
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

            {/* ACTIVITY OVERVIEW */}
            <section className="rounded-2xl border border-[#d2ddcc] bg-white p-6 shadow-sm">
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#56704a]">
                P.E. Lesson
              </p>

              <h2 className="mt-2 font-serif text-3xl font-bold text-[#082f52]">
                Today&apos;s Activity
              </h2>

              <div className="mt-6 grid gap-4 md:grid-cols-2">
                {lesson.activity && (
                  <OverviewCard
                    label="Activity"
                    value={lesson.activity}
                  />
                )}

                {lesson.warmUp && (
                  <OverviewCard
                    label="Warm-Up"
                    value={lesson.warmUp}
                  />
                )}

                {lesson.skillFocus && (
                  <OverviewCard
                    label="Skill Focus"
                    value={lesson.skillFocus}
                  />
                )}

                {lesson.fitnessFocus && (
                  <OverviewCard
                    label="Fitness Focus"
                    value={lesson.fitnessFocus}
                  />
                )}

                {lesson.workout && (
                  <OverviewCard
                    label="Workout"
                    value={lesson.workout}
                  />
                )}

                {lesson.game && (
                  <OverviewCard
                    label="Game"
                    value={lesson.game}
                  />
                )}

                {lesson.outdoorActivity && (
                  <OverviewCard
                    label="Outdoor Activity"
                    value={lesson.outdoorActivity}
                  />
                )}

                {lesson.coolDown && (
                  <OverviewCard
                    label="Cool-Down"
                    value={lesson.coolDown}
                  />
                )}
              </div>
            </section>

            {/* STUDENT MODIFICATIONS */}
            {lesson.studentModifications &&
              lesson.studentModifications.length > 0 && (
                <section className="rounded-2xl border border-[#d2ddcc] bg-white p-6 shadow-sm">
                  <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#56704a]">
                    Individual Adjustments
                  </p>

                  <h2 className="mt-2 font-serif text-3xl font-bold text-[#082f52]">
                    Student Modifications
                  </h2>

                  <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                    {lesson.studentModifications.map(
                      (item) => (
                        <div
                          key={`${item.student}-${item.modification}`}
                          className="rounded-xl border border-[#d2ddcc] bg-[#f2f5ed] p-5"
                        >
                          <h3 className="font-serif text-xl font-bold text-[#082f52]">
                            {item.student}
                          </h3>

                          <p className="mt-2 text-sm leading-relaxed text-slate-700">
                            {item.modification}
                          </p>
                        </div>
                      )
                    )}
                  </div>
                </section>
              )}

            {/* THEME */}
            {lesson.theme && (
              <section className="rounded-2xl border border-[#d2ddcc] bg-[#f2f5ed] p-6 shadow-sm">
                <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#56704a]">
                  Lesson Theme
                </p>

                <p className="mt-3 font-serif text-xl leading-relaxed text-[#48613e]">
                  {lesson.theme}
                </p>
              </section>
            )}

            {/* RESOURCES */}
            <ResourceSection
              title="Student Resources"
              description="Student activity sheets, fitness logs, and lesson materials."
              resources={resources?.student}
              lessonId={lessonId}
            />

            <ResourceSection
              title="Activities"
              description="Physical activities, movement challenges, and hands-on P.E. resources."
              resources={resources?.activities}
              lessonId={lessonId}
            />

            <ResourceSection
              title="Fitness"
              description="Fitness routines, exercise guides, tracking sheets, and conditioning resources."
              resources={resources?.fitness}
              lessonId={lessonId}
            />

            <ResourceSection
              title="Games"
              description="Rules, instructions, and materials for physical education games."
              resources={resources?.games}
              lessonId={lessonId}
            />

            <ResourceSection
              title="Assessments"
              description="Skill checks, fitness assessments, progress records, and evaluations."
              resources={resources?.assessments}
              lessonId={lessonId}
            />

            <ResourceSection
              title="Teacher Resources"
              description="Teaching notes, activity instructions, adaptations, and parent resources."
              resources={resources?.teacher}
              lessonId={lessonId}
            />

            {/* EMPTY RESOURCE STATE */}
            {totalResources === 0 && (
              <section className="rounded-2xl border border-dashed border-[#a8bba0] bg-white p-8 text-center">
                <h2 className="font-serif text-2xl font-bold text-[#082f52]">
                  No Downloadable Resources Yet
                </h2>

                <p className="mx-auto mt-2 max-w-xl text-sm leading-relaxed text-slate-500">
                  This P.E. lesson is published, but no
                  activity sheets, fitness resources, games,
                  assessments, or teacher materials have
                  been added yet.
                </p>
              </section>
            )}

          </div>

          {/* SIDEBAR */}
          <aside className="space-y-5">

            <section className="rounded-2xl border border-[#d2ddcc] bg-white p-5 shadow-sm">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#56704a]">
                Activity Details
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

                {lesson.duration && (
                  <Detail
                    label="Duration"
                    value={lesson.duration}
                  />
                )}

                {lesson.equipment && (
                  <Detail
                    label="Equipment"
                    value={lesson.equipment}
                  />
                )}

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
                    value={String(lesson.lessonNumber)}
                  />
                )}

                <Detail
                  label="Resources"
                  value={String(totalResources)}
                />
              </dl>
            </section>

            <a
              href={`/pe?week=${lesson.week}`}
              className="block rounded-xl bg-[#56704a] px-5 py-3 text-center font-bold text-white shadow-sm transition hover:bg-[#48613e]"
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
import AcademyHeader from "@/components/home/AcademyHeader";
import AcademyFooter from "@/components/home/AcademyFooter";

import PEHero from "@/components/pe/PEHero";
import WeekControls from "@/components/pe/WeekControls";
import WeekDashboard from "@/components/pe/WeekDashboard";

import {
  createPELessonId,
  getPELesson,
} from "@/lib/peLessons";

type PageProps = {
  searchParams: Promise<{
    week?: string;
  }>;
};

const weeks = [
  { week: 1, dates: "August 17–21, 2026" },
  { week: 2, dates: "August 24–28, 2026" },
  { week: 3, dates: "August 31–September 4, 2026" },
  { week: 4, dates: "September 7–11, 2026" },
  { week: 5, dates: "September 14–18, 2026" },
  { week: 6, dates: "September 21–25, 2026" },
  { week: 7, dates: "September 28–October 2, 2026" },
  { week: 8, dates: "October 5–9, 2026" },
  { week: 9, dates: "October 12–16, 2026" },
  { week: 10, dates: "October 19–23, 2026" },
  { week: 11, dates: "October 26–30, 2026" },
  { week: 12, dates: "November 2–6, 2026" },
];

const days = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
];

export default async function PEPage({
  searchParams,
}: PageProps) {
  const params = await searchParams;

  const requestedWeek = Number(params.week);

  const selectedWeek =
    requestedWeek >= 1 &&
    requestedWeek <= 12
      ? requestedWeek
      : 6;

  const weekInfo =
    weeks.find(
      (item) =>
        item.week === selectedWeek
    ) ?? weeks[5];

  const lessons = days.map(
    (day) => {
      const lessonId =
        createPELessonId(
          selectedWeek,
          day
        );

      return getPELesson(
        lessonId
      );
    }
  );

  return (
    <main className="min-h-screen bg-[#f4f1e9] text-slate-900">
      <AcademyHeader />

      <PEHero />

      <WeekControls />

      {/* WEEK INTRODUCTION */}
      <section className="mx-auto max-w-[1280px] px-5 pb-2 pt-8 text-center">
        <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#56704a]">
          Semester 1
        </p>

        <h2 className="mt-2 font-serif text-4xl font-bold text-[#082f52]">
          Week {selectedWeek}
        </h2>

        <p className="mt-1 text-sm font-semibold text-slate-500">
          {weekInfo.dates}
        </p>

        <p className="mt-4 font-serif text-xl italic text-[#56704a]">
          Move • Strengthen • Play • Grow
        </p>

        <p className="mt-1 text-sm font-bold uppercase tracking-[0.22em] text-[#082f52]">
          Anchors Away P.E.
        </p>
      </section>

      {/* WEEK DASHBOARD */}
      <section className="mx-auto max-w-[1280px] px-5 pb-12">
        <WeekDashboard
          selectedWeek={selectedWeek}
          lessons={lessons}
        />
      </section>

      <AcademyFooter />
    </main>
  );
}
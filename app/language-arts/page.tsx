import AcademyHeader from "@/components/home/AcademyHeader";
import AcademyFooter from "@/components/home/AcademyFooter";

import LanguageArtsHero from "@/components/language-arts/LanguageArtsHero";
import WeekControls from "@/components/language-arts/WeekControls";
import WeekDashboard from "@/components/language-arts/WeekDashboard";

import {
  createLanguageArtsLessonId,
  getLanguageArtsLesson,
} from "@/lib/languageArtsLessons";

const weeks = {
  1: "August 17 – August 21, 2026",
  2: "August 24 – August 28, 2026",
  3: "August 31 – September 4, 2026",
  4: "September 7 – September 11, 2026",
  5: "September 14 – September 18, 2026",
  6: "September 21 – September 25, 2026",
  7: "September 28 – October 2, 2026",
  8: "October 5 – October 9, 2026",
  9: "October 12 – October 16, 2026",
  10: "October 19 – October 23, 2026",
  11: "October 26 – October 30, 2026",
  12: "November 2 – November 6, 2026",
} as const;

const days = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
];

type PageProps = {
  searchParams: Promise<{
    week?: string;
  }>;
};

export default async function LanguageArtsPage({
  searchParams,
}: PageProps) {
  const params = await searchParams;

  const requestedWeek = Number(params.week);

  const selectedWeek =
    requestedWeek >= 1 &&
    requestedWeek <= 12
      ? requestedWeek
      : 6;

  const weekDates =
    weeks[selectedWeek as keyof typeof weeks];

  /*
    Load Monday-Friday lesson metadata.

    If lesson.json does not exist,
    getLanguageArtsLesson returns null
    and the dashboard shows that day
    as unpublished.
  */
  const lessons = days.map((day) => {
    const lessonId =
      createLanguageArtsLessonId(
        selectedWeek,
        day
      );

    return getLanguageArtsLesson(
      lessonId
    );
  });

  return (
    <main className="min-h-screen bg-[#f4f1e9] text-slate-900">
      <AcademyHeader />

      {/* LANGUAGE ARTS HERO */}
      <LanguageArtsHero />

      {/* WEEK NAVIGATION */}
      <WeekControls />

      {/* WEEK CONTENT */}
      <section className="px-5 py-8">
        <div className="mx-auto max-w-[1500px]">

          {/* WEEK HEADING */}
          <div className="text-center">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#7a4f72]">
              Semester 1
            </p>

            <h1 className="mt-1 font-serif text-5xl font-bold text-[#082f52]">
              Week {selectedWeek}
            </h1>

            <p className="mt-1 font-serif text-lg text-slate-600">
              {weekDates}
            </p>

            <p className="mt-3 font-serif text-xl italic text-[#684660]">
              Read. Think. Write. Communicate.
            </p>

            <p className="mt-1 text-sm text-slate-500">
              Anchors Away Language Arts
            </p>
          </div>

          {/* MONDAY-FRIDAY DASHBOARD */}
          <WeekDashboard
            selectedWeek={selectedWeek}
            lessons={lessons}
          />

        </div>
      </section>

      <AcademyFooter />
    </main>
  );
}
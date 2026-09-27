import AcademyFooter from "@/components/home/AcademyFooter";
import AcademyHeader from "@/components/home/AcademyHeader";
import AcademyHero from "@/components/home/AcademyHero";
import SubjectGrid from "@/components/home/SubjectGrid";
import CalendarButton from "@/components/calendar/CalendarButton";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f4f1e9] text-slate-900">
      <AcademyHeader />

      <AcademyHero />

      {/* ACADEMY CALENDAR */}
      <section className="mx-auto max-w-[1280px] px-5 pt-6">
        <div className="flex justify-end">
          <CalendarButton />
        </div>
      </section>

      <SubjectGrid />

      <AcademyFooter />
    </main>
  );
}
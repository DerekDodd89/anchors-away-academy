const week = [
  ["Mon", "Hebrews 2:1–4 — Don't Drift Away"],
  ["Tue", "Bible Skills — Books of the Bible"],
  ["Wed", "Hebrews 11:1–7 — Faithful Example"],
  ["Thu", "Hebrews 1:1–3 — The Voice of God"],
  ["Fri", "Weekly Review — Stand Firm"],
];

const upcoming = [
  ["Week 7", "Faith That Pleases God"],
  ["Week 8", "Heroes of Faith"],
  ["Week 9", "Obedience and Trust"],
  ["Week 10", "The Life of Christ"],
];

const resources = [
  "Books of the Bible Cards",
  "Memory Verses",
  "Bible Songs",
  "Bible Games & Activities",
  "Maps & Timeline",
  "Printables",
  "Teacher Helps",
];

export default function BibleResources() {
  return (
    <div className="mt-6 grid gap-5 lg:grid-cols-3">
      <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="font-serif text-2xl font-bold text-[#082f52]">
          📅 This Week at a Glance
        </h2>

        <div className="mt-4 space-y-3">
          {week.map(([day, lesson]) => (
            <div
              key={day}
              className="grid grid-cols-[45px_1fr] items-start gap-3 text-sm"
            >
              <strong className="rounded bg-[#edf5f9] px-2 py-1 text-center text-[#0b4a73]">
                {day}
              </strong>
              <span>{lesson}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="font-serif text-2xl font-bold text-[#082f52]">
          📅 Upcoming Weeks
        </h2>

        <div className="mt-4 divide-y divide-slate-100">
          {upcoming.map(([weekNumber, title]) => (
            <div
              key={weekNumber}
              className="flex justify-between gap-4 py-3 text-sm"
            >
              <strong>{weekNumber}</strong>
              <span className="font-serif italic text-slate-600">{title}</span>
            </div>
          ))}
        </div>

        <button className="mt-4 w-full rounded-lg bg-[#0b4a73] px-4 py-3 font-semibold text-white">
          View Full Semester →
        </button>
      </section>

      <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="font-serif text-2xl font-bold text-[#082f52]">
          📚 Bible Resources
        </h2>

        <div className="mt-4 divide-y divide-slate-100">
          {resources.map((resource) => (
            <a
              key={resource}
              href="#"
              className="flex items-center justify-between py-3 text-sm transition hover:text-[#0b4a73]"
            >
              <span>{resource}</span>
              <span>›</span>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}
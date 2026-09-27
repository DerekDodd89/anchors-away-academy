const subjects = [
  {
    title: "Bible",
    href: "/bible",
    image: "/images/subjects/bible.png",
    icon: "📖",
    description: "Know His Word.",
    action: "Explore Bible",
    accent: "text-sky-300",
  },
  {
    title: "History",
    href: "/history",
    image: "/images/subjects/history.png",
    icon: "🏛️",
    description: "Discover the story of our world.",
    action: "Explore History",
    accent: "text-amber-300",
  },
  {
    title: "Science",
    href: "/science",
    image: "/images/subjects/science.png",
    icon: "⚗️",
    description: "Explore God's creation.",
    action: "Explore Science",
    accent: "text-emerald-300",
  },
  {
    title: "Foreign Languages",
    href: "/foreign-languages",
    image: "/images/subjects/foreign-languages.png",
    icon: "🌐",
    description: "Discover languages and cultures.",
    action: "Explore Languages",
    accent: "text-purple-300",
  },
  {
    title: "Art",
    href: "/art",
    image: "/images/subjects/art.png",
    icon: "🎨",
    description: "Create with purpose.",
    action: "Explore Art",
    accent: "text-pink-300",
  },
  {
    title: "Language Arts",
    href: "/language-arts",
    image: "/images/subjects/language-arts.png",
    icon: "✏️",
    description: "Read. Write. Communicate.",
    action: "Explore Language Arts",
    accent: "text-sky-300",
  },
  {
    title: "Math",
    href: "/math",
    image: "/images/subjects/math.png",
    icon: "➗",
    description: "Seek understanding through order.",
    action: "Explore Math",
    accent: "text-teal-300",
  },
  {
    title: "P.E.",
    href: "/pe",
    image: "/images/subjects/pe.png",
    icon: "🏃",
    description: "Move. Play. Grow.",
    action: "Explore P.E.",
    accent: "text-orange-300",
  },
];

export default function SubjectGrid() {
  return (
    <section id="subjects" className="bg-[#f4f1e9] px-6 py-12">
      <div className="mx-auto max-w-[1400px]">
        <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#164c7e]">
          Explore the Academy
        </p>

        <h2 className="mt-2 font-serif text-4xl font-bold text-slate-950">
          Class Subjects
        </h2>

        <p className="mt-2 max-w-3xl font-serif text-lg text-slate-600">
          Biblically rooted, classically inspired, and created for real
          families. Explore lessons, activities, projects, and resources
          across the Academy.
        </p>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {subjects.map((subject) => (
            <a
              key={subject.title}
              href={subject.href}
              className="group relative min-h-[320px] overflow-hidden rounded-xl border border-slate-900/10 bg-slate-950 shadow-lg transition duration-300 hover:-translate-y-1 hover:shadow-2xl"
            >
              <div
                className="absolute inset-0 bg-cover bg-center transition duration-500 group-hover:scale-105"
                style={{
                  backgroundImage: `url('${subject.image}')`,
                }}
              />

              <div className="absolute inset-0 bg-black/15" />

              <div className="absolute inset-0 bg-gradient-to-b from-black/5 via-black/10 to-black/90" />

              <div className="relative flex min-h-[320px] flex-col justify-between p-5 text-white">
                <div>
                  <div className="text-2xl drop-shadow-lg">
                    {subject.icon}
                  </div>

                  <h3 className="mt-2 max-w-[95%] font-serif text-3xl font-bold leading-[0.95] drop-shadow-lg">
                    {subject.title}
                  </h3>
                </div>

                <div>
                  <p className="font-serif text-lg font-medium drop-shadow-lg">
                    {subject.description}
                  </p>

                  <div
                    className={`mt-2 text-sm font-bold ${subject.accent} drop-shadow-md`}
                  >
                    {subject.action} →
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
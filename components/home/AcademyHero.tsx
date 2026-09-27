export default function AcademyHero() {
  return (
    <section
      className="relative overflow-hidden border-b border-amber-900/20 bg-cover bg-center"
      style={{
        backgroundImage: "url('/images/home/academy-hero.png')",
      }}
    >
      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/35 to-black/60" />

      <div className="relative mx-auto grid min-h-[340px] max-w-[1500px] grid-cols-1 items-center gap-8 px-6 py-10 lg:grid-cols-[250px_1fr_230px]">
        {/* Scripture Card */}
        <aside className="rounded-xl border border-amber-200/50 bg-[#e8d0a5]/95 p-6 text-center text-[#342416] shadow-xl backdrop-blur-sm">
          <p className="font-serif text-xl leading-relaxed">
            “Train up a child
            <br />
            in the way he should go,
            <br />
            and when he is old
            <br />
            he will not depart from it.”
          </p>

          <p className="mt-4 font-serif font-bold italic">Proverbs 22:6</p>
        </aside>

        {/* Center Hero */}
        <div className="text-center text-white">
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.35em] text-amber-200">
            Rooted in Truth • Learning for Life
          </p>

          <h1 className="font-serif text-5xl font-bold tracking-wide drop-shadow-lg md:text-6xl">
            ANCHORS AWAY
          </h1>

          <div className="mt-1 text-xl font-medium tracking-[0.35em] drop-shadow-md md:text-2xl">
            HOMESCHOOL ACADEMY
          </div>

          <p className="mt-3 font-serif text-xl italic text-amber-50 drop-shadow-md">
            Learning together. Growing in faith. Exploring God&apos;s world.
          </p>

          {/* Search */}
          <div className="mx-auto mt-7 flex max-w-3xl overflow-hidden rounded-lg bg-white shadow-2xl">
            <input
              className="min-w-0 flex-1 px-5 py-4 text-sm text-slate-800 outline-none"
              placeholder="Search lessons, subjects, printables, and more..."
              type="text"
            />

            <select
              className="hidden border-l border-slate-200 bg-white px-5 text-sm text-slate-700 sm:block"
              defaultValue="all"
            >
              <option value="all">All Subjects</option>
              <option>Bible</option>
              <option>History</option>
              <option>Science</option>
              <option>Foreign Languages</option>
              <option>Art</option>
              <option>Language Arts</option>
              <option>Math</option>
              <option>P.E.</option>
            </select>

            <button className="bg-[#0b3b68] px-7 font-semibold text-white transition hover:bg-[#082b4c]">
              Search
            </button>
          </div>

          {/* Quick Links */}
          <div className="mt-4 flex flex-wrap justify-center gap-x-5 gap-y-2 text-xs font-medium text-white drop-shadow-md">
            <span className="font-bold text-amber-200">Quick Links:</span>
            <a className="hover:text-amber-200" href="#subjects">
              Bible
            </a>
            <a className="hover:text-amber-200" href="#subjects">
              History
            </a>
            <a className="hover:text-amber-200" href="#subjects">
              Science
            </a>
            <a className="hover:text-amber-200" href="#subjects">
              Languages
            </a>
            <a className="hover:text-amber-200" href="#subjects">
              Art
            </a>
            <a className="hover:text-amber-200" href="#subjects">
              Language Arts
            </a>
            <a className="hover:text-amber-200" href="#subjects">
              Math
            </a>
            <a className="hover:text-amber-200" href="#subjects">
              P.E.
            </a>
          </div>
        </div>

        {/* Academy Values */}
        <aside className="hidden rounded-xl border border-amber-200/40 bg-[#2a1b10]/80 p-6 text-center text-amber-50 shadow-xl backdrop-blur-sm lg:block">
          <div className="text-3xl">⚓</div>

          <p className="mt-3 font-serif text-2xl leading-relaxed">
            Learn
            <br />
            Explore
            <br />
            Create
            <br />
            Serve
            <br />
            Together
          </p>
        </aside>
      </div>
    </section>
  );
}
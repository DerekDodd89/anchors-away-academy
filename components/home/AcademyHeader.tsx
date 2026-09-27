import Link from "next/link";

export default function AcademyHeader() {
  return (
    <header className="border-b border-amber-200/30 bg-[#08243b] text-white">
      <div className="mx-auto flex max-w-[1500px] items-center justify-between px-6 py-4">
        <div className="flex items-center gap-4">

          {/* Academy Home Button */}
          <Link
            href="/"
            aria-label="Return to Anchors Away Academy home"
            title="Home"
            className="flex h-12 w-12 items-center justify-center text-4xl transition duration-200 hover:scale-110 hover:opacity-80"
          >
            ⚓
          </Link>

          <div>
            <div className="font-serif text-2xl font-bold tracking-wide">
              ANCHORS AWAY
            </div>

            <div className="text-xs tracking-[0.3em] text-slate-200">
              HOMESCHOOL ACADEMY
            </div>
          </div>

          <div className="ml-5 hidden border-l border-amber-200/40 pl-5 font-serif italic text-amber-100 lg:block">
            Rooted in Truth. Learning for Life.
          </div>
        </div>

        <nav className="hidden items-center gap-8 text-sm font-medium lg:flex">
          <Link
            className="border-b-2 border-amber-400 pb-2 text-amber-200"
            href="/"
          >
            Home
          </Link>

          <a
            className="transition hover:text-amber-200"
            href="#"
          >
            Academy
          </a>

          <Link
            className="transition hover:text-amber-200"
            href="/#subjects"
          >
            Subjects
          </Link>

          <a
            className="transition hover:text-amber-200"
            href="#"
          >
            Resources
          </a>

          <a
            className="transition hover:text-amber-200"
            href="#"
          >
            Family Life
          </a>
        </nav>

        <button className="rounded-lg border border-amber-200/60 px-5 py-2 text-sm font-semibold transition hover:bg-white/10">
          Family Login
        </button>
      </div>
    </header>
  );
}
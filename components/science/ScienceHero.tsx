export default function ScienceHero() {
  return (
    <section
      className="relative min-h-[280px] overflow-hidden bg-cover bg-center"
      style={{
        backgroundImage:
          "url('/images/subjects/science.png')",
      }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-black/60" />

      <div className="relative mx-auto flex min-h-[280px] max-w-[1500px] items-end justify-between gap-10 px-8 py-9 text-white">

        {/* Left */}
        <div>
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.35em] text-emerald-200">
            Anchors Away Homeschool Academy
          </p>

          <h1 className="font-serif text-6xl font-bold drop-shadow-lg">
            Science
          </h1>

          <p className="mt-2 font-serif text-xl italic text-emerald-50">
            Observe • Question • Experiment • Discover
          </p>
        </div>

        {/* Right Scripture */}
        <blockquote className="hidden max-w-sm rounded-xl bg-[#e5f1e9]/95 p-5 text-center font-serif italic text-[#234437] shadow-xl lg:block">
          “The heavens declare the glory of God; and the firmament sheweth his handywork.”

          <div className="mt-2 font-bold not-italic">
            Psalm 19:1
          </div>
        </blockquote>

      </div>
    </section>
  );
}
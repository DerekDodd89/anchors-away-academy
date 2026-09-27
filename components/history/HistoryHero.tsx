export default function HistoryHero() {
  return (
    <section
      className="relative min-h-[280px] overflow-hidden bg-cover bg-center"
      style={{
        backgroundImage: "url('/images/subjects/history.png')",
      }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-black/60" />

      <div className="relative mx-auto flex min-h-[280px] max-w-[1500px] items-end justify-between gap-10 px-8 py-9 text-white">
        {/* Left */}
        <div>
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.35em] text-amber-200">
            Anchors Away Homeschool Academy
          </p>

          <h1 className="font-serif text-6xl font-bold drop-shadow-lg">
            History
          </h1>

          <p className="mt-2 font-serif text-xl italic text-amber-50">
            Explore the Past • Understand the Present • Learn from Those Before Us
          </p>
        </div>

        {/* Right Quote */}
        <blockquote className="hidden max-w-sm rounded-xl bg-[#f4e7c9]/95 p-5 text-center font-serif italic text-[#352516] shadow-xl lg:block">
          “Remember the days of old; consider the years of many generations.”
          
          <div className="mt-2 font-bold not-italic">
            Deuteronomy 32:7
          </div>
        </blockquote>
      </div>
    </section>
  );
}
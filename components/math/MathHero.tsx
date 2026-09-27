export default function MathHero() {
  return (
    <section
      className="relative min-h-[280px] overflow-hidden bg-cover bg-center"
      style={{
        backgroundImage:
          "url('/images/subjects/math.png')",
      }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/45 to-black/65" />

      <div className="relative mx-auto flex min-h-[280px] max-w-[1500px] items-end justify-between gap-10 px-8 py-9 text-white">

        {/* Left */}
        <div>
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.35em] text-[#dceaf0]">
            Anchors Away Homeschool Academy
          </p>

          <h1 className="font-serif text-5xl font-bold drop-shadow-lg md:text-6xl">
            Math
          </h1>

          <p className="mt-2 font-serif text-xl italic text-[#edf5f8]">
            Understand • Practice • Solve • Apply
          </p>
        </div>

        {/* Right Scripture */}
        <blockquote className="hidden max-w-sm rounded-xl bg-[#edf5f8]/95 p-5 text-center font-serif italic text-[#31586b] shadow-xl lg:block">
          “Teach us to number our days, that we may
          apply our hearts unto wisdom.”

          <div className="mt-2 font-bold not-italic">
            Psalm 90:12
          </div>
        </blockquote>

      </div>
    </section>
  );
}
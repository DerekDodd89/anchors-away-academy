export default function PEHero() {
  return (
    <section
      className="relative min-h-[280px] overflow-hidden bg-cover bg-center"
      style={{
        backgroundImage:
          "url('/images/subjects/pe.png')",
      }}
    >
      {/* DARK OVERLAY */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-black/65" />

      <div className="relative mx-auto flex min-h-[280px] max-w-[1500px] items-end justify-between gap-10 px-8 py-9 text-white">

        {/* LEFT */}
        <div>
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.35em] text-[#e2eadf]">
            Anchors Away Homeschool Academy
          </p>

          <h1 className="font-serif text-5xl font-bold drop-shadow-lg md:text-6xl">
            Physical Education
          </h1>

          <p className="mt-2 font-serif text-xl italic text-[#edf3e9]">
            Move • Strengthen • Play • Grow
          </p>
        </div>

        {/* SCRIPTURE */}
        <blockquote className="hidden max-w-sm rounded-xl bg-[#f2f5ed]/95 p-5 text-center font-serif italic text-[#48613e] shadow-xl lg:block">
          “For bodily exercise profiteth little:
          but godliness is profitable unto all
          things.”

          <div className="mt-2 font-bold not-italic">
            1 Timothy 4:8
          </div>
        </blockquote>

      </div>
    </section>
  );
}
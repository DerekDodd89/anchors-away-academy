export default function ArtHero() {
  return (
    <section
      className="relative min-h-[280px] overflow-hidden bg-cover bg-center"
      style={{
        backgroundImage:
          "url('/images/subjects/art.png')",
      }}
    >
      {/* Dark warm overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/45 to-black/60" />

      <div className="relative mx-auto flex min-h-[280px] max-w-[1500px] items-end justify-between gap-10 px-8 py-9 text-white">

        {/* Left */}
        <div>
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.35em] text-[#f4d7c8]">
            Anchors Away Homeschool Academy
          </p>

          <h1 className="font-serif text-6xl font-bold drop-shadow-lg">
            Art
          </h1>

          <p className="mt-2 font-serif text-xl italic text-[#fff4ed]">
            Observe • Imagine • Create • Appreciate
          </p>
        </div>

        {/* Right Scripture */}
        <blockquote className="hidden max-w-sm rounded-xl bg-[#fff4ed]/95 p-5 text-center font-serif italic text-[#6f3f2f] shadow-xl lg:block">
          “And he hath filled him with the spirit of God,
          in wisdom, in understanding, and in knowledge,
          and in all manner of workmanship.”

          <div className="mt-2 font-bold not-italic">
            Exodus 35:31
          </div>
        </blockquote>

      </div>
    </section>
  );
}
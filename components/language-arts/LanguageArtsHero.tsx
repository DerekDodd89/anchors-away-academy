export default function LanguageArtsHero() {
  return (
    <section
      className="relative min-h-[280px] overflow-hidden bg-cover bg-center"
      style={{
        backgroundImage:
          "url('/images/subjects/language-arts.png')",
      }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/45 to-black/65" />

      <div className="relative mx-auto flex min-h-[280px] max-w-[1500px] items-end justify-between gap-10 px-8 py-9 text-white">

        {/* Left */}
        <div>
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.35em] text-[#ead9e6]">
            Anchors Away Homeschool Academy
          </p>

          <h1 className="font-serif text-5xl font-bold drop-shadow-lg md:text-6xl">
            Language Arts
          </h1>

          <p className="mt-2 font-serif text-xl italic text-[#f8eef5]">
            Read • Think • Write • Communicate
          </p>
        </div>

        {/* Right Scripture */}
        <blockquote className="hidden max-w-sm rounded-xl bg-[#f8eef5]/95 p-5 text-center font-serif italic text-[#5e3f58] shadow-xl lg:block">
          “Let the words of my mouth, and the meditation
          of my heart, be acceptable in thy sight, O LORD.”

          <div className="mt-2 font-bold not-italic">
            Psalm 19:14
          </div>
        </blockquote>

      </div>
    </section>
  );
}
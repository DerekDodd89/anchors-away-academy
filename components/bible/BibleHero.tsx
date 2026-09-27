export default function BibleHero() {
  return (
    <section
      className="relative min-h-[280px] overflow-hidden bg-cover bg-center"
      style={{
        backgroundImage: "url('/images/home/academy-hero.png')",
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/25 to-black/55" />

      <div className="relative mx-auto flex min-h-[280px] max-w-[1500px] items-end justify-between gap-10 px-8 py-9 text-white">
        <div>
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.35em] text-amber-200">
            Anchors Away Homeschool Academy
          </p>

          <h1 className="font-serif text-6xl font-bold drop-shadow-lg">
            Bible Class
          </h1>

          <p className="mt-2 font-serif text-xl italic text-amber-50">
            Rooted in Truth • Growing in Faith • Living for Him
          </p>
        </div>

        <blockquote className="hidden max-w-sm rounded-xl bg-[#f4e7c9]/95 p-5 text-center font-serif italic text-[#352516] shadow-xl lg:block">
          “All Scripture is breathed out by God and profitable for teaching...”
          <div className="mt-2 font-bold not-italic">2 Timothy 3:16</div>
        </blockquote>
      </div>
    </section>
  );
}
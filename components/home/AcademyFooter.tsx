export default function AcademyFooter() {
  return (
    <footer className="border-t border-amber-200/20 bg-[#08243b] text-slate-200">
      <div className="mx-auto flex max-w-[1400px] flex-col gap-3 px-6 py-8 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left">
        <div>
          <div className="font-serif text-lg font-bold text-white">
            ⚓ Anchors Away Homeschool Academy
          </div>
          <p className="mt-1 text-xs text-slate-400">
            Rooted in Truth. Learning for Life.
          </p>
        </div>

        <p className="text-xs text-slate-400">
          Learning • Exploring • Creating • Serving Together
        </p>
      </div>
    </footer>
  );
}
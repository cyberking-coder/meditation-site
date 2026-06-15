export default function Footer() {
  const socials = ["✦", "☾", "✺", "❂"];
  return (
    <footer className="border-t border-white/10 bg-cosmos py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-6 sm:flex-row sm:justify-between">
        <span className="font-serif text-lg text-white">✦ Inner Cosmos</span>
        <div className="flex gap-5 text-muted">
          {socials.map((s, i) => (
            <a
              key={i}
              href="#"
              aria-label="social link"
              className="text-xl transition-colors hover:text-cosmos-purple"
            >
              {s}
            </a>
          ))}
        </div>
        <span className="text-sm text-muted">Inner Cosmos © 2024</span>
      </div>
    </footer>
  );
}

interface LegalPageProps {
  title: string
  paragraphs: string[]
}

export function LegalPage({ title, paragraphs }: LegalPageProps) {
  return (
    <main className="mx-auto max-w-3xl px-5 py-16">
      <h1 className="font-display text-3xl font-semibold">{title}</h1>
      <div className="mt-8 flex flex-col gap-4 text-sm leading-relaxed text-[var(--muted-foreground)]">
        {paragraphs.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>
    </main>
  )
}

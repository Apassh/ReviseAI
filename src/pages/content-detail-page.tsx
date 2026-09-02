import { Link, Navigate, useParams, useSearchParams } from 'react-router-dom'
import { ArrowLeft, BookOpen, FileStack, ListChecks, Sparkles } from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { FeatureLockBadge } from '@/components/pricing/plan-badge'
import { QuizPlayer } from '@/components/dashboard/quiz-player'
import { FlashcardDeck } from '@/components/dashboard/flashcard-deck'
import { useAuth } from '@/hooks/use-auth'
import { useContentStore } from '@/hooks/use-content-store'

export function ContentDetailPage() {
  const { contentId } = useParams()
  const [searchParams] = useSearchParams()
  const { user } = useAuth()
  const { contents, getLesson } = useContentStore()
  const content = contents.find((c) => c.id === contentId)

  if (!content || !contentId) return <Navigate to="/tableau-de-bord" replace />

  const canUseFlashcards = user.plan !== 'free'
  const { sections, keyPoints, quiz, flashcards } = getLesson(contentId)
  const requestedTab = searchParams.get('tab')
  const defaultTab = requestedTab === 'quiz' || requestedTab === 'flashcards' ? requestedTab : 'fiche'

  return (
    <main className="mx-auto max-w-3xl px-5 py-10">
      <Link to="/tableau-de-bord" className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--muted-foreground)] hover:text-brand-600">
        <ArrowLeft className="size-4" /> Retour au tableau de bord
      </Link>

      <div className="mt-4">
        <p className="text-xs font-semibold tracking-wide text-brand-600 uppercase">{content.subject}</p>
        <h1 className="mt-1 font-display text-2xl font-semibold sm:text-3xl">{content.title}</h1>
      </div>

      <Tabs defaultValue={defaultTab} className="mt-8">
        <TabsList>
          <TabsTrigger value="fiche">
            <BookOpen className="size-4" /> Fiche
          </TabsTrigger>
          <TabsTrigger value="quiz">
            <ListChecks className="size-4" /> Quiz
          </TabsTrigger>
          <TabsTrigger value="flashcards">
            <FileStack className="size-4" /> Flashcards
            {!canUseFlashcards && <FeatureLockBadge plan="premium" className="ml-0.5" />}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="fiche" className="mt-6">
          <div className="flex flex-col gap-4">
            {keyPoints.length > 0 && (
              <div className="rounded-[var(--radius-card)] border border-mint-200 bg-mint-50 p-5">
                <p className="flex items-center gap-1.5 text-xs font-semibold text-mint-800">
                  <Sparkles className="size-3.5" /> Points clés à retenir
                </p>
                <ul className="mt-2.5 flex flex-col gap-2">
                  {keyPoints.map((point, i) => (
                    <li key={i} className="flex gap-2 text-sm leading-relaxed text-ink-950/85">
                      <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-mint-500" />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {sections.map((section) => (
              <div key={section.heading} className="rounded-[var(--radius-card)] border border-[var(--border-subtle)] bg-white p-5">
                <p className="text-xs font-semibold text-brand-700">{section.heading}</p>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-950/85">{section.body}</p>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="quiz" className="mt-6">
          {quiz.length > 0 ? (
            <QuizPlayer questions={quiz} />
          ) : (
            <p className="rounded-[var(--radius-card)] border border-[var(--border-subtle)] bg-white p-6 text-center text-sm text-[var(--muted-foreground)]">
              Pas assez de contenu extrait pour générer un quiz sur ce document.
            </p>
          )}
        </TabsContent>

        <TabsContent value="flashcards" className="mt-6">
          {!canUseFlashcards ? (
            <div className="flex flex-col items-center gap-3 rounded-[var(--radius-card)] border border-dashed border-gold-400/60 bg-white p-10 text-center">
              <FeatureLockBadge plan="premium" />
              <h3 className="font-display text-lg font-semibold">Flashcards réservées à Premium</h3>
              <p className="max-w-sm text-sm text-[var(--muted-foreground)]">
                Passe à la formule Premium pour mémoriser ce cours par répétition espacée avec des flashcards illimitées.
              </p>
              <Button asChild className="mt-1">
                <Link to="/abonnement">Débloquer Premium</Link>
              </Button>
            </div>
          ) : flashcards.length > 0 ? (
            <FlashcardDeck cards={flashcards} />
          ) : (
            <p className="rounded-[var(--radius-card)] border border-[var(--border-subtle)] bg-white p-6 text-center text-sm text-[var(--muted-foreground)]">
              Pas assez de contenu extrait pour générer des flashcards sur ce document.
            </p>
          )}
        </TabsContent>
      </Tabs>
    </main>
  )
}

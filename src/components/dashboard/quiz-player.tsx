import { useState } from 'react'
import { CheckCircle2, RotateCcw, XCircle } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import type { QuizQuestion } from '@/lib/types'

export function QuizPlayer({ questions }: { questions: QuizQuestion[] }) {
  const [step, setStep] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [score, setScore] = useState(0)
  const [finished, setFinished] = useState(false)

  const question = questions[step]
  const isLast = step === questions.length - 1

  function handleSelect(index: number) {
    if (selected !== null) return
    setSelected(index)
    if (index === question.correctIndex) setScore((s) => s + 1)
  }

  function handleNext() {
    if (isLast) {
      setFinished(true)
      return
    }
    setStep((s) => s + 1)
    setSelected(null)
  }

  function handleRestart() {
    setStep(0)
    setSelected(null)
    setScore(0)
    setFinished(false)
  }

  if (finished) {
    const percent = Math.round((score / questions.length) * 100)
    return (
      <div className="flex flex-col items-center gap-4 rounded-[var(--radius-card)] border border-[var(--border-subtle)] bg-white p-10 text-center">
        <span className="inline-flex size-14 items-center justify-center rounded-full bg-mint-gradient text-white">
          <CheckCircle2 className="size-7" />
        </span>
        <h3 className="font-display text-xl font-semibold">Quiz terminé !</h3>
        <p className="text-[var(--muted-foreground)]">
          Tu as obtenu <span className="font-semibold text-ink-950">{score}/{questions.length}</span> bonnes réponses ({percent}%)
        </p>
        <Button variant="outline" onClick={handleRestart}>
          <RotateCcw className="size-4" /> Recommencer le quiz
        </Button>
      </div>
    )
  }

  return (
    <div className="rounded-[var(--radius-card)] border border-[var(--border-subtle)] bg-white p-6 sm:p-8">
      <div className="flex items-center justify-between text-xs font-medium text-[var(--muted-foreground)]">
        <span>Question {step + 1} / {questions.length}</span>
        <span>{score} bonne{score > 1 ? 's' : ''} réponse{score > 1 ? 's' : ''}</span>
      </div>
      <Progress value={((step + (selected !== null ? 1 : 0)) / questions.length) * 100} className="mt-2" />

      <h3 className="mt-6 font-display text-lg font-semibold text-balance">{question.question}</h3>

      <div className="mt-5 flex flex-col gap-2.5">
        {question.options.map((option, index) => {
          const isCorrect = index === question.correctIndex
          const isSelected = index === selected
          const showFeedback = selected !== null

          return (
            <button
              key={option}
              type="button"
              onClick={() => handleSelect(index)}
              disabled={showFeedback}
              className={cn(
                'flex items-center justify-between rounded-xl border px-4 py-3 text-left text-sm font-medium transition-colors',
                !showFeedback && 'border-[var(--border-subtle)] hover:border-brand-300 hover:bg-brand-50',
                showFeedback && isCorrect && 'border-mint-400 bg-mint-50 text-mint-800',
                showFeedback && isSelected && !isCorrect && 'border-rose-accent-300 bg-rose-accent-50 text-rose-accent-700',
                showFeedback && !isCorrect && !isSelected && 'border-[var(--border-subtle)] opacity-60',
              )}
            >
              {option}
              {showFeedback && isCorrect && <CheckCircle2 className="size-4.5 shrink-0 text-mint-600" />}
              {showFeedback && isSelected && !isCorrect && <XCircle className="size-4.5 shrink-0 text-rose-accent-600" />}
            </button>
          )
        })}
      </div>

      {selected !== null && (
        <div className="mt-5 rounded-xl bg-[var(--muted)] p-4">
          <p className="text-sm text-ink-950/85">{question.explanation}</p>
          <Button size="sm" className="mt-3" onClick={handleNext}>
            {isLast ? 'Voir mon score' : 'Question suivante'}
          </Button>
        </div>
      )}
    </div>
  )
}

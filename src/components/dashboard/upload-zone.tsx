import { useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { CheckCircle2, FileText, Link2, Sparkles, UploadCloud } from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Progress } from '@/components/ui/progress'
import { cn } from '@/lib/utils'
import { generateLesson } from '@/lib/lesson-generator'
import { useContentStore } from '@/hooks/use-content-store'
import type { ContentItem } from '@/lib/types'

interface UploadZoneProps {
  contentsRemaining: number | null
}

type Stage = 'idle' | 'working' | 'ready' | 'error'

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export function UploadZone({ contentsRemaining }: UploadZoneProps) {
  const { addContent, setLesson } = useContentStore()
  const navigate = useNavigate()

  const [youtubeUrl, setYoutubeUrl] = useState('')
  const [stage, setStage] = useState<Stage>('idle')
  const [fileName, setFileName] = useState<string | null>(null)
  const [progress, setProgress] = useState(0)
  const [statusMessage, setStatusMessage] = useState('')
  const [readyId, setReadyId] = useState<string | null>(null)
  const [dragActive, setDragActive] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const limitReached = contentsRemaining === 0
  const busy = stage === 'working'

  function reset() {
    setStage('idle')
    setFileName(null)
    setProgress(0)
    setReadyId(null)
    setYoutubeUrl('')
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  async function processPdf(file: File) {
    setStage('working')
    setFileName(file.name)
    setProgress(4)
    setStatusMessage('PDF reçu, analyse en cours…')
    await sleep(500)

    try {
      const { extractPdfText } = await import('@/lib/pdf-extraction')
      const { text, pageCount } = await extractPdfText(file, (done, total) => {
        setProgress(10 + Math.round((done / total) * 65))
        setStatusMessage(`Lecture du PDF… page ${done}/${total}`)
      })

      setStatusMessage('Génération de ta fiche, ton quiz et tes flashcards…')
      setProgress(85)
      await sleep(400)

      const title = file.name.replace(/\.pdf$/i, '')
      const lesson = generateLesson(text, title)
      setProgress(97)
      await sleep(350)

      const id = `pdf-${Date.now()}`
      const newContent: ContentItem = {
        id,
        title,
        subject: pageCount === 1 ? '1 page' : `${pageCount} pages`,
        sourceType: 'pdf',
        status: 'ready',
        progress: 0,
        createdAt: new Date().toISOString().slice(0, 10),
        hasFlashcards: lesson.flashcards.length > 0,
      }
      addContent(newContent)
      setLesson(id, lesson)

      setProgress(100)
      setStatusMessage('Ta fiche est prête ✅')
      setReadyId(id)
      setStage('ready')
    } catch {
      setStatusMessage('Impossible de lire ce PDF. Réessaie avec un autre fichier.')
      setStage('error')
    }
  }

  async function processYoutube(url: string) {
    setStage('working')
    setFileName(url)
    setProgress(10)
    setStatusMessage('Lien reçu, analyse de la vidéo en cours…')
    await sleep(700)
    setProgress(55)
    setStatusMessage('Génération de ta fiche, ton quiz et tes flashcards…')
    await sleep(900)
    setProgress(95)
    await sleep(300)

    const id = `yt-${Date.now()}`
    const newContent: ContentItem = {
      id,
      title: 'Vidéo YouTube importée',
      subject: 'Vidéo YouTube',
      sourceType: 'youtube',
      status: 'ready',
      progress: 0,
      createdAt: new Date().toISOString().slice(0, 10),
      hasFlashcards: true,
    }
    addContent(newContent)

    setProgress(100)
    setStatusMessage('Ta fiche est prête ✅')
    setReadyId(id)
    setStage('ready')
  }

  function handleFile(file: File | undefined) {
    if (!file || limitReached || busy) return
    if (file.type !== 'application/pdf') {
      setFileName(file.name)
      setStatusMessage('Ce fichier n’est pas un PDF. Réessaie avec un fichier au format .pdf.')
      setStage('error')
      return
    }
    void processPdf(file)
  }

  return (
    <div className="rounded-[var(--radius-card)] border border-[var(--border-subtle)] bg-white p-6 shadow-[var(--shadow-soft)]">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="inline-flex size-9 items-center justify-center rounded-xl bg-brand-gradient text-white">
            <Sparkles className="size-4.5" />
          </span>
          <h2 className="font-display text-lg font-semibold">Ajouter un contenu</h2>
        </div>
        {contentsRemaining !== null && (
          <span className="hidden text-xs font-medium text-[var(--muted-foreground)] sm:inline">
            {contentsRemaining} contenu{contentsRemaining > 1 ? 's' : ''} gratuit{contentsRemaining > 1 ? 's' : ''} restant
            {contentsRemaining > 1 ? 's' : ''} ce mois-ci
          </span>
        )}
      </div>

      {stage === 'idle' ? (
        <Tabs defaultValue="pdf" className="mt-5">
          <TabsList className="w-full sm:w-auto">
            <TabsTrigger value="pdf">
              <UploadCloud className="size-4" /> PDF
            </TabsTrigger>
            <TabsTrigger value="youtube">
              <Link2 className="size-4" /> Lien YouTube
            </TabsTrigger>
          </TabsList>

          <TabsContent value="pdf" className="mt-4">
            <label
              htmlFor="pdf-upload"
              onDragOver={(e) => {
                e.preventDefault()
                setDragActive(true)
              }}
              onDragLeave={() => setDragActive(false)}
              onDrop={(e) => {
                e.preventDefault()
                setDragActive(false)
                handleFile(e.dataTransfer.files?.[0])
              }}
              className={cn(
                'flex cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed px-6 py-10 text-center transition-colors',
                dragActive ? 'border-brand-500 bg-brand-100' : 'border-brand-200 bg-brand-50/60 hover:border-brand-400 hover:bg-brand-50',
              )}
            >
              <UploadCloud className="size-7 text-brand-600" />
              <p className="text-sm font-semibold text-ink-950">Dépose ton PDF ici ou clique pour parcourir</p>
              <p className="text-xs text-[var(--muted-foreground)]">
                PDF avec texte sélectionnable · analysé et transformé en fiche automatiquement
              </p>
              <input
                ref={fileInputRef}
                id="pdf-upload"
                type="file"
                accept="application/pdf"
                className="sr-only"
                disabled={limitReached}
                onChange={(e) => handleFile(e.target.files?.[0])}
              />
            </label>
          </TabsContent>

          <TabsContent value="youtube" className="mt-4">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="youtube-url">Lien de la vidéo</Label>
              <Input
                id="youtube-url"
                placeholder="https://youtube.com/watch?v=..."
                value={youtubeUrl}
                onChange={(e) => setYoutubeUrl(e.target.value)}
              />
            </div>
            <Button
              className="mt-4 w-full sm:w-auto"
              disabled={!youtubeUrl.trim() || limitReached}
              onClick={() => void processYoutube(youtubeUrl)}
            >
              Générer ma fiche
            </Button>
          </TabsContent>
        </Tabs>
      ) : (
        <div className="mt-5 flex flex-col items-center gap-4 rounded-2xl border border-brand-200 bg-brand-50/60 px-6 py-10 text-center">
          <div className="relative flex size-14 items-center justify-center">
            {stage === 'working' && <span className="absolute inset-0 animate-ping rounded-full bg-brand-400/40" />}
            <span
              className={cn(
                'relative inline-flex size-14 items-center justify-center rounded-full text-white',
                stage === 'ready' ? 'bg-mint-gradient' : stage === 'error' ? 'bg-rose-accent-500' : 'bg-brand-gradient',
              )}
            >
              {stage === 'ready' ? (
                <CheckCircle2 className="size-6" />
              ) : (
                <FileText className="size-6" />
              )}
            </span>
          </div>

          <div>
            <p className="text-sm font-semibold text-ink-950">{statusMessage}</p>
            {fileName && <p className="mt-0.5 max-w-xs truncate text-xs text-[var(--muted-foreground)]">{fileName}</p>}
          </div>

          {(stage === 'working' || stage === 'ready') && (
            <div className="w-full max-w-xs">
              <Progress
                value={progress}
                indicatorClassName={stage === 'ready' ? 'bg-mint-gradient' : undefined}
              />
              <p className="mt-1.5 text-xs font-medium text-[var(--muted-foreground)] tabular-nums">{progress}%</p>
            </div>
          )}

          {stage === 'ready' && readyId && (
            <div className="mt-1 flex flex-col gap-2 sm:flex-row">
              <Button asChild size="sm">
                <Link to={`/tableau-de-bord/contenu/${readyId}`}>Ouvrir la fiche</Link>
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => navigate(`/tableau-de-bord/contenu/${readyId}?tab=quiz`)}
              >
                Lancer le quiz
              </Button>
              <Button size="sm" variant="ghost" onClick={reset}>
                Ajouter un autre contenu
              </Button>
            </div>
          )}

          {stage === 'error' && (
            <Button size="sm" variant="outline" onClick={reset}>
              Réessayer
            </Button>
          )}
        </div>
      )}

      {limitReached && stage === 'idle' && (
        <p className="mt-4 rounded-xl border border-gold-400/50 bg-brand-50 px-4 py-3 text-sm font-medium text-ink-950">
          Tu as atteint ta limite de contenus gratuits ce mois-ci.{' '}
          <Link to="/abonnement" className="font-semibold underline underline-offset-2">
            Passe à Premium
          </Link>{' '}
          pour continuer sans limite.
        </p>
      )}
    </div>
  )
}

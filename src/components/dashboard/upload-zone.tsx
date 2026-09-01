import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FileUp, Link2, Sparkles, UploadCloud } from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface UploadZoneProps {
  onAddContent: () => void
  contentsRemaining: number | null
}

export function UploadZone({ onAddContent, contentsRemaining }: UploadZoneProps) {
  const [youtubeUrl, setYoutubeUrl] = useState('')
  const [fileName, setFileName] = useState<string | null>(null)

  const limitReached = contentsRemaining === 0

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

      <Tabs defaultValue="pdf" className="mt-5">
        <TabsList className="w-full sm:w-auto">
          <TabsTrigger value="pdf">
            <FileUp className="size-4" /> PDF
          </TabsTrigger>
          <TabsTrigger value="youtube">
            <Link2 className="size-4" /> Lien YouTube
          </TabsTrigger>
        </TabsList>

        <TabsContent value="pdf" className="mt-4">
          <label
            htmlFor="pdf-upload"
            className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-brand-200 bg-brand-50/60 px-6 py-10 text-center transition-colors hover:border-brand-400 hover:bg-brand-50"
          >
            <UploadCloud className="size-7 text-brand-600" />
            <p className="text-sm font-semibold text-ink-950">
              {fileName ?? 'Dépose ton PDF ici ou clique pour parcourir'}
            </p>
            <p className="text-xs text-[var(--muted-foreground)]">PDF jusqu’à 50 Mo</p>
            <input
              id="pdf-upload"
              type="file"
              accept="application/pdf"
              className="sr-only"
              onChange={(e) => setFileName(e.target.files?.[0]?.name ?? null)}
            />
          </label>
          <Button className="mt-4 w-full sm:w-auto" disabled={!fileName || limitReached} onClick={onAddContent}>
            Générer ma fiche
          </Button>
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
            onClick={onAddContent}
          >
            Générer ma fiche
          </Button>
        </TabsContent>
      </Tabs>

      {limitReached && (
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

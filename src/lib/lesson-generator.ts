import type { Flashcard, QuizQuestion, RevisionSection } from './types'

export interface GeneratedLesson {
  sections: RevisionSection[]
  keyPoints: string[]
  quiz: QuizQuestion[]
  flashcards: Flashcard[]
}

const STOPWORDS = new Set(
  `le la les un une des de du au aux et ou mais donc or ni car que qui quoi dont où
   ce cet cette ces son sa ses leur leurs notre nos votre vos mon ma mes ton ta tes
   je tu il elle on nous vous ils elles est sont était étaient sera seront été être
   avoir a ai as avons avez ont avait avaient dans sur sous vers chez par pour avec
   sans entre plus moins très bien aussi comme ainsi alors donc cependant néanmoins
   pas ne non oui si tout tous toute toutes autre autres même mêmes leur cela ceci
   celui celle ceux celles se sa son ses lui elle ici là quand comment pourquoi peut
   peuvent doit doivent fait faire dit être deux trois cet cette`
    .split(/\s+/)
    .filter(Boolean),
)

function splitSentences(text: string): string[] {
  return text
    .replace(/\s+/g, ' ')
    .trim()
    .split(/(?<=[.!?])\s+(?=[A-ZÀ-Ü])/)
    .map((s) => s.trim())
    .filter((s) => s.length >= 25 && s.length <= 320)
}

function extractKeyTerms(sentences: string[], count: number): string[] {
  const freq = new Map<string, number>()
  for (const sentence of sentences) {
    const words = sentence.match(/[A-Za-zÀ-ÿ][A-Za-zÀ-ÿ'-]{3,}/g) ?? []
    for (const raw of words) {
      const word = raw.toLowerCase()
      if (STOPWORDS.has(word)) continue
      freq.set(raw, (freq.get(raw) ?? 0) + 1)
    }
  }
  return [...freq.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, count)
    .map(([term]) => term)
}

function chunk<T>(items: T[], parts: number): T[][] {
  const size = Math.max(1, Math.ceil(items.length / parts))
  const out: T[][] = []
  for (let i = 0; i < items.length; i += size) out.push(items.slice(i, i + size))
  return out
}

/**
 * Builds a plausible structured lesson (sections, key points, a fill-in-the-blank
 * quiz, and flashcards) purely client-side from real extracted PDF text — no LLM
 * call. Heuristic, not "understanding" the document, but grounded in its actual
 * content rather than fabricated from nothing.
 */
export function generateLesson(text: string, title: string): GeneratedLesson {
  const sentences = splitSentences(text)

  if (sentences.length < 4) {
    return {
      sections: [
        {
          heading: 'Contenu limité',
          body: `Le texte extrait de « ${title} » est trop court ou l'image scannée n'a pas pu être lue pour générer une fiche détaillée. Essaie avec un PDF contenant du texte sélectionnable.`,
        },
      ],
      keyPoints: [],
      quiz: [],
      flashcards: [],
    }
  }

  const keyTerms = extractKeyTerms(sentences, 10)

  const sectionTitles = ['Vue d’ensemble', 'Points de développement', 'Ce qu’il faut retenir']
  const sectionChunks = chunk(sentences, sectionTitles.length)
  const sections: RevisionSection[] = sectionChunks.map((group, i) => ({
    heading: sectionTitles[i] ?? `Partie ${i + 1}`,
    body: group.slice(0, 3).join(' '),
  }))

  const keyPoints = [...sentences]
    .sort((a, b) => b.length - a.length)
    .slice(0, 6)
    .sort((a, b) => sentences.indexOf(a) - sentences.indexOf(b))
    .map((s) => s.length > 160 ? s.slice(0, 157).trimEnd() + '…' : s)

  const quiz: QuizQuestion[] = []
  const usedSentences = new Set<string>()
  for (const term of keyTerms) {
    if (quiz.length >= 5) break
    const sentence = sentences.find(
      (s) => !usedSentences.has(s) && new RegExp(`\\b${term}\\b`).test(s),
    )
    if (!sentence) continue
    usedSentences.add(sentence)

    const distractors = keyTerms.filter((t) => t !== term).sort(() => Math.random() - 0.5).slice(0, 3)
    if (distractors.length < 3) continue

    const options = [term, ...distractors].sort(() => Math.random() - 0.5)
    const blanked = sentence.replace(new RegExp(`\\b${term}\\b`), '_____')

    quiz.push({
      id: `q${quiz.length + 1}`,
      question: `Quel mot complète cette phrase du document : « ${blanked} » ?`,
      options,
      correctIndex: options.indexOf(term),
      explanation: `La phrase originale est : « ${sentence} »`,
    })
  }

  const flashcards: Flashcard[] = keyTerms.slice(0, 8).flatMap((term) => {
    const sentence = sentences.find((s) => new RegExp(`\\b${term}\\b`).test(s))
    if (!sentence) return []
    return [{ id: `f-${term}`, front: term, back: sentence }]
  })

  return { sections, keyPoints, quiz, flashcards }
}

import * as React from 'react'
import { MOCK_CONTENTS } from '@/lib/mock-data'
import { getFlashcards, getQuiz, getRevisionSheet } from '@/lib/mock-content-detail'
import type { GeneratedLesson } from '@/lib/lesson-generator'
import type { ContentItem } from '@/lib/types'

interface ContentStoreValue {
  contents: ContentItem[]
  addContent: (item: ContentItem) => void
  updateContent: (id: string, updates: Partial<ContentItem>) => void
  setLesson: (id: string, lesson: GeneratedLesson) => void
  getLesson: (id: string) => GeneratedLesson
}

const ContentStoreContext = React.createContext<ContentStoreValue | undefined>(undefined)

export function ContentStoreProvider({ children }: { children: React.ReactNode }) {
  const [contents, setContents] = React.useState<ContentItem[]>(MOCK_CONTENTS)
  const [lessons, setLessons] = React.useState<Record<string, GeneratedLesson>>({})

  const addContent = React.useCallback((item: ContentItem) => {
    setContents((prev) => [item, ...prev])
  }, [])

  const updateContent = React.useCallback((id: string, updates: Partial<ContentItem>) => {
    setContents((prev) => prev.map((c) => (c.id === id ? { ...c, ...updates } : c)))
  }, [])

  const setLesson = React.useCallback((id: string, lesson: GeneratedLesson) => {
    setLessons((prev) => ({ ...prev, [id]: lesson }))
  }, [])

  const getLesson = React.useCallback(
    (id: string): GeneratedLesson => {
      const generated = lessons[id]
      if (generated) return generated
      return {
        sections: getRevisionSheet(id),
        keyPoints: [],
        quiz: getQuiz(id),
        flashcards: getFlashcards(id),
      }
    },
    [lessons],
  )

  const value = React.useMemo(
    () => ({ contents, addContent, updateContent, setLesson, getLesson }),
    [contents, addContent, updateContent, setLesson, getLesson],
  )

  return <ContentStoreContext.Provider value={value}>{children}</ContentStoreContext.Provider>
}

export function useContentStore() {
  const ctx = React.useContext(ContentStoreContext)
  if (!ctx) throw new Error('useContentStore must be used within a ContentStoreProvider')
  return ctx
}

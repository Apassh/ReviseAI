import type { PlanId } from './pricing-data'

export type ContentSourceType = 'pdf' | 'youtube'

export type ContentStatus = 'processing' | 'ready' | 'in_progress' | 'completed'

export interface ContentItem {
  id: string
  title: string
  subject: string
  sourceType: ContentSourceType
  status: ContentStatus
  /** 0-100 */
  progress: number
  createdAt: string
  quizScore?: number
  hasFlashcards: boolean
}

export type AvatarKind = 'gradient' | 'character' | 'elite'

export interface AvatarOption {
  id: string
  kind: AvatarKind
  label: string
  /** CSS gradient or solid color for `gradient` kind */
  swatch?: string
  /** Emoji glyph for `character` and `elite` kinds */
  emoji?: string
  requiresPlan?: PlanId
}

export interface UserProfile {
  id: string
  firstName: string
  lastName: string
  email: string
  plan: PlanId
  avatarId: string
  memberSince: string
  billingCycle: 'monthly' | 'annual'
  nextBillingDate?: string
}

export interface UserStats {
  contentsStudied: number
  quizzesCompleted: number
  averageProgress: number
  studyStreakDays: number
}

export interface Invoice {
  id: string
  date: string
  amount: number
  status: 'paid' | 'pending'
  planName: string
}

export interface RevisionSection {
  heading: string
  body: string
}

export interface QuizQuestion {
  id: string
  question: string
  options: string[]
  correctIndex: number
  explanation: string
}

export interface Flashcard {
  id: string
  front: string
  back: string
}

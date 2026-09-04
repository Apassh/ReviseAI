import type { AvatarOption, ContentItem, Invoice, UserProfile, UserStats } from './types'

export const MOCK_USER: UserProfile = {
  id: 'usr_1',
  firstName: 'Léa',
  lastName: 'Martin',
  email: 'lea.martin@example.com',
  plan: 'premium',
  avatarId: 'grad-3',
  studyLevel: 'l2',
  memberSince: '2025-09-12',
  billingCycle: 'monthly',
  nextBillingDate: '2026-09-30',
}

export const MOCK_STATS: UserStats = {
  contentsStudied: 14,
  quizzesCompleted: 9,
  averageProgress: 68,
  studyStreakDays: 5,
}

export const MOCK_CONTENTS: ContentItem[] = [
  {
    id: 'c1',
    title: 'Thermodynamique — chapitre 3',
    subject: 'Physique',
    sourceType: 'pdf',
    status: 'in_progress',
    progress: 62,
    createdAt: '2026-08-24',
    quizScore: 74,
    hasFlashcards: true,
  },
  {
    id: 'c2',
    title: 'La Révolution française expliquée',
    subject: 'Histoire',
    sourceType: 'youtube',
    status: 'in_progress',
    progress: 35,
    createdAt: '2026-08-26',
    quizScore: 58,
    hasFlashcards: true,
  },
  {
    id: 'c3',
    title: 'Introduction aux réseaux de neurones',
    subject: 'Informatique',
    sourceType: 'youtube',
    status: 'ready',
    progress: 0,
    createdAt: '2026-08-29',
    hasFlashcards: false,
  },
  {
    id: 'c4',
    title: 'Microéconomie — l’offre et la demande',
    subject: 'Économie',
    sourceType: 'pdf',
    status: 'completed',
    progress: 100,
    createdAt: '2026-08-18',
    quizScore: 91,
    hasFlashcards: true,
  },
  {
    id: 'c5',
    title: 'Grammaire espagnole — le subjonctif',
    subject: 'Espagnol',
    sourceType: 'pdf',
    status: 'processing',
    progress: 0,
    createdAt: '2026-08-30',
    hasFlashcards: false,
  },
]

export const MOCK_INVOICES: Invoice[] = [
  { id: 'inv_2026_08', date: '2026-08-01', amount: 9.99, status: 'paid', planName: 'Premium' },
  { id: 'inv_2026_07', date: '2026-07-01', amount: 9.99, status: 'paid', planName: 'Premium' },
  { id: 'inv_2026_06', date: '2026-06-01', amount: 9.99, status: 'paid', planName: 'Premium' },
]

export const AVATAR_OPTIONS: AvatarOption[] = [
  { id: 'grad-1', kind: 'gradient', label: 'Aurore', swatch: 'linear-gradient(135deg,#9333ea,#f22d64)' },
  { id: 'grad-2', kind: 'gradient', label: 'Menthe', swatch: 'linear-gradient(135deg,#17ab88,#a4f2da)' },
  { id: 'grad-3', kind: 'gradient', label: 'Crépuscule', swatch: 'linear-gradient(135deg,#6817ab,#fb5c86)' },
  { id: 'grad-4', kind: 'gradient', label: 'Océan', swatch: 'linear-gradient(135deg,#1f5fbf,#35c9a3)' },
  { id: 'grad-gold', kind: 'gradient', label: 'Éclat doré', swatch: 'linear-gradient(135deg,var(--color-gold-300),var(--color-gold-600))', requiresPlan: 'elite' },
  { id: 'char-1', kind: 'character', label: 'Studieux', emoji: '🦉' },
  { id: 'char-2', kind: 'character', label: 'Motivé', emoji: '🐯' },
  { id: 'char-3', kind: 'character', label: 'Zen', emoji: '🐨' },
  { id: 'char-4', kind: 'character', label: 'Curieux', emoji: '🦊' },
  { id: 'elite-1', kind: 'elite', label: 'Phénix doré', emoji: '🔥', requiresPlan: 'elite' },
  { id: 'elite-2', kind: 'elite', label: 'Dragon de jade', emoji: '🐉', requiresPlan: 'elite' },
  { id: 'elite-3', kind: 'elite', label: 'Licorne astrale', emoji: '🦄', requiresPlan: 'elite' },
  { id: 'elite-4', kind: 'elite', label: 'Couronne royale', emoji: '👑', requiresPlan: 'elite' },
]

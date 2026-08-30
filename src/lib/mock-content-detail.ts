import type { Flashcard, QuizQuestion, RevisionSection } from './types'

export const MOCK_REVISION_SHEETS: Record<string, RevisionSection[]> = {
  c1: [
    { heading: 'Définition clé', body: 'L’entropie mesure le désordre d’un système ; dans un système isolé, elle ne peut qu’augmenter (2e principe de la thermodynamique).' },
    { heading: 'Concept clé', body: 'Un système thermodynamique échange de l’énergie (chaleur, travail) avec son environnement selon des transformations réversibles ou irréversibles.' },
    { heading: 'Exemple concret', body: 'Un glaçon qui fond dans un verre d’eau chaude illustre le 2e principe : la chaleur circule du chaud vers le froid, jamais l’inverse spontanément.' },
  ],
  c2: [
    { heading: 'Définition clé', body: 'Les États généraux de 1789 sont une assemblée réunissant les trois ordres (clergé, noblesse, tiers état) convoquée par Louis XVI.' },
    { heading: 'Concept clé', body: 'La prise de la Bastille, le 14 juillet 1789, symbolise le basculement du pouvoir populaire face à la monarchie absolue.' },
    { heading: 'Exemple concret', body: 'La Déclaration des droits de l’homme et du citoyen (août 1789) pose les bases des libertés individuelles modernes.' },
  ],
  c3: [
    { heading: 'Définition clé', body: 'Un réseau de neurones artificiel est composé de couches de neurones interconnectés qui ajustent leurs poids par apprentissage.' },
    { heading: 'Concept clé', body: 'La rétropropagation du gradient permet au réseau de corriger ses erreurs de prédiction couche par couche.' },
    { heading: 'Exemple concret', body: 'La reconnaissance d’images utilise des réseaux convolutifs (CNN) pour détecter des motifs visuels.' },
  ],
  c4: [
    { heading: 'Définition clé', body: 'La loi de l’offre et de la demande détermine le prix d’équilibre d’un marché en fonction des quantités offertes et demandées.' },
    { heading: 'Concept clé', body: 'Un excédent d’offre fait baisser les prix ; un excédent de demande les fait monter, jusqu’à atteindre l’équilibre.' },
    { heading: 'Exemple concret', body: 'Une pénurie de billets de concert fait grimper leur prix sur le marché secondaire.' },
  ],
  c5: [
    { heading: 'Définition clé', body: 'Le subjonctif espagnol exprime le doute, le souhait ou l’émotion, contrairement à l’indicatif qui énonce des faits.' },
    { heading: 'Concept clé', body: 'Il se forme le plus souvent après des expressions comme « quiero que », « es importante que »…' },
    { heading: 'Exemple concret', body: '« Espero que vengas mañana » (« J’espère que tu viendras demain ») utilise le subjonctif présent.' },
  ],
}

export const MOCK_QUIZZES: Record<string, QuizQuestion[]> = {
  c1: [
    {
      id: 'q1',
      question: 'Que mesure l’entropie dans un système thermodynamique ?',
      options: ['La température', 'Le désordre du système', 'La masse', 'La pression'],
      correctIndex: 1,
      explanation: 'L’entropie quantifie le degré de désordre ; elle augmente dans un système isolé.',
    },
    {
      id: 'q2',
      question: 'Dans quel sens la chaleur circule-t-elle spontanément ?',
      options: ['Du froid vers le chaud', 'Du chaud vers le froid', 'Elle ne circule jamais', 'Aléatoirement'],
      correctIndex: 1,
      explanation: 'Le 2e principe impose un transfert spontané du chaud vers le froid.',
    },
    {
      id: 'q3',
      question: 'Qu’illustre un glaçon qui fond dans de l’eau chaude ?',
      options: ['Le 1er principe', 'Le 2e principe', 'La loi de Boyle-Mariotte', 'Aucun principe'],
      correctIndex: 1,
      explanation: 'C’est un exemple classique d’irréversibilité liée au 2e principe.',
    },
  ],
  c2: [
    {
      id: 'q1',
      question: 'Qui a convoqué les États généraux de 1789 ?',
      options: ['Napoléon Bonaparte', 'Louis XVI', 'Robespierre', 'Louis XIV'],
      correctIndex: 1,
      explanation: 'Louis XVI convoque les États généraux face à la crise financière du royaume.',
    },
    {
      id: 'q2',
      question: 'Que symbolise la prise de la Bastille ?',
      options: ['La fin de la Révolution', 'Le basculement du pouvoir populaire', 'Le sacre du roi', 'La signature de la paix'],
      correctIndex: 1,
      explanation: 'Le 14 juillet 1789 marque un tournant symbolique majeur de la Révolution.',
    },
    {
      id: 'q3',
      question: 'Que pose la Déclaration des droits de l’homme et du citoyen ?',
      options: ['Les impôts royaux', 'Les libertés individuelles', 'Les frontières du royaume', 'Le calendrier révolutionnaire'],
      correctIndex: 1,
      explanation: 'Adoptée en août 1789, elle fonde les libertés individuelles modernes.',
    },
  ],
}

export const MOCK_FLASHCARDS: Record<string, Flashcard[]> = {
  c1: [
    { id: 'f1', front: 'Entropie', back: 'Mesure du désordre d’un système ; augmente dans un système isolé.' },
    { id: 'f2', front: '2e principe', back: 'La chaleur circule spontanément du chaud vers le froid.' },
    { id: 'f3', front: 'Transformation réversible', back: 'Transformation qui peut revenir à son état initial sans perte.' },
    { id: 'f4', front: 'Système isolé', back: 'Système qui n’échange ni matière ni énergie avec l’extérieur.' },
  ],
  c2: [
    { id: 'f1', front: 'États généraux', back: 'Assemblée des trois ordres convoquée par Louis XVI en 1789.' },
    { id: 'f2', front: '14 juillet 1789', back: 'Prise de la Bastille, symbole du soulèvement populaire.' },
    { id: 'f3', front: 'Tiers état', back: 'Ordre représentant le peuple, face au clergé et à la noblesse.' },
    { id: 'f4', front: 'DDHC', back: 'Déclaration des droits de l’homme et du citoyen, août 1789.' },
  ],
}

const GENERIC_QUIZ: QuizQuestion[] = [
  {
    id: 'q1',
    question: 'Quel est l’objectif principal de cette fiche de révision ?',
    options: ['Divertir', 'Structurer les notions clés du cours', 'Remplacer le cours', 'Noter l’élève'],
    correctIndex: 1,
    explanation: 'La fiche extrait et structure les notions essentielles à retenir.',
  },
]

const GENERIC_FLASHCARDS: Flashcard[] = [
  { id: 'f1', front: 'Concept clé', back: 'Revois la fiche de révision associée pour le détail.' },
]

export function getRevisionSheet(contentId: string): RevisionSection[] {
  return MOCK_REVISION_SHEETS[contentId] ?? [
    { heading: 'Concept clé', body: 'La fiche complète sera générée dès que le contenu aura fini son traitement.' },
  ]
}

export function getQuiz(contentId: string): QuizQuestion[] {
  return MOCK_QUIZZES[contentId] ?? GENERIC_QUIZ
}

export function getFlashcards(contentId: string): Flashcard[] {
  return MOCK_FLASHCARDS[contentId] ?? GENERIC_FLASHCARDS
}

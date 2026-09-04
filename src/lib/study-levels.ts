export interface StudyLevel {
  id: string
  label: string
  group: 'Lycée' | 'Études supérieures' | 'Autre'
}

export const STUDY_LEVELS: StudyLevel[] = [
  { id: 'seconde', label: 'Seconde', group: 'Lycée' },
  { id: 'premiere', label: 'Première', group: 'Lycée' },
  { id: 'terminale', label: 'Terminale', group: 'Lycée' },
  { id: 'l1', label: 'Licence 1', group: 'Études supérieures' },
  { id: 'l2', label: 'Licence 2', group: 'Études supérieures' },
  { id: 'l3', label: 'Licence 3', group: 'Études supérieures' },
  { id: 'm1', label: 'Master 1', group: 'Études supérieures' },
  { id: 'm2', label: 'Master 2', group: 'Études supérieures' },
  { id: 'doctorat', label: 'Doctorat', group: 'Études supérieures' },
  { id: 'autre', label: 'Autre', group: 'Autre' },
]

export function getStudyLevelLabel(id: string | undefined): string | undefined {
  return STUDY_LEVELS.find((level) => level.id === id)?.label
}

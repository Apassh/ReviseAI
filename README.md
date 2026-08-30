# ReviseAI

SaaS de révision par IA : dépose un cours (PDF ou lien YouTube) et obtiens une fiche
de révision structurée, un quiz adaptatif et des flashcards.

## Stack

- React 19 + Vite + TypeScript
- Tailwind CSS v4
- shadcn/ui-style primitives (Radix UI + `class-variance-authority`)
- React Router
- Données mockées en local (`src/lib/mock-data.ts`, `src/lib/mock-content-detail.ts`),
  structurées pour être facilement branchées sur une vraie API plus tard.

## Démarrer

```bash
npm install
npm run dev
```

## Structure

```
src/
  components/
    ui/          primitives réutilisables (button, card, dialog, tabs, ...)
    layout/       header marketing/app, footer, panneau d'auth, route protégée
    marketing/    sections de la landing page
    pricing/      PricingCard + PlanBadge (source unique de vérité pour les prix)
    dashboard/    stat cards, liste de contenus, upload, quiz, flashcards
    profile/      avatar picker + affichage d'avatar
    auth/         boutons de connexion sociale
  pages/          une page par route
  lib/
    pricing-data.ts        seule source de vérité pour prix/fonctionnalités des plans
    mock-data.ts            utilisateur, contenus, factures, avatars mockés
    mock-content-detail.ts fiches/quiz/flashcards mockés par contenu
    types.ts                types partagés
  hooks/
    use-auth.tsx  contexte d'authentification simulée (localStorage)
```

## Notes de conception

- **Cohérence des prix** : `lib/pricing-data.ts` est l'unique source de vérité pour les
  noms de plans, prix mensuel/annuel et listes de fonctionnalités. Le composant
  `<PricingCard>` est réutilisé sur la landing page et la page de gestion d'abonnement.
- **Identité visuelle** : palette violet/rose + accent menthe distinctif, police de
  titre Fraunces (Google Fonts), rayons de bordure et ombres variés selon les
  composants.
- **Annulation d'abonnement** : traitée comme une action secondaire discrète (lien
  texte), jamais au même niveau visuel que "Changer de formule" ou "Consulter les
  factures".

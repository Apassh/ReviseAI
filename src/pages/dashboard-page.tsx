import { Link } from 'react-router-dom'
import { BookOpenCheck, Flame, ListChecks, TrendingUp } from 'lucide-react'
import { StatCard } from '@/components/dashboard/stat-card'
import { ContentCard } from '@/components/dashboard/content-card'
import { UploadZone } from '@/components/dashboard/upload-zone'
import { useAuth } from '@/hooks/use-auth'
import { useContentStore } from '@/hooks/use-content-store'
import { MOCK_STATS } from '@/lib/mock-data'
import { getUpgradeTarget } from '@/lib/pricing-data'

export function DashboardPage() {
  const { user } = useAuth()
  const { contents } = useContentStore()

  const upgradeTarget = getUpgradeTarget(user.plan)

  return (
    <main className="mx-auto max-w-6xl px-5 py-10">
      <div className="flex flex-col gap-1">
        <h1 className="font-display text-2xl font-semibold sm:text-3xl">Salut {user.firstName} 👋</h1>
        <p className="text-[var(--muted-foreground)]">
          {contents.some((c) => c.status === 'in_progress')
            ? 'Tu progresses bien, continue sur ta lancée.'
            : 'Prêt·e à transformer un nouveau cours en fiche de révision ?'}
        </p>
      </div>

      <div className="mt-7 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard icon={BookOpenCheck} label="Contenus étudiés" value={String(MOCK_STATS.contentsStudied)} tone="brand" />
        <StatCard icon={ListChecks} label="Quiz complétés" value={String(MOCK_STATS.quizzesCompleted)} tone="mint" />
        <StatCard icon={TrendingUp} label="Progression globale" value={`${MOCK_STATS.averageProgress}%`} tone="gold" />
        <StatCard icon={Flame} label="Série de révision" value={`${MOCK_STATS.studyStreakDays} jours`} tone="brand" />
      </div>

      <div className="mt-8">
        <UploadZone planId={user.plan} contentsCount={contents.length} />
      </div>

      <div className="mt-10">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-xl font-semibold">Tes contenus</h2>
          {upgradeTarget && (
            <Link to="/abonnement" className="text-sm font-semibold text-brand-600 hover:underline">
              Passer à {upgradeTarget.name}
            </Link>
          )}
        </div>

        <div className="mt-4 flex flex-col gap-3.5">
          {contents.map((content) => (
            <ContentCard key={content.id} content={content} />
          ))}
        </div>
      </div>
    </main>
  )
}

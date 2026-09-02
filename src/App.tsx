import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { AuthProvider } from '@/hooks/use-auth'
import { ContentStoreProvider } from '@/hooks/use-content-store'
import { TooltipProvider } from '@/components/ui/tooltip'
import { MarketingLayout } from '@/components/layout/marketing-layout'
import { ProtectedRoute } from '@/components/layout/protected-route'
import { LandingPage } from '@/pages/landing-page'
import { LoginPage } from '@/pages/login-page'
import { SignupPage } from '@/pages/signup-page'
import { DashboardPage } from '@/pages/dashboard-page'
import { ProfilePage } from '@/pages/profile-page'
import { SubscriptionPage } from '@/pages/subscription-page'
import { ContentDetailPage } from '@/pages/content-detail-page'
import { LegalPage } from '@/pages/legal-page'
import { NotFoundPage } from '@/pages/not-found-page'

function App() {
  return (
    <AuthProvider>
      <ContentStoreProvider>
        <TooltipProvider>
          <BrowserRouter basename={import.meta.env.BASE_URL}>
            <Routes>
              <Route element={<MarketingLayout />}>
                <Route path="/" element={<LandingPage />} />
                <Route
                  path="/mentions-legales"
                  element={
                    <LegalPage
                      title="Mentions légales"
                      paragraphs={[
                        'ReviseAI est un service édité à titre de démonstration. Aucune donnée réelle n’est collectée sur cette version du produit.',
                        'Directeur de la publication : équipe ReviseAI. Hébergement : fourni par notre prestataire cloud.',
                        'Pour toute question, contacte-nous à contact@reviseai.fr.',
                      ]}
                    />
                  }
                />
                <Route
                  path="/confidentialite"
                  element={
                    <LegalPage
                      title="Politique de confidentialité"
                      paragraphs={[
                        'ReviseAI respecte la vie privée de ses utilisateurs. Les contenus que tu importes (PDF, liens vidéo) sont utilisés uniquement pour générer tes fiches, quiz et flashcards.',
                        'Aucune donnée n’est revendue à des tiers. Tu peux demander la suppression de ton compte et de tes données à tout moment.',
                        'Cette page est une version de démonstration à des fins d’illustration du produit.',
                      ]}
                    />
                  }
                />
                <Route
                  path="/cgu"
                  element={
                    <LegalPage
                      title="Conditions générales d’utilisation"
                      paragraphs={[
                        'L’utilisation de ReviseAI implique l’acceptation pleine et entière des présentes conditions générales.',
                        'Le service est proposé « en l’état », avec des formules Gratuite, Premium et Élite dont les caractéristiques sont détaillées sur la page Tarifs.',
                        'L’abonnement est sans engagement et peut être annulé à tout moment depuis la page de gestion de l’abonnement.',
                      ]}
                    />
                  }
                />
              </Route>

              <Route path="/connexion" element={<LoginPage />} />
              <Route path="/inscription" element={<SignupPage />} />

              <Route element={<ProtectedRoute />}>
                <Route path="/tableau-de-bord" element={<DashboardPage />} />
                <Route path="/tableau-de-bord/contenu/:contentId" element={<ContentDetailPage />} />
                <Route path="/profil" element={<ProfilePage />} />
                <Route path="/abonnement" element={<SubscriptionPage />} />
              </Route>

              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </ContentStoreProvider>
    </AuthProvider>
  )
}

export default App

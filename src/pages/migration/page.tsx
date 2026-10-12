import Navbar from '@/components/feature/Navbar';
import Footer from '@/components/feature/Footer';
import MigrationHero from '@/pages/migration/components/MigrationHero';
import ThreatSection from '@/pages/migration/components/ThreatSection';
import MigrationSteps from '@/pages/migration/components/MigrationSteps';
import SourcePlatforms from '@/pages/migration/components/SourcePlatforms';
import IntegrationMethods from '@/pages/migration/components/IntegrationMethods';
import AutomatedInvites from '@/pages/migration/components/AutomatedInvites';
import MigrationPricing from '@/pages/migration/components/MigrationPricing';
import SupportIncluded from '@/pages/migration/components/SupportIncluded';
import MigrationFaq from '@/pages/migration/components/MigrationFaq';
import MigrationForm from '@/pages/migration/components/MigrationForm';

export default function Migration() {
  return (
    <div className="min-h-screen bg-white text-slate-800 font-sans">
      <Navbar />
      <MigrationHero />
      <ThreatSection />
      <MigrationSteps />
      <SourcePlatforms />
      <IntegrationMethods />
      <AutomatedInvites />
      <MigrationPricing />
      <SupportIncluded />
      <MigrationFaq />
      <MigrationForm />
      <Footer />
    </div>
  );
}
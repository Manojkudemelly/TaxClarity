import TaxKnowledge from '@/components/TaxKnowledge';
import Navigation from '@/components/Navigation';

const Knowledge = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <div className="lg:ml-80">
        <TaxKnowledge />
      </div>
    </div>
  );
};

export default Knowledge;
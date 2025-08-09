import TaxCalculator from '@/components/TaxCalculator';
import Navigation from '@/components/Navigation';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <div className="lg:ml-80">
        <TaxCalculator />
      </div>
    </div>
  );
};

export default Index;

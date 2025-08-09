import InvestmentGuide from '@/components/InvestmentGuide';
import Navigation from '@/components/Navigation';

const Investments = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <div className="lg:ml-80">
        <InvestmentGuide />
      </div>
    </div>
  );
};

export default Investments;
import NavbarSection from '../components/NavbarSection';
import HeroSection from '../components/HeroSection';
import AIAssistantSection from '../components/AIAssistantSection';
import InsightSection from '../components/InsightSection';
import FooterSection from '../components/FooterSection';
import PreviewSection from '../components/PreviewSection';

const Home = () => {
  return (
    <div className="w-full min-h-screen">
      <NavbarSection />
      <HeroSection />
      <PreviewSection />
      <AIAssistantSection />
      <InsightSection />
      <FooterSection />
    </div>
  );
};

export default Home;
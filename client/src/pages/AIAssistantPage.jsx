import NavbarSection from '../components/NavbarSection';
import AIChatSection from '../components/AIChatSection';
import FooterSection from '../components/FooterSection';

const AIAssistantPage = () => {
  return (
    <div className="w-full min-h-screen flex flex-col">
      <NavbarSection />
      <main className="flex-1">
        <AIChatSection />
      </main>
    </div>
  );
};

export default AIAssistantPage;
import NavbarSection from '../components/NavbarSection';
import AiChatSection from '../components/AiChatSection';
import FooterSection from '../components/FooterSection';

const AIAssistantPage = () => {
  return (
    <div className="w-full min-h-screen flex flex-col">
      <NavbarSection />
      <main className="flex-1">
        <AiChatSection />
      </main>
    </div>
  );
};

export default AIAssistantPage;

import { AppHeader } from "@/components/layout/AppHeader";
import { MessageGenerator } from "@/components/message-generator/MessageForm";

const MessageGeneratorPage = () => {
  return (
    <>
      <AppHeader title="LinkedIn Message Generator" />
      
      <main className="flex-1 p-4 md:p-6">
        <MessageGenerator />
      </main>
    </>
  );
};

export default MessageGeneratorPage;

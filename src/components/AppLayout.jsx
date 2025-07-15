import { useChatStore } from "../store/chatStore";
import Sidebar from "../components/Sidebar";
import Chatroom from "../pages/Chatroom";
import EmptyChat from "../pages/EmptyChat";

const AppLayout = () => {
  const { selectedChatId, isNewChatPending } = useChatStore();
  const shouldShowChatroom = selectedChatId !== null || isNewChatPending;

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <main className="flex-1 overflow-y-auto bg-gray-100 dark:bg-[#1b1c1e] text-black dark:text-white">
        {shouldShowChatroom ? <Chatroom /> : <EmptyChat />}
      </main>
    </div>
  );
};

export default AppLayout;

import { useChatStore } from "../store/chatStore";
import Avatar from "../components/Avatar";

const EmptyChat = () => {
  const { user } = useChatStore();

  const displayName = user?.name
    ? user.name.charAt(0).toUpperCase() + user.name.slice(1)
    : "";

  return (
    <>
      <Avatar />
      <div className="p-6 flex justify-center items-center h-full">
        <h2 className="text-4xl font-semibold bg-gradient-to-r from-blue-500 via-blue-400 to-blue-600 bg-clip-text text-transparent">
          Hello, {displayName}
        </h2>
      </div>
    </>
  );
};

export default EmptyChat;

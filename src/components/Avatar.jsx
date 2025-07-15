import { useChatStore } from "../store/chatStore";

const Avatar = () => {
  const user = useChatStore((s) => s.user);

  if (!user?.name) return null;

  const initial = user.name.charAt(0).toUpperCase();

  return (
    <div className="fixed top-4 right-4 z-50">
      <div className="bg-green-600 hover:bg-green-700 text-white w-8 h-8 rounded-full flex items-center justify-center text-lg font-bold shadow-md">
        {initial}
      </div>
    </div>
  );
};

export default Avatar;

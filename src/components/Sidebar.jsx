import { useState } from "react";
import {
  Menu,
  Plus,
  Search,
  MessageSquare,
  LogOut,
  Sun,
  Moon,
  X,
  SquarePen,
  Trash,
} from "lucide-react";
import { useChatStore } from "../store/chatStore";
import { useThemeStore } from "../store/themeStore";

const Sidebar = () => {
  const { theme, toggleTheme } = useThemeStore();

  const {
    chatrooms,
    selectedChatId,
    selectChat,
    createEmptyChatroom,
    deleteChatroom,
    logout,
  } = useChatStore();

  const [collapsed, setCollapsed] = useState(false); // for desktop
  const [search, setSearch] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [isOpen, setIsOpen] = useState(false); // for mobile sidebar

  const filteredRooms = chatrooms.filter((room) =>
    (room?.title || "").toLowerCase().includes(search.toLowerCase())
  );

  const handleNewChat = () => {
    setIsCreating(true);
    createEmptyChatroom();
  };

  const activeRoom = chatrooms.find((c) => c.id === selectedChatId);
  const disableNewChat =
    isCreating && activeRoom && activeRoom.title === "New Chat";

  if (!disableNewChat && isCreating) {
    setIsCreating(false);
  }

  const closeMobile = () => setIsOpen(false);

  return (
    <>
      {/* mobile toggle */}
      <button
        onClick={() => setIsOpen(true)}
        className={`md:hidden ${
          isOpen && "hidden"
        } fixed top-4 left-4 z-50 p-2 dark:text-slate-300`}
      >
        <Menu size={24} />
      </button>

      {/* Sidebar container */}
      <aside
        className={`
          z-40 h-full bg-[#f0f3f8] dark:bg-[#292a2c] text-slate-200 transition-all duration-300 p-4 flex flex-col fixed top-0
          ${collapsed ? "w-16 items-center" : "w-60"}
          ${isOpen ? "left-0" : "-left-full"}
          md:static md:left-0
        `}
      >
        {/* Header for mobile */}
        <div className="md:hidden flex justify-end items-center mb-4">
          <button className="flex" onClick={() => setIsOpen(false)}>
            <X size={20} className="text-gray-500 dark:text-white" />
          </button>
        </div>

        {/* Desktop Sidebar */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="hidden md:block mb-6 text-slate-700 dark:text-slate-300"
          title="Toggle Sidebar"
        >
          <Menu size={20} />
        </button>

        {/* Search */}
        {!collapsed && (
          <div className="relative mb-4 w-full">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-700 dark:text-gray-400"
            />

            <input
              className="pl-9 p-2 focus:outline-none rounded-full w-full text-sm border dark:border-zinc-500 border-zinc-400 bg-transparent text-gemText-light dark:text-gemText-dark"
              placeholder="Search chats"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        )}

        {/*New Chat */}
        <button
          onClick={handleNewChat}
          disabled={disableNewChat}
          className="mb-4 text-zinc-600 dark:text-zinc-400 flex items-center gap-2 px-2 py-2 rounded text-sm w-full disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <SquarePen size={16} />
          {!collapsed && "New Chat"}
        </button>

        {/* Chat List */}
        <div className="flex-1 overflow-y-auto space-y-2 w-full">
          {filteredRooms.map((room) => (
            <div
              key={room.id}
              onClick={() => {
                selectChat(room.id);
                closeMobile(); 
              }}
              className={`flex items-center gap-2 text-sm cursor-pointer px-3 py-2 rounded-full hover:bg-gray-100 dark:hover:bg-[#22222286] ${
                selectedChatId === room.id
                  ? "bg-blue-100 dark:bg-[#1f3660] text-blue-900 font-semibold dark:text-white dark:hover:bg-[#1f3660]"
                  : "text-black dark:text-white"
              }`}
            >
              <MessageSquare size={20} />
              {!collapsed && (
                <span className="flex-1 truncate">{room.title}</span>
              )}
              {!collapsed && (
                <button
                  className="text-xs text-red-900"
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteChatroom(room.id);
                  }}
                >
                  <Trash size={15} />
                </button>
              )}
            </div>
          ))}
        </div>

        {/* dark/Light Toggle */}
        <button
          onClick={toggleTheme}
          className="flex items-center gap-2 text-sm px-2 py-2 rounded  hover:bg-gray-100 dark:hover:bg-[#222] text-gemText-light dark:text-zinc-400"
          title="Toggle Theme"
        >
          {theme === "light" ? <Moon size={16} /> : <Sun size={16} />}
          {!collapsed && (theme === "light" ? "Dark Mode" : "Light Mode")}
        </button>

        {/* Logout */}
        <button
          onClick={logout}
          className={`flex items-center gap-2 text-sm text-red-500 px-2 py-2 rounded hover:bg-red-100 dark:hover:bg-red-900 w-full ${
            collapsed ? "justify-center" : "justify-start"
          }`}
          title="Logout"
        >
          <LogOut size={16} />
          {!collapsed && "Logout"}
        </button>
      </aside>
    </>
  );
};

export default Sidebar;

import { useEffect, useRef, useState } from "react";
import Skeleton from "react-loading-skeleton";
import toast from "react-hot-toast";
import { useChatStore } from "../store/chatStore";
import Avatar from "../components/Avatar";
import { Copy, ImagePlus, SendHorizontal } from "lucide-react";

const Chatroom = () => {
  const PAGE_SIZE = 20;
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const scrollRef = useRef();
  const chatEndRef = useRef();
  const fileInputRef = useRef();

  const {
    chatrooms,
    selectedChatId,
    addMessageToRoom,
    updateChatroomTitle,
    user,
  } = useChatStore();

  const room = chatrooms.find((c) => c.id === selectedChatId);

  // loading on initial mount
  useEffect(() => {
    const timeout = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timeout);
  }, []);

  // Infinite scroll
  useEffect(() => {
    const el = scrollRef.current;
    const handleScroll = () => {
      if (el.scrollTop < 50) {
        setVisibleCount((prev) => prev + PAGE_SIZE);
      }
    };
    el?.addEventListener("scroll", handleScroll);
    return () => el?.removeEventListener("scroll", handleScroll);
  }, []);

  // scroll to bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [room?.messages]);

  const formatTime = (ts) =>
    new Date(ts).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  const handleSend = () => {
    const trimmed = input.trim();
    if (!trimmed || !room) return;

    const msg = {
      text: trimmed,
      sender: "user",
      ts: Date.now(),
    };

    addMessageToRoom(room.id, msg);

    // If it's the first message, set title
    if (room.messages.length === 0) {
      updateChatroomTitle(room.id, trimmed.slice(0, 30));
    }

    setInput("");
    setTyping(true);

    setTimeout(() => {
      addMessageToRoom(room.id, {
        text: "This is Gemini’s mock response ✨",
        sender: "ai",
        ts: Date.now(),
      });
      setTyping(false);
    }, 1200);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file || !room) return;
    const previewUrl = URL.createObjectURL(file);

    addMessageToRoom(room.id, {
      text: `<img src="${previewUrl}" alt="upload" class="rounded max-w-[200px]"/>`,
      sender: "user",
      ts: Date.now(),
    });

    setTyping(true);

    setTimeout(() => {
      addMessageToRoom(room.id, {
        text: "Nice image! 📷 (Gemini)",
        sender: "ai",
        ts: Date.now(),
      });
      setTyping(false);
    }, 1300);
  };

  if (!room) {
    return (
      <div className="h-screen flex items-center justify-center text-gray-400 italic text-sm">
        Select a chatroom from the sidebar or create a new one to start chatting
        with Gemini.
      </div>
    );
  }

  const displayName = user?.name
    ? user.name.charAt(0).toUpperCase() + user.name.slice(1)
    : "";

  return (
    <div className="flex flex-col h-screen bg-gemBg-light text-gemText-light dark:bg-gemBg-dark dark:text-gemText-dark transition-all">
      <div className="flex items-center justify-evenly md:justify-between px-4 py-3">
        <h2 className="text-xl font-semibold text-gray-600 dark:text-gray-400">
          Gemini
        </h2>
        <Avatar />
      </div>

      {/* Chat Area*/}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto mb-2 flex justify-center"
      >
        <div className="w-full max-w-2xl px-4 py-6 space-y-3">
          {loading ? (
            <div className="space-y-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className={`w-fit max-w-[80%] p-3 rounded-lg ${
                    i % 2 === 0
                      ? "ml-auto bg-gray-500 dark:bg-[#333537] rounded-[24px_0_24px_24px]"
                      : "mr-auto bg-gray-500 dark:bg-[#1E1F20] rounded-[0_24px_24px_24px]"
                  }`}
                >
                  <Skeleton height={16} width={180 + Math.random() * 100} />
                  <Skeleton
                    height={12}
                    width={100 + Math.random() * 60}
                    className="mt-2"
                  />
                </div>
              ))}
            </div>
          ) : room.messages.length === 0 ? (
            <div className="p-6 flex justify-center items-center h-full">
              <h2 className="text-4xl font-semibold bg-gradient-to-r from-blue-500 via-blue-400 to-blue-600 bg-clip-text text-transparent">
                Hello, {displayName}
              </h2>
            </div>
          ) : (
            room.messages.slice(-visibleCount).map((msg, i) => (
              <div key={i}>
                <div
                  style={{ borderRadius: "24px 0 24px 24px" }}
                  className={`relative group w-fit max-w-[80%] p-3 rounded-lg break-words ${
                    msg.sender === "user"
                      ? "bg-gemBubble-light text-gemText-light self-end ml-auto shadow-sm dark:bg-gemBubble-dark dark:text-gemText-dark"
                      : " text-gemText-light dark:text-gemText-dark self-start"
                  }`}
                >
                  <div dangerouslySetInnerHTML={{ __html: msg.text }} />
                  <button
                    onClick={() => {
                      const el = document.createElement("div");
                      el.innerHTML = msg.text;
                      const text = el.textContent || el.innerText || "";
                      navigator.clipboard.writeText(text);
                      toast.success("Copied to clipboard!");
                    }}
                    className="absolute top-1 right-1 text-xs hidden group-hover:block bg-white/70 dark:bg-black/50 p-1 rounded"
                    title="Copy message"
                  >
                    <Copy size={16} />
                  </button>
                </div>
                <div
                  className={`text-[10px] mt-1 px-1 ${
                    msg.sender === "user"
                      ? "text-right text-zinc-400"
                      : "text-zinc-500"
                  }`}
                >
                  {formatTime(msg.ts)}
                </div>
              </div>
            ))
          )}

          {typing && (
            <div className="text-sm text-gray-500 italic">
              Gemini is typing...
            </div>
          )}

          <div ref={chatEndRef}></div>
        </div>
      </div>

      {/* Chat Input Area*/}
      <div className="w-full max-w-2xl mx-auto px-4">
        <div className="rounded-3xl border border-zinc-600 bg-transparent flex flex-col">
          {/* Input + Send */}
          <div className="flex items-center px-4">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && input.trim()) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              placeholder="Ask Gemini"
              className="flex-1 bg-transparent focus:outline-none  py-3"
            />
            <button
              onClick={handleSend}
              disabled={!input.trim()}
              title="Send message"
              className="ml-2 h-10 w-10 flex items-center justify-center rounded-full dark:text-zinc-400 text-zinc-600 hover:bg-zinc-200 dark:hover:bg-zinc-800 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <SendHorizontal size={18} />
            </button>
          </div>

          {/* Image Upload */}
          <div className="px-2">
            <button
              onClick={() => fileInputRef.current.click()}
              title="Upload image"
              className="h-10 w-10 mb-2 flex items-center justify-center rounded-full text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-800"
            >
              <ImagePlus size={18} />
            </button>
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              className="hidden"
              onChange={handleImageUpload}
            />
          </div>
        </div>
        <p className="text-xs text-zinc-500 dark:text-zinc-400  text-center my-2">
          Gemini can make mistakes, so double-check it
        </p>
      </div>
    </div>
  );
};

export default Chatroom;

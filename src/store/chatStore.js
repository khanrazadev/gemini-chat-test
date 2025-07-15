import toast from "react-hot-toast";
import { Navigate } from "react-router-dom";
import { create } from "zustand";
import { generateDummyMessages } from "../utils/generateDummyMessages";

const getFromLocal = (key, fallback) => {
  try {
    const data = JSON.parse(localStorage.getItem(key));
    return data ?? fallback;
  } catch {
    return fallback;
  }
};

export const useChatStore = create((set, get) => ({
  user: getFromLocal("user", null),
  chatrooms: getFromLocal("chatrooms", [
    {
      id: Date.now(),
      title: "Gemini Demo Chat",
      messages: generateDummyMessages(100),
    },
  ]),
  selectedChatId: getFromLocal("selectedChatId", null),

  login: (user) => {
    set({ user });
    localStorage.setItem("user", JSON.stringify(user));
  },
  logout: () => {
    set({ user: null, chatrooms: [], selectedChatId: null });
    localStorage.clear();
    toast.success("You’ve been logged out.");
    Navigate("login");
  },

  createEmptyChatroom: () => {
    const id = Date.now();
    const newRoom = { id, title: "New Chat", messages: [] };

    const updated = [...get().chatrooms, newRoom];
    set({ chatrooms: updated, selectedChatId: id });

    localStorage.setItem("chatrooms", JSON.stringify(updated));
    localStorage.setItem("selectedChatId", id);
  },

  updateChatroomTitle: (roomId, newTitle) => {
    const updated = get().chatrooms.map((room) =>
      room.id === roomId ? { ...room, title: newTitle } : room
    );
    set({ chatrooms: updated });
    localStorage.setItem("chatrooms", JSON.stringify(updated));
  },

  addMessageToRoom: (roomId, message) => {
    const updated = get().chatrooms.map((room) =>
      room.id === roomId
        ? { ...room, messages: [...room.messages, message] }
        : room
    );
    set({ chatrooms: updated });
    localStorage.setItem("chatrooms", JSON.stringify(updated));
  },

  deleteChatroom: (id) => {
    const updated = get().chatrooms.filter((room) => room.id !== id);
    const fallback = updated.length > 0 ? updated[0].id : null;

    set({
      chatrooms: updated,
      selectedChatId:
        get().selectedChatId === id ? fallback : get().selectedChatId,
    });

    localStorage.setItem("chatrooms", JSON.stringify(updated));
    localStorage.setItem("selectedChatId", fallback);
    toast.success("Chatroom deleted");
  },

  selectChat: (id) => {
    set({ selectedChatId: id });
    localStorage.setItem("selectedChatId", id);
  },
}));

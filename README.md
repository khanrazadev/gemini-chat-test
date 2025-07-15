# Gemini Chat UI Clone

Built a smooth, Gemini-style chat app using React, Zustand, and Tailwind CSS. It looks a lot like Google’s Gemini and has features like chat history, dark/light mode, message pagination, infinite scroll, image uploads, mobile support, and more.

🔗 **Live URL**: [https://gemini-chat-test-orpin.vercel.app/app](https://gemini-chat-test-orpin.vercel.app/app)
📦 **GitHub Repo**: [https://github.com/khanrazadev/gemini-chat-test](https://github.com/khanrazadev/gemini-chat-test)

---

## 🔧 Setup Instructions

### 1. Clone the Repo

```bash
https://github.com/khanrazadev/gemini-chat-test.git
cd gemini-chat-test
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Start Development Server

```bash
npm run dev
```

### 4. Build for Production

```bash
npm run build
```

---

## 🗂 Folder Structure

```
src/
├── assets/               # Optional static assets
├── components/           # Reusable components (Sidebar, Avatar, etc.)
├── pages/                # Page views (Login, Chatroom, EmptyChat)
├── store/                # Zustand stores (chat & theme)
├── utils/                # Utility functions (e.g., fetchCountries)
├── App.jsx               # Main route layout
├── main.jsx              # Entry point
├── AppLayout.jsx         # Main shell layout (Sidebar + Chat area)
└── App.css               # Tailwind CSS config
```

---

## ✅ Features

* Gemini-style UI (94% accurate replication)
* Responsive layout: collapsible sidebar, mobile-first design
* Chatroom system with:

  * New chat button (disabled until first message)
  * Chat title auto-generated from first user message
  * Persistent localStorage state for user, chatrooms, and selected room
* Infinite scroll: reverse loading of older messages (client-side pagination)
* Image upload support (with preview)
* Message timestamp formatting
* Copy-to-clipboard on hover
* Theme toggle (light/dark mode saved to `localStorage`)
* Keyboard accessibility (enter to send message)
* Form validation using `react-hook-form` + `zod`
* Custom country select dropdown using `@headlessui/react`
* Route protection for login + app access
* 1 sample preloaded chatroom (for pagination demonstration)
* Toasts for all critical user actions (login, logout, copy, delete)

---

## 🔁 Implementation Details

### 🔹 Throttling (Debounce)

Used a custom `useDebounce()` hook to limit search input frequency in the sidebar chat filter.

### 🔹 Pagination / Infinite Scroll

* Messages are sliced on scroll (`PAGE_SIZE = 20`)
* When scrolling to top, more messages are loaded by increasing `visibleCount`

### 🔹 Form Validation

* Login page uses `react-hook-form` with `zod` schema validation
* Proper error messages shown per field

### 🔹 Protected Routes

* Custom `ProtectedRoute.jsx` prevents users from accessing `/app` without login or `/login` if already logged in

---

## 💻 UI Screenshots

<!-- 📸 Screenshots -->

### 📸 Gemini Chat UI (Light Mode)
![Light Chatroom](./src/assets/screenshots/light-chatroom.pn)

### 📸 Gemini Chat UI (Dark Mode)
![Dark Chatroom](./assets/screenshots/dark-chatroom.png)

### 📸 Mobile View
![Mobile Sidebar](./assets/screenshot/mobile-view.png)

### 📸 Chat with Image Upload & sidebar closed
![Chat with Image](./assets/screenshots/image-upload.png)

---

## 🚀 Extra Touches

While sticking closely, I added a few extras that elevate the experience:

* Gemini-inspired chat bubble shapes and spacing
* Clean mobile behavior (sidebar collapses, Gemini title centers)
* Skeleton loader with 4 simulated bubbles (2 user, 2 AI)
* Graceful fallbacks: "No chat selected", default sample room
* System-preferred dark mode on first load
* Logout clears entire chat state from localStorage



import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import AppLayout from "./components/AppLayout";
import ProtectedRoute from "./components/ProtectedRoute";
import { Toaster } from "react-hot-toast";
import "react-loading-skeleton/dist/skeleton.css";
import { useChatStore } from "./store/chatStore";
import "./App.css"

function App() {
  const user = useChatStore((s) => s.user);

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={<Navigate to={user ? "/app" : "/login"} replace />}
        />

        {/* only accessible if not logged */}
        <Route
          path="/login"
          element={
            user ? <Navigate to="/app" replace /> : <Login />
          }
        />

        {/*Protected*/}
        <Route
          path="/app"
          element={
            <ProtectedRoute>
              <AppLayout />
            </ProtectedRoute>
          }
        />

        {/* catch : for invalid routes */}
        <Route
          path="*"
          element={<Navigate to={user ? "/app" : "/login"} replace />}
        />
      </Routes>
      <Toaster />
    </>
  );
}

export default App;

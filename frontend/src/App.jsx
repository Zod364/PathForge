import { Routes, Route, Navigate } from "react-router-dom";
import PublicLayout from "./components/layout/PublicLayout";
import AdminLayout from "./components/layout/AdminLayout";
import ProtectedRoute from "./components/common/ProtectedRoute";

import Home from "./pages/public/Home";
import RoadmapsList from "./pages/public/RoadmapsList";
import RoadmapDetail from "./pages/public/RoadmapDetail";
import Quizzes from "./pages/public/Quizzes";
import QuizDetail from "./pages/public/QuizDetail";
import Projects from "./pages/public/Projects";
import Resources from "./pages/public/Resources";
import Documentation from "./pages/public/Documentation";
import SkillGuidance from "./pages/public/SkillGuidance";
import NotFound from "./pages/public/NotFound";

import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

import Dashboard from "./pages/admin/Dashboard";
import RoadmapsAdmin from "./pages/admin/RoadmapsAdmin";
import PhasesAdmin from "./pages/admin/PhasesAdmin";
import QuizzesAdmin from "./pages/admin/QuizzesAdmin";
import ProjectsAdmin from "./pages/admin/ProjectsAdmin";
import ResourcesAdmin from "./pages/admin/ResourcesAdmin";
import DocumentationAdmin from "./pages/admin/DocumentationAdmin";
import UsersAdmin from "./pages/admin/UsersAdmin";
import Analytics from "./pages/admin/Analytics";
import Settings from "./pages/admin/Settings";

export default function App() {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route index element={<Home />} />
        <Route path="roadmaps" element={<RoadmapsList />} />
        <Route path="roadmaps/:slug" element={<RoadmapDetail />} />
        <Route path="quizzes" element={<Quizzes />} />
        <Route path="quizzes/:id" element={<QuizDetail />} />
        <Route path="projects" element={<Projects />} />
        <Route path="resources" element={<Resources />} />
        <Route path="docs" element={<Documentation />} />
        <Route path="skill-guides" element={<SkillGuidance />} />
        <Route path="*" element={<NotFound />} />
      </Route>

      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />

      <Route path="admin" element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
        <Route index element={<Dashboard />} />
        <Route path="roadmaps" element={<RoadmapsAdmin />} />
        <Route path="phases" element={<PhasesAdmin />} />
        <Route path="quizzes" element={<QuizzesAdmin />} />
        <Route path="projects" element={<ProjectsAdmin />} />
        <Route path="resources" element={<ResourcesAdmin />} />
        <Route path="docs" element={<DocumentationAdmin />} />
        <Route path="users" element={<UsersAdmin />} />
        <Route path="analytics" element={<Analytics />} />
        <Route path="settings" element={<Settings />} />
        <Route path="*" element={<Navigate to="/admin" replace />} />
      </Route>
    </Routes>
  );
}

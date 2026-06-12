# SkillMap

Dark-gray + mint-green learning platform with role/skill-based roadmaps, quizzes, projects, resources, docs, AI-assisted learning, and a SaaS-grade admin dashboard.

## Stack
- **Backend**: Spring Boot 3.2, Java 17, Spring Security + JWT, Spring Data MongoDB
- **Frontend**: React 18 + Vite + Tailwind + shadcn/ui + @dnd-kit + Recharts
- **DB**: MongoDB 7

## Quick start (Docker)
```bash
docker compose up --build
```
- Frontend → http://localhost:5173
- Backend  → http://localhost:8080/api
- Swagger  → http://localhost:8080/swagger-ui.html
- Admin    → `admin@skillmap.dev` / `Admin@123`

## Run without Docker
```bash
# backend
cd backend && ./mvnw spring-boot:run

# frontend (new terminal)
cd frontend && yarn install && yarn dev
```

## Environment
Copy `.env.example` → `.env` in both `backend/` and `frontend/`.

### Backend env
```
MONGO_URI=mongodb://localhost:27017/skillmap
JWT_SECRET=change-me-super-secret-at-least-32-chars
JWT_EXPIRY_MS=86400000
AI_PROVIDER=openai        # openai | anthropic | none
AI_API_KEY=sk-...          # leave blank to stub AI replies
AI_MODEL=gpt-4o-mini
```

### Frontend env
```
VITE_API_URL=http://localhost:8080
```

## Features
- Role-based + skill-based roadmaps with phases & topics
- Drag-and-drop phase / topic / question reordering (admin) + personal learning queue (user)
- Quizzes: MCQ + long-form interview-prep questions with model answers & AI evaluation
- Projects, Resources, Documentation, Skill Guidance pages
- AI Suggestions ("what to learn next") + Concept Explainer ("Explain with AI ✨")
- Admin dashboard with Recharts analytics, CRUD for all entities, user management
- JWT auth with `ROLE_USER` / `ROLE_ADMIN`
- Seeded sample data on first boot

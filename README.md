# PartnerFinder AI

> An intelligent peer-to-peer developer collaboration and partner discovery web application built with React, Vite, TypeScript, Tailwind CSS, and Zustand.

---

## 🌟 Overview

PartnerFinder AI connects software developers, engineers, and designers based on algorithmic skill compatibility, project requirements, availability schedules, and shared technical interests.

The visual design system is built in strict accordance with the **Google Stitch** enterprise design specifications, featuring a modern slate canvas, high-contrast dark navigation rail, vivid purple gradients, and accessible Material Symbols.

---

## 🚀 Key Features

- **Marketing Landing Page (`/`)**: High-converting hero showcase, algorithm highlights, stats, and testimonials.
- **Account Registration & Login (`/register`, `/login`)**: Fast, secure onboarding access with full credential inputs.
- **4-Step Interactive Onboarding Wizard (`/onboarding/*`)**:
  - Step 1: Basic Information (University, Major, Year of Study, Bio)
  - Step 2: Add Your Skills (with proficiency badges)
  - Step 3: Skills You Want to Learn
  - Step 4: Choose Partner Type (Hackathons, Projects, Skill Exchange, Startups)
- **Project Requirement Setup (`/requirements/new`)**: Detailed project scoping form including weekly commitments, duration, tech stack, and location preferences.
- **AI Match Processing Animation (`/matching/processing`)**: Radar-pulse animated 5-phase matching sequence with real-time progress calculations.
- **Candidate Discovery & Results (`/matches`)**: Multi-criteria filtered search results with match scores, skill tags, and quick actions.
- **Candidate Profile Deep-Dive (`/candidates/:candidateId`)**: Complete portfolio, previous projects, and availability view.
- **AI Match Explanation (`/matches/:candidateId/explanation`)**: Weighted dimensional compatibility breakdown (Skills 40%, Availability 25%, Interests 20%, Location 15%).
- **Connection Management (`/connections/*`)**: Connection requests with pre-filled invitations, status trackers, and success confirmations.
- **Central User Dashboard (`/dashboard`)**: Stat metric widgets, algorithmic recent matches, and project milestone cards.
- **Real-Time Direct Messaging (`/messages`)**: 2-pane responsive conversation threads, online indicators, and chat composer.
- **Collaboration Workspace (`/workspace/:projectId`)**: Shared project dashboard with role tags, milestone tracking, and team roster.
- **Teammate Rating System (`/workspace/:projectId/review/:userId`)**: Multi-criteria 5-star performance evaluations (Communication, Technical Skills, Teamwork, Reliability) with feedback.

---

## 🛠️ Tech Stack

- **Framework**: [React 18](https://react.dev/) + [Vite 6](https://vitejs.dev/)
- **Language**: [TypeScript 5](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS 3](https://tailwindcss.com/) with Google Stitch Design Tokens
- **Icons & Fonts**: Google Material Symbols Outlined, Inter & JetBrains Mono
- **State Management**: [Zustand 5](https://zustand-demo.pmnd.rs/) with persistent `localStorage` middleware
- **Routing**: [React Router v6](https://reactrouter.com/) (21 routes configured)

---

## 📦 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- `npm` or `yarn`

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Thusha-Kunasingam/PartnerFinderAI.git
   cd PartnerFinderAI
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start development server:
   ```bash
   npm run dev
   ```

4. Build for production:
   ```bash
   npm run build
   ```

---

## 📄 Documentation

- [`docs/stitch-analysis.md`](docs/stitch-analysis.md) — Exhaustive Stitch design token and screen inventory.
- [`docs/implementation-plan.md`](docs/implementation-plan.md) — Architectural design and technical roadmap.
- [`docs/phase-1-verification.md`](docs/phase-1-verification.md) — Build verification report with 0 errors.

---

## 🛡️ License

Private project. © 2025 PartnerFinder AI. All rights reserved.

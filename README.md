# FARM MATE — Database-Driven Crop Health & Disease Registry System

Farm Mate is a professional-grade, responsive agricultural stewardship platform and landing page designed for regional agricultural supervisors and local farmers. It features a complete database-driven architecture to log, track, and manage crop health, pathologies, and treatment protocols across multiple regions.

---

## 🌟 Key Features

1. **Database-Driven Record Management**:
   - Centralized agricultural database to store crop health records, disease diagnoses (e.g., Late Blight, Common Rust), confidence ratings, and science-backed treatment protocols.
   - Interactive inspection history with advanced search and status filters (Success, Warning, Critical).

2. **Bilingual Support (English & Kiswahili)**:
   - Seamlessly toggle between English and Kiswahili across all navigation bars, landing pages, dashboards, modals, and forms.

3. **Responsive Navigation & Landing Page**:
   - Clean, modern layout matching professional design standards with earthy green tones (`#14532d` and `#f8fbef`).
   - Quick access links for Home, Dashboard, History, Contact, About, Profile, and Authentication.

4. **Interactive Contact Form & Support**:
   - Direct inquiry submission for agricultural officers and support centers with instant feedback and success confirmation.

5. **Secure Authentication & Role Management**:
   - Regional supervisor and land steward login/registration portals with secure session state.

---

## 🛠️ Technology Stack

- **Frontend**: React 18+, TypeScript, Vite, Tailwind CSS v4.
- **Icons**: Lucide React.
- **Backend**: Node.js & Express server with RESTful API endpoints for record management.
- **Build Tooling**: esbuild & tsx for fast bundling and production server execution.

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher recommended)
- npm

### Installation & Development
1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the development server:
   ```bash
   npm run dev
   ```
3. Open your browser and navigate to `http://localhost:3000`.

### Production Build
To build and start the application for production:
```bash
npm run build
npm start
```

---

## 📂 Project Structure

- `/server.ts`: Express backend server hosting database record APIs and Vite middleware.
- `/src/App.tsx`: Main application router and state controller.
- `/src/components/`: Modular React components (`Navbar.tsx`, `Footer.tsx`, `HomeView.tsx`, `DashboardView.tsx`, `HistoryView.tsx`, `ContactView.tsx`, `AboutView.tsx`, `LoginView.tsx`, `RegisterView.tsx`, `ScanModal.tsx`, `DiagnosisDetailModal.tsx`).
- `/src/data/`: Centralized bilingual translations (`translations.ts`) and mock database records (`mockData.ts`).
- `/src/types.ts`: TypeScript interfaces and type definitions.

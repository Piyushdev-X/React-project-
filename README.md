<div align="center">

<img src="https://img.shields.io/badge/version-0.1.0-00f5c4?style=for-the-badge" />
<img src="https://img.shields.io/badge/status-beta-orange?style=for-the-badge" />
<img src="https://img.shields.io/badge/license-MIT-blue?style=for-the-badge" />
<img src="https://img.shields.io/badge/PRs-welcome-brightgreen?style=for-the-badge" />

<br /><br />

```
██████╗ ██╗      ██████╗ ██╗  ██╗
██╔══██╗██║     ██╔═══██╗██║ ██╔╝
██████╔╝██║     ██║   ██║█████╔╝
██╔══██╗██║     ██║   ██║██╔═██╗
██████╔╝███████╗╚██████╔╝██║  ██╗
╚═════╝ ╚══════╝ ╚═════╝ ╚═╝  ╚═╝
```

### **Campus Peer-to-Peer Task Economy**

*The platform where students earn by helping each other — built for Indian campuses, by students.*

<br />

[🚀 Live Demo](#) · [📖 Docs](#documentation) · [🐛 Report Bug](../../issues) · [✨ Request Feature](../../issues)

</div>

---

## 📌 Table of Contents

- [About](#-about)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Getting Started](#-getting-started)
- [Project Structure](#-project-structure)
- [Screens & Flow](#-screens--flow)
- [Contributing](#-contributing)
- [Roadmap](#-roadmap)
- [License](#-license)

---

## 🧠 About

**Blok** is a closed campus micro-tasking platform where students can post small tasks — homework help, errands, food pickups, code debugging — and other students accept them for real rupee (₹) rewards.

Think of it as **Fiverr × TaskRabbit, locked to your college campus.**

No outsiders. No spam. Just your campus community helping each other out and getting paid for it.

> _"Got a deadline but stuck at the hostel? Someone on campus will handle it."_

### Why Blok?

| Problem | Blok's Solution |
|---|---|
| Students waste time on small tasks | Outsource to a trusted campus peer |
| Students need extra income | Earn ₹ by helping classmates |
| No trust in random gig apps | Campus-only = verified community |
| Platforms take huge cuts | Peer-to-peer = max earnings |

---

## ✨ Features

### Core
- 📋 **Post a Task** — describe your task, set a deadline, name your reward
- 🔍 **Browse Tasks** — discover tasks near you filtered by category, reward, or urgency
- ✅ **Accept & Complete** — accept a task, complete it, get paid
- ⏱️ **Live Countdown Timers** — every task shows time remaining in real time
- 🔒 **Gender-Sensitive Flag** — tasks can be marked to match same-gender helpers only
- 💸 **Delay Penalty System** — 50% reward deduction for late completions

### UX
- 🌑 **Dark Mode Only** — easy on the eyes during late-night study sessions
- 📱 **Mobile-First Design** — built for phones, works great on desktop
- 🏷️ **Category Badges** — Academic, Errand, Delivery, Tech Help, Chores, Other
- 🔔 **Toast Notifications** — instant feedback on task actions
- 🎉 **Confetti on Acceptance** — because dopamine matters

### Trust & Safety
- 🏫 **Campus-Gated Onboarding** — college email required *(coming soon)*
- ⭐ **Ratings System** — build your campus reputation
- 🔐 **Privacy by Default** — task info never shared externally

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | React 18 + Vite |
| **Styling** | Tailwind CSS |
| **State Management** | React Context API |
| **Animations** | Framer Motion |
| **Icons** | Lucide React |
| **Persistence** | localStorage *(prototype)* |
| **Routing** | React Router v6 |

---

## 🚀 Getting Started

### Prerequisites

- Node.js `>=18.0.0`
- npm or yarn

### Installation

```bash
# Clone the repo
git clone https://github.com/your-username/blok.git
cd blok

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
npm run preview
```

### Environment Variables

Create a `.env` file in the root:

```env
VITE_APP_NAME=Blok
VITE_COLLEGE_DOMAIN=yourcollege.edu   # Restrict signup to this domain
VITE_MIN_REWARD=20                    # Minimum task reward in ₹
```

---

## 📁 Project Structure

```
blok/
├── public/
│   └── favicon.ico
├── src/
│   ├── components/
│   │   ├── ui/               # Reusable UI primitives (Button, Card, Badge, Modal)
│   │   ├── TaskCard.jsx      # Individual task card component
│   │   ├── TaskFeed.jsx      # Browse feed with filters
│   │   ├── TaskDetail.jsx    # Task detail modal/page
│   │   ├── PostTask.jsx      # Post a task form
│   │   ├── Navbar.jsx        # Top/bottom navigation
│   │   └── Notifications.jsx # Toast + bell notifications
│   ├── screens/
│   │   ├── Onboarding.jsx    # Sign up / welcome screen
│   │   ├── Browse.jsx        # Main task discovery screen
│   │   ├── MyTasks.jsx       # Posted + accepted tasks
│   │   └── Profile.jsx       # User profile + stats
│   ├── context/
│   │   ├── AppContext.jsx     # Global state (user, tasks)
│   │   └── NotifContext.jsx   # Notification state
│   ├── hooks/
│   │   ├── useCountdown.js   # Live countdown timer hook
│   │   ├── useTasks.js       # Task CRUD operations
│   │   └── useLocalStorage.js
│   ├── utils/
│   │   ├── mockData.js       # Seed data for Browse feed
│   │   ├── formatTime.js     # Relative time helpers
│   │   └── constants.js      # Category colors, config
│   ├── App.jsx
│   └── main.jsx
├── .env.example
├── tailwind.config.js
├── vite.config.js
└── package.json
```

---

## 📱 Screens & Flow

```
Onboarding
    │
    ▼
Browse (Feed)  ──────────────────────────┐
    │                                    │
    ├── Task Card → Task Detail          │
    │       └── Accept Task             │
    │                                    │
    ├── Filter / Search                 │
    │                                    │
    └── [+] Post a Task ────────────────┘
                │
                ▼
           Task appears in Browse feed

My Tasks
    ├── Posted Tab  (Open / Accepted / Completed / Expired)
    └── Accepted Tab (Active tasks + Mark as Done)

Profile
    ├── Stats (Posted / Completed / Earned / Rating)
    ├── Badges
    └── Settings
```

### Task Lifecycle

```
[Posted] → [Accepted] → [Completed] → [Paid]
              ↓
          [Expired] (if past deadline, reward deducted 50%)
```

---

## 🤝 Contributing

Contributions are what make this project grow. We welcome any and all PRs.

```bash
# Fork the repo, then:
git checkout -b feature/your-feature-name
git commit -m "feat: add your feature"
git push origin feature/your-feature-name
# Open a Pull Request
```

### Commit Convention

We follow [Conventional Commits](https://www.conventionalcommits.org/):

| Prefix | Use for |
|---|---|
| `feat:` | New feature |
| `fix:` | Bug fix |
| `ui:` | UI / styling change |
| `refactor:` | Code refactor |
| `docs:` | Documentation update |
| `chore:` | Build / config changes |

### Code Style

- ESLint + Prettier configured (run `npm run lint`)
- Components: functional + hooks only
- No inline styles — Tailwind classes only
- All components must be responsive (mobile + desktop)

---

## 🗺️ Roadmap

### v0.1 — Foundation *(current)*
- [x] Onboarding screen
- [x] Post a Task form
- [x] Browse feed UI
- [x] Dark theme + brand identity
- [ ] Browse feed with mock data
- [ ] Task detail + accept flow
- [ ] My Tasks screen
- [ ] Profile screen

### v0.2 — Functional Prototype
- [ ] Live countdown timers
- [ ] Filter + search
- [ ] Full task lifecycle (post → accept → complete)
- [ ] Local persistence via localStorage
- [ ] Ratings + reputation system

### v0.3 — Real Backend
- [ ] Supabase / Firebase backend
- [ ] College email OTP verification
- [ ] Real-time updates (task accepted, completed)
- [ ] In-app chat between poster and acceptor

### v1.0 — Launch Ready
- [ ] UPI payment integration (Razorpay / PhonePe)
- [ ] Push notifications (PWA)
- [ ] Multi-campus support
- [ ] Admin dashboard for college authorities
- [ ] AI task matching (suggest tasks by skills/courses)

---

## ⚖️ License

Distributed under the MIT License. See [`LICENSE`](./LICENSE) for more information.

---

## 👥 Team

Built with chai ☕ and deadlines 📅 by students, for students.

| Role | Name |
|---|---|
| Founder & Lead Dev | *Piyush* |
| Co-founder | *Khyati* |

---

<div align="center">

**If Blok saved you from submitting an assignment late, give it a ⭐**

*Made with 💚 somewhere on a campus in India*

</div>

# 🧰 Daily Toolkit — All-in-One Utility App

> Modern, fast, offline-first productivity tools — no signup required.

[![Live Demo](https://img.shields.io/badge/▶_Live_Demo-Vercel-000?style=for-the-badge&logo=vercel)](https://all-in-one-daily-utility-toolbox-aj.vercel.app/)
[![React](https://img.shields.io/badge/React-19-61dafb?style=flat-square&logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6?style=flat-square&logo=typescript)](https://typescriptlang.org)
[![Tailwind](https://img.shields.io/badge/Tailwind_CSS-4-06b6d4?style=flat-square&logo=tailwindcss)](https://tailwindcss.com)
[![Vite](https://img.shields.io/badge/Vite-7-646cff?style=flat-square&logo=vite)](https://vite.dev)

---

## 🚀 Use It Now

**[https://all-in-one-daily-utility-toolbox-aj.vercel.app/](https://all-in-one-daily-utility-toolbox-aj.vercel.app/)**

---

## ✨ Tools Included

| Tool | Description |
|------|-------------|
| 🧮 **Calculator** | Basic & scientific mode with expression history |
| 🐍 **Snake Game** | Classic retro snake with increasing speed & best score |
| ⏱️ **Timer & Stopwatch** | Count up/down, lap tracking, custom countdown |
| 📝 **Notes** | Quick notes editor with local storage persistence |
| 🔄 **Unit Converter** | Length, weight, temperature, currency & data |
| 📱 **QR Generator** | Create custom QR codes with color options & PNG download |
| 🔐 **Password Generator** | Secure passwords with strength meter & toggle options |
| 🎲 **Random Tools** | Random numbers, coin flip, dice roll & color picker |
| ✅ **Todo List** | Task management with completion tracking |
| 🎁 **Bonus Tools** | BMI calculator, age calculator & tip splitter |

---

## 🎨 Design

- **Professional SaaS-grade UI** — inspired by shadcn/ui and Tailwind UI
- **Dark & Light mode** — auto-detects system preference + manual toggle
- **Sidebar navigation** — persistent on desktop, hamburger drawer on mobile
- **Responsive** — works beautifully on phones, tablets & desktops
- **Subtle animations** — fade-in transitions, hover effects, staggered card entrance
- **Clean typography** — Inter font with proper hierarchy and spacing

---

## 🛠️ Tech Stack

- **React 19** — component-based UI
- **TypeScript** — type-safe code
- **Vite 7** — blazing fast dev server and builds
- **Tailwind CSS 4** — utility-first styling with CSS-first config
- **React Router** — client-side routing
- **Lucide React** — consistent icon system
- **LocalStorage** — offline data persistence (notes, todos, scores)

---

## 📦 Getting Started

```bash
# Clone
git clone https://github.com/ASHIT2007/All-in-one-daily-utility-toolbox.git
cd All-in-one-daily-utility-toolbox

# Install
npm install

# Dev server
npm run dev

# Production build
npm run build
```

---

## 📁 Project Structure

```
src/
├── components/
│   ├── Sidebar.tsx        # Navigation sidebar (desktop + mobile drawer)
│   ├── Card.tsx           # Dashboard tool card
│   └── ToolPage.tsx       # Reusable tool page wrapper
├── pages/
│   └── Dashboard.tsx      # Home page with tool grid
├── tools/
│   ├── Calculator.tsx
│   ├── SnakeGame.tsx
│   ├── StopwatchTimer.tsx
│   ├── Notes.tsx
│   ├── UnitConverter.tsx
│   ├── QRCodeGen.tsx
│   ├── PasswordGen.tsx
│   ├── RandomGen.tsx
│   ├── TodoList.tsx
│   └── BonusTools.tsx
├── lib/
│   └── localStorage.ts   # Type-safe storage helpers
├── App.tsx                # Root layout + routing
└── index.css              # Design tokens + Tailwind v4 theme
```

---

## 📄 License

MIT © [ASHIT2007](https://github.com/ASHIT2007)

---

<p align="center">Made with ❤️ by <a href="https://github.com/ASHIT2007">ASHIT2007</a></p>

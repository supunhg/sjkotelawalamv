# Sir John Kotelawala Maha Vidyalaya — Official Web Portal

> **Motto:** *"There is no luster of doctrine without discipline"*  
> **Sinhala:** *න හි සීලවතං සෙය්‍යො*  
> **Location:** Kolamunna, Piliyandala, Western Province, Sri Lanka

A modernized, high-performance web portal for **Sir John Kotelawala Maha Vidyalaya (සර් ජෝන් කොතලාවල මහා විද්‍යාලය)**, rebuilt with modern frameworks for ultra-fast load times, silky smooth scrolling, and an elegant institutional aesthetic.

---

## 🌟 Key Improvements Over the Old Website

| Feature | Old Website (`sjkotelawalamv.lk`) | New Rebuilt Portal |
| :--- | :--- | :--- |
| **Framework & Performance** | Unoptimized Next.js bundle with layout shifts and large uncompressed chunks | **Vite + React 18 + TypeScript + Tailwind CSS** with sub-2s production builds and instant HMR |
| **Scrolling Experience** | Standard jerky browser scrolling | **Lenis Smooth Scroll** integration for seamless, inertia-damped navigation |
| **Academics Route** | ❌ **HTTP 404 Not Found** (Broken link) | ✅ Full **Academics Portal** covering Primary (1-5), Junior Secondary (6-9), G.C.E. O/L (10-11), and all 5 G.C.E. A/L streams |
| **Admissions** | ❌ Dead anchor (`href="#"`) | ✅ Dedicated **Admissions Page** with Ministry criteria, document verification checklists, and online inquiry form |
| **Announcements** | Stalled indefinitely on *"Loading announcements..."* | ✅ Interactive, category-filtered **Notice Board** with modal detail views |
| **Header & Layout** | Awkward negative margins (`-mt-18`) clipping crest logo on mobile | ✅ Professional institutional header with top hotline/motto bar, sticky blur on scroll, and mobile drawer |
| **Sports & Athletics** | Basic static schedule | ✅ Interactive **Sports Timetable** with category filtering, search, and Master-in-Charge (MIC) teachers directory |
| **Co-Curriculars** | Brief list of 4 clubs | ✅ Detailed profiles for College Media Unit, Science Club, Inventors Club, Commerce Society, IT Club, and Buddhist Association |

---

## 🛠️ Tech Stack

- **Core:** [React 18](https://react.dev/) & [TypeScript](https://www.typescriptlang.org/)
- **Build Tool:** [Vite 6](https://vitejs.dev/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) with school heritage color palette (Imperial Maroon `#560D0D`, Royal Gold `#C8872B`, and Ivory Cream `#FAF9F5`)
- **Smooth Scrolling:** [Lenis](https://github.com/darkroomengineering/lenis)
- **Routing:** [React Router v6](https://reactrouter.com/)
- **Icons:** [Lucide React](https://lucide.dev/)

---

## 📁 Project Structure

```
mrbhashitha1/
├── public/
│   ├── favicon.ico
│   ├── logoc.png
│   ├── logobw.png
│   └── images/
│       ├── logo-color.png
│       ├── logo-bw.png
│       ├── principal.png
│       ├── media-unit.jpg
│       ├── hero-banner.png
│       ├── sports-banner.png
│       ├── achievements-1.png
│       ├── achievements-2.png
│       ├── news-1.png
│       ├── news-2.png
│       └── gallery/
│           ├── gallery-1.png ... gallery-5.png
├── src/
│   ├── components/
│   │   ├── common/
│   │   │   ├── Badge.tsx
│   │   │   ├── Modal.tsx
│   │   │   ├── SectionHeader.tsx
│   │   │   └── SmoothScrollProvider.tsx
│   │   └── layout/
│   │       ├── BackToTop.tsx
│   │       ├── Footer.tsx
│   │       └── Navbar.tsx
│   ├── data/
│   │   └── schoolData.ts
│   ├── pages/
│   │   ├── AboutPage.tsx
│   │   ├── AcademicsPage.tsx
│   │   ├── AdmissionsPage.tsx
│   │   ├── ContactPage.tsx
│   │   ├── HomePage.tsx
│   │   ├── NewsPage.tsx
│   │   └── SportsPage.tsx
│   ├── types/
│   │   └── index.ts
│   ├── App.tsx
│   ├── index.css
│   └── main.tsx
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── vite.config.ts
```

---

## 🚀 Getting Started

### Prerequisites

Ensure you have **Node.js** (v18 or higher) and **npm** installed.

### Installation

```bash
# Install dependencies
npm install
```

### Development Server

```bash
# Start local development server with instant HMR
npm run dev
```

Visit `http://localhost:3000` in your browser.

### Production Build

```bash
# Type check and build optimized static assets
npm run build
```

The output will be placed in the `dist/` directory, ready to deploy to any hosting provider (Vercel, Netlify, Cloudflare Pages, GitHub Pages).

### Preview Production Build

```bash
npm run preview
```

---

## 🏛️ Heritage Information

- **Founded:** February 6, 1980 at Kollamunna Bimbarama Temple
- **Founders:** Mr. Dharmasena Atigala (Former Health Minister) & J. A. T. A. Abeyratne (Education Officer)
- **Land Estate:** Donated from the estate of General Sir John Kotelawala (3rd Prime Minister of Sri Lanka)
- **Current Principal:** Vajira V. Thanthrige (`Bsc, PgDEM, PgDEMgt, PgDE(Econ)`)
- **Student Body:** 2,300+ Students across Grades 1 – 13
- **Faculty:** 98 Qualified Teachers

# 🚀 Moniruzzaman Rumman - Portfolio

![Portfolio Preview](https://monir-uzzaman.vercel.app/og-image.jpg)

Welcome to my personal portfolio! I am **Moniruzzaman Rumman**, a passionate **Fullstack MERN Web Developer** specializing in building highly performant, scalable, and beautifully designed web applications. 

🔗 **Live Demo:** [https://monir-uzzaman.vercel.app/](https://monir-uzzaman.vercel.app/)

---

## 🌟 Features

- **Modern UI/UX:** Premium dark-themed, glassmorphic design with a custom neon green (`#00FF00`) accent color.
- **Smooth Animations:** Integrated with `framer-motion` for seamless page transitions, scroll animations, and interactive hover effects.
- **Multi-Page Architecture:** Utilizing `react-router-dom` for flawless navigation between the Home page and the dedicated "All Projects" page.
- **Dynamic Content:** Projects and Certificates are fetched dynamically from a custom Express/MongoDB backend (managed via a separate Admin Panel).
- **Fully SEO Optimized:** 
  - Dynamic meta tags and titles using `react-helmet-async`.
  - Comprehensive Open Graph (OG) and Twitter Card support.
  - Full search engine crawlability with `robots.txt` and `sitemap.xml`.
- **Contact Integration:** Functional contact form powered by `EmailJS`.
- **Fully Responsive:** Mobile-first approach using Tailwind CSS grid layouts, ensuring a perfect view on all devices (mobile, tablet, desktop).

---

## 🛠️ Tech Stack

**Frontend Framework & Libraries:**
- [React (Vite)](https://vitejs.dev/) - Blazing fast frontend build tool.
- [TypeScript](https://www.typescriptlang.org/) - For robust, strongly typed code.
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework for rapid styling.
- [Framer Motion](https://www.framer.com/motion/) - Production-ready animation library.
- [React Router DOM](https://reactrouter.com/) - Declarative routing.
- [Lucide React](https://lucide.dev/) - Beautiful and consistent icons.
- [React Helmet Async](https://github.com/staylor/react-helmet-async) - Dynamic SEO document head management.

---

## 🚀 Running Locally

Follow these steps to run the portfolio on your local machine:

### 1. Clone the repository
```bash
git clone https://github.com/monir-codes/My-Portfolio.git
cd My-Portfolio
```

### 2. Install dependencies
```bash
npm install
```

### 3. Set up Environment Variables
Create a `.env` file in the root directory and add your backend API URL (optional if using the fallback):
```env
VITE_API_URL=https://portfolio-server-ten-fawn.vercel.app
```

### 4. Start the Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser to view the application.

---

## 📂 Project Structure

```
My-Portfolio/
├── public/                 # Static assets (robots.txt, sitemap.xml, images)
├── src/
│   ├── components/         # Reusable UI components (Hero, About, Skills, etc.)
│   ├── pages/              # Route pages (AllProjects.tsx)
│   ├── App.tsx             # Main routing & Homepage layout
│   ├── main.tsx            # Application entry point
│   └── index.css           # Global Tailwind styles
├── index.html              # HTML template with global SEO tags
├── tailwind.config.js      # Tailwind configuration
└── package.json            # Project dependencies and scripts
```

---

## ✉️ Contact & Connect

I am always open to discussing web development projects, creative ideas, or opportunities to be part of your vision.

- **GitHub:** [monir-codes](https://github.com/monir-codes)
- **LinkedIn:** [Moniruzzaman](https://www.linkedin.com/in/md-moniruzzaman-rumman/)
- **Email:** Hit the contact form on my portfolio!

---
*Designed & Built with ❤️ by Moniruzzaman*

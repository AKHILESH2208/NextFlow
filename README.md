# NEXTFLOW AI – Generative Creative Suite

**A production-ready node-based DAG editor for orchestrating complex AI + media pipelines.**

Built with real-time canvas interactions, durable background jobs, and advanced media processing — inspired by tools like Krea.ai Nodes and ComfyUI.

[![Live Demo](https://img.shields.io/badge/Live_Demo-Click%20Here-blue?style=for-the-badge&logo=vercel)](https://nextflow-ai.vercel.app)  
[![GitHub Stars](https://img.shields.io/github/stars/YourUsername/nextflow-ai)](https://github.com/YourUsername/nextflow-ai)

---

### ✨ What is NEXTFLOW AI?

NEXTFLOW AI is a **visual workflow builder** that lets creators and developers design, run, and manage complex AI + media pipelines using a beautiful node-based interface.

Think of it as **Figma + ComfyUI + Zapier** combined — but built for generative AI and heavy media processing.

### 🚀 Key Features

- **Real-time Node-based DAG Editor**  
  Powered by React Flow with smooth animations and instant execution feedback.

- **Durable Background Jobs**  
  Integrated **Trigger.dev v3** with automatic retries, queueing, and recovery — workflows survive server restarts.

- **Advanced Media Processing**  
  Full **FFmpeg WASM** support for video/audio manipulation directly in the browser.

- **AI-First Pipeline**  
  Native integration with **Gemini API** (and easily extensible to other LLMs).

- **Production-Grade Architecture**  
  - Next.js 14 App Router + TypeScript  
  - Zustand for lightning-fast state management  
  - Prisma + PostgreSQL backend  
  - Clerk authentication  
  - Transloadit for reliable file uploads

- **Blazing Fast Performance**  
  **98/100 Lighthouse score** • LCP < 1.2s • Near-zero CLS

---

### 🛠 Tech Stack

| Layer           | Technology                          |
|----------------|-------------------------------------|
| Frontend       | Next.js 14 (App Router), React Flow, TypeScript, Tailwind |
| State          | Zustand                             |
| Backend        | Next.js API Routes + Prisma         |
| Database       | PostgreSQL                          |
| Auth           | Clerk                               |
| AI             | Gemini API                          |
| Media          | FFmpeg WASM + Transloadit           |
| Background Jobs| Trigger.dev v3                      |
| Deployment     | Vercel                              |

---

### 📸 Demo

![NEXTFLOW AI Canvas](https://i.imgur.com/your-screenshot-link-here.gif)  


**Live Demo**: [nextflow-ai.vercel.app](https://nextflow-ai.vercel.app)

---

### 📌 Why NEXTFLOW AI Matters

Most AI tools force you to choose between **ease of use** and **power**.  
NEXTFLOW AI gives you both — a beautiful visual interface with production-grade reliability and performance.

---

### 🚧 Current Status

**Live & Production Ready**  
Actively used for complex LLM + media workflows.

**Future Plans**:
- Support for more LLM providers (OpenAI, Claude, Groq, etc.)
- Self-hosted version
- Plugin system for custom nodes
- Team collaboration features

---

### 📄 License

MIT License — feel free to use, modify, and learn from it.

---

**Made with ❤️ by Akhilesh Negi**  
B.Tech CSE, Delhi Technological University (DTU) 

---

### How to Run Locally

```bash
git clone https://github.com/yourusername/nextflow-ai.git
cd nextflow-ai
npm install
npm run dev

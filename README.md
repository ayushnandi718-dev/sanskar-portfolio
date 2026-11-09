# Sanskar Pandey Portfolio

A modern portfolio website for Sanskar Pandey - App & Software Developer, built with React 19, Vite 8, and Tailwind v4. The portfolio showcases Android, iOS, and Flutter applications, services, projects, and contact information.

## 📋 Overview

This portfolio features:
- **Dark theme** with custom accents and morphing background effects
- **AI-powered customer support** (SP Assistant) with LangChain, Groq primary LLM, and NVIDIA fallback
- **Structured knowledge base** for accurate, factual responses about the portfolio
- **Lead qualification** flow without form submissions
- **Chat widget** in the bottom-right corner for AI interactions
- **Contact details** replacing the traditional contact form
- **3D rotating projects** with modals
- **Full responsiveness** from mobile to desktop

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or newer)
- npm, yarn, or pnpm
- Groq API key (for primary LLM) - optional: NVIDIA API key (for fallback)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/SanskarDeveloper/portfolio.git
   cd portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Copy the `.env.example` file and fill in the required values:
   ```bash
   cp .env.example .env
   ```

4. **Configure API keys** (edit `.env`):
   ```env
   # Server
   PORT=8787

   # Contact form (optional - messages saved to data/messages.json without these)
   SMTP_HOST=
   SMTP_PORT=587
   SMTP_SECURE=false
   SMTP_USER=
   SMTP_PASS=
   CONTACT_TO=pyc0453@gmail.com
   CONTACT_FROM=

   # AI Assistant - REQUIRED for LLM responses
   GROQ_API_KEY=your_groq_key_here
   GROQ_MODEL=llama-3.1-70b-versatile

   # Optional NVIDIA fallback
   NVIDIA_API_KEY=your_nvidia_key_here
   NVIDIA_MODEL=nvidia

   # Alternative: If only NVIDIA key is available
   # GROQ_API_KEY=
   # NVIDIA_API_KEY=your_nvidia_key_here
   ```

### Running the project

```bash
# Development mode (Vite + Express API)
npm run dev

# Or start separately:
# Terminal 1: npm run dev (starts Vite)
# Terminal 2: node server/index.js (starts Express API)
```

Available scripts:
- `npm run dev` - Starts Vite dev server and Express API concurrently
- `npm run dev:css` - Watch CSS build
- `npm run dev:api` - Start Express API server
- `npm run dev:web` - Start Vite web server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm preview` - Preview production build

## 🤖 AI Assistant (SP Assistant)

The portfolio includes an AI customer-support assistant powered by LangChain:

### How it works

- **Primary provider**: Groq (fast Llama models)
- **Fallback provider**: NVIDIA (optional)
- **Knowledge base**: Structured documents (not vector DB) containing verified portfolio information
- **Response filtering**: Only uses verified information from the knowledge base
- **Lead qualification**: Collects user interest without form submissions

### Environment variables

| Variable | Required | Description |
|----------|----------|-------------|
| `GROQ_API_KEY` | Yes (for Groq) | Your Groq API key |
| `GROQ_MODEL` | No | Groq model name (default: `llama-3.1-70b-versatile`) |
| `NVIDIA_API_KEY` | No | NVIDIA API key (for fallback) |
| `NVIDIA_MODEL` | No | NVIDIA model name (default: `nvidia`) |

### API endpoint

```
POST /api/assistant
Body: { "message": "your question", "conversationId": "optional" }
```

Responses include:
- `status`: "ok", "unavailable", "error", or "rate_limited"
- `message`: The assistant's response
- `provider`: "groq" or "nvidia"
- `model`: The model name used

### Knowledge base

The assistant uses a structured knowledge base at `src/lib/ai/knowledge-base.ts` with 8 categorized documents:
- personal, services, projects, technical skills, contact, experience, FAQ

Responses are filtered to only include verified information from these documents.

## 📦 Project Structure

```
1/
├── src/
│   ├── components/          # UI components
│   │   ├── Header.jsx
│   │   ├── Hero.jsx
│   │   ├── About.jsx
│   │   ├── Services.jsx
│   │   ├── Skills.jsx
│   │   ├── Projects.jsx
│   │   ├── Experience.jsx
│   │   ├── ContactDetails.jsx  # Replaces contact form
│   │   ├── Footer.jsx
│   │   ├── BackToTop.jsx
│   │   └── ChatWidget.jsx       # AI chat widget
│   ├── data/                # Portfolio data (portfolio.js)
│   ├── lib/
│   │   └── ai/
│   │       └── knowledge-base.ts  # Structured knowledge base
│   └── App.jsx              # Main app component
├── server/
│   ├── index.js             # Express server with AI route
│   └── api/
│       └── assistant.ts       # AI assistant API logic
├── .env.example
├── package.json
└── vite.config.js
```

## ✨ Features

- **AI chat widget** - Floating button in bottom-right, opens overlay with conversation history
- **Lead qualification** - AI assistant collects user name/email for follow-up without form submission
- **Structured knowledge base** - 8 categorized documents with verified portfolio information
- **Groq primary, NVIDIA fallback** - Seamless provider switching
- **Zod validation** - Request validation on the API route
- **Conversation memory** - Maintains history per conversation ID
- **Rate limiting** - 5 submissions per 10 minutes per IP
- **Secure API keys** - Server-side only, never exposed to client
- **Contact details** - Email, WhatsApp, GitHub, LinkedIn (no form submission)
- **All existing portfolio sections functional** - About, Services, Projects, Experience, Skills

## 🛠️ Technology Stack

- **Frontend**: React 19, Vite 8, Framer Motion 14, Tailwind v4
- **Backend**: Express 5, Node.js
- **AI**: LangChain, @langchain/groq, OpenAI compatibility
- **Validation**: Zod
- **Icons**: Lucide React
- **Styling**: Tailwind v4 with custom dark theme colors

## 📄 License

MIT
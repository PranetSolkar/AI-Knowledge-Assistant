# 🚀 Lumina AI Knowledge Assistant

An intelligent PDF-powered AI assistant built with **n8n**, **Pinecone**, and **LLMs**. Upload documents and chat with them naturally using Retrieval-Augmented Generation (RAG).

---

## ✨ Features

* 📄 Upload PDF documents
* 🔍 Semantic search using Pinecone Vector Database
* 🤖 AI-powered question answering
* 💬 Conversation memory with session support
* 📚 Document summarization
* 📝 Notes generation
* 🔎 Context-aware responses
* 🌙 Light/Dark mode UI
* ⚡ Built with n8n low-code workflows
* 🔄 Multi-turn conversations

---

## 🛠 Tech Stack

### Frontend

* HTML
* CSS
* JavaScript

### Backend

* n8n

### AI Components

* LLM (Groq/OpenRouter)
* Pinecone Vector Database
* Cohere Embeddings

### Memory

* Session-based memory

---


## ⚙️ Installation

### 1. Clone the repository

```bash
git clone https://github.com/PranetSolkar/AI-Knowledge-Assistant.git
```

### 2. Enter the project directory

```bash
cd AI-Knowledge-Assistant
```

### 3. Configure Environment Variables

Create a `.env` file:

```env
PINECONE_API_KEY=
COHERE_API_KEY=
OPENROUTER_API_KEY=
GROQ_API_KEY=

CHAT_WEBHOOK_URL=
UPLOAD_WEBHOOK_URL=
```

---

## 🔄 Workflow Architecture

```text
User
 ↓
Frontend
 ↓
n8n Webhook
 ↓
PDF Upload
 ↓
Text Extraction
 ↓
Embeddings
 ↓
Pinecone Vector Database
 ↓
Context Retrieval
 ↓
LLM
 ↓
Response
```

---

## 💡 Example Questions

* Summarize this document.
* Explain this topic in simple words.
* Extract important points.
* Generate notes.
* What are the key findings?
* Explain this concept with examples.

---

## 📸 Screenshot

### Home Page

![Home Page](screenshots/Interface.png)


## 🔐 Security

Sensitive information is not stored in the repository.

API keys are managed through environment variables and are excluded using `.gitignore`.

---

## 📈 Future Improvements

* Multi-document support
* Page citations
* OCR support for scanned PDFs
* Voice assistant
* Streaming responses
* Authentication system
* Document comparison

---


## 👨‍💻 Author

**Pranet Solkar**


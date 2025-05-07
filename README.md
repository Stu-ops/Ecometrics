<body>

  <!-- Top Navigation -->
  <div class="topnav" id="myTopnav">
    <a href="#overview" class="active">Overview</a>
    <a href="#structure">Structure</a>
    <a href="#tech">Tech Stack</a>
    <a href="#setup">Getting Started</a>
    <a href="#usage">Usage</a>
    <a href="#aipart">AI_Part</a>
    <a href="#data">Sample Data</a>
    <a href="#contributing">Contributing</a>
    <a href="#license">License</a>
  </div>

  <div class="container my-4">
    <h1 class="mb-3">Ecometrics <small class="text-muted">Net Footprint Dashboard</small></h1>
    <!-- Badges -->
    <p>
      <img src="https://img.shields.io/github/repo-size/Stu-ops/apna-nfd" alt="Repo Size">
      <img src="https://img.shields.io/github/languages/top/Stu-ops/apna-nfd" alt="Languages"> 
      <img src="https://img.shields.io/badge/License-MIT-blue.svg" alt="License: MIT">
    </p>

  Table of Contents
  <nav class="mb-4">
      <ul>
        <li><a href="#overview">Project Overview</a></li>
        <li><a href="#structure">Repository Structure</a></li>
        <li><a href="#tech">Tech Stack</a></li>
        <li><a href="#setup">Getting Started</a></li>
        <li><a href="#usage">Usage & API</a></li>
        <li><a href="#aipart">AI_Part Module</a></li>
        <li><a href="#data">Sample Data</a></li>
        <li><a href="#contributing">Contributing</a></li>
        <li><a href="#license">License</a></li>
      </ul>
    </nav>

  Sections
  <section id="overview">
      <h2>Project Overview</h2>
      <p>
        <strong>apna‑nfd</strong> ingests industrial metrics, uses a PyTorch model to predict carbon footprints,
        and delivers sustainability recommendations via an AI chatbot. It’s split into backend, frontend,
        and an AI_Part module for recommendation logic.
      </p>
    </section>

  <section id="structure">
      <h2>Repository Structure</h2>
      <pre><code>
├── AI_Part/                # Chatbot & recommendation engine  
├── backend/                # FastAPI service, PyTorch model, templates  
│   ├── app.py  
│   ├── asgi.py  
│   ├── model/carbon_model.pth  
│   ├── data/sample_input.csv  
│   ├── data/sample_output.csv  
│   ├── static/css/style.css  
│   └── templates/index.html  
├── frontend/               # React/TypeScript SPA  
│   ├── package.json  
│   ├── public/index.html  
│   └── src/  
├── sample_data.csv         # Combined sample data  
└── index.html              # ← this file  
      </code></pre>
    </section>

  <section id="tech">
      <h2>Tech Stack</h2>
      <ul>
        <li><strong>Backend</strong>: FastAPI (ASGI) , Uvicorn, Pydantic</li>
        <li><strong>Model</strong>: PyTorch <code>.pth</code> serialization </li>
        <li><strong>Chatbot</strong>: Groq AI integration</li>
        <li><strong>Frontend</strong>: React, TypeScript, Vite </li>
        <li><strong>Containerization</strong>: Docker & Docker Compose </li>
        <li><strong>Docs</strong>: Swagger UI & ReDoc (OpenAPI) </li>
      </ul>
    </section>

  <section id="setup">
      <h2>Getting Started</h2>
      <h3>Backend</h3>
      <pre><code>
cd backend
pip install -r requirements.txt
uvicorn asgi:asgi_app --reload --host 0.0.0.0 --port 8000
      </code></pre>
      <h3>Frontend</h3>
      <pre><code>
cd frontend
npm install
npm run dev    # http://localhost:3000
      </code></pre>
      <h3>Docker &amp; Docker Compose</h3>
      <pre><code>
# docker-compose.yml
version: '3.8'
services:
  backend:
    build: ./backend
    ports: ["8000:8000"]
  frontend:
    build: ./frontend
    ports: ["3000:3000"]

# launch all
docker-compose up --build
      </code></pre>
    </section>

  <section id="usage">
      <h2>Usage &amp; API</h2>
      <h3>API Endpoints</h3>
      <table class="table">
        <thead><tr><th>Route</th><th>Method</th><th>Description</th></tr></thead>
        <tbody>
          <tr><td>/</td><td>GET</td><td>Dashboard HTML</td></tr>
          <tr><td>/predict</td><td>POST</td><td>Industrial metrics → carbon prediction</td></tr>
          <tr><td>/chat</td><td>POST</td><td>AI sustainability advice</td></tr>
        </tbody>
      </table>
      <h3>Interactive Docs</h3>
      <p>
        Swagger UI: <a href="http://localhost:8000/docs">/docs</a><br>
        ReDoc: <a href="http://localhost:8000/redoc">/redoc</a>
      </p>
    </section>

  <section id="aipart">
      <h2>AI_Part Module</h2>
      <pre><code>
AI_Part/
├── chatbot.py       # Message handling
├── recommendations/ # Prompt templates & logic
└── utils.py
      </code></pre>
      <p>Run CLI tests: <code>python AI_Part/chatbot.py</code></p>
    </section>

  <section id="data">
      <h2>Sample Data</h2>
      <ul>
        <li><code>backend/data/sample_input.csv</code></li>
        <li><code>backend/data/sample_output.csv</code></li>
        <li><code>sample_data.csv</code></li>
      </ul>
    </section>

  <section id="contributing">
      <h2>Contributing</h2>
      <ol>
        <li>Fork &amp; create branch (<code>feature/xyz</code>)</li>
        <li>Commit with Conventional Commits</li>
        <li>Open a Pull Request against <code>main</code></li>
      </ol>
    </section>

  <section id="license">
      <h2>License</h2>
      <p>MIT License. See <a href="LICENSE">LICENSE</a> for details.</p>
    </section>
  </div>

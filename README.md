<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Apna‑NFD (Net Footprint Dashboard)</title>
  <style>
    body { font-family: Arial, sans-serif; margin: 0; padding: 2rem; line-height: 1.6; background-color: #f9f9f9; }
    .container { max-width: 800px; margin: auto; background: #fff; padding: 2rem; box-shadow: 0 2px 8px rgba(0,0,0,0.1); }
    h1, h2, h3 { color: #333; }
    pre { background: #272822; color: #f8f8f2; padding: 1rem; overflow-x: auto; }
    code { background: #eee; padding: 0.2rem 0.4rem; border-radius: 4px; }
    a { color: #0366d6; text-decoration: none; }
    a:hover { text-decoration: underline; }
    table { border-collapse: collapse; width: 100%; margin: 1rem 0; }
    th, td { border: 1px solid #ddd; padding: 0.5rem; }
    th { background: #f1f1f1; }
    .badge { display: inline-block; margin-right: 0.5rem; }
  </style>
</head>
<body>
  <div class="container">
    <!-- Badges -->
    <p>
      <a class="badge" href="LICENSE"><img src="https://img.shields.io/badge/License-MIT-yellow.svg" alt="License: MIT"></a>
      <a class="badge" href="https://github.com/Stu-ops/apna-nfd"><img src="https://img.shields.io/github/repo-size/Stu-ops/apna-nfd" alt="Repo Size"></a>
      <a class="badge" href="https://github.com/Stu-ops/apna-nfd"><img src="https://img.shields.io/github/languages/top/Stu-ops/apna-nfd" alt="Languages"></a>
    </p>

    <h1>Apna-NFD (Net Footprint Dashboard)</h1>
    <p><em>A full‑stack platform to ingest industrial data, predict corporate carbon footprint, and deliver actionable sustainability recommendations.</em></p>

    <h2>🗂️ Repository Structure</h2>
    <pre><code>├── app.py
├── asgi.py
├── requirements.txt
├── Dockerfile
├── data/
│   ├── sample_input.csv
│   └── sample_output.csv
├── model/
│   └── carbon_model.pth
├── static/
│   └── css/
│       └── style.css
└── templates/
    └── index.html</code></pre>

    <h2>🚀 Quickstart</h2>
    <h3>1. Clone repo</h3>
    <pre><code>git clone https://github.com/Stu-ops/apna-nfd.git
cd apna-nfd</code></pre>

    <h3>2. Install dependencies</h3>
    <pre><code>pip install -r requirements.txt</code></pre>

    <h3>3. Run locally</h3>
    <pre><code>uvicorn asgi:asgi_app --reload --host 0.0.0.0 --port 8000</code></pre>

    <h2>🔧 Configuration</h2>
    <p>Copy <code>.env.example</code> to <code>.env</code> and set your API keys:</p>
    <pre><code>GROQ_API_KEY=your_groq_key_here
DATA_SOURCE_URL=http://your-data-source</code></pre>

    <h2>📡 API Endpoints</h2>
    <table>
      <tr><th>Route</th><th>Method</th><th>Description</th></tr>
      <tr><td>/predict</td><td>GET</td><td>Returns predicted carbon emission from sample data.</td></tr>
      <tr><td>/chat</td><td>POST</td><td>Chatbot Q&A with sustainability recommendations. <code>{ "message": "..." }</code></td></tr>
    </table>

    <h2>📊 Sample Input & Output</h2>
    <pre><code>// sample_input.csv
industry,energy_consumption,transport_emissions,...
Manufacturing,12000,300,...

// sample_output.csv
prediction
4500.25</code></pre>

    <h2>🛠️ Architecture</h2>
    <ul>
      <li>Flask + ASGI (Uvicorn via <code>WsgiToAsgi</code>)</li>
      <li>Groq AI chatbot for recommendations</li>
      <li>pickle <code>.pkl</code> model for emission prediction</li>
      <li>Dockerized for container deployment</li>
    </ul>

    <h2>🤝 Contributing</h2>
    <p>1. Fork repo<br>2. Create feature branch<br>3. Commit & push<br>4. Open a PR</p>

    <h2>📄 License</h2>
    <p>Distributed under the MIT License. See <a href="LICENSE">LICENSE</a> for details.</p>

    <p>---<br>Made with ❤️ by Stu‑ops</p>
  </div>
</body>
</html>

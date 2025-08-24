
 
  <h1>🚀 MERN App with Docker</h1>
  <p>This project is a <strong>MERN stack (MongoDB, Express, React, Node.js)</strong> application fully dockerized with Docker Compose.<br/>
  It runs three main services:</p>
  <ul>
    <li><strong>MongoDB</strong> → Database</li>
    <li><strong>Backend</strong> → Express.js + Mongoose API</li>
    <li><strong>Frontend</strong> → React app</li>
  </ul>

  <hr/>

  <h2>📂 Project Structure</h2>
  <pre><code>app_with_docker/
│
├── backend/         # Express + Mongoose backend
│   ├── Dockerfile
│   ├── package.json
│   └── server.js
│
├── frontend/        # React frontend
│   ├── Dockerfile
│   ├── package.json
│   └── src/
│
├── docker-compose.yml
└── README.md</code></pre>

  <hr/>

  <h2>🐳 Docker Setup</h2>

  <h3>1️⃣ Clone the repository</h3>
  <pre><code class="language-bash">git clone &lt;your-repo-url&gt;
cd app_with_docker</code></pre>

  <h3>2️⃣ Build &amp; Start containers</h3>
  <pre><code class="language-bash">docker-compose up --build</code></pre>

  <p>This will:</p>
  <ul>
    <li>Build backend and frontend images</li>
    <li>Start MongoDB, backend, and frontend containers</li>
    <li>Connect them all in the same <strong>mern</strong> network</li>
  </ul>

  <h3>3️⃣ Access the services</h3>
  <ul>
    <li><strong>Frontend</strong> → <a href="http://localhost:3000">http://localhost:3000</a></li>
    <li><strong>Backend API</strong> → <a href="http://localhost:5000">http://localhost:5000</a></li>
    <li><strong>MongoDB</strong> → <code>mongodb://localhost:27017/mydb</code> (from host)</li>
    <li><strong>Inside backend container</strong> → <code>mongodb://mongodb:27017/mydb</code></li>
  </ul>

  <hr/>

  <h2>⚙️ Docker Compose File</h2>
  <pre><code class="language-yaml">version: "3.9"

services:
  # 🔹 MongoDB Service
  mongodb:
    image: mongo:latest
    container_name: mongodb
    ports:
      - "27017:27017"
    volumes:
      - mongo_data:/data/db
    networks:
      - mern

  # 🔹 Backend (Express + Node.js)
  backend:
    build: ./backend
    container_name: backend
    ports:
      - "5000:5000"
    environment:
      - MONGO_URI=mongodb://mongodb:27017/mydb
    depends_on:
      - mongodb
    networks:
      - mern

  # 🔹 Frontend (React)
  frontend:
    build: ./frontend
    container_name: frontend
    ports:
      - "3000:3000"
    environment:
      - REACT_APP_API_URL=http://localhost:5000
    depends_on:
      - backend
    networks:
      - mern

networks:
  mern:
    driver: bridge

volumes:
  mongo_data:</code></pre>

  <hr/>

  <h2>📝 Example Backend Dockerfile</h2>
  <pre><code class="language-dockerfile">FROM node:18

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 5000

CMD ["npm", "start"]</code></pre>

  <h2>📝 Example Frontend Dockerfile</h2>
  <pre><code class="language-dockerfile">FROM node:18

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]</code></pre>

  <hr/>

  <h2>📂 Example <code>.dockerignore</code></h2>

  <h3>Backend (<code>backend/.dockerignore</code>)</h3>
  <pre><code>node_modules
npm-debug.log
.env
.git</code></pre>

  <h3>Frontend (<code>frontend/.dockerignore</code>)</h3>
  <pre><code>node_modules
build
npm-debug.log
.env
.git</code></pre>

  <hr/>

  <h2>🛠 Useful Commands</h2>

  <p>View running containers:</p>
  <pre><code class="language-bash">docker ps</code></pre>

  <p>Stop containers:</p>
  <pre><code class="language-bash">docker-compose down</code></pre>

  <p>Rebuild and restart:</p>
  <pre><code class="language-bash">docker-compose up --build</code></pre>

  <p>Clean volumes (remove MongoDB data):</p>
  <pre><code class="language-bash">docker-compose down -v</code></pre>

  <hr/>

  <h2>📌 Notes</h2>
  <ul>
    <li>The backend connects to MongoDB using the hostname <strong>mongodb</strong> (service name).</li>
    <li>The frontend uses the environment variable:</li>
  </ul>
  <pre><code class="language-env">REACT_APP_API_URL=http://localhost:5000</code></pre>
  <p>Add <code>.dockerignore</code> in both <code>backend/</code> and <code>frontend/</code> to prevent unnecessary files (like <code>node_modules</code>, <code>.git</code>, <code>.env</code>, logs) from being copied into Docker images.</p>

  <hr/>

  <h2>✅ Summary</h2>
  <p>With this setup, you can bring up your full MERN stack with a single command:</p>
  <pre><code class="language-bash">docker-compose up --build</code></pre>
  <p>Your app will be live at <a href="http://localhost:3000"><strong>http://localhost:3000</strong></a> 🎉</p>


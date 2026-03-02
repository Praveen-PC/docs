import React from "react";
import {
  FaBrain,
  FaSearch,
  FaReact,
  FaServer,
  FaKey,
  FaDatabase,
  FaRocket,
} from "react-icons/fa";
import { SiFastapi, SiPostgresql } from "react-icons/si";

const About = () => {
  return (
    <div className="container py-5">

      {/* ================= INTRO ================= */}
      <div className="text-center mb-5">
        <h2 className="fw-bold mb-3" style={{ color: "#4F46E5" }}>
          About Docs AI
        </h2>
        {/* <p className="text-muted mx-auto" style={{ maxWidth: "750px" }}>
          Docs AI is a full-stack intelligent assistant platform that combines 
          Large Language Models (LLM) with Retrieval-Augmented Generation (RAG) 
          to deliver accurate, context-aware responses. Built using modern cloud 
          technologies, it provides a secure, scalable, and high-performance 
          AI-driven chat experience.
        </p> */}
        <p className="text-muted mx-auto" style={{ maxWidth: "750px" }}>
  Docs AI is a full-stack intelligent assistant platform powered by 
  Large Language Models (LLM). The system is designed with scalable 
  architecture and secure cloud infrastructure to deliver fast, 
  context-aware AI responses.
</p>
      </div>

      {/* ================= KEY FEATURES ================= */}
      <div className="mb-5">
        <h4 className="fw-semibold mb-4">Key Features</h4>
        <div className="row g-4">

          {/* <div className="col-md-6">
            <div className="p-4 bg-white shadow-sm rounded-4 h-100">
              <FaBrain style={{ color: "#4F46E5" }} className=" mb-3" size={22} />
              <h6 className="fw-semibold">LLM Powered Responses</h6>
              <p className="text-muted mb-0">
                Integrated with Groq LLM to generate intelligent, structured, 
                and context-aware responses in real time.
              </p>
            </div>
          </div>

          <div className="col-md-6">
            <div className="p-4 bg-white shadow-sm rounded-4 h-100">
              <FaSearch style={{ color: "#4F46E5" }} className=" mb-3" size={22} />
              <h6 className="fw-semibold">RAG Mode</h6>
              <p className="text-muted mb-0">
                Enhances AI accuracy by retrieving relevant stored information 
                before generating responses.
              </p>
            </div>
          </div> */}

          <div className="col-md-6">
  <div className="p-4 bg-white shadow-sm rounded-4 h-100">
    <FaBrain style={{ color: "#4F46E5" }} className=" mb-3" size={22} />
    <h6 className="fw-semibold">LLM Powered Responses</h6>
    <p className="text-muted mb-0">
      Integrated with Groq LLM to generate intelligent and structured
      responses in real time with contextual understanding.
    </p>
  </div>
</div>

<div className="col-md-6">
  <div className="p-4 bg-white shadow-sm rounded-4 h-100">
    <FaSearch style={{ color: "#4F46E5" }} className=" mb-3" size={22} />
    <h6 className="fw-semibold">Future: Retrieval-Augmented Generation (RAG)</h6>
    <p className="text-muted mb-0">
      Planned enhancement to improve response accuracy by retrieving 
      relevant stored knowledge before generating AI output.
    </p>
  </div>
</div>

          <div className="col-md-6">
            <div className="p-4 bg-white shadow-sm rounded-4 h-100">
              <FaDatabase style={{ color: "#4F46E5" }} className=" mb-3" size={22} />
              <h6 className="fw-semibold">Persistent Chat History</h6>
              <p className="text-muted mb-0">
                Secure storage of chat sessions with dynamic retrieval and 
                conversation management.
              </p>
            </div>
          </div>

          <div className="col-md-6">
            <div className="p-4 bg-white shadow-sm rounded-4 h-100">
              <FaRocket style={{ color: "#4F46E5" }} className=" mb-3" size={22} />
              <h6 className="fw-semibold">Responsive & Modern UI</h6>
              <p className="text-muted mb-0">
                Clean React-based interface with mobile responsiveness and 
                intuitive navigation.
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* ================= TECH STACK ================= */}
      <div className="mb-5">
        <h4 className="fw-semibold mb-4">Technology Stack</h4>
        <div className="row g-4">

          <div className="col-md-6">
            <div className="p-4 bg-white shadow-sm rounded-4 h-100">
              <FaReact style={{ color: "#4F46E5" }} className=" mb-3" size={22} />
              <h6 className="fw-semibold">Frontend</h6>
              <p className="text-muted mb-0">
                Built using React.js with modern component architecture, 
                protected routing, and state management.
              </p>
            </div>
          </div>

          <div className="col-md-6">
            <div className="p-4 bg-white shadow-sm rounded-4 h-100">
              <SiFastapi  style={{ color: "#4F46E5" }} className=" mb-3" size={22} />
              <h6 className="fw-semibold">Backend</h6>
              <p className="text-muted mb-0">
                FastAPI-based REST API architecture ensuring high performance 
                and structured endpoint management.
              </p>
            </div>
          </div>

          <div className="col-md-6">
            <div className="p-4 bg-white shadow-sm rounded-4 h-100">
              <SiPostgresql style={{ color: "#4F46E5" }} className=" mb-3" size={22} />
              <h6 className="fw-semibold">Database</h6>
              <p className="text-muted mb-0">
                Neon Cloud PostgreSQL database for scalable and reliable 
                structured data storage.
              </p>
            </div>
          </div>

          <div className="col-md-6">
            <div className="p-4 bg-white shadow-sm rounded-4 h-100">
              <FaKey className=" mb-3" size={22} style={{ color: "#4F46E5" }} />
              <h6 className="fw-semibold">Authentication & Security</h6>
              <p className="text-muted mb-0">
                JWT-based authentication with access tokens, refresh tokens, 
                secure API protection, and profile management.
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* ================= ARCHITECTURE ================= */}
      <div className="mb-5">
        <h4 className="fw-semibold mb-3">System Architecture</h4>
        {/* <p className="text-muted">
          The platform follows a structured client-server architecture. The 
          React frontend communicates with FastAPI REST endpoints. AI requests 
          are processed through Groq LLM, enhanced with RAG retrieval logic, 
          and stored securely in Neon PostgreSQL. Authentication is managed 
          using JWT tokens with protected routes to ensure data security.
        </p> */}

        <p className="text-muted">
  The platform follows a structured client-server architecture.
  The React frontend communicates with FastAPI REST APIs.
  AI requests are processed using Groq LLM and stored securely
  in Neon PostgreSQL. Authentication is managed using JWT-based
  access and refresh tokens with protected routes.
</p>
      </div>

      {/* ================= FUTURE IMPROVEMENTS ================= */}
     <div>
  <h4 className="fw-semibold mb-3">Future Enhancements</h4>
  <ul className="text-muted">
    <li>Vector database integration for advanced Retrieval-Augmented Generation (RAG)</li>
    <li>Streaming AI responses for real-time interaction</li>
    <li>Embedding-based semantic search implementation</li>
    <li>Document upload, indexing, and contextual querying</li>
    <li>Role-based access control (RBAC)</li>
    <li>Conversation sharing, export, and history management</li>
  </ul>
</div>

      

    </div>
  );
};

export default About;
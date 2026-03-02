import React, { useRef, useState, useEffect } from "react";
import { FaPaperPlane } from "react-icons/fa";
import api from "../axios/api";
import { useAuth } from "../Authentication/AuthContext";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneLight } from "react-syntax-highlighter/dist/esm/styles/prism";

const Dashboard = () => {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const textareaRef = useRef();
  const bottomRef = useRef(null);

  const { user, chatID, setChatID, selectedModel, data, setData, setchatHistory } = useAuth();

  useEffect(() => {
    const savedChatID = localStorage.getItem("chatID");
    if (savedChatID && !chatID) {
      setChatID(Number(savedChatID));
    }
  }, [setChatID]);

  useEffect(() => {
    if (chatID) {
      localStorage.setItem("chatID", chatID);
    }
  }, [chatID]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [data]);

  const handleSendPrompt = async () => {
    if (!prompt.trim() || loading) return;
    try {
      setLoading(true);
      setPrompt("");
      const userMessage = {
        id: Date.now(),
        role: "user",
        content: prompt,
      };

      setData((prev) => [...prev, userMessage]);

      const response = await api.post("/model/getdata", {
        chat_id: chatID,
        content: prompt,
        mode: selectedModel,
      });

      // if (!chatID) {
      //   setChatID(response.data.chat_id);
      // }

      if (!chatID) {
  setChatID(response.data.chat_id);

  setchatHistory((prev) => [
    {
      chat_id: response.data.chat_id,
      first_question: prompt,
    },
    ...prev,
  ]);
}

      const assistantMessage = {
        id: Date.now() + 1,
        role: "assistant",
        content: response.data.content,
      };

      setData((prev) => [...prev, assistantMessage]);

      setPrompt("");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendPrompt();
    }
  };



  useEffect(() => {
  const loadChatIfExists = async () => {
    if (chatID && data.length === 0) {
      try {
        const response = await api.get(`/model/getchat/${chatID}`);
        setData(response.data);
      } catch (error) {
        console.log(error);
        setChatID(null);
        localStorage.removeItem("chatID");
      }
    }
  };

  loadChatIfExists();
}, [chatID]);

  // rendering



  return (
    <div className="d-flex flex-column h-100" style={{ background: "#F8FAFC" }}>
      <div className="flex-grow-1 overflow-auto px-3 py-4">
        {data.length === 0 ? (
          <div className="d-flex justify-content-center align-items-center mt-5">
            <div
              className="text-center p-5 rounded-4 shadow-sm"
              style={{
                background: "linear-gradient(135deg, #EEF2FF, #F8FAFC)",
                maxWidth: "420px",
                width: "100%",
              }}
            >
              <div
                className="d-inline-flex align-items-center justify-content-center mb-4"
                style={{
                  width: "70px",
                  height: "70px",
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, #4F46E5, #6366F1)",
                  fontSize: "30px",
                }}
              >
                🤖
              </div>

              <h5 className="fw-semibold mb-2" style={{ color: "#1E293B" }}>
                Your AI Assistant
              </h5>

              <p className="text-muted mb-0" style={{ fontSize: "14px" }}>
                Ask me anything — coding, ideas, explanations, or problem
                solving. I'm here to help you instantly.
              </p>
            </div>
          </div>
        ) : (
          data.map((msg) => (
            <div key={msg.id} className="mb-4">
              {msg.role === "user" && (
                <div className="d-flex justify-content-end align-items-end gap-2">
                  <div
                    className="text-white px-4 py-3 rounded-4 shadow-sm"
                    style={{
                      maxWidth: "70%",
                      background: "linear-gradient(135deg, #4F46E5, #6366F1)",
                      whiteSpace: "pre-wrap",
                      fontSize: "14px",
                    }}
                  >
                    {msg.content}
                  </div>

                  <div
                    className="rounded-circle d-flex align-items-center justify-content-center text-white fw-bold"
                    style={{
                      width: "28px",
                      height: "28px",
                      background: "linear-gradient(135deg, #4F46E5, #6366F1)",
                      fontSize: "12px",
                    }}
                  >
                    {user?.name?.charAt(0).toUpperCase()}
                  </div>
                </div>
              )}

              {msg.role === "assistant" && (
                <div className="d-flex justify-content-start align-items-end gap-2 mt-3">
                  <div
                    className="rounded-circle d-flex align-items-center justify-content-center"
                    style={{
                      width: "28px",
                      height: "28px",
                      backgroundColor: "#E2E8F0",
                      fontSize: "12px",
                    }}
                  >
                    🤖
                    
                  </div>

                  <div
                    className="bg-white px-4 py-3 rounded-4 shadow-sm"
                    style={{
                      maxWidth: "70%",
                      fontSize: "14px",
                      lineHeight: "1.6",
                    }}
                  >
                    <ReactMarkdown
                      components={{
                        h1: ({ node, ...props }) => (
                          <h1
                            style={{
                              fontSize: "20px",
                              fontWeight: "700",
                              marginBottom: "10px",
                            }}
                            {...props}
                          />
                        ),
                        h2: ({ node, ...props }) => (
                          <h2
                            style={{
                              fontSize: "18px",
                              fontWeight: "600",
                              marginBottom: "8px",
                            }}
                            {...props}
                          />
                        ),
                        p: ({ node, ...props }) => (
                          <p
                            style={{ marginBottom: "8px", color: "#334155" }}
                            {...props}
                          />
                        ),
                        ul: ({ node, ...props }) => (
                          <ul
                            style={{ paddingLeft: "18px", marginBottom: "8px" }}
                            {...props}
                          />
                        ),
                        ol: ({ node, ...props }) => (
                          <ol
                            style={{ paddingLeft: "18px", marginBottom: "8px" }}
                            {...props}
                          />
                        ),
                        li: ({ node, ...props }) => (
                          <li style={{ marginBottom: "4px" }} {...props} />
                        ),
                        code({ inline, className, children, ...props }) {
                          const match = /language-(\w+)/.exec(className || "");

                          return !inline && match ? (
                            <SyntaxHighlighter
                              style={oneLight}
                              language={match[1]}
                              PreTag="div"
                              customStyle={{
                                borderRadius: "10px",
                                fontSize: "13px",
                                padding: "12px",
                                marginTop: "8px",
                                marginBottom: "8px",
                              }}
                              {...props}
                            >
                              {String(children).replace(/\n$/, "")}
                            </SyntaxHighlighter>
                          ) : (
                            <code
                              style={{
                                backgroundColor: "#F1F5F9",
                                padding: "2px 6px",
                                borderRadius: "6px",
                                fontSize: "13px",
                              }}
                              {...props}
                            >
                              {children}
                            </code>
                          );
                        },
                      }}
                    >
                      {msg.content}
                    </ReactMarkdown>
                  </div>

                  {/* <div
                    className="bg-white px-4 py-3 rounded-4 shadow-sm"
                    style={{
                      maxWidth: "70%",
                      whiteSpace: "pre-wrap",
                      fontSize: "14px",
                    }}
                  >
                    <ReactMarkdown>{msg.content}</ReactMarkdown>
                  </div> */}
                </div>
              )}
            </div>
          ))
        )}

        {loading && (
          <div className="d-flex justify-content-start align-items-end gap-2 mt-3">
            <div
              className="rounded-circle d-flex align-items-center justify-content-center shadow-sm text-white"
              style={{
                width: "32px",
                height: "32px",
                background: "linear-gradient(135deg, #4F46E5, #6366F1)",
                fontSize: "14px",
              }}
            >
              🤖
            </div>

            <div
              className="px-4 py-3 rounded-4 shadow-sm d-flex align-items-center gap-2"
              style={{
                background: "#ffffff",
                borderTopLeftRadius: "8px",
              }}
            >
              <div className="d-flex align-items-center gap-1">
                <span
                  style={{
                    width: "8px",
                    height: "8px",
                    borderRadius: "50%",
                    background: "linear-gradient(135deg, #4F46E5, #6366F1)",
                    animation: "pulse 1.4s infinite",
                  }}
                />
                <span
                  style={{
                    width: "8px",
                    height: "8px",
                    borderRadius: "50%",
                    background: "linear-gradient(135deg, #4F46E5, #6366F1)",
                    animation: "pulse 1.4s infinite 0.2s",
                  }}
                />
                <span
                  style={{
                    width: "8px",
                    height: "8px",
                    borderRadius: "50%",
                    background: "linear-gradient(135deg, #4F46E5, #6366F1)",
                    animation: "pulse 1.4s infinite 0.4s",
                  }}
                />
              </div>
            </div>

            <style>
              {`
        @keyframes pulse {
          0% { transform: scale(0.8); opacity: 0.5; }
          50% { transform: scale(1.2); opacity: 1; }
          100% { transform: scale(0.8); opacity: 0.5; }
        }
      `}
            </style>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      <div className="px-3 py-3">
        <div className="d-flex align-items-center border gap-2 px-3 py-2 rounded-4 shadow-sm bg-white">
          <textarea
            value={prompt}
            ref={textareaRef}
            onKeyDown={handleKeyDown}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Type your message..."
            className="form-control border-0 shadow-none"
            style={{
              height: "50px",
              resize: "none",
              fontSize: "14px",
            }}
          />

          <button
            onClick={handleSendPrompt}
            disabled={loading}
            className="btn text-white rounded-circle d-flex align-items-center justify-content-center shadow-sm"
            style={{
              width: "40px",
              height: "40px",
              background: "linear-gradient(135deg, #4F46E5, #6366F1)",
            }}
          >
            <FaPaperPlane size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

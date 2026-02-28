import React, { useEffect, useState } from "react";
import { FaBars, FaChevronRight } from "react-icons/fa";
import { FaEllipsisV } from "react-icons/fa";
import { Button, OverlayTrigger, Popover } from "react-bootstrap";

import { Outlet, NavLink } from "react-router-dom";
import { useAuth } from "../Authentication/AuthContext";
import { useNavigate } from "react-router-dom";
import { FaUserCircle, FaSignOutAlt } from "react-icons/fa";
import api from "../axios/api";
import { FaTachometerAlt, FaUsers, FaInfoCircle } from "react-icons/fa";
import {
  FaRobot,
  FaFileAlt,
  FaTrash,
  FaCommentDots,
  FaTimes,
} from "react-icons/fa";

const Layout = () => {
  const {
    chatHistory,
    setchatHistory,
    logout,
    selectedModel,
    setSelectedModel,
    data,
    setData,
    chatID,
    setChatID,
    user,
  } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const navigate = useNavigate();
  const [showPopover, setShowPopover] = useState(false);

  const [hoveredChat, setHoveredChat] = useState(null);

  const handleLogout = () => {
    logout();
  };

  const handleNavigateToProfile = () => {
    navigate("/profile");
    setShowPopover(!isVisible);
  };

  const threeDot = (
    <Popover id="popover-basic">
      <Popover.Body>
        <div className="d-flex flex-column">
          <button
            className="btn btn-sm text-start"
            onClick={handleNavigateToProfile}
          >
            <span className="me-1">
              <FaUserCircle />
            </span>{" "}
            Profile
          </button>
          <button className="btn btn-sm text-start" onClick={handleLogout}>
            <span className="me-1">
              <FaSignOutAlt />
            </span>{" "}
            Logout
          </button>
        </div>
      </Popover.Body>
    </Popover>
  );

  const sideBarValue = [
    // { name: "New Chat", link: "/newchat", icon: FaCommentDots },
    { name: "Dashboard", link: "/dashboard", icon: FaTachometerAlt },
    { name: "About", link: "/about", icon: FaInfoCircle },
    // { name: "Users", link: "/users", icon: FaUsers },
  ];

  const modelType = (
    <Popover id="popover-basic">
      <Popover.Body>
        <div className="d-flex flex-column">
          <button
            className="btn btn-sm text-start"
            onClick={handleNavigateToProfile}
          >
            <span className="me-1">
              <FaUserCircle />
            </span>{" "}
            LLM
          </button>
          <button className="btn btn-sm text-start" onClick={handleLogout}>
            <span className="me-1">
              <FaSignOutAlt />
            </span>{" "}
            RAG
          </button>
        </div>
      </Popover.Body>
    </Popover>
  );

  const models = [
    {
      name: "LLM",
      icon: FaRobot,
    },
    {
      name: "RAG",
      icon: FaFileAlt,
    },
  ];

  const handleChangeModel = (e) => {
    setSelectedModel(e.target.value);
  };

  const handleNewChat = () => {
    navigate("/dashboard");
    setData([]);
    setChatID(null);
  };

  const fetchChatHistory = async () => {
    try {
      const response = await api.get("/model/gethistory");
      setchatHistory(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user) {
      fetchChatHistory();
    }
  }, [user, chatID]);

  const handleGetSpecificChat = async (value) => {
    try {
      if (!value.chat_id) return;
      if (value.chat_id === "") return;

      const response = await api.get(`/model/getchat/${value.chat_id}`);
      setData(response.data);

      console.log("value", value);
    } catch (error) {
      throw error;
    }
  };

  const handleDeleteChat = async (chatId) => {
    try {
      await api.delete(`/model/delete/${chatId}`);

      setchatHistory((prev) => prev.filter((chat) => chat.chat_id !== chatId));

      if (chatID === chatId) {
        setChatID(null);
        setData([]);
        localStorage.removeItem("chatID");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // renderingg

  return (
    <div className="d-flex w-100 vh-100 overflow-hidden">
      <div
        className="bg-light border-end d-flex flex-column"
        style={{
          width: sidebarOpen ? "225px" : "60px",
          transition: "all 0.3s ease",
          overflow: "hidden",
          flexShrink: 0,
        }}
      >
        <div className="d-flex justify-content-between align-items-center p-3">
          {sidebarOpen && (
            <h5
              className="mb-0 fw-bold"
              style={{
                color: "#4F46E5",
              }}
            >
              Kindrix
            </h5>
          )}
          <button
            className="btn btn-sm fw-bold ms-auto"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            {sidebarOpen ? <FaBars /> : <FaChevronRight />}
          </button>
        </div>

        <div
          className={`flex-grow-1 overflow-auto py-2 ${
            sidebarOpen ? "px-3" : "px-2"
          }`}
        >
          <div className="d-flex flex-column text-decoration-none text-dark gap-2">
            <ul className="list-unstyled mb-0">
              {sideBarValue.map((value, id) => {
                const Icon = value.icon;

                return (
                  <li key={id}>
                    <NavLink
                      to={value.link}
                      className={`btn ${chatID === null ? "" : "border-0"}  w-100 d-flex align-items-center mb-2 ${
                        sidebarOpen
                          ? "justify-content-start gap-2 text-start"
                          : "justify-content-center"
                      }`}
                    >
                      <Icon />
                      {sidebarOpen && value?.name}
                    </NavLink>
                  </li>
                );
              })}

              <button
                onClick={handleNewChat}
                className={`btn w-100 text-white mb-3 d-flex align-items-center ${
                  sidebarOpen
                    ? "justify-content-start"
                    : "justify-content-center"
                }`}
                style={{
                  background: "linear-gradient(135deg, #4F46E5, #6366F1)",
                  borderRadius: "10px",
                }}
              >
                <FaCommentDots className={sidebarOpen ? "me-2" : ""} />
                {sidebarOpen && "New Chat"}
              </button>
            </ul>

            {sidebarOpen && (
              <div className="mt-1">
                <p
                  className="fw-bold text-uppercase mb-3"
                  style={{
                    fontSize: "10px",
                    color: "#94A3B8",
                  }}
                >
                  Your Chats
                </p>

                <ul className="list-unstyled mb-0">
                  {chatHistory.length === 0 ? (
                    <div
                      className="text-center py-3 rounded-3"
                      style={{
                        fontSize: "13px",
                        color: "#94A3B8",
                        backgroundColor: "#F8FAFC",
                      }}
                    >
                      No chats yet
                    </div>
                  ) : (
                    chatHistory.map((value, id) => {
                      const isActive = value.chat_id === chatID;

                      return (
                        <li
                          key={id}
                          onMouseEnter={() => setHoveredChat(value.chat_id)}
                          onMouseLeave={() => setHoveredChat(null)}
                          className="d-flex justify-content-between align-items-center mb-2"
                          style={{
                            padding: "8px 12px",
                            borderRadius: "8px",
                            fontSize: "13px",
                            fontWeight: isActive ? "600" : "500",
                            backgroundColor: isActive
                              ? "#EEF2FF"
                              : hoveredChat === value.chat_id
                                ? "#F1F5F9"
                                : "transparent",
                            color: isActive ? "#4F46E5" : "#334155",
                            transition: "all 0.2s ease",
                            cursor: "pointer",
                          }}
                        >
                          <button
                            onClick={() => {
                              setChatID(value.chat_id);
                              handleGetSpecificChat(value);
                            }}
                            className="border-0 bg-transparent text-start p-0"
                            style={{
                              flex: 1,
                              whiteSpace: "nowrap",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              color: "inherit",
                            }}
                          >
                            {value.first_question?.slice(0, 35)}
                          </button>

                          {hoveredChat === value.chat_id && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDeleteChat(value.chat_id);
                              }}
                              className="d-flex align-items-center justify-content-center ms-2 border-0"
                              style={{
                                width: "24px",
                                height: "24px",
                                borderRadius: "50%",
                                backgroundColor: "#EEF2FF",
                                color: "#4F46E5",
                                transition: "all 0.2s ease",
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor =
                                  "#E0E7FF";
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor =
                                  "#EEF2FF";
                              }}
                            >
                              <FaTrash size={11} />
                            </button>
                          )}
                        </li>
                      );
                    })
                  )}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="d-flex flex-column flex-grow-1 overflow-hidden">
        <nav className="navbar navbar-light bg-light border-bottom">
          <div className="container-fluid">
            <span className="navbar-brand fw-bold">
              <select
                style={{ width: "120px" }}
                value={selectedModel}
                onChange={handleChangeModel}
                name=""
                className="form-select-sm form-control form-select "
                id=""
              >
                {models.map((value, id) => (
                  <option key={id} value={value.name}>
                    {value.name}
                  </option>
                ))}
              </select>
            </span>
            <OverlayTrigger
              trigger="click"
              placement="left"
              overlay={threeDot}
              show={showPopover}
              onToggle={(isVisible) => setShowPopover(isVisible)}
              rootClose
              auto
            >
              <button className="btn btn-sm">
                <FaEllipsisV />
              </button>
            </OverlayTrigger>
          </div>
        </nav>

        <div className="flex-grow-1 overflow-auto mb-0 ">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;

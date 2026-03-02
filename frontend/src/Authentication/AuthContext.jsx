import React, { createContext, useContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {


  const getUserDetails = () => {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  };

  const [user, setUser] = useState(getUserDetails());

    const [selectedModel, setSelectedModel] = useState("LLM");
     const [data, setData] = useState([]);
     const [chatID,setChatID]=useState(null)
     const [chatHistory,setchatHistory]=useState([])

  

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    }
  }, [user]);

  const login = async (value) => {
    try {
      localStorage.setItem("access_token", value.access_token);
      localStorage.setItem("refresh_token", value.refresh_token);

      setUser({
        id: value.id,
        name: value.name,
        is_active: value.is_active,
        email:value.email,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const logout = () => {
    // localStorage.clear();
    // setUser(null);

  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
  localStorage.removeItem("user");
  localStorage.removeItem("chatID");

  setUser(null);
  setChatID(null);
  setData([]);
  setchatHistory([]);
  };

  return (
    <AuthContext.Provider value={{
      chatHistory,setchatHistory,
      user, login, logout ,selectedModel, setSelectedModel,data, setData,chatID,setChatID}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

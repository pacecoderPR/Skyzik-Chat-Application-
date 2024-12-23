import { createContext, useContext, useEffect, useState } from "react";
import { useAuthContext } from "./AuthContext";
import { io } from "socket.io-client";

const SocketContext = createContext();
// eslint-disable-next-line react-refresh/only-export-components
export const useSocketContext = () => {
  return useContext(SocketContext);
};
export const SocketContextProvider = ({ children }) => {
  const { authUser } = useAuthContext();
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);

  useEffect(() => {
    // init socket client
    console.log("Authenticated User:", authUser );
    if (authUser) {
      console.log("User  ID before socket connection:", authUser._id);
      const socket = io("https://skyzik-chat-application.onrender.com/  ", {
        query: {
          userId: authUser._id,
        },
      });
      setSocket(socket);

      //errorhandling
      socket.on("connect_error", (err) => {
        console.error("Socket connection error:", err);
      });
      //get online users
      socket.on("getOnlineUsers", (users) => {
        setOnlineUsers(users);
      });
      //   return socket
      return () => {
        socket.close();
      };
      //   close socket
    } else if (socket) {
      socket.close();
      setSocket(null);
    }
  }, [authUser]);

  return (
    // return context provider
    <SocketContext.Provider value={{ socket, onlineUsers }}>
      {children}
    </SocketContext.Provider>
  );
};

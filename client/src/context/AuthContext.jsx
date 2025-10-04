// // src/context/AuthContext.jsx
// import { createContext, useState, useEffect } from "react";
// import axiosBase from "../api/axiosBase";

// export const AuthContext = createContext();

// //✅ Key point: children here is everything you wrap with <AuthProvider> in App.jsx.
// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null); // holds current user info
//   const token = localStorage.getItem("token");

//   const checkUser = async () => {
//     if (!token) return setUser(null);
//     try {
//       const { data } = await axiosBase.get("/users/check", {
//         headers: { Authorization: "Bearer " + token },
//       });
//       setUser(data); // store user info globally
//     } catch (err) {
//       setUser(null);
//       localStorage.removeItem("token");
//     }
//   };

//   useEffect(() => {
//     checkUser();
//   }, []);

//   return (
//     <AuthContext.Provider value={{ user, setUser }}>
//       {children}{" "}
//       {/* all components inside AuthProvider can access user/setUser */}
//     </AuthContext.Provider>
//   );
// };



// ***************************
// src/context/AuthContext.jsx
import { createContext, useState, useEffect } from "react";
import axiosBase from "../api/axiosBase";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // NEW
  const token = localStorage.getItem("token");

  const checkUser = async () => {
    if (!token) {
      setUser(null);
      setLoading(false);
      return;
    }

    try {
      const { data } = await axiosBase.get("/users/check", {
        headers: { Authorization: "Bearer " + token },
      });
      setUser(data);
    } catch (err) {
      setUser(null);
      localStorage.removeItem("token");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

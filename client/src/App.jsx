// src/App.jsx
import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

//Pages
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Unauthorized from "./pages/Unauthorized";

//Admin
import AdminAddBooks from "./components/Admin/AdminAddBooks";
import AdminCTA from "./components/Admin/AdminCTA";

//Staff
import StaffCTA from "./components/Staff/StaffCTA";

//Admi + Staff
import AdmStaff_BookLists from "./components/Adm-Staff/AdmStaff_BookLists";
import AdminStaffSearch_Update from "./components/Adm-Staff/AdmStaffSearch_Update";

//Layout
import Navbar from "./components/NavBar";
import Footer from "./components/Footer";
import About from "./pages/About";


function App() {
  return (
    <AuthProvider>
      <Navbar />
      <Routes>
        {/*Admin only */}
        <Route
          path="/admin/add-books"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminAddBooks />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminCTA />
            </ProtectedRoute>
          }
        />

        {/*staff only */}
        <Route
          path="/staff"
          element={
            <ProtectedRoute allowedRoles={["staff"]}>
              <StaffCTA />
            </ProtectedRoute>
          }
        />

        {/* Staff + Admin shared routes */}
        <Route
          path="/adminStaff/books/allList"
          element={<AdmStaff_BookLists />}
        />
        <Route
          path="/adminStaff/search-books"
          element={
            <ProtectedRoute allowedRoles={["admin", "staff"]}>
              <AdminStaffSearch_Update />
            </ProtectedRoute>
          }
        />
        <Route
          path="/"
          element={
            <ProtectedRoute allowedRoles={["staff", "admin"]}>
              <Dashboard /> {/* children prop for ProtectedRoute */}
            </ProtectedRoute>
          }
        />

        {/* Public routes*/}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/unauthorized" element={<Unauthorized />} />

        <Route path="/about" element={<About />} />
        <Route path="*" element={<Unauthorized />} />
      </Routes>

      <Footer />
    </AuthProvider>
  );
}

export default App;






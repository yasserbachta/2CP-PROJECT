import Login from "./pages/Login/Login";
import { useState, useEffect } from "react";
import { Sidebar, Bottombar } from "./layout";
import { Navigate, Routes, Route } from "react-router-dom";
import Students from "./pages/Students/Students";
import Teachers from "./pages/Teachers/Teachers";
import User from "./pages/User/User";
import Classes from "./pages/Classes/Classes";
import Events from "./pages/Events/Events";
import NotFound from "./pages/error/NotFound";
import ListClassTeacher from "./components/class_comp/ListClassTeacher";
import { TeacherProfile, TeacherForm } from "./components/teachers_comp";
import {
  ListLevels,
  ModuleList,
  ModulePage,
  AttachementPage,
} from "./components/class_comp";
import { NotificationPage } from "./components/notification_comp";
import PrivateRoute from "./utils/PrivateRoute";
import useAuth from "./context/AuthContext";
import useAuthTokens from "./context/AuthTokens";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import refrechHandler from "./context/refrechHandler";
import axios from "../src/api/axios";
import {Chat} from "./components/chat_comp";
function App() {
  // ###################################################################
  // States
  const { Auth, setAuth } = useAuth();
  const { authTokens, setAuthTokens } = useAuthTokens();
  const { refProfile } = refrechHandler();

  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  //Refresh token functions
  const updateToken = async () => {
    console.log("updating token");
    try {
      const response = await axios.post(
        "/api/token/refresh/",
        {
          refresh: authTokens?.refresh,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = response.data;

      if (response.status === 200) {
        setAuthTokens(data);
        setAuth(jwtDecode(data.access));
        localStorage.setItem("authTokens", JSON.stringify(data));
      } else {
        setAuthTokens(null);
        setAuth(null);
        localStorage.removeItem("authTokens");
        navigate("/login");
      }

      if (loading) {
        setLoading(false);
      }
    } catch (error) {
      console.error("Error updating token:", error);
    }
  };

  //use effect to update token every 4 minutes
  useEffect(() => {
    if (loading) {
      updateToken();
    }

    const fourMinutes = 1000 * 60 * 4;

    let interval = setInterval(() => {
      if (authTokens) {
        updateToken();
      }
    }, fourMinutes);
    return () => clearInterval(interval);
  }, [authTokens, loading, refProfile]);

  // ###################################################################
  // Routing
  return (
    <>
      <div className=" bg-bgpurp flex">
        {Auth && <Bottombar />}
        {Auth && <Sidebar />}
        <div className="flex-1">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Navigate to="/login" />} />
            <Route
              path="/students"
              element={<PrivateRoute element={<Students />} role={["admin"]} />}
            />
            <Route
              path="/teachers"
              element={<PrivateRoute element={<Teachers />} role={["admin"]} />}
            />
            <Route
              path="/teachers/profile/:id"
              element={
                <PrivateRoute element={<TeacherProfile />} role={["admin"]} />
              }
            />
            <Route
              path="/teachers/profile/:id/edit"
              element={
                <PrivateRoute element={<TeacherForm />} role={["admin"]} />
              }
            />
            <Route
              path="/teachers/add"
              element={
                <PrivateRoute element={<TeacherForm />} role={["admin"]} />
              }
            />
            <Route
              path="/profile"
              element={<PrivateRoute element={<User />} />}
            />
            <Route
              path="/classes"
              element={<PrivateRoute element={<Classes />} />}
            />
            <Route
              path="/classes/:grade"
              element={
                <PrivateRoute element={<ListLevels />} role={["admin"]} />
              }
            />
            <Route
              path="/classes/:grade/:class/:classId"
              element={<PrivateRoute element={<ModuleList />} />}
            />
            <Route
              path="/classes/:grade/:class/:classId/:module/:moduleId"
              element={<PrivateRoute element={<ModulePage />} />}
            />
            <Route
              path="/classes/:grade/:class/:classId/:module/:moduleId/:course/:courseId"
              element={<PrivateRoute element={<AttachementPage />} />}
            />
            {/* this route related to teacher seeing classes will be here */}
            <Route
              path="/classes/teacher"
              element={
                <PrivateRoute
                  element={<ListClassTeacher />}
                  role={["teacher"]}
                />
              }
            />
            <Route
              path="/events"
              element={<PrivateRoute element={<Events />} />}
            />
            <Route
              path="/notifications"
              element={<PrivateRoute element={<NotificationPage />} />}
            />
            <Route
              path="/chat"
              element={<PrivateRoute element={<Chat />} />}
            />
            
            <Route path="*" element={<NotFound />} />
            <Route path="classes/*" element={<NotFound />} />
            <Route path="/*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </>
  );
}

export default App;

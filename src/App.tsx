import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { ContextProvider } from "./context";

// Components
import Login from "./components/Login";
import Nav from "./components/Nav";
import SideBar from "./components/SideBar";
import Footer from "./components/Footer";

// Admin
import Admin from "./dashboard/Admin";
import AdminProjects from "./dashboard/projects";
import AdminAboutMe from "./dashboard/aboutMe";
import AdminCertification from "./dashboard/certification";
import AdminCover from "./dashboard/cover";
import AdminServices from "./dashboard/services";
import AdminSkills from "./dashboard/skills";
import AdminTestimonials from "./dashboard/testimonials";
import AdminWorkExperience from "./dashboard/workExperience";
import AdminCategories from "./dashboard/cotegories";

// Layout
import UserHome from "./layout/Home";
import UserAllProjects from "./layout/projects/AllProjects";
import UserProjectDetails from "./layout/projects/ProjectDetails";
import UserContact from "./layout/Contact";
import UserWorkExperience from "./layout/WorkExperience";
import UserCertification from "./layout/Certification";
import ProtectedRoute from "./components/Protected";

const MainLayout = () => {
  return (
    <>
      <Nav />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

const AdminLayout = () => {
  return (
    <>
      <section className="flex min-h-screen">
        <SideBar />
        <main className="flex-1 overflow-auto w-full">
          <Outlet />
        </main>
      </section>
    </>
  );
};

function App() {
  return (
    <ContextProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" index element={<UserHome />} />
            <Route path="/contact" element={<UserContact />} />
            <Route path="/experience" element={<UserWorkExperience />} />
            <Route path="/certification" element={<UserCertification />} />
            <Route path="/projects" element={<UserAllProjects />} />
            <Route path="/projects/:id" element={<UserProjectDetails />} />
          </Route>

          <Route element={<AdminLayout />}>
            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <Admin />
                </ProtectedRoute>
              }>
              <Route index element={<AdminCover />} />
              <Route path="aboutme" element={<AdminAboutMe />} />
              <Route path="certification" element={<AdminCertification />} />
              <Route path="categories" element={<AdminCategories />} />
              <Route path="projects" element={<AdminProjects />} />
              <Route path="services" element={<AdminServices />} />
              <Route path="skills" element={<AdminSkills />} />
              <Route path="testimonials" element={<AdminTestimonials />} />
              <Route path="experiences" element={<AdminWorkExperience />} />
            </Route>
          </Route>

          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </ContextProvider>
  );
}

export default App;
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/frontend/Home";
import About from "./components/frontend/About";
import "./assets/css/style.scss";
import Services from "./components/frontend/Services";
import Projects from "./components/frontend/Projects";
import Blogs from "./components/frontend/Blogs";
import ContactUs from "./components/frontend/ContactUs";
import Logins from "./components/backend/Logins";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Dashboard from "./components/backend/Dashboard";
import RequireAuth from "./components/common/RequireAuth";
import { default as ShowServices } from "./components/backend/services/Show";
import { default as CreateServices } from "./components/backend/services/Create";
import { default as EditServices } from "./components/backend/services/Edit";
import { default as ShowProjects } from "./components/backend/projects/Show";
import { default as CreateProjects } from "./components/backend/projects/Create";
import { default as EditProjects } from "./components/backend/projects/Edit";
import { default as ShowArticles } from "./components/backend/articles/Show";
import { default as CreateArticles } from "./components/backend/articles/Create";
import { default as EditArticles } from "./components/backend/articles/Edit";
import { default as ShowTestimonials } from "./components/backend/testimonials/Show";
import { default as CreateTestimonials } from "./components/backend/testimonials/Create";
import { default as EditTestimonials } from "./components/backend/testimonials/Edit";
import { default as ShowMembers } from "./components/backend/members/Show";
import { default as CreateMembers } from "./components/backend/members/Create";
import { default as EditMembers } from "./components/backend/members/Edit";
import ServiceDetail from "./components/frontend/ServiceDetail";
import ProjectDetail from "./components/frontend/ProjectDetail";
import BlogDetail from "./components/frontend/BlogDetail";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/ContactUs" element={<ContactUs />} />
          <Route path="/service/:id" element={<ServiceDetail />} />
          <Route path="/project/:id" element={<ProjectDetail />} />
          <Route path="/blog/:id" element={<BlogDetail />} />
          <Route path="/admin/login" element={<Logins />} />
          <Route
            path="/admin/dashboard"
            element={
              <RequireAuth>
                <Dashboard />
              </RequireAuth>
            }
          />

          <Route
            path="/admin/services"
            element={
              <RequireAuth>
                <ShowServices />
              </RequireAuth>
            }
          />

          <Route
            path="/admin/services/create"
            element={
              <RequireAuth>
                <CreateServices />
              </RequireAuth>
            }
          />

          <Route
            path="/admin/services/edit/:id"
            element={
              <RequireAuth>
                <EditServices />
              </RequireAuth>
            }
          />

          <Route
            path="/admin/projects"
            element={
              <RequireAuth>
                <ShowProjects />
              </RequireAuth>
            }
          />

          <Route
            path="/admin/projects/create"
            element={
              <RequireAuth>
                <CreateProjects />
              </RequireAuth>
            }
          />
          <Route
            path="/admin/projects/edit/:id"
            element={
              <RequireAuth>
                <EditProjects />
              </RequireAuth>
            }
          />

          <Route
            path="/admin/articles"
            element={
              <RequireAuth>
                <ShowArticles />
              </RequireAuth>
            }
          />

          <Route
            path="/admin/articles/create"
            element={
              <RequireAuth>
                <CreateArticles />
              </RequireAuth>
            }
          />

          <Route
            path="/admin/articles/edit/:id"
            element={
              <RequireAuth>
                <EditArticles />
              </RequireAuth>
            }
          />
          <Route
            path="/admin/testimonials"
            element={
              <RequireAuth>
                <ShowTestimonials />
              </RequireAuth>
            }
          />
          <Route
            path="/admin/testimonial/create"
            element={
              <RequireAuth>
                <CreateTestimonials />
              </RequireAuth>
            }
          />
          <Route
            path="/admin/testimonial/edit/:id"
            element={
              <RequireAuth>
                <EditTestimonials />
              </RequireAuth>
            }
          />
          <Route
            path="/admin/members"
            element={
              <RequireAuth>
                <ShowMembers />
              </RequireAuth>
            }
          />
          <Route
            path="/admin/members/create"
            element={
              <RequireAuth>
                <CreateMembers />
              </RequireAuth>
            }
          />
          <Route
            path="/admin/member/edit/:id"
            element={
              <RequireAuth>
                <EditMembers />
              </RequireAuth>
            }
          />
        </Routes>
      </BrowserRouter>
      <ToastContainer position="top-center" />
    </>
  );
}

export default App;

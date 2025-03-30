import React, { useEffect, useState } from "react";
import Header from "../../common/Header";
import Sidebar from "../../common/Sidebar";
import { Link } from "react-router-dom";
import Footer from "../../common/Footer";
import { apiUrl, token } from "../../common/Http";
import { toast } from "react-toastify";

const Show = () => {
  const [projects, setProjects] = useState([]);

  const fetchProjects = async () => {
    const res = await fetch(apiUrl + "projects", {
      method: "GET",
      headers: {
        "content-type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token()}`,
      },
    });
    const result = await res.json();
    setProjects(result.data);
  };
  const deleteService = async (id) => {
    if (confirm("Are you sure you want to delete?")) {
      const res = await fetch(apiUrl + "project/" + id, {
        method: "DELETE",
        headers: {
          "content-type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token()}`,
        },
      });
      const result = await res.json();
      if (result.status == true) {
        const newProject = projects.filter((project) => project.id != id);
        setProjects(newProject);
        toast.success(result.massage);
      } else {
        toast.error(result.massage);
      }
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);
  return (
    <>
      <Header />
      <main>
        <div className="container my-5">
          <div className="row">
            <div className="col-md-3">
              {/* Sidebar */}
              <Sidebar />
            </div>
            <div className="col-md-9">
              {/* Dashboard */}
              <div className="card shadow border-0">
                <div className="card-body p-4">
                  <div className="d-flex justify-content-between">
                    <h4 className="h5">Projects</h4>
                    <Link
                      to="/admin/projects/create"
                      className="btn btn-primary"
                    >
                      Create
                    </Link>
                  </div>
                  <hr />
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Slug</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {projects &&
                        projects.map((project) => {
                          return (
                            <tr key={`service-${project.id}`}>
                              <td>{project.id}</td>
                              <td>{project.title}</td>
                              <td>{project.slug}</td>
                              <td>
                                {project.status == 1 ? "Active" : "Block"}
                              </td>
                              <td>
                                <Link
                                  to={`/admin/projects/edit/${project.id}`}
                                  className="btn btn-primary btn-sm"
                                >
                                  Edit
                                </Link>
                                <Link
                                  onClick={() => deleteService(project.id)}
                                  href=""
                                  className="btn btn-secondary btn-sm ms-2"
                                >
                                  Delete
                                </Link>
                              </td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Show;

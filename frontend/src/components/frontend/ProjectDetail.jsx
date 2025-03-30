import React, { useEffect, useState } from "react";
import Header from "../common/Header";
import Hero from "../common/Hero";
import { Link, useParams } from "react-router-dom";
import { apiUrl, fileUrl } from "../common/Http";
import Footer from "../common/Footer";
import ShowTestimonial from "../common/ShowTestimonial";

const ProjectDetail = () => {
  // Initialize service as an object instead of an array
  const [project, setProject] = useState({});
  //   const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const params = useParams();

  const fetchProject = async () => {
    try {
      const res = await fetch(`${apiUrl}get-project/${params.id}`, {
        method: "GET",
      });
      const result = await res.json();
      setProject(result.data);
    } catch (error) {
      console.error("Error fetching project:", error);
    } finally {
      setLoading(false);
    }
  };

  //   const fetchProjects = async () => {
  //     try {
  //       const res = await fetch(`${apiUrl}get-projects`, {
  //         method: "GET",
  //       });
  //       const result = await res.json();
  //       setProjects(result.data);
  //     } catch (error) {
  //       console.error("Error fetching services:", error);
  //     }
  //   };

  useEffect(() => {
    fetchProject();
    // fetchProjects();
  }, []); // Add params.id as a dependency to refetch when URL changes
  return (
    <>
      <Header />
      <main>
        {/* Only render Hero when project data is available */}
        {!loading && (
          <Hero
            preHeading="Quality. Integrity. Value."
            heading={project.title || ""}
          />
        )}
        <section className="section-10">
          <div className="container py-5">
            {loading ? (
              <div className="text-center">Loading...</div>
            ) : (
              <div className="row">
                <div className="col-md-4">
                  <div className="card shadow border-0 sidebar mb-5">
                    <div className="card-body px-4 py-4">
                      <h3 className="mt-2 mb-3">Insights</h3>
                      <ul>
                        {project.location && (
                          <li className="mb-2">
                            <span className="text-body-secondary">
                              Location
                            </span>
                            <p>{project.location}</p>
                          </li>
                        )}
                        {project.construction_type && (
                          <li className="mb-2">
                            <span className="text-body-secondary">
                              Construction Type
                            </span>
                            <p>{project.construction_type}</p>
                          </li>
                        )}
                        {project.sector && (
                          <li className="mb-2">
                            <span className="text-body-secondary">Sector</span>
                            <p>{project.sector}</p>
                          </li>
                        )}
                      </ul>
                      {/* <ul>
                        {projects &&
                          projects.map((projectItem) => (
                            <li key={`project-${projectItem.id}`}>
                              <Link to={`/project/${projectItem.id}`}>
                                {projectItem.title}
                              </Link>
                            </li>
                          ))}
                      </ul> */}
                    </div>
                  </div>
                </div>
                <div className="col-md-8">
                  {project.image && (
                    <div>
                      <img
                        className="w-100"
                        src={`${fileUrl}/uploads/projects/large/${project.image}`}
                        alt={project.title || "Project image"}
                      />
                    </div>
                  )}
                  <h3 className="py-3">{project.title}</h3>
                  {/* Don't include the content twice - once is enough */}
                  <div dangerouslySetInnerHTML={{ __html: project.content }} />
                </div>
              </div>
            )}
          </div>
        </section>
        {/*Testimonials*/}
        <section className="section-11 bg-light py-5">
          <ShowTestimonial />
        </section>
      </main>
      <Footer />
    </>
  );
};

export default ProjectDetail;

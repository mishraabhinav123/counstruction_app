import React, { useEffect, useState } from "react";
import Header from "../../common/Header";
import Sidebar from "../../common/Sidebar";
import { Link } from "react-router-dom";
import Footer from "../../common/Footer";
import { apiUrl, token } from "../../common/Http";
import { toast } from "react-toastify";

const Show = () => {
  const [testimonials, setTestimonials] = useState([]);

  const fetchTestimonials = async () => {
    const res = await fetch(apiUrl + "testimonial", {
      method: "GET",
      headers: {
        "content-type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token()}`,
      },
    });
    const result = await res.json();
    setTestimonials(result.data);
  };

  const deleteTestimonial = async (id) => {
    if (confirm("Are you sure you want to delete data?")) {
      const res = await fetch(apiUrl + "testimonial/" + id, {
        method: "DELETE",
        headers: {
          "content-type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token()}`,
        },
      });
      const result = await res.json();
      if (result.status == true) {
        const newTestimonials = testimonials.filter(
          (testimonial) => testimonial.id != id
        );
        setTestimonials(newTestimonials);
        toast.success(result.massage);
      } else {
        toast.error(result.massage);
      }
    }
  };
  useEffect(() => {
    fetchTestimonials();
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
                    <h4 className="h5">Testimonials</h4>
                    <Link
                      to="/admin/testimonial/create"
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
                        <th>Testimonials</th>
                        <th>Citation</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {testimonials &&
                        testimonials.map((testimonial) => {
                          return (
                            <tr key={`testimonials-${testimonial.id}`}>
                              <td>{testimonial.id}</td>
                              <td>{testimonial.testimonial}</td>
                              <td>{testimonial.citation}</td>
                              <td>
                                {testimonial.status == 1 ? "Active" : "Block"}
                              </td>
                              <td>
                                <Link
                                  to={`/admin/testimonial/edit/${testimonial.id}`}
                                  className="btn btn-primary btn-sm mb-3"
                                >
                                  Edit
                                </Link>
                                <Link
                                  onClick={() =>
                                    deleteTestimonial(testimonial.id)
                                  }
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

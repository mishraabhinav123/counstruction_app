import React, { useEffect, useState } from "react";
import { apiUrl, fileUrl } from "./Http";
import { Link } from "react-router-dom";

const LatestServices = () => {
  const [services, setServices] = useState([]);
  const fetchLatestServices = async () => {
    const res = await fetch(apiUrl + "get-latest-services?limit=4", {
      method: "GET",
    });
    const result = await res.json();
    setServices(result.data);
  };
  useEffect(() => {
    fetchLatestServices();
  }, []);
  return (
    <>
      <section className="section-3 bg-light py-5">
        <div className="container-fluid py-5">
          <div className="section-header text-center">
            <span>Our Services</span>
            <h2>Our Constructions Services</h2>
            <p>
              We offer a diverse array of constructions services, spanning
              residential, commercial, and industrial projects.
            </p>
          </div>
          <div className="row pt-4">
            {services &&
              services.map((service) => {
                return (
                  <div
                    key={`services-${service.id}`}
                    className="col-md-3 col-lg-3"
                  >
                    <div className="item">
                      <div className="services-image">
                        <img
                          src={`${fileUrl}/uploads/services/small//${service.image}`}
                          alt=""
                          className="w-100"
                        />
                      </div>
                      <div className="service-body">
                        <div className="service-title">
                          <h3>{service.title}</h3>
                        </div>
                        <div className="service-content">
                          <p>{service.short_desc}</p>
                        </div>
                        <Link
                          to={`/service/${service.id}`}
                          className="btn btn-primary"
                        >
                          Read More
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </section>
    </>
  );
};

export default LatestServices;

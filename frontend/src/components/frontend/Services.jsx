import React, { useEffect, useState } from "react";
import Header from "../common/Header";
import Footer from "../common/Footer";
import Hero from "../common/Hero";
import { apiUrl, fileUrl } from "../common/Http";
import { Link } from "react-router-dom";

const Services = () => {
  const [services, setServices] = useState([]);
  const fetchAllServices = async () => {
    const res = await fetch(apiUrl + "get-services", {
      method: "GET",
    });
    const result = await res.json();
    setServices(result.data);
  };
  useEffect(() => {
    fetchAllServices();
  }, []);
  return (
    <>
      <Header />
      <main>
        <Hero
          preHeading="Quality. Integrity. Value."
          heading="Services"
          text="Lorem ipsum dolor sit amet, consectetur adipiscing
                <br /> elit, sed do eiusmod tempor."
        />

        <section className="section-3 bg-light py-5">
          <div className="container py-5">
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
                      className="col-md-4 col-lg-4"
                      key={`service-${service.id}`}
                    >
                      <div className="item">
                        <div className="services-image">
                          <img
                            src={`${fileUrl}/uploads/services/small/${service.image}`}
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
      </main>
      <Footer />
    </>
  );
};

export default Services;

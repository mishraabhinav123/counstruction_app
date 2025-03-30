import React, { useEffect, useState } from "react";
import Header from "../common/Header";
import Footer from "../common/Footer";
import Hero from "../common/Hero";
import { Link, useParams } from "react-router-dom";
import { apiUrl, fileUrl } from "../common/Http";
import ShowTestimonial from "../common/ShowTestimonial";

const ServiceDetail = () => {
  // Initialize service as an object instead of an array
  const [service, setService] = useState({});
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const params = useParams();

  const fetchService = async () => {
    try {
      const res = await fetch(`${apiUrl}get-service/${params.id}`, {
        method: "GET",
      });
      const result = await res.json();
      setService(result.data);
    } catch (error) {
      console.error("Error fetching service:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchServices = async () => {
    try {
      const res = await fetch(`${apiUrl}get-services`, {
        method: "GET",
      });
      const result = await res.json();
      setServices(result.data);
    } catch (error) {
      console.error("Error fetching services:", error);
    }
  };

  useEffect(() => {
    fetchService();
    fetchServices();
  }, [params.id]); // Add params.id as a dependency to refetch when URL changes

  return (
    <>
      <Header />
      <main>
        {/* Only render Hero when service data is available */}
        {!loading && (
          <Hero
            preHeading="Quality. Integrity. Value."
            heading={service.title || ""}
          />
        )}
        <section className="section-10">
          <div className="container py-5">
            {loading ? (
              <div className="text-center">Loading...</div>
            ) : (
              <div className="row">
                <div className="col-md-3">
                  <div className="card shadow border-0 sidebar mb-5">
                    <div className="card-body px-4 py-4">
                      <h3 className="mt-2 mb-3">Our Services</h3>
                      <ul>
                        {services &&
                          services.map((serviceItem) => (
                            <li key={`services-${serviceItem.id}`}>
                              <Link to={`/service/${serviceItem.id}`}>
                                {serviceItem.title}
                              </Link>
                            </li>
                          ))}
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="col-md-9">
                  {service.image && (
                    <div>
                      <img
                        className="w-100"
                        src={`${fileUrl}/uploads/services/large/${service.image}`}
                        alt={service.title || "Service image"}
                      />
                    </div>
                  )}
                  <h3 className="py-3">{service.title}</h3>
                  {/* Don't include the content twice - once is enough */}
                  <div dangerouslySetInnerHTML={{ __html: service.content }} />
                </div>
              </div>
            )}
          </div>
        </section>
        {/*Testimonials*/}
        <ShowTestimonial />
      </main>
      <Footer />
    </>
  );
};

export default ServiceDetail;

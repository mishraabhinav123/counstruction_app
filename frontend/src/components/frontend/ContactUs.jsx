import React from "react";
import Header from "../common/Header";
import Footer from "../common/Footer";
import Hero from "../common/Hero";
import { useForm } from "react-hook-form";
import { apiUrl } from "../common/Http";
import { toast } from "react-toastify";

const ContactUs = () => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const res = await fetch(apiUrl + "contact-now", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const result = await res.json();
    if (result.status == true) {
      toast.success(result.message);
      reset();
    } else {
      toast.error(result.message);
    }
  };
  return (
    <>
      <Header />
      <main>
        <Hero
          preHeading="Quality. Integrity. Value."
          heading="Contact Us"
          text="Lorem ipsum dolor sit amet, consectetur adipiscing
                <br /> elit, sed do eiusmod tempor."
        />
        <section className="section-9 py-5">
          <div className="container">
            <div className="section-header text-center">
              <h2>Contact Us</h2>
              <p>
                Our dedicated experts are here to help you with any of your
                questions, contact us by <br /> filling out the form below and
                we in touch shortly.
              </p>
            </div>
            <div className="row mt-5">
              <div className="col-lg-3">
                <div className="card shadow border-0 p-4 mb-3">
                  <h3>Call Us</h3>
                  <div>
                    <a href="#">888-000-0000</a>
                  </div>
                  <div>
                    <a href="#">888-000-0000</a>
                  </div>

                  <h3 className="mt-4">You can write us</h3>
                  <div>
                    <a href="">example@example.com</a>
                  </div>
                  <div>
                    <a href="">example@example.com</a>
                  </div>

                  <h3 className="mt-4">Address</h3>
                  <div>
                    B-18, Rajaji Puram
                    <br /> Lucknow, Uttar Pardesh, 226017
                    <br />
                    0522400XXXXX
                  </div>
                </div>
              </div>
              <div className="col-lg-9">
                <div className="card shadow border-0">
                  <div className="card-body p-5">
                    <form onSubmit={handleSubmit(onSubmit)}>
                      <div className="row">
                        <div className="col-md-6 mb-4">
                          <label htmlFor="" className="form-label">
                            Name
                          </label>
                          <input
                            {...register("name", {
                              required: "The Name field is required",
                            })}
                            type="text"
                            className={`form-control form-control-lg ${
                              errors.name && "is-invalid"
                            }`}
                            placeholder="Enter Name"
                          />
                          {errors.name && (
                            <p className="invalid-feedback">
                              {errors.name?.message}
                            </p>
                          )}
                        </div>
                        <div className="col-md-6 mb-4">
                          <label htmlFor="" className="form-label">
                            Email
                          </label>
                          <input
                            {...register("email", {
                              required: "The Email field is required",
                            })}
                            type="text"
                            className={`form-control form-control-lg ${
                              errors.email && "is-invalid"
                            }`}
                            placeholder="Enter Your Email"
                          />
                          {errors.email && (
                            <p className="invalid-feedback">
                              {errors.email?.message}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-6 mb-4">
                          <label htmlFor="" className="form-label">
                            Phone
                          </label>
                          <input
                            {...register("phone")}
                            type="text"
                            className="form-control form-control-lg"
                            placeholder="Phone Number"
                          />
                        </div>
                        <div className="col-md-6 mb-4">
                          <label htmlFor="" className="form-label">
                            Subject
                          </label>
                          <input
                            {...register("subject")}
                            type="text"
                            className="form-control form-control-lg"
                            placeholder="Subject"
                          />
                        </div>
                      </div>
                      <div>
                        <label htmlFor="" className="form-label">
                          Message
                        </label>
                        <textarea
                          {...register("message")}
                          rows={5}
                          className="form-control form-control-lg"
                          placeholder="Message"
                        ></textarea>
                      </div>
                      <button className="btn btn-primary large mt-3">
                        Submit
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default ContactUs;

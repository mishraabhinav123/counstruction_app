import React from "react";
import AboutImg from "../../assets/images/about-us.jpg";
const About = () => {
  return (
    <section className="section-2 py-5">
      <div className="container py-5">
        <div className="row">
          <div className="col-md-6">
            <img src={AboutImg} className="w-100" alt="" />
          </div>
          <div className="col-md-6">
            <span>About Us</span>
            <h2>Crafting Structures that last a lifetime</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vel,
              vitae. Impedit eius perspiciatis tempora vero illo? Perferendis
              recusandae, nihil pariatur adipisci consequatur.
            </p>
            <p>
              reprehenderit eos iusto! Molestias nulla ut dolore dolorem
              consequatur temporibus error at. Error, et neque. Numquam, at
              quasi sed quos laboriosam quia perferendis quae, eaque.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

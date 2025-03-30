import React from "react";
import Header from "../common/Header";
import Footer from "../common/Footer";
import { default as AboutNew } from "../common/About";
import Hero from "../common/Hero";
import ShowTestimonial from "../common/ShowTestimonial";
import ShowMembers from "../common/ShowMembers";

const About = () => {
  return (
    <>
      <Header />
      <main>
        <Hero
          preHeading="Quality. Integrity. Value."
          heading="About Us"
          text="Lorem ipsum dolor sit amet, consectetur adipiscing
                <br /> elit, sed do eiusmod tempor."
        />

        <AboutNew />

        {/*Our Team*/}

        <ShowMembers />

        {/*Testimonials*/}
        <ShowTestimonial />
      </main>
      <Footer />
    </>
  );
};

export default About;

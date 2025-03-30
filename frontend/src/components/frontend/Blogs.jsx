import React, { useEffect, useState } from "react";
import Header from "../common/Header";
import Footer from "../common/Footer";
import Hero from "../common/Hero";
import BlogImg from "../../assets/images/construction8.jpg";
import { apiUrl, fileUrl } from "../common/Http";
import { Link } from "react-router-dom";

const Blogs = () => {
  const [articles, setArticles] = useState([]);
  const fetchAllArticles = async () => {
    const res = await fetch(apiUrl + "get-articles", {
      method: "GET",
    });
    const result = await res.json();
    setArticles(result.data);
  };
  useEffect(() => {
    fetchAllArticles();
  }, []);
  return (
    <>
      <Header />
      <main>
        <Hero
          preHeading="Quality. Integrity. Value."
          heading="Blogs"
          text="Lorem ipsum dolor sit amet, consectetur adipiscing
                <br /> elit, sed do eiusmod tempor."
        />

        <section className="section-6 bg-light py-5">
          <div className="container ">
            <div className="section-header text-center">
              <span>Blog & News</span>
              <h2>Articles & blog posts</h2>
              <p>
                We specialize in a wide range of construction service,including
                residental,commercial, and industrial projects
              </p>
            </div>
            <div className="row pt-3">
              {articles &&
                articles.map((article) => {
                  return (
                    <div className="col-md-4 mb-4">
                      <div className="card shadow border-0">
                        <div className="card-img-top">
                          <img
                            src={`${fileUrl}/uploads/articles/small//${article.image}`}
                            alt=""
                            className="w-100"
                          />
                        </div>
                        <div className="card-body p-4">
                          <div>
                            <Link to={`/blog/${article.id}`} alt="">
                              {article.title}
                            </Link>
                          </div>
                          <Link
                            to={`/blog/${article.id}`}
                            className="btn btn-primary small"
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

export default Blogs;

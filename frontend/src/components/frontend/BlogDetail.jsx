import React, { useEffect, useState } from "react";
import Header from "../common/Header";
import Footer from "../common/Footer";
import Hero from "../common/Hero";
import { Link, useParams } from "react-router-dom";
import { apiUrl, fileUrl } from "../common/Http";

const BlogDetail = () => {
  // Initialize service as an object instead of an array
  const [blog, setBlog] = useState({});
  const [latestblogs, setLatestBlog] = useState([]);
  const [loading, setLoading] = useState(true);
  const params = useParams();

  const fetchLatestBlog = async () => {
    try {
      const res = await fetch(`${apiUrl}get-articles`, {
        method: "GET",
      });
      const result = await res.json();
      setLatestBlog(result.data);
    } catch (error) {
      console.error("Error fetching Blog:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchBlog = async () => {
    try {
      const res = await fetch(`${apiUrl}get-article/${params.id}`, {
        method: "GET",
      });
      const result = await res.json();
      setBlog(result.data);
    } catch (error) {
      console.error("Error fetching Blog:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchBlog();
    fetchLatestBlog();
  }, [params.id]);
  return (
    <>
      <Header />
      <main>
        {/* Only render Hero when blog data is available */}
        {!loading && (
          <Hero
            preHeading="Quality. Integrity. Value."
            heading={blog.title || ""}
          />
        )}
        {loading ? (
          <div className="text-center">Loading Blogs...</div>
        ) : latestblogs.length > 0 ? (
          <section className="section-11">
            <div className="container py-5">
              <div className="row">
                <div className="col-md-8">
                  <h2>{blog.title}</h2>
                  <div className="pb-3">
                    by <strong>{blog.author}</strong> on {blog.created_at}
                  </div>
                  <div className="pe-md-5 pb-3">
                    {blog.image && (
                      <div>
                        <img
                          className="w-100"
                          src={`${fileUrl}/uploads/articles/large/${blog.image}`}
                          alt={blog.title || "Blog image"}
                        />
                      </div>
                    )}
                  </div>
                  <div dangerouslySetInnerHTML={{ __html: blog.content }} />
                </div>
                <div className="col-md-4">
                  <div className="card shadow border-0 sidebar">
                    <div className="card-body px-5 py-4">
                      <h3 className="mt-2 mb-3">Latest Blogs</h3>
                      {latestblogs &&
                        latestblogs.map((latestblog) => {
                          return (
                            <div className="d-flex border-bottom mb-3 pb-2">
                              <div className="pe-3 pb-2">
                                <Link
                                  className="title"
                                  to={`/blog/${latestblog.id}`}
                                >
                                  <img
                                    width={100}
                                    src={`${fileUrl}/uploads/articles/small/${latestblog.image}`}
                                    alt={latestblog.title || "Blog image"}
                                  />
                                </Link>
                              </div>
                              <Link
                                className="title"
                                to={`/blog/${latestblog.id}`}
                              >
                                {latestblog.title}
                              </Link>
                              <hr />
                            </div>
                          );
                        })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        ) : (
          <div className="text-center">No Blogs found</div>
        )}
      </main>
      <Footer />
    </>
  );
};

export default BlogDetail;

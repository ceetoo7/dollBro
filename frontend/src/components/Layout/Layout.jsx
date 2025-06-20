import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Toaster } from "react-hot-toast";
import { Helmet } from "react-helmet";

const Layout = ({ children, title, description, keywords, author }) => {
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="author" content={author} />
        <meta name="keywords" content={keywords} />
        <meta name="description" content={description} />

        <title>{title}</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>

      <Header />
      <main style={{ minHeight: "90vh" }}>
        <Toaster />
        {children}
      </main>
      <Footer />
    </div>
  );
};

Layout.defaultProps = {
  title: "Doll Bro - shop now!",
  description: "The best doll store in Nepal. ",
  keywords:
    "mern, react, node, mongodb, express, dollbro, dollnepal, dollmandu, Doll Bro, Doll Nepal, DollMandu",
  author: "Chandan",
};

export default Layout;

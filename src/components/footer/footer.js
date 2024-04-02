import React, { useMemo } from "react";
import image1 from "../../img/logo-footer.png";
import "./footer.css";

const About = () => {
  return useMemo(
    () => (
      <footer className="w-100 py-5">
        <div className="container">
          <div className="row align-items-stretch">
            <div className="col-sm-4 col-12 d-flex justify-content-center align-items-center h-100">
              <img alt="" src={image1} className="mt-5 img-logo-footer" />
            </div>

            <div className="col-sm-4 col-12 d-flex flex-column justify-content-center align-items-center h-100">
              <h2 className="mt-5 text-white">About</h2>
              <a href="/about" className="my-2 text-decoration-none">
                About Us
              </a>
              <a href=" " className="my-2 text-decoration-none">
                Our Team
              </a>
              <a href=" " className="my-2 text-decoration-none">
                Mission Statement
              </a>
            </div>

            <div className="col-sm-4 col-12 d-flex flex-column justify-content-center align-items-center h-100">
              <h2 className="mt-5 text-white">Contact</h2>
              <a href="/contact " className="my-2 text-decoration-none">
                Contact Us
              </a>
              <a href=" " className="my-2 text-decoration-none">
                Locations
              </a>
              <a href=" " className="my-2 text-decoration-none">
                Support
              </a>
            </div>
          </div>
        </div>
      </footer>
    ),
    []
  );
};

export default About;

import React, { useCallback, useMemo } from "react";
import "./contact.css";

const Contact = () => {
  const notEmpty = useCallback((e) => {
    e.currentTarget.value.length > 0
      ? e.currentTarget.classList.add("Not-empty")
      : e.currentTarget.classList.remove("Not-empty");
  }, []);

  return useMemo(
    () => (
      <section className="w-100 py-5 vh-min-100 bg-contact">
        <div className="container">
          <h2 className="text-center text-white mb-5">Contact</h2>
          <form>
            <div className="row">
              <div className="col-lg-6 col-12">
                <div className="input-sp">
                  <input
                    type="text"
                    required
                    onInput={(e) => {
                      notEmpty(e);
                    }}
                  />
                  <label className="fw-semibold">
                    <span style={{ transitionDelay: "0ms" }}>Y</span>
                    <span style={{ transitionDelay: "50ms" }}>o</span>
                    <span style={{ transitionDelay: "100ms" }}>u</span>
                    <span style={{ transitionDelay: "150ms" }}>r</span>
                    <span style={{ transitionDelay: "150ms" }}> </span>
                    <span style={{ transitionDelay: "200ms" }}>N</span>
                    <span style={{ transitionDelay: "250ms" }}>a</span>
                    <span style={{ transitionDelay: "300ms" }}>m</span>
                    <span style={{ transitionDelay: "350ms" }}>e</span>
                  </label>
                </div>
              </div>

              <div className="col-lg-6 col-12">
                <div className="input-sp">
                  <input
                    type="text"
                    required
                    onInput={(e) => {
                      notEmpty(e);
                    }}
                  />
                  <label className="fw-semibold">
                    <span style={{ transitionDelay: "0ms" }}>Y</span>
                    <span style={{ transitionDelay: "50ms" }}>o</span>
                    <span style={{ transitionDelay: "100ms" }}>u</span>
                    <span style={{ transitionDelay: "150ms" }}>r</span>
                    <span style={{ transitionDelay: "150ms" }}> </span>
                    <span style={{ transitionDelay: "200ms" }}>E</span>
                    <span style={{ transitionDelay: "250ms" }}>m</span>
                    <span style={{ transitionDelay: "300ms" }}>a</span>
                    <span style={{ transitionDelay: "350ms" }}>i</span>
                    <span style={{ transitionDelay: "400ms" }}>l</span>
                  </label>
                </div>
              </div>

              <div className="col-12">
                <div className="input-sp">
                  <textarea
                    required
                    onInput={(e) => {
                      notEmpty(e);
                    }}
                  ></textarea>
                  <label className="fw-semibold">
                    <span style={{ transitionDelay: "0ms" }}>Y</span>
                    <span style={{ transitionDelay: "50ms" }}>o</span>
                    <span style={{ transitionDelay: "100ms" }}>u</span>
                    <span style={{ transitionDelay: "150ms" }}>r</span>
                    <span style={{ transitionDelay: "150ms" }}> </span>
                    <span style={{ transitionDelay: "200ms" }}>M</span>
                    <span style={{ transitionDelay: "250ms" }}>e</span>
                    <span style={{ transitionDelay: "300ms" }}>s</span>
                    <span style={{ transitionDelay: "350ms" }}>s</span>
                    <span style={{ transitionDelay: "400ms" }}>a</span>
                    <span style={{ transitionDelay: "450ms" }}>g</span>
                    <span style={{ transitionDelay: "500ms" }}>e</span>
                  </label>
                </div>
              </div>
            </div>
            <div className="text-center">
              <input
                type="submit"
                value="send"
                className="border-0 fs-3 px-4 py-1 rounded-2 "
              />
            </div>
          </form>
        </div>
      </section>
    ),
    [notEmpty]
  );
};

export default Contact;

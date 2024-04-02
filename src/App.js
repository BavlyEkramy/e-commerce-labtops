import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle";
import "./App.css";
import "aos/dist/aos.css";
import "@fortawesome/fontawesome-free/css/all.css";
import Aos from "aos";
import React, { useEffect } from "react";
import Nav from "./components/nav";
import Main from "./components/main";
import Products from "./components/product/products";
import { Myprovider } from "./components/context";
import Contact from "./components/contact/contact";
import About from "./components/footer/footer";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AboutSection from "./components/sectionabout";
import SginIn from "./components/signin&reg/signIn&reg";
import ProductCart from "./components/productCart/productCart";
import LoadingPage from "./components/loadingPage";

function App() {
  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);

  return (
    <>
      <Myprovider>
        <BrowserRouter>
          <LoadingPage />
          <Routes>
            <Route
              path="*"
              element={
                <>
                  <Nav />{" "}
                  <h1 className="position-absolute top-50 start-50 translate-middle">
                    Page Not Found
                  </h1>
                </>
              }
            />
            <Route
              path="/"
              element={
                <>
                  <Nav /> <Main /> <Products /> <About />
                </>
              }
            />
            <Route
              path="/shop"
              element={
                <>
                  <Nav /> <Products /> <About />
                </>
              }
            />
            <Route
              path="/shop/:name"
              element={
                <>
                  <Nav /> <Products /> <About />
                </>
              }
            />
            <Route
              path="/productcart"
              element={
                <>
                  <Nav /> <ProductCart />
                </>
              }
            />
            <Route
              path="/contact"
              element={
                <>
                  <Nav /> <Contact /> <About />
                </>
              }
            />
            <Route
              path="/about"
              element={
                <>
                  <Nav /> <AboutSection /> <About />
                </>
              }
            />
            <Route
              path="/signin"
              element={
                <>
                  <SginIn wantReg={false} />
                </>
              }
            />
            <Route
              path="/register"
              element={
                <>
                  <SginIn wantReg={true} />
                </>
              }
            />
          </Routes>
        </BrowserRouter>
      </Myprovider>
    </>
  );
}

export default App;

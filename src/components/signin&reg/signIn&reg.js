import React, { useContext, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MyContext } from "../context";
import { useDispatch, useSelector } from "react-redux";
import { getInfo, logInSuccess } from "../../redux/cartReducer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./signIn&reg.css";

const SginIn = ({ wantReg }) => {
  const { isMobile } = useContext(MyContext);
  const reg = useNavigate();
  const userName = useRef(null);
  const email = useRef(null);
  const password = useRef(null);
  const emailTrue = useRef(null);
  const passTrue = useRef(null);
  const dispatch1 = useDispatch();
  const userInfo = useSelector((state) => state.cart.allInfo);

  const goToHome = (e) => {
    e.preventDefault();
    if (
      userInfo.email === emailTrue.current.value &&
      userInfo.pass === passTrue.current.value
    ) {
      reg("/");
      dispatch1(logInSuccess());
      toast.success("You have been logged in successfully", {
        autoClose: 2000,
      });
    } else if (
      userInfo.email === emailTrue.current.value &&
      userInfo.pass !== passTrue.current.value
    ) {
      toast.error("Wrong Password");
    } else if (
      userInfo.email !== emailTrue.current.value &&
      userInfo.pass === passTrue.current.value
    ) {
      toast.error("Wrong Email");
    } else {
      toast.error("Wrong Email and Password");
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    dispatch1(
      getInfo({
        name: userName.current.value,
        email: email.current.value,
        pass: password.current.value,
      })
    );
    reg("/signin");
    toast.success("successfully registered", { autoClose: 2000 });
  };

  useEffect(() => {
    if (isMobile) {
      if (wantReg) {
        userName.current.value = "";
        email.current.value = "";
        password.current.value = "";
      } else {
        emailTrue.current.value = "";
        passTrue.current.value = "";
      }
    } else {
      userName.current.value = "";
      email.current.value = "";
      password.current.value = "";
      emailTrue.current.value = "";
      passTrue.current.value = "";
    }
  }, [wantReg]);

  // save of jsx
  const icons = (
    <>
      <p className="text-center fs-3">or</p>
      <div className="d-flex justify-content-center gap-3 w-50 m-auto fs-1">
        <a href=" " className="txt-myGray  hover-icon  ">
          <i className="fa-brands fa-google"></i>
        </a>
        <a href=" " className="txt-myGray  hover-icon  ">
          <i className="fa-brands fa-facebook"></i>
        </a>
        <a href=" " className="txt-myGray  hover-icon  ">
          <i className="fa-brands fa-github"></i>
        </a>
        <a href=" " className="txt-myGray hover-icon hover-icon  ">
          <i className="fa-brands fa-linkedin-in  "></i>
        </a>
      </div>
    </>
  );

  const formCreate = (
    <form className="col-12 col-lg-6 py-5" onSubmit={handleFormSubmit}>
      <h1 className="text-center mt-5 mb-5 fw-bold">Create An Account</h1>
      <input
        type="text"
        placeholder="Enter Your User Name"
        className="form-control my-3 w-75 m-auto shadow-none fs-5 text-dark bg-sign"
        required
        ref={userName}
      />
      <input
        type="email"
        placeholder="Enter Your Email"
        className="form-control my-3 w-75 m-auto shadow-none fs-5 text-dark bg-sign"
        required
        ref={email}
      />
      <input
        type="password"
        placeholder="Enter Your Password"
        className="form-control my-3 w-75 m-auto shadow-none fs-5 text-dark bg-sign"
        required
        ref={password}
      />
      <input
        type="submit"
        value="Sign Up"
        className="form-control my-3 w-25 p-2 m-auto shadow-none text-white border-0 fs-4 bg-myGray"
      />
      {icons}
      <p className="text-center fs-5 mobile-only">
        if u have account you can <Link to="/signin">Sign In</Link>
      </p>
    </form>
  );

  const formSign = (
    <form onSubmit={goToHome} className="col-12 col-lg-6 py-5 form-sign">
      <h1 className="text-center mt-5 mb-5 fw-bold">Sign In</h1>
      <input
        ref={emailTrue}
        type="email"
        placeholder="Enter Your Email"
        className="form-control my-4 w-75 m-auto shadow-none fs-5 bg-sign"
        required
      />
      <input
        ref={passTrue}
        type="password"
        placeholder="Enter Your password"
        className="form-control my-4 w-75 m-auto shadow-none fs-5 bg-sign"
        required
      />
      <input
        type="submit"
        value="Sign In"
        className="form-control my-4 w-25 m-auto p-2 shadow-none text-white border-0 fs-4 bg-myGray"
      />

      {icons}
      <p className="text-center fs-5 mt-2">
        if u have not account you can <Link to="/register">Register</Link>
      </p>
    </form>
  );

  return (
    <>
      <ToastContainer />

      <section className="w-100 vh-min-100 d-flex justify-content-center align-items-center">
        <div className="container">
          <div className="sign-in d-flex flex-column flex-lg-row justify-content-between align-items-center">
            <div
              className={`sign-in-blue ${
                wantReg ? "go-left" : "go-right"
              } text-white d-flex flex-column justify-content-center align-items-center z-2`}
            >
              <h1 className="my-2">Welcome, to our shop</h1>
              <p className="my-2 mb-3">
                {wantReg
                  ? "Do you already have an account "
                  : "Don't have an account? "}
              </p>
              <button
                className="my-2 px-3 txt-myGray rounded-3 fs-3"
                onClick={() => {
                  wantReg ? reg("/signin") : reg("/register");
                }}
              >
                {wantReg ? "Sign In" : "Register"}
              </button>
            </div>

            {isMobile ? (
              wantReg ? (
                formCreate
              ) : (
                formSign
              )
            ) : (
              <>
                {formSign}
                {formCreate}
              </>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default SginIn;

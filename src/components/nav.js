import React, {
  useContext,
  useEffect,
  useState,
  useMemo,
  useCallback,
} from "react";
import logo from "../img/logo.png";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteFromCart,
  deleteInfo,
  logOutSuccess,
} from "../redux/cartReducer";
import { MyContext } from "./context";
import { NavLink, Link } from "react-router-dom";

const Nav = () => {
  const [showCart, setShowCart] = useState(false);
  const [fixNav, setFixNav] = useState(false);
  const [classNameShow, setClassNameShow] = useState(false);
  const { isMobile } = useContext(MyContext);

  const cartProducts = useSelector((state) => state.cart.products);
  const signIn = useSelector((state) => state.cart.signIn);
  const userInfo = useSelector((state) => state.cart.allInfo);

  const dispatch = useDispatch();

  const handleTrashDelete = useCallback(
    (productId) => {
      dispatch(deleteFromCart(productId));
      if (cartProducts.length === 1) {
        setShowCart(false);
      }
    },
    [dispatch, cartProducts]
  );

  const handleMenuToggle = useCallback(() => {
    setClassNameShow((prevClassNameShow) => !prevClassNameShow);
  }, []);

  const handleofNavLinks = useCallback(() => {
    handleMenuToggle();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [handleMenuToggle]);

  const deleteMyInfo = useCallback(() => {
    dispatch(deleteInfo());
    dispatch(logOutSuccess());
  }, [dispatch]);

  useEffect(() => {
    const handleScroll = () => {
      const mobileWidth = window.innerWidth;
      if (window.scrollY > 60 || mobileWidth < 992) {
        setFixNav(true);
      } else {
        setFixNav(false);
      }
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const navCart = useMemo(
    () => (
      <li className="nav-item mx-lg-3 mx-3 list-unstyled ms-auto my-auto">
        <a href=" " className="nav-link cart-info position-relative">
          <i
            className="fa-solid fa-cart-shopping fs-2"
            onClick={(e) => {
              e.preventDefault();
              cartProducts.length > 0 && setShowCart(!showCart);
            }}
          ></i>
          <span className="numberProducts px-2">{cartProducts.length}</span>

          {showCart && cartProducts.length > 0 && (
            <ul className="show-Products">
              {cartProducts.map((pro) => (
                <li
                  className="d-flex justify-content-between align-items-center my-2 py-2"
                  onClick={(e) => {
                    e.preventDefault();
                  }}
                >
                  <img className="mx-1 my-auto " src={pro.img} alt={pro.name} />
                  <h5 className="mx-1 my-auto">{pro.name}</h5>
                  <p className="mx-2 my-auto">{pro.price}$</p>
                  <p className="icon mx-2 my-auto">
                    <i
                      className="fa-solid fa-trash"
                      onClick={() => {
                        handleTrashDelete({ id: pro.id });
                      }}
                    ></i>
                  </p>
                </li>
              ))}
              <li className="nav-item text-center">
                <Link
                  to="/productcart"
                  className="nav-link fs-5"
                  onClick={() => {
                    setShowCart(false);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                >
                  See All
                </Link>
              </li>
            </ul>
          )}
        </a>
      </li>
    ),
    [cartProducts, showCart, handleTrashDelete]
  );

  ////////////////////////////////////////////////////////////////////
  return (
    <>
      <div className="pb-for-nav">
        <nav
          id="nnav"
          className={
            fixNav
              ? "navbar navbar-expand-lg fixed-top fix-nav"
              : "bg-transparent navbar navbar-expand-lg fixed-top"
          }
        >
          <div className="container">
            <Link
              to="/"
              className="navbar-brand me-5"
              onClick={() => {
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            >
              <img src={logo} alt=" " className="img-logo" />
            </Link>

            {isMobile && navCart}

            <button
              className="navbar-toggler border-0 shadow-none"
              data-bs-toggle="collapse"
              data-bs-target="#collapse"
            >
              <label className="hamburger">
                <input
                  type="checkbox"
                  onChange={handleMenuToggle}
                  checked={classNameShow}
                />
                <svg viewBox="0 0 32 32">
                  <path
                    className="line line-top-bottom"
                    d="M27 10 13 10 C10.8 10 9 8.2 9 6 9 3.5 10.8 2 13 2 15.2 2 17 3.8 17 6"
                    // d="M27 10 13 10 C10.8 10 9 8.2 9 6 9 3.5 10.8 2 13 2 15.2 2 17 3.8 17 6 L17 26C17 28.2 18.8 30 21 30 23.2 30 25 28.2 25 26 25 23.8 23.2 22 21 22L7 22"
                  ></path>
                  <path className="line" d="M7 16 27 16"></path>
                </svg>
              </label>
            </button>

            <div
              className={`navbar-collapse collapse ${
                classNameShow ? "show" : ""
              }`}
              id="collapse"
            >
              <ul className="navbar-nav ms-lg-5 my-2 text-center fs-5">
                <li className="nav-item my-3 my-lg-auto mx-auto ms-lg-4 mx-lg-2">
                  <NavLink
                    className="nav-link effect"
                    to="/"
                    onClick={() => {
                      handleofNavLinks();
                    }}
                  >
                    Home
                  </NavLink>
                </li>

                <li className="nav-item my-3 my-lg-auto mx-auto mx-lg-2">
                  <NavLink
                    className="nav-link effect"
                    to="/shop"
                    onClick={() => {
                      handleofNavLinks();
                    }}
                  >
                    Shop
                  </NavLink>
                </li>

                <li className="nav-item my-3 my-lg-auto mx-auto mx-lg-2">
                  <NavLink
                    className="nav-link effect"
                    to="/contact"
                    onClick={() => {
                      handleofNavLinks();
                    }}
                  >
                    Contact
                  </NavLink>
                </li>

                <li className="nav-item my-3 my-lg-auto mx-auto mx-lg-2">
                  <NavLink
                    className="nav-link effect"
                    to="/about"
                    onClick={() => {
                      handleofNavLinks();
                    }}
                  >
                    About
                  </NavLink>
                </li>
              </ul>
              <ul className="fs-5 my-5 my-lg-2 ms-lg-auto navbar-nav d-flex flex-row justify-content-center">
                {signIn ? (
                  <li className="nav-item dropdown">
                    <a
                      href=" "
                      className="nav-link dropdown-toggle hover-icon"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      {userInfo.name}
                    </a>
                    <ul className="dropdown-menu">
                      <li>
                        <a
                          href=" "
                          className="dropdown-item hover-icon"
                          onClick={deleteMyInfo}
                        >
                          Log out
                        </a>
                      </li>
                    </ul>
                  </li>
                ) : (
                  <>
                    <li className="nav-item mx-lg-3 mx-3">
                      <Link className="nav-link effect" to="/signin">
                        SignIn <i className="fa-solid fa-right-to-bracket"></i>
                      </Link>
                    </li>

                    <li className="nav-item mx-lg-3 mx-3">
                      <Link className="nav-link effect" to="/register">
                        Register <i className="fa-solid fa-user-plus"></i>
                      </Link>
                    </li>
                  </>
                )}

                {!isMobile && navCart}
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Nav;

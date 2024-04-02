import React, {
  useEffect,
  useRef,
  useState,
  useMemo,
  useCallback,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { addToCart, deleteFromCart } from "../../redux/cartReducer";
import data from "../data.json";
import { useParams } from "react-router-dom";

const Products = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [showItemInfo, setShowItemInfo] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(6);
  const productsSection = useRef();
  const nSearch = useParams("name");

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    if (nSearch.name) handleTypesSelection(nSearch.name);
  }, []);

  const typeOfData = useMemo(
    () => [...new Set(data.map((pro) => pro.type))],
    []
  );

  const filterProducts = useMemo(
    () =>
      selectedTypes.length > 0
        ? data.filter((pro) => selectedTypes.includes(pro.type))
        : data,
    [selectedTypes]
  );

  const filteredProducts = useMemo(
    () =>
      filterProducts.filter((pro) =>
        pro.description.toLowerCase().includes(searchText.toLowerCase())
      ),
    [filterProducts, searchText]
  );

  const cartProducts = useSelector((state) => state.cart.products);
  const dispatch = useDispatch();

  const clickForInfo = (id) => {
    const product = data.find((pro) => pro.id === id);
    setSelectedProduct(product);
    setShowItemInfo(true);
  };

  const addToCartHandler = useCallback(
    (product) => {
      dispatch(addToCart(product));
      toast.success("Product added successfully", { autoClose: 2000 });
    },
    [dispatch]
  );

  const removeFromCartHandler = useCallback(
    (productId) => {
      dispatch(deleteFromCart(productId));
      toast.error("Product removed successfully", { autoClose: 2000 });
    },
    [dispatch]
  );

  const handleTypesSelection = useCallback(
    (type) => {
      const updatedTypes = [...selectedTypes];

      if (updatedTypes.includes(type)) {
        const index = updatedTypes.indexOf(type);
        updatedTypes.splice(index, 1);
        setCurrentPage(1);
      } else {
        updatedTypes.push(type);
        setCurrentPage(1);
        smooth();
      }

      setSelectedTypes(updatedTypes);
    },
    [selectedTypes]
  );

  // Pagination
  const smooth = useCallback(() => {
    productsSection.current.scrollIntoView({ behavior: "smooth" });
  }, []);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = useMemo(
    () => filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct),
    [filteredProducts, indexOfFirstProduct, indexOfLastProduct]
  );

  const totalPages = useMemo(
    () => Math.ceil(filteredProducts.length / productsPerPage),
    [filteredProducts.length, productsPerPage]
  );

  // Pagination JSX
  const Pagination = () => {
    return (
      <div className="d-flex justify-content-center">
        <div className="pagination px-4 py-1 rounded-1 mt-5">
          <button
            onClick={() => {
              setCurrentPage(currentPage - 1);
              smooth();
            }}
            disabled={currentPage === 1}
            className="px-2 px-lg-3"
          >
            <i className="fa-solid fa-arrow-left"></i>
          </button>
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => {
                setCurrentPage(index + 1);
                smooth();
              }}
              className={
                currentPage === index + 1
                  ? "active px-2 px-lg-3"
                  : "px-2 px-lg-3"
              }
            >
              {index + 1}
            </button>
          ))}
          <button
            onClick={() => {
              setCurrentPage(currentPage + 1);
              smooth();
            }}
            disabled={currentPage === totalPages}
            className="epx-2 px-lg-3"
          >
            <i className="fa-solid fa-arrow-right"></i>
          </button>
        </div>
      </div>
    );
  };

  useEffect(() => {
    const nav = document.querySelector("nav");

    if (showItemInfo) {
      document.body.style.overflow = "hidden";
      nav.style.visibility = "hidden";
    } else {
      document.body.style.overflow = "auto";
      nav.style.visibility = "visible";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showItemInfo]);

  return (
    <>
      <ToastContainer />

      <section className="w-100 overflow-hidden pb-5" ref={productsSection}>
        <div className="row">
          <div
            className="col-lg-3 d-flex-m justify-content-center"
            data-aos="fade-right"
          >
            {typeOfData.map((item, index) => {
              return (
                <div className="mx-4 my-5" key={index}>
                  <div className="checkbox">
                    <div className="form-check">
                      <label className="form-check-label">
                        <input
                          type="checkbox"
                          onChange={() => handleTypesSelection(item)} ////////////////////////
                          checked={selectedTypes.includes(item)} /////////////////////////////
                          className="form-check-input"
                        />
                        <span className="fs-4">{item}</span>
                      </label>
                    </div>
                  </div>
                </div>
              );
            })}
            <input
              type="text"
              placeholder="Search..."
              className="mx-4 my-5 w-75 form-control shadow-none bg-sign"
              onChange={(e) => setSearchText(e.target.value)}
            />
          </div>

          <div
            className={
              filteredProducts.length > 0
                ? `col-lg-9 col-12 px-0`
                : `col-lg-9 col-12 px-0  d-flex justify-content-center align-items-center`
            }
          >
            <div
              className={`d-flex flex-wrap justify-content-center align-items-stretch`}
            >
              {filteredProducts.length > 0 ? (
                currentProducts.map((item) => {
                  return (
                    <div
                      className="pro-card rounded-4 min-width-pro mx-2 my-4"
                      key={item.id}
                      data-aos="fade-up"
                      data-aos-offset="30"
                    >
                      <div className="pro-des p-4 h-100 text-center">
                        <div
                          className="mx-auto my-4 img-here"
                          onClick={() => {
                            clickForInfo(item.id); ////////////////////////////////////
                          }}
                        >
                          <img
                            alt=" "
                            className="w-100 h-100 "
                            src={item.image[0]}
                          />
                          <div className="overlay text-white d-flex justify-content-center align-items-center fs-2">
                            <i className="fa-solid fa-eye"></i>
                          </div>
                        </div>
                        <div className="d-flex justify-content-center flex-column">
                          <h4 className="my-2">{item.name}</h4>
                          <p className="my-2 fs-3">{item.price} $</p>
                          <p className="my-2 fs-6 ">
                            {item.description.substring(0, 90)}...
                          </p>
                        </div>
                        {cartProducts.find(
                          (product) => product.id === item.id
                        ) ? (
                          <button
                            className="border-0 bg-danger text-white rounded-4 px-3 py-2 mt-auto"
                            onClick={() => {
                              removeFromCartHandler({
                                id: item.id,
                              });
                            }}
                          >
                            Remove From Cart
                          </button>
                        ) : (
                          <button
                            className="border-0 bg-myGray text-white rounded-4 px-3 py-2 mt-auto"
                            onClick={() => {
                              addToCartHandler({
                                id: item.id,
                                name: item.name,
                                des: item.description,
                                img: item.image[0],
                                type: item.type,
                                price: item.price,
                              });
                            }}
                          >
                            Add to cart
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="text-center fs-1 fw-bold">Not Found</div>
              )}
            </div>
            {filteredProducts.length > 6 ? Pagination() : ""}
          </div>
        </div>
      </section>

      {showItemInfo && (
        <div
          className="bg-overlay"
          onClick={() => {
            setShowItemInfo(false);
          }}
        >
          <div
            className="overlay-section position-relative overflow-hidden"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <i
              className="fa-solid fa-xmark icon-close display-6 "
              onClick={() => {
                setShowItemInfo(false);
              }}
            ></i>

            <div className="d-flex align-items-center justify-content-center h-100">
              <div
                className="row flex-column align-items-center justify-content-center flex-lg-row"
                data-aos="fade-up"
              >
                <div className="col-lg-5 col-12 overlay-info order-lg-0 order-2">
                  <div className="mx-4 h-100 align-items-center">
                    <p className="fs-2 fw-semibold my-3">
                      {selectedProduct.name}
                    </p>
                    <p className="my-3">{selectedProduct.description}</p>
                    <div className="d-flex align-items-center mt-3">
                      {cartProducts.find(
                        (pro) => pro.id === selectedProduct.id
                      ) ? (
                        <button
                          className="border-0 bg-danger text-white rounded-4 px-3 py-2 my-3"
                          onClick={() => {
                            removeFromCartHandler({ id: selectedProduct.id });
                          }}
                        >
                          remove from cart
                        </button>
                      ) : (
                        <button
                          className="border-0 bg-myGray text-white rounded-4 px-3 py-2 my-3"
                          onClick={() => {
                            addToCartHandler({
                              id: selectedProduct.id,
                              name: selectedProduct.name,
                              des: selectedProduct.description,
                              img: selectedProduct.image[0],
                              type: selectedProduct.type,
                              price: selectedProduct.price,
                            });
                          }}
                        >
                          Add to cart
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                <div className="col-lg-7 col-12 mt-img-m">
                  <div
                    id="carouse-1"
                    className="carousel slide carousel-fade mx-3"
                  >
                    <div className="carousel-inner">
                      <div className="carousel-item active">
                        <img
                          alt=" "
                          src={selectedProduct.image[0]}
                          className="d-block w-75 m-auto"
                        />
                      </div>
                      <div className="carousel-item">
                        <img
                          alt=" "
                          src={selectedProduct.image[1]}
                          className="d-block w-75 m-auto"
                        />
                      </div>
                    </div>
                    <button
                      className="carousel-control-prev"
                      type="button"
                      data-bs-target="#carouse-1"
                      data-bs-slide="prev"
                    >
                      <i className="fa-solid fa-chevron-left text-black fs-2"></i>
                    </button>
                    <button
                      className="carousel-control-next"
                      type="button"
                      data-bs-target="#carouse-1"
                      data-bs-slide="next"
                    >
                      <i className="fa-solid fa-chevron-right text-black fs-2"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Products;

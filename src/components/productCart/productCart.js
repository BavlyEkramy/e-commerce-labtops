import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { deleteFromCart } from "../../redux/cartReducer";
import "./productCart.css";

const ProductCart = () => {
  const cartProducts = useSelector((state) => state.cart.products);
  const dispatch1 = useDispatch();

  const removeFromCartHandler = (productId) => {
    dispatch1(deleteFromCart(productId));
    toast.error("Product removed successfully", { autoClose: 2000 });
  };

  return (
    <>
      <ToastContainer />
      <section className="w-100">
        <div className="container">
          <div className="row">
            {cartProducts.length > 0 ? (
              cartProducts.map((item) => (
                <div key={item.id}>
                  <div className=" rounded-4 my-4 pro-cart ">
                    <div className="col-12 row">
                      <div className="col-lg-6 col-12 m-auto text-center p-4">
                        <img
                          alt=""
                          className="w-75 my-lg-auto" ///////////////////////////////////////////////////////////
                          src={item.img}
                        />
                      </div>
                      <div className="col-lg-6 col-12 mx-3 mx-lg-auto">
                        <div className="py-4 h-100 d-flex flex-column justify-content-between">
                          <h1>{item.name}</h1>
                          <p>{item.des}</p>
                          <p className="bg-myGray w-fit px-4 py-2 fw-bold text-white rounded-3">
                            Price: {item.price}$
                          </p>
                          <div className="text-center">
                            <button
                              onClick={() => {
                                removeFromCartHandler(
                                  dispatch1(
                                    deleteFromCart({
                                      id: item.id,
                                    })
                                  )
                                );
                              }}
                              className="bg-danger fw-bold border-0 text-white rounded-2 py-2 px-3"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-12">
                <h1 className="position-absolute top-50 start-50 translate-middle">
                  Cart Is Empty
                </h1>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default ProductCart;

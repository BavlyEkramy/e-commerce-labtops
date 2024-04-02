import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import image1 from "../img/apple.png";
import image2 from "../img/apple2.png";
import image3 from "../img/lenovo.png";
import image4 from "../img/msi.png";
import image5 from "../img/hp.png";

const Main = () => {
  const types = useMemo(
    () => [
      {
        id: 1,
        name: "Lenovo",
        describtion:
          "Lenovo offers a diverse range of laptops catering to different segments of the market, including consumer, business, and gaming.They are known for their reliable build quality, excellent keyboards, and innovative features like the ThinkPad's TrackPoint.",
        classBgColor: "bg-first-second-row",
        img: image3,
        imageClass: "image3",
        fade: "fade-right",
      },
      {
        id: 2,
        name: "MSI",
        describtion:
          "MSI is well-known for its gaming laptops and high-performance machines.Their laptops often feature powerful hardware components such as high-end CPUs and GPUs, making them suitable for gaming and demanding tasks like video editing or 3D rendering.",
        classBgColor: "bg-second-second-row",
        img: image4,
        imageClass: "image4",
        fade: "fade-right",
      },
      {
        id: 3,
        name: "HP",
        describtion:
          "HP offers a wide range of laptops catering to different needs, including consumer, business, and gaming. They often focus on providing good value for money, offering a balance between performance and affordability.",
        classBgColor: "bg-second-third-row",
        img: image5,
        imageClass: "image5",
        fade: "fade-left",
      },
    ],
    []
  );

  const renderTypes = useMemo(
    () =>
      types.map((type) => (
        <div className="col-xl-4 col-md-6 col-12" key={type.id}>
          <div
            className={`mx-3 vh-75 my-5 rounded-5 my-shadow p-5 position-relative  ${type.classBgColor}`}
            data-aos={type.fade}
          >
            <img
              alt=""
              src={type.img}
              className={`position-absolute  ${type.imageClass} t-delay`}
              data-aos={type.fade}
            />
            <div
              className="d-flex justify-content-between  t-delay"
              data-aos={type.fade}
            >
              <div className="text-white w-50">
                <h2> {type.name} </h2>
              </div>
              <div>
                <Link
                  to={`/shop/${type.name}`}
                  className="w-25 text-decoration-none text-black bg-white mb-5 border-0 px-3 py-2 rounded-5 fs-7"
                >
                  See More
                </Link>
              </div>
            </div>
            <p className="text-white fs-5 mt-4" data-aos={type.fade}>
              {type.describtion}
            </p>
          </div>
        </div>
      )),
    [types]
  );

  return (
    <main className="w-100 overflow-hidden mt-0">
      <div className="row  bbt">
        <div className="col-xl-8 col-12">
          <div
            className="bg-main bg-black mx-3 vh-75 rounded-5 p-5 my-4 my-shadow"
            data-aos="fade-right"
          >
            <img
              alt=""
              src={image1}
              className="position-absolute t-delay Apple"
              data-aos="fade-right"
            />
            <div
              className="d-flex flex-column h-100 justify-content-start t-delay"
              data-aos="fade-right"
            >
              <h1 className="text-white w-50 w-m-100 fs-2 lh-md">
                Refurbished 14-inch MacBook Pro Apple M1 Max Chip with 10‑Core
                CPU and 32‑Core GPU
              </h1>
              <Link
                to={"/shop"}
                className="w-fit text-decoration-none mt-auto mb-3 ms-3 border-0 fs-3 px-3 py-2 rounded-5 first-btn text-white"
              >
                See More
              </Link>
            </div>
          </div>
        </div>

        <div className="col-xl-4 col-md-6 col-12">
          <div
            className="bg-second-div mx-3 vh-75 rounded-5 my-xl-4 p-5 my-5 my-shadow"
            data-aos="fade-left"
          >
            <img
              alt=""
              src={image2}
              className="position-absolute second-img t-delay"
              data-aos="fade-left"
            />
            <div
              className="d-flex justify-content-between t-delay"
              data-aos="fade-left"
            >
              <h2 className="text-white">MacBook</h2>
              <div>
                <Link
                  to={`/shop/Mac`}
                  className="w-25 text-decoration-none text-black bg-white mb-5 border-0 px-3 py-2 rounded-5 fs-7"
                >
                  See More
                </Link>
              </div>
            </div>
            <p className="text-white fs-5 mt-4" data-aos="fade-left">
              Apple's MacBook lineup is known for its sleek design, premium
              build quality, and integration with the macOS operating
              system.MacBooks are favored by users who value design aesthetics,
              build quality, and the Apple ecosystem.They offer excellent
              performance, especially in tasks like graphic design, video
              editing, and music production.
            </p>
          </div>
        </div>

        {renderTypes}
      </div>
    </main>
  );
};

export default Main;

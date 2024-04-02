import React, { useEffect, useState } from "react";

const LoadingPage = () => {
  const [showLoading, setShowLoading] = useState(true);
  useEffect(() => {
    document.body.style.overflow = "hidden";

    const loadingTimeout = setTimeout(() => {
      setShowLoading(false);
      document.body.style.overflow = "auto";
    }, 2000);

    return () => {
      clearTimeout(loadingTimeout);
    };
  }, []);

  return (
    <>
      {showLoading && (
        <div className="position-fixed top-50 start-50 translate-middle bg-loading w-100 vh-100 d-flex justify-content-center align-items-center">
          <div className="wrapper">
            <div className="circle"></div>
            <div className="circle"></div>
            <div className="circle"></div>
            <div className="shadow"></div>
            <div className="shadow"></div>
            <div className="shadow"></div>
          </div>
        </div>
      )}
    </>
  );
};
export default LoadingPage;

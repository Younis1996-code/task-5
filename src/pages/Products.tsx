import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate, useOutletContext } from "react-router-dom";
import emptyBox from "../assets/emptyBox.png";
import search from "../assets/Vector.svg";
import Loading from "../components/Loading";

interface Product {
  id: number;
  name: string;
  image_url: string;
}

type contextType = {
  handleChildId: (id: number) => void;
  toggleState: () => void;
};

const Products: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [productsPerPage, setProductsPerPage] = useState<number>(8);
  const [isNotFound, setIsNotFound] = useState(false);
  const [loading, setLoading] = useState(true);

  const { toggleState, handleChildId } = useOutletContext<contextType>();

  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setProductsPerPage(4);
      } else {
        setProductsPerPage(8);
      }
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    axios
      .get("https://web-production-3ca4c.up.railway.app/api/items", { headers })
      .then((response) => {
        setProducts(response.data);
        setLoading(false);
      })
      .catch((error) => {
        if (error.response && error.response.status === 404) {
          setIsNotFound(true);
        }
      });
  }, []);

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const lastIndex = currentPage * productsPerPage;
  const firstIndex = lastIndex - productsPerPage;
  const currentProducts = filteredProducts.slice(firstIndex, lastIndex);

  const pageNumbers: (number | string)[] = [];

  if (totalPages <= 4) {
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
  } else {
    if (currentPage <= 2) {
      for (let i = 1; i <= 3; i++) {
        pageNumbers.push(i);
      }
      pageNumbers.push("...", totalPages);
    } else if (currentPage >= totalPages - 1) {
      pageNumbers.push(1, "...");
      for (let i = totalPages - 2; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      pageNumbers.push(1, "...");
      pageNumbers.push(currentPage - 1, currentPage, currentPage + 1);
      pageNumbers.push("...", totalPages);
    }
  }

  return (
    <div className="container pad-y-30 d-flex flex-column vh-100 back-dash">
      {loading ? (
        <Loading />
      ) : isNotFound ? (
        <div className="d-flex justify-content-center align-items-center h-100">
          <img src={emptyBox} alt="No products found" className="img-fluid" />
        </div>
      ) : (
        <>
          <div className="position-relative d-flex justify-content-between align-items-center w-50 mx-auto bg-white m-t-24">
            <input
              type="text"
              className="w-100 p-2 input-radius8 fs-4 fw-normal font-line search-fontcol"
              placeholder="Search product by name"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
            />
            <img
              className="position-absolute top-50 end-0 translate-middle-y me-3 pointer-evnone"
              src={search}
              alt="search"
            />
          </div>

          <div className="w-75 mx-auto h-auto m-t-50">
            <div className="w-100 height-37 mb-5">
              <button className="float-end border-0 btn-color input-radius p-3">
                <Link
                  to="/add-product"
                  className="text-decoration-none text-white fs-4 fw-medium font-line"
                >
                  Add New Product
                </Link>
              </button>
            </div>

            <div className="flex-grow-1 m-b-80">
              <div className="row g-3 g-xl-5 justify-content-center">
                {currentProducts.map((product) => (
                  <div key={product.id} className="col-12 col-sm-6 col-md-3 ">
                    <div className="position-relative widthh-200 p-3 card-shadowrad radius-16 ">
                      <img
                        src={product.image_url ? product.image_url : emptyBox}
                        alt={product.name}
                        className="w-100 h-100 object-fit-contain"
                      />

                      <div
                        className="position-absolute pointer-cur radius-16 w-100 h-100 top-0 start-0 p-1 d-flex flex-column justify-content-evenly align-items-center"
                        style={{
                          backgroundColor: "#F2EAE1B2",
                          opacity: 0,
                          transition: "opacity 0.3s",
                        }}
                        onMouseEnter={(e) =>
                          (e.currentTarget.style.opacity = "1")
                        }
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.opacity = "0")
                        }
                        onClick={() => navigate(`/view-product/${product.id}`)}
                      >
                        <h2 className="f-size30 fw-medium font-line h-color text-center">
                          {product.name}
                        </h2>
                        <div className="d-flex justify-content-center align-items-center">
                          <button
                            onClick={(event) => {
                              event.stopPropagation();
                              navigate(`/edit-product/${product.id}`);
                            }}
                            className="btn btn-warning p-1 p-xl-3 me-1 me-xl-4 text-white fs-5 fw-medium font-line"
                          >
                            Edit
                          </button>
                          <button
                            onClick={(event) => {
                              event.stopPropagation();
                              toggleState();
                              handleChildId(product.id);
                            }}
                            className="btn btn-danger text-white fs-5 fw-medium font-line p-1 p-xl-2"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <nav>
            <ul className="pagination justify-content-center gap-1">
              <li
                className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
              >
                <button
                  className="wh-60 d-flex justify-content-center pa-bo bg-white align-items-center rounded-circle f-size13 fw-semibold font-line"
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                >
                  &lt;
                </button>
              </li>
              {pageNumbers.map((num, idx) =>
                typeof num === "number" ? (
                  <li className="page-item" key={idx}>
                    <button
                      className={`wh-60 d-flex justify-content-center align-items-center pa-bo rounded-circle f-size13 fw-semibold font-line ${
                        currentPage === num
                          ? "active btn-color text-white"
                          : "bg-white"
                      }`}
                      onClick={() => setCurrentPage(num as number)}
                    >
                      {num}
                    </button>
                  </li>
                ) : (
                  <li className="page-item disabled" key={idx}>
                    <span className="page-link wh-60 d-flex justify-content-center align-items-center pa-bo bg-white rounded-circle f-size13 fw-semibold font-line">
                      ...
                    </span>
                  </li>
                )
              )}
              <li
                className={`page-item ${
                  currentPage === totalPages ? "disabled" : ""
                }`}
              >
                <button
                  className="wh-60 d-flex justify-content-center align-items-center pa-bo bg-white rounded-circle f-size13 fw-semibold font-line"
                  onClick={() => {
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
                  }}
                >
                  &gt;
                </button>
              </li>
            </ul>
          </nav>
        </>
      )}
    </div>
  );
};

export default Products;

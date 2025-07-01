import React, { useContext, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import AppContext from "../context/AppContext";

const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const { setFilteredData, products, logout, isAuthenticated, cart } =
    useContext(AppContext);
  // console.log("user cart = ",cart)

  const filterbyCategory = (cat) => {
    setFilteredData(
      products.filter(
        (data) => data?.category?.toLowerCase() == cat?.toLowerCase()
      )
    );
  };
  const filterbyPrice = (min, max) => {
    setFilteredData(
      products.filter((data) => data.price >= min && data.price <= max)
    );
  };

  const submitHandler = (e) => {
    e.preventDefault();
    navigate(`/product/search/${searchTerm}`);
    setSearchTerm(" ");
  };
  return (
    <>
      <div className="nav sticky-top">
        <div className="nav_bar">
          <Link
            to={"/"}
            className="left"
            style={{ textDecoration: "none", color: "white" }}
          >
            <h3>MERN E - Commerce</h3>
          </Link>
          <form className="search_bar " onSubmit={submitHandler}>
            <span className="material-symbols-outlined ">search</span>{" "}
            <input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              type="text"
              placeholder="Search Products..."
            />
          </form>
          <div className="right">
            {isAuthenticated && (
              <>
                <Link
                  to={"/cart"}
                  type="button"
                  className="btn btn-primary position-relative mx-3"
                >
                  <span className="material-symbols-outlined">
                    shopping_cart
                  </span>

                  {cart?.items?.length > 0 && (
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                      {cart?.items?.length}
                      <span className="visually-hidden">unread messages</span>
                    </span>
                  )}
                </Link>

                <Link to={"/profile"} className="btn btn-info mx-3">
                  profile
                </Link>
                <button
                  className="btn btn-danger mx-3"
                  onClick={() => {
                    logout();
                    navigate("/");
                  }}
                >
                  logout
                </button>
              </>
            )}

            {!isAuthenticated && (
              <>
                <Link to={"/login"} className="btn btn-secondary mx-3">
                  login
                </Link>
                <Link to={"/register"} className="btn btn-info mx-3">
                  register
                </Link>
              </>
            )}
          </div>
        </div>

        {location.pathname == "/" && (
          <div className="sub_bar">
            <div className="items" onClick={() => setFilteredData(products)}>
              No Filter
            </div>
            <div className="items" onClick={() => filterbyCategory("mobiles")}>
              Mobiles
            </div>
            <div className="items" onClick={() => filterbyCategory("laptops")}>
              Laptops
            </div>
            <div className="items" onClick={() => filterbyCategory("cameras")}>
              Camera's
            </div>
            <div
              className="items"
              onClick={() => filterbyCategory("headphones")}
            >
              Hedphones
            </div>
            <div className="items" onClick={() => filterbyPrice(0, 15999)}>
              Under ₹15,999
            </div>
            <div className="items" onClick={() => filterbyPrice(16000, 25999)}>
              ₹16,000 - ₹25,999
            </div>
            <div className="items" onClick={() => filterbyPrice(26000, 49999)}>
              ₹26,000 - ₹49,999
            </div>
            <div className="items" onClick={() => filterbyPrice(50000, 69999)}>
              ₹50,000 - ₹69,999
            </div>
            <div className="items" onClick={() => filterbyPrice(70000, 999999)}>
              Above ₹70,000
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Navbar;

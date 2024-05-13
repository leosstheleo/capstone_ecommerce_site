import React from "react";
import { Link, useNavigate } from "react-router-dom";
// import Cart from "./Cart";

function Navbar({ setToken, isLoggedIn }) {
  const navigate = useNavigate();
  function handleLogout() {
    setToken(null);
    window.localStorage.removeItem("TOKEN");
    navigate("/");
  }
  return (
    <div>
      {isLoggedIn ? (
        <div>
          <Link to="/">
            <button>All Cars</button>
          </Link>
          <Link to="/listcar">
            <button>List Car</button>
          </Link>
          <Link to="/cart">
            <button>Cart ({cart.length})</button>
          </Link>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <div>
          <Link to="/">
            <button>All Cars</button>
          </Link>
          <Link to="/login">
            <button>Login</button>
          </Link>
          <Link to="/register">
            <button>Register</button>
          </Link>
        </div>
      )}
    </div>
  );
}
export default Navbar;

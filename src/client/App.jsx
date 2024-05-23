import { useEffect, useState, useCallback } from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import AllCars from "./components/AllCars";
import SingleCar from "./components/SingleCar";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Register from "./components/Register";
import ListCar from "./components/ListCar";
import Orders from "./components/Order";
import Profile from "./components/Profile"
import axios from "axios";
import Cart from "./components/Cart";
import BottomNavBar from "./components/BottomNavBar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./main.jsx";
import Success from "./components/Success.jsx";
import Account from "./components/Account.jsx";
import AllUsers from "./components/AllUsers.jsx";
import SingleOrderCar from "./components/SingleOrderCar.jsx";
import LandingPage from "./components/LandingPage.jsx";


function App() {
  const [user, setUser] = useState("");
  const [token, setToken] = useState(window.localStorage.getItem("TOKEN"));
  const [isAdmin, setIsAdmin] = useState(
    window.localStorage.getItem("Admin") || null
  );
  const [cart, setCart] = useState([]);

  const getToken = () => {
    return localStorage.getItem("TOKEN");
  };

  const fetchCart = useCallback(async () => {
    try {
      const token = getToken();
      const { data: foundCart } = await axios.get(`/api/cart/${user?.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCart(foundCart);
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  }, [user]);

  useEffect(() => {
    async function getUser() {
      const { data } = await axios.get("/api/profile", {
        headers: {
          authorization: "Bearer " + localStorage.getItem("TOKEN"),
        },
      });
      console.log(data);
      setUser(data);
    }
    getUser();
  }, []);

  return (
    <div className="App">
      <ToastContainer />
      <Navbar
        isLoggedIn={token !== null}
        setToken={setToken}
        isAdmin={isAdmin}
        fetchCart={fetchCart}
      />
      <Routes>
        <Route path="/" element={<AllCars />} />
        <Route path="/cars" element={<AllCars isAdmin={isAdmin} />} />
        <Route
          path="/cars/:id"
          element={<SingleCar user={user} isAdmin={isAdmin} />}
        />
        <Route
          path="/login"
          element={<Login setToken={setToken} setIsAdmin={setIsAdmin} />}
        />
        <Route
          path="/account"
          element={<Account setToken={setToken} setIsAdmin={setIsAdmin} />}
        />
        <Route path="/users" element={<AllUsers isAdmin={isAdmin} />} />
        <Route path="/register" element={<Register setToken={setToken} />} />
        <Route path="/listcar" element={<ListCar />} />
        <Route path="/cart" element={<Cart user={user} />} />
        <Route path="/orders" element={<Orders user={user} />} />
        <Route path="/profile" element={<Profile user={user} />} />
        <Route path="/success" element={<Success />} />
      </Routes>
      <BottomNavBar />
    </div>
  );
}

export default App;

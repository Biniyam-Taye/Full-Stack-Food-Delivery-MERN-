import React, { useContext, useEffect, useState } from "react";
import "./myOrders.css";
import { StoreContext } from "../../context/StoreContext";
import { assets } from "../../assets/assets";
import axios from "axios";

const MyOrders = () => {
  const { url, token } = useContext(StoreContext);
  const [data, setData] = useState([]);
  // 💡 Add a loading state for better UX
  const [isLoading, setIsLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      setIsLoading(true); // Start loading
      const response = await axios.post(
        url + "/api/order/userorders",
        {},
        { headers: { token } }
      );
      setData(response.data.data);
      console.log(response.data.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setIsLoading(false); // End loading
    }
  };

  useEffect(() => {
    if (token) {
      fetchOrders();
    } else {
      // If token is not available (e.g., user is logged out)
      setIsLoading(false);
    }
  }, [token]);

  return (
    <div className="my-orders">
      <h2>My Orders</h2>
      <div className="container">
        {/* --------------------------------------------------- */}
        {/* ✅ CRITICAL CONDITIONAL RENDERING LOGIC */}
        {/* --------------------------------------------------- */}

        {/* 1. Show Loading State */}
        {isLoading && (
          <p className="loading-message">Loading your order history...</p>
        )}

        {/* 2. Show No Orders Message */}
        {!isLoading && data.length === 0 && (
          <div className="no-orders-message">
            <p>
              You haven't placed any orders yet! Start exploring our menu to
              place your first order.
            </p>
            {/* Optional: Add a button to navigate to the home/menu page */}
            {/* <button onClick={() => window.location.href = "/"}>Go to Menu</button> */}
          </div>
        )}

        {/* 3. Show Orders (If data is available and not loading) */}
        {!isLoading &&
          data.length > 0 &&
          data.map((order, index) => {
            return (
              <div key={index} className="my-orders-order">
                <img src={assets.parcel_icon} alt="Parcel Icon" />
                <p>
                  {order.items.map((item, itemIndex) => {
                    if (itemIndex === order.items.length - 1) {
                      return item.name + " X " + item.quantity;
                    } else {
                      return item.name + " X " + item.quantity + ", ";
                    }
                  })}
                </p>
                <p>${order.amount}.00</p>
                <p>Items: {order.items.length}</p>
                <p>
                  <span>&#x25cf;</span>
                  <b>{order.status}</b>
                </p>
                <button onClick={fetchOrders}>Track Order</button>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default MyOrders;

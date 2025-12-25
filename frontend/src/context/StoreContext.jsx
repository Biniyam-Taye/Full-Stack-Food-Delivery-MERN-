import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
import { menu_list as dummyMenuList, food_list as dummyFoodList } from "../assets/assets";
export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  const url = (import.meta.env.VITE_BACKEND_URL || "http://localhost:4000").replace(/\/+$/, "");
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [food_list, setFoodlist] = useState([]);
  const [menu_list, setMenulist] = useState([]);
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Add global loading state
  const [error, setError] = useState(null); // Add global error state

  const [settings, setSettings] = useState({
    phone: "+1-212-456-7890",
    email: "contact@mentesdelivery.com",
    facebook: "#",
    twitter: "#",
    linkedin: "#",
    address: "123 Foodie Street, Gourmet City",
    aboutContent: "Mente's Delivery is your favorite food delivery partner."
  });

  const addToCart = async (itemId) => {
    // ... (rest of addToCart)
    if (!cartItems[itemId]) {
      setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
    } else {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }

    if (token) {
      try {
        await axios.post(
          url + "/api/cart/add",
          { itemId },
          { headers: { token } }
        );
      } catch (error) {
        console.error("Error adding to cart:", error);
      }
    }
  };

  const removeFromCart = async (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    if (token) {
      try {
        await axios.post(
          url + "/api/cart/remove",
          { itemId },
          { headers: { token } }
        );
      } catch (error) {
        console.error("Error removing from cart:", error);
      }
    }
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = food_list.find((product) => product._id === item);

        if (itemInfo) {
          totalAmount += itemInfo.price * cartItems[item];
        }
      }
    }
    return totalAmount;
  };

  const getTotalCartItems = () => {
    let totalItems = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        totalItems += cartItems[item];
      }
    }
    return totalItems;
  };

  const fetchFoodList = async () => {
    try {
      const response = await axios.get(url + "/api/food/list");
      if (response.data.success) {
        // Use backend data only if it has a good variety (at least 10 items)
        // Otherwise use dummy data to ensure customers see plenty of options
        if (response.data.data && response.data.data.length >= 10) {
          setFoodlist(response.data.data);
        } else {
          console.log(`Backend has ${response.data.data?.length || 0} items, using dummy data for better variety`);
          setFoodlist(dummyFoodList);
        }
      } else {
        console.error("Failed to fetch food list:", response.data.message);
        console.log("Using dummy food data as fallback");
        setFoodlist(dummyFoodList);
      }
    } catch (error) {
      console.error("Error fetching food list:", error);
      console.log("Using dummy food data as fallback");
      setFoodlist(dummyFoodList);
    }
  };

  const fetchMenuList = async () => {
    try {
      const response = await axios.get(url + "/api/category/list");
      if (response.data.success) {
        // Map backend category data to the format expected by ExploreMenu
        const backendMenu = response.data.data.map(cat => ({
          menu_name: cat.name,
          menu_image: cat.image
        }));
        // Use backend data if available, otherwise use dummy data
        if (backendMenu && backendMenu.length > 0) {
          setMenulist(backendMenu);
        } else {
          console.log("No categories in backend, using dummy menu data");
          setMenulist(dummyMenuList);
        }
      } else {
        console.error("Failed to fetch menu list:", response.data.message);
        console.log("Using dummy menu data as fallback");
        setMenulist(dummyMenuList);
      }
    } catch (error) {
      console.error("Error fetching menu categories:", error);
      console.log("Using dummy menu data as fallback");
      setMenulist(dummyMenuList);
    }
  };

  const fetchSettings = async () => {
    try {
      const response = await axios.get(url + "/api/settings/get");
      if (response.data.success) {
        setSettings(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching settings:", error);
    }
  };

  const fetchUserData = async (token) => {
    try {
      const response = await axios.get(url + "/api/user/get", {
        headers: { token },
      });
      if (response.data.success) {
        setUserData(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const loadCardData = async (token) => {
    try {
      const response = await axios.get(url + "/api/cart/get", {
        headers: { token },
      });
      if (response.data && response.data.cartData) {
        setCartItems(response.data.cartData);
      }
    } catch (error) {
      console.error("Error loading cart data:", error);
    }
  };

  // Fetch global data once on mount
  useEffect(() => {
    async function loadGlobalData() {
      setIsLoading(true);
      setError(null);
      try {
        await Promise.all([
          fetchFoodList(),
          fetchMenuList(),
          fetchSettings()
        ]);
      } catch (error) {
        console.error("Error loading global data:", error);
        setError("An unexpected error occurred while loading menu data.");
      } finally {
        setIsLoading(false);
      }
    }
    loadGlobalData();
  }, []);

  // Fetch user data whenever token changes
  useEffect(() => {
    async function loadUserData() {
      if (token) {
        try {
          await Promise.all([
            loadCardData(token),
            fetchUserData(token)
          ]);
        } catch (error) {
          console.error("Error loading user data:", error);
        }
      } else {
        // Clear user data on logout
        setUserData(null);
        setCartItems({});
      }
    }
    loadUserData();
  }, [token]);


  const contextValue = {
    food_list,
    menu_list,
    settings,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    getTotalCartItems,
    url,
    token,
    setToken,
    userData,
    fetchUserData,
    isLoading, // Export isLoading
    error,     // Export error
  };
  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;

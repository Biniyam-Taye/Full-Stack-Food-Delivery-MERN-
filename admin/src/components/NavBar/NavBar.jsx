import React, { useEffect, useState } from "react";
import "./NavBar.css";
import { assets } from "../../assets/assets.js";
import axios from "axios";

const NavBar = ({ url: propUrl }) => {
  const [adminProfile, setAdminProfile] = useState("");
  const url = propUrl || (import.meta.env.VITE_BACKEND_URL || "http://localhost:4000").replace(/\/+$/, "");

  const fetchSettings = async () => {
    try {
      const response = await axios.get(`${url}/api/settings/get?t=${Date.now()}`);
      if (response.data.success) {
        if (response.data.data.adminProfile) {
          setAdminProfile(response.data.data.adminProfile);
        }
      }
    } catch (error) {
      console.error("Error fetching admin profile:", error);
    }
  };

  useEffect(() => {
    fetchSettings();

    const handleProfileUpdate = () => {
      fetchSettings();
    };

    window.addEventListener("adminProfileUpdate", handleProfileUpdate);

    return () => {
      window.removeEventListener("adminProfileUpdate", handleProfileUpdate);
    };
  }, []);

  return (
    <div className="navbar">
      <img className="logo" src={assets.logo} alt="" />
      <img className="profile" src={adminProfile || assets.profile_image} alt="" />
    </div>
  );
};

export default NavBar;

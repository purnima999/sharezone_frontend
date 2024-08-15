import React, { useEffect, useState } from "react";
import AllRoutes from "./routes";
import { useNavigate } from "react-router";
import { jwtDecode } from "jwt-decode";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'slick-carousel/slick/slick.css';
// import './sass/index.scss';
import './sass/index.scss'

export default function App() {
  const navigate = useNavigate();
  const [authenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(token ? true : false); // Update isAuthenticated based on the presence of the token

    try {
      if (token) {
        const decoded = jwtDecode(token);
        // Check if token is expired
        const currentTime = Date.now() / 1000;
        if (decoded?.exp < currentTime) {
          // Redirect to sign-up page if token is expired
          localStorage.clear();
          sessionStorage.clear();
          navigate("signin");
        }
      }
    } catch (error) {
      console.log("Error decoding token:", error);
      navigate("signin"); // Redirect to sign-in page if token decoding fails
    }
  }, [navigate]);

  return (
    <AllRoutes
      authenticated={authenticated}
      setIsAuthenticated={setIsAuthenticated}
    />
  );
}

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import endpoints from "./apiEndpoints";

const useCheckUserRole = (proceed) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkUserRole = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setLoading(false);
        
        navigate("/login");
        return;
      }

      try {
        const response = await fetch(endpoints.getUserWithToken, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (response.ok) {
          setUser(data.user);
          proceed(data.user); // Call the proceed function with the user data
        } else {
          alert("Invalid token. Please log in again.");
          navigate("/login");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    checkUserRole();
  }, [navigate, proceed]);

  return { loading, user };
};

export default useCheckUserRole;

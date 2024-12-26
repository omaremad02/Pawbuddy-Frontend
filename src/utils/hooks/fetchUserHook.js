import { useEffect, useState } from "react";
import endpoints from "../apiEndpoints";

const useUser = (onSuccess, onError) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        const error = new Error("Token is missing. Please log in.");
        setError(error);
        if (onError) onError(error);
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(endpoints.getUserWithToken, {
          method: "GET",
          headers: endpoints.getAuthHeader(),
        });

        const data = await response.json();

        if (response.ok) {
          setUser(data.user);
          if (onSuccess) onSuccess(data.user);
        } else {
          throw new Error(data.message || "Unauthorized access.");
        }
      } catch (err) {
        setError(err);
        if (onError) onError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser(); // Call the fetch function once
  }, []); // Empty dependency array ensures it runs only once

  return { user, error, loading };
};

export default useUser;

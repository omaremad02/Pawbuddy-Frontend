import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import endpoints from "../apiEndpoints";

const useUser = (onSuccess, onError) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        const error = new Error("Token is missing. Please log in.");
        setError(error);
        onError?.(error); // Call the error callback
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
          onSuccess?.(data.user); // Call the success callback with user data
        } else {
          throw new Error("Invalid token or unauthorized access.");
        }
      } catch (err) {
        setError(err);
        onError?.(err); // Call the error callback
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [navigate, onSuccess, onError]);

  return { user, error, loading };
};

export default useUser;

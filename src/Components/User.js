import { useState, useEffect } from "react";
import useAxiosPrivate from "./hooks/useAxiosPrivate";
import { useNavigate, useLocation } from "react-router-dom";
import useAuth from "./hooks/useAuth";
const Users = () => {
  const { auth } = useAuth();

  const [users, setUsers] = useState([]);
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    // Currently, accessing by entering admin url would redirect to home since auth accesstoken is not yet updated until after directing to login.
    // If we want to enter admin url without error, then we can use local storage to access token instead.
    const getUsers = async () => {
      try {
        console.log("Current access token:", auth.accessToken); // Log to check the token

        const response = await axiosPrivate.get("/users/", {
          signal: controller.signal, // For request cancellation
        });
        console.log(response.data);

        isMounted && setUsers(response.data);
      } catch (err) {
        console.error(err);
        navigate("/login", { state: { from: location }, replace: true });
      }
    };

    getUsers();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [axiosPrivate, navigate, location]);

  return (
    <article>
      <h2>Users List</h2>
      {users.length ? (
        <ul>
          {users.map((user, i) => (
            <li key={i}>{user.username}</li>
          ))}
        </ul>
      ) : (
        <p>No users to display</p>
      )}
    </article>
  );
};

export default Users;

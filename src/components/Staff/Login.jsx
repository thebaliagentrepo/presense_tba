import logo from "../../assets/logo.png";
import finger from "../../assets/finger.svg";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  if (isLoggedIn === true) {
    navigate("/presence");
  }

  const isTokenValid = (token) => {
    try {
      const decodedToken = JSON.parse(atob(token.split(".")[1]));
      const expirationTime = decodedToken.exp * 1000; // Convert expiration time to milliseconds
      return expirationTime > Date.now();
    } catch (error) {
      return false; // Invalid token format or parsing error
    }
  };

  useEffect(() => {
    // Check token validity when the component mounts
    const token = localStorage.getItem("token");
    if (token && isTokenValid(token)) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://nice-gold-kitten-tam.cyclic.app/api/login",
        {
          email,
          password,
        }
      );

      const token = response.data.accessToken;

      localStorage.setItem("token", token);
      navigate("/presence");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Email/Password Not Valid",
      });
    }
  };

  return (
    <>
      <div className="mt-[10%] sm:mt-20 font-poppins">
        <div>
          <div className="flex justify-center">
            <img src={logo} alt="logo" className="w-36" />
          </div>
          <div>
            <h2 className="text-center font-extrabold text-2xl">
              Login Presense
            </h2>
          </div>
          <div className="flex justify-center">
            <img src={finger} alt="finger" className="w-52 mt-10" />
          </div>

          <form className="mt-10" onSubmit={handleSubmit}>
            <div className="flex justify-center">
              <label className="block">
                <input
                  type="email"
                  className="shadow appearance-none border rounded w-[250px] py-2 px-3 text-gray-700 leading-tight"
                  id="username"
                  placeholder="Email"
                  onChange={handleEmailChange}
                  required
                />
              </label>
            </div>

            <div className="flex justify-center mt-2">
              <label className="block">
                <input
                  className="shadow appearance-none border rounded w-[250px] py-2 px-3 text-gray-700 leading-tight"
                  id="passsword"
                  type="password"
                  placeholder="Password"
                  onChange={handlePasswordChange}
                  required
                />
              </label>
            </div>
            <div className="flex justify-center mt-6">
              <button
                className="w-[150px] h-9 bg-[#279384] text-white rounded-lg "
                type="submit"
              >
                Login
              </button>
            </div>
            <div className="text-center mt-1">
              <Link
                to="/admin"
                className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
              >
                login as admin
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;

import logo from "../../assets/logo.png";
import img from "../../assets/Welcome.svg";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import Swal from "sweetalert2";

const Presence = () => {
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [decoded, setDecoded] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const [date, setDate] = useState("");
  const [desc, setDesc] = useState("");

  const currentDate = new Date();

  const options = {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
  };

  const date_fix = currentDate.toLocaleDateString("en-us", options);

  if (isLoggedIn === false) {
    navigate("/");
  }

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const isTokenValid = (token) => {
    try {
      const decodedToken = JSON.parse(atob(token.split(".")[1]));
      const expirationTime = decodedToken.exp * 1000; // Convert expiration time to milliseconds
      const storedToken = localStorage.getItem("token");
      const decodedTokens = jwt_decode(storedToken);
      setDecoded(decodedTokens);

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
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  let name_staff;
  let id_staff;
  let total_leave;
  if (decoded === null) {
    name_staff = "staff";
  } else {
    name_staff = decoded.name;
    id_staff = decoded.id;
    total_leave = decoded.value;
  }

  const logoutHandler = (e) => {
    e.preventDefault();

    localStorage.removeItem("token");

    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Log Out",
      showConfirmButton: false,
      timer: 1500,
    });

    navigate("/");
  };

  const presenceHandler = async () => {
    try {
      await axios.post("http://localhost:3000/api/presence", {
        userId: id_staff,
        value: 1,
      });

      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Your presence has been saved",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const addLeaveHandler = async (e) => {
    e.preventDefault();

    await axios.post("http://localhost:3000/api/infoleave", {
      userId: id_staff,
      desc: desc,
      date: date,
      status: 0,
    });

    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Thank You",
      showConfirmButton: false,
      timer: 1500,
    });

    handleCloseModal();
  };

  const dateHandler = (e) => {
    setDate(e.target.value);
  };

  const descHandler = (e) => {
    setDesc(e.target.value);
  };

  console.log(total_leave);

  return (
    <>
      <div className="mt-[10%] sm:mt-20 font-poppins">
        <div className="flex justify-center">
          <img src={logo} alt="logo" className="w-36" />
        </div>

        <h2 className="text-center font-bold text-2xl">
          Welcome, {name_staff}
        </h2>
      </div>
      <div className="flex justify-center">
        <img src={img} alt="finger" className="w-52 mt-10" />
      </div>
      <div className="mt-2">
        <p className="text-center">{date_fix}</p>
      </div>
      <div className="flex justify-center mt-4">
        <button
          className="w-[150px] h-9 bg-[#279384] text-white rounded-lg "
          onClick={presenceHandler}
        >
          Present
        </button>
      </div>
      <div className="flex justify-center mt-3">
        <button
          className="w-[150px] h-9 bg-[#FF7A00] text-white rounded-lg "
          onClick={handleOpenModal}
        >
          Apply for leave
        </button>
      </div>
      <div className="flex justify-center mt-3">
        <button
          className="w-[150px] h-9 bg-[#FF0000] text-white rounded-lg "
          onClick={logoutHandler}
        >
          Logout
        </button>
      </div>
      <div className="mt-2">
        <p className="text-center">Remaining day off : {total_leave}</p>
      </div>
      {modalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="fixed inset-0 bg-black opacity-50"></div>
          <div className="bg-white p-4 rounded shadow-md z-10">
            <h3 className="text-center font-semibold text-lg">Detail</h3>
            <div>
              <form onSubmit={addLeaveHandler}>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Pick Date
                </label>
                <input
                  type="date"
                  className="shadow appearance-none border rounded w-[250px] py-2 px-3 text-gray-700 leading-tight"
                  onChange={dateHandler}
                />
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Reason For Leave
                </label>
                <textarea
                  id="message"
                  rows="4"
                  className="block p-2.5 w-full text-sm rounded-lg border border-gray-300 "
                  placeholder="Write here...."
                  onChange={descHandler}
                ></textarea>

                <div className="mt-2">
                  <button
                    className="w-[70px] h-9 bg-[#279384] text-white rounded"
                    type="submit"
                  >
                    Confirm
                  </button>

                  <button
                    className="w-[70px] h-9 bg-[#FF0000] text-white rounded ml-2"
                    onClick={handleCloseModal}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
      );
    </>
  );
};

export default Presence;

import logo from "../../assets/logo.png";
import img from "../../assets/welcome.svg";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import Swal from "sweetalert2";
import Select from "react-select";
import moment from "moment";
import Loading from "../UI/Loading";

const Presence = () => {
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [decoded, setDecoded] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalInfo, setModalInfo] = useState(false);

  const [date, setDate] = useState("");
  const [desc, setDesc] = useState("");

  const [buttonPresence, setButtonPresence] = useState(false);

  const [optionLeave, setOptionLeave] = useState("");

  const [dataLeave, setDataLeave] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  const optionsLeave = [
    { value: "H", label: "Holiday" },
    { value: "S", label: "Sick" },
  ];

  const currentDate = new Date();

  const options = {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
  };

  const month_api = currentDate.getMonth();
  const day_api = currentDate.getDate();

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
  let id_staff_db;
  if (decoded === null) {
    name_staff = "staff";
  } else {
    name_staff = decoded.name;
    id_staff = decoded.order;
    id_staff_db = decoded.id;
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
    setIsLoading(true);
    try {
      await axios.post(
        `${import.meta.env.VITE_LINK_API}/api/v1/test/${id_staff}`,
        {
          month: month_api + 1,
          day: day_api,
          value: "1",
        }
      );

      await axios.post(`${import.meta.env.VITE_LINK_API}/api/presence`, {
        userId: id_staff_db,
        value: 1,
      });

      setButtonPresence(true);
      setIsLoading(false);
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Your presence has been saved",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  const addLeaveHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    await axios.post(`${import.meta.env.VITE_LINK_API}/api/infoleave`, {
      userId: id_staff_db,
      desc: desc,
      date: date,
      status: false,
      value: optionLeave,
    });
    setIsLoading(false);

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

  const getPersonalPresence = async () => {
    const data_today = await axios.get(
      `${
        import.meta.env.VITE_LINK_API
      }/api/v1/check-presence/${id_staff}?months=${
        month_api + 1
      }&day=${day_api}`
    );

    setButtonPresence(data_today.data);
  };

  getPersonalPresence();

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_LINK_API}/api/info-leave/${id_staff_db}`)
      .then((response) => {
        setDataLeave(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [modalInfo]);

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
        {buttonPresence ? (
          <button
            className="w-[150px] h-9 bg-[#279384] text-white rounded-lg disabled:opacity-50"
            disabled
            onClick={presenceHandler}
          >
            Present
          </button>
        ) : (
          <button
            className="w-[150px] h-9 bg-[#279384] text-white rounded-lg "
            onClick={presenceHandler}
          >
            Present
          </button>
        )}
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
      {/* <div className="mt-2">
        <p className="text-center">Remaining day off : {total_leave}</p>
      </div> */}
      <div className="static">
        <div className="absolute top-0 right-0 p-2">
          <button
            className="px-3 py-2h-9 bg-sky-600 text-white rounded-lg w-[35px] h-[35px] font-bold"
            onClick={(e) => setModalInfo(true)}
          >
            i
          </button>
        </div>
      </div>

      {modalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="fixed inset-0 bg-black opacity-50"></div>
          <div className="bg-white p-4 rounded shadow-md z-10">
            <h3 className="text-center font-semibold text-lg">Detail</h3>
            <div>
              <form onSubmit={addLeaveHandler}>
                <label className="block text-gray-700 text-sm font-bold mb-1">
                  Pick Date
                </label>
                <input
                  type="date"
                  className="shadow appearance-none border rounded w-[350px] py-2 px-3 text-gray-700 leading-tight"
                  onChange={dateHandler}
                />
                <label className="block text-gray-700 text-sm font-bold mb-1 mt-3">
                  Select Options
                </label>
                <Select
                  options={optionsLeave}
                  className="w-[350px]"
                  onChange={(e) => setOptionLeave(e.value)}
                />
                <label className="block text-gray-700 text-sm font-bold mb-1 mt-3">
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

      {modalInfo && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="fixed inset-0 bg-black opacity-50"></div>
          <div className="bg-white p-4 rounded shadow-md z-10">
            <h3 className="text-center font-semibold text-lg">Info</h3>
            <div>
              <div>
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 table-auto">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th scope="col" className="px-6 py-3">
                        No
                      </th>
                      <th scope="col" className="px-6 py-3">
                        date
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Category
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {dataLeave.map((item, index) => (
                      <tr
                        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                        key={item.id}
                      >
                        <th
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                          {index + 1}
                        </th>
                        <td className="px-6 py-4">
                          {moment(item.date).format("DD-MM-YYYY")}
                        </td>
                        <td className="px-6 py-4">{item.value}</td>

                        {item.status ? (
                          <td className="px-6 py-4">Approve</td>
                        ) : (
                          <td className="px-6 py-4">Waiting</td>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-2">
                <button
                  className="w-[70px] h-9 bg-[#FF0000] text-white rounded"
                  onClick={(e) => setModalInfo(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <Loading loading={isLoading} />
    </>
  );
};

export default Presence;

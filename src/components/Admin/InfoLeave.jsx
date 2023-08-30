import AdminLayout from "./AdminLayout";
import { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import Swal from "sweetalert2";

const Infoleave = () => {
  const [data, setData] = useState([]);
  const [buttonPresence, setButtonPresence] = useState(false);
  const [idUser, setIdUser] = useState(0);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/infoleave")
      .then((response) => {
        setData(response.data.data);
        setIdUser(response.data.data.user.id);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  useEffect(() => {
    getPersonalPresence();
    console.log("hello2");
  }, [data, idUser]);

  const getPersonalPresence = async () => {
    console.log("hello");
    const data_today = await axios.post(
      `http://localhost:3000/api/v1/check-presence/${idUser}`,
      {
        month: month_api + 1,
        day: day_api + 1,
      }
    );

    if (data_today) {
      setButtonPresence(true);
    }
  };

  const approve_function = async (id, id_user, e) => {
    e.preventDefault;

    const currentDate = new Date();

    const month_api = currentDate.getMonth();
    const day_api = currentDate.getDate();

    console.log(id_user);
    try {
      await axios.put(`http://localhost:3000/api/infoleave/${id}`, {
        status: 1,
      });

      await axios.post(`http://localhost:3000/api/v1/test/${id_user}`, {
        month: month_api + 1,
        day: day_api + 1,
        value: "H",
      });

      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Your work has been saved",
        showConfirmButton: false,
        timer: 1500,
      });

      setTimeout(() => {
        window.location.reload();
      }, 1501);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(buttonPresence);

  return (
    <>
      <AdminLayout>
        <h3 className="text-center font-semibold text-2xl">
          Management Info Leave
        </h3>
        <div className="mt-5">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 table-auto">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  No
                </th>
                <th scope="col" className="px-6 py-3">
                  Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Leave Date
                </th>
                <th scope="col" className="px-6 py-3">
                  Description for leaving
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
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
                  <td className="px-6 py-4">{item.user.name}</td>
                  <td className="px-6 py-4">
                    {moment(item.date).format("DD-MM-YYYY")}
                  </td>
                  <td className="px-6 py-4">{item.desc}</td>
                  <td className="px-6 py-7">
                    <button
                      className="w-[150px] h-9 bg-[#279384] text-white rounded-lg "
                      onClick={(e) =>
                        approve_function(item.id, item.user.id, e)
                      }
                    >
                      Approve
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </AdminLayout>
    </>
  );
};

export default Infoleave;

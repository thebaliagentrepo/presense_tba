import AdminLayout from "./AdminLayout";
import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const UserManagement = () => {
  const [data, setData] = useState([]);

  const [id, setId] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [showModalEdit, setShowModalEdit] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const [emailEdit, setEmailEdit] = useState("");
  const [nameEdit, setNameEdit] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/allusers")
      .then((response) => {
        setData(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const changeModalState = () => {
    setShowModal((state) => !state);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const addUserHandler = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3000/api/user", {
        email,
        password,
        name,
      });

      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Add Staff",
        showConfirmButton: false,
        timer: 1500,
      });

      setTimeout(() => {
        window.location.reload();
      }, 1501);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Email/Password Not Valid",
      });
    }
  };

  const changeModals = (number) => {
    setShowModalEdit(true);
    const filter = data.filter((dt) => dt.id == number);
    setEmailEdit(filter[0].email);
    setNameEdit(filter[0].name);
    setId(filter[0].id);
  };

  const editDataStaff = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`http://localhost:3000/api/user/${id}`, {
        email: emailEdit,
        name: nameEdit,
      });

      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Update Success",
        showConfirmButton: false,
        timer: 1500,
      });

      setTimeout(() => {
        window.location.reload();
      }, 1501);
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
      <AdminLayout>
        <h3 className="text-center font-semibold text-2xl">Management User</h3>
        <div className="mt-5">
          <div>
            <button
              className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mb-5"
              onClick={changeModalState}
            >
              Add User
            </button>
          </div>
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
                  Email
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
                  <td className="px-6 py-7">{item.name}</td>
                  <td className="px-6 py-4">{item.email}</td>
                  <td className="px-6 py-7">
                    <button onClick={() => changeModals(item.id)}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                        />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {showModal ? (
          <>
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
              <div className="relative w-auto my-6 mx-auto max-w-3xl">
                {/*content*/}
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                  {/*header*/}
                  <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                    <h3 className="text-3xl font-semibold">Add Staff</h3>
                    <button
                      className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                      onClick={() => setShowModal(false)}
                    >
                      <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                        ×
                      </span>
                    </button>
                  </div>
                  {/*body*/}
                  <div className="relative p-6 flex-auto">
                    <form className="mt-10" onSubmit={addUserHandler}>
                      <div className="flex justify-center">
                        <label className="block">
                          <input
                            type="text"
                            className="shadow appearance-none border rounded w-[350px] py-2 px-3 text-gray-700 leading-tight"
                            id="username"
                            placeholder="name"
                            onChange={handleNameChange}
                            required
                          />
                        </label>
                      </div>

                      <div className="flex justify-center mt-2">
                        <label className="block">
                          <input
                            type="email"
                            className="shadow appearance-none border rounded w-[350px] py-2 px-3 text-gray-700 leading-tight"
                            id="email"
                            placeholder="Email"
                            onChange={handleEmailChange}
                            required
                          />
                        </label>
                      </div>

                      <div className="flex justify-center mt-2">
                        <label className="block">
                          <input
                            className="shadow appearance-none border rounded w-[350px] py-2 px-3 text-gray-700 leading-tight"
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
                          Add Staff
                        </button>
                      </div>
                    </form>
                  </div>
                  {/*footer*/}
                  <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                    <button
                      className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => setShowModal(false)}
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
          </>
        ) : null}
        {showModalEdit ? (
          <>
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
              <div className="relative w-auto my-6 mx-auto max-w-3xl">
                {/*content*/}
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                  {/*header*/}
                  <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                    <h3 className="text-3xl font-semibold">Edit Staff</h3>
                    <button
                      className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                      onClick={() => setShowModalEdit(false)}
                    >
                      <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                        ×
                      </span>
                    </button>
                  </div>
                  {/*body*/}
                  <div className="relative p-6 flex-auto">
                    <form className="mt-10" onSubmit={editDataStaff}>
                      <div className="flex justify-center">
                        <label className="block">
                          <input
                            type="text"
                            className="shadow appearance-none border rounded w-[350px] py-2 px-3 text-gray-700 leading-tight"
                            id="usernameEdit"
                            placeholder="name"
                            value={nameEdit}
                            onChange={(e) => setNameEdit(e.target.value)}
                            required
                          />
                        </label>
                      </div>

                      <div className="flex justify-center mt-2">
                        <label className="block">
                          <input
                            type="email"
                            className="shadow appearance-none border rounded w-[350px] py-2 px-3 text-gray-700 leading-tight"
                            id="emailEdit"
                            placeholder="Email"
                            value={emailEdit}
                            onChange={(e) => setEmailEdit(e.target.value)}
                            required
                          />
                        </label>
                      </div>

                      <div className="flex justify-center mt-6">
                        <button
                          className="w-[150px] h-9 bg-[#279384] text-white rounded-lg "
                          type="submit"
                        >
                          Edit
                        </button>
                      </div>
                    </form>
                  </div>
                  {/*footer*/}
                  <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                    <button
                      className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => setShowModalEdit(false)}
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
          </>
        ) : null}
      </AdminLayout>
    </>
  );
};

export default UserManagement;

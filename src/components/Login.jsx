import logo from "../../public/logo.png";
import finger from "../../public/finger.svg";

const Login = () => {
  return (
    <>
      <div className="mt-[20%]">
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

          <form className="mt-10">
            <div className="flex justify-center">
              <label className="block">
                <input
                  type="email"
                  className="shadow appearance-none border rounded w-[250px] py-2 px-3 text-gray-700 leading-tight"
                  id="username"
                  placeholder="Email"
                  required
                />
              </label>
            </div>

            <div className="flex justify-center mt-2">
              <label className="block">
                <input
                  className="shadow appearance-none border rounded w-[250px] py-2 px-3 text-gray-700 leading-tight"
                  id="username"
                  type="password"
                  placeholder="Password"
                />
              </label>
            </div>
            <div className="flex justify-center mt-6">
              <button className="w-[150px] h-9 bg-[#279384] text-white rounded-lg ">
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;

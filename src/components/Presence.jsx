import logo from "../assets/logo.png";
import img from "../assets/Welcome.svg";

const Presence = () => {
  return (
    <>
      <div className="mt-[10%] sm:mt-20 font-poppins">
        <div className="flex justify-center">
          <img src={logo} alt="logo" className="w-36" />
        </div>

        <h2 className="text-center font-bold text-2xl">Welcome, Wilan</h2>
      </div>
      <div className="flex justify-center">
        <img src={img} alt="finger" className="w-52 mt-10" />
      </div>
      <div className="mt-2">
        <p className="text-center">Monday, 14 August 2023</p>
      </div>
      <div className="flex justify-center mt-4">
        <button className="w-[150px] h-9 bg-[#279384] text-white rounded-lg ">
          Present
        </button>
      </div>
      <div className="flex justify-center mt-3">
        <button className="w-[150px] h-9 bg-[#FF7A00] text-white rounded-lg ">
          Apply for leave
        </button>
      </div>
      <div className="mt-2">
        <p className="text-center">Remaining day off :10</p>
      </div>
    </>
  );
};

export default Presence;

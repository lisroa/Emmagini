import { SlClose } from "react-icons/sl";
import { BsGift } from "react-icons/bs";
import { BsCartCheck } from "react-icons/bs";
import { AiOutlineTrophy } from "react-icons/ai";
import { FaRegUserCircle } from "react-icons/fa";
import { AiOutlineArrowRight } from "react-icons/ai";
import { useDataFrontContext } from "../../context/FrontProvider";

function SideMenu() {
  const { sideMenuOpen, setSideMenuOpen } = useDataFrontContext();

  return (
    <>
      {sideMenuOpen && (
        <div className="bg-cyan-500 min-h-screen w-96 fixed top-16 right-0 p-2 flex flex-col items-center bg-gray-600/50 backdrop-blur-sm z-50 transition-all duration-300">
          <div className="absolute top-4 right-4">
            <button
              className="rounded-full bg-red-500 mr-4"
              style={{ backgroundColor: "red" }}
              onClick={() => {
                setSideMenuOpen(false);
              }}
            >
              <SlClose className="text-white" size={35} />
            </button>
          </div>

          <div className="mt-20">
            <button className=" flex items-center justify-between w-full sm:w-[323px] h-12 bg-white text-blueEmmagini mt-4 rounded-[50px] px-4">
              <div className="flex items-center">
                <AiOutlineTrophy className="mr-2" />
                <span className="text-black ml-2 font-bold text-sm">
                  Premium
                </span>
              </div>
              <AiOutlineArrowRight />
            </button>
            <button className="flex items-center justify-between w-full sm:w-[323px] h-12 bg-white text-blueEmmagini mt-4 rounded-[50px] px-4">
              <div className="flex items-center">
                <BsGift className="mr-2" />
                <span className="text-black ml-2 font-bold text-sm">
                  Subastas
                </span>
              </div>
              <AiOutlineArrowRight />
            </button>
            <button className="flex items-center justify-between w-full sm:w-[323px] h-12 bg-white text-blueEmmagini mt-4 rounded-[50px] px-4">
              <div className="flex items-center">
                <BsCartCheck className="mr-2" />
                <span className="text-black ml-2 font-bold text-sm">
                  Compras
                </span>
              </div>
              <AiOutlineArrowRight />
            </button>
            <button className="flex items-center justify-between w-full sm:w-[323px] h-12 bg-white text-blueEmmagini mt-4 rounded-[50px] px-4">
              <div className="flex items-center">
                <FaRegUserCircle className="mr-2" />
                <span className="text-black ml-2 font-bold text-sm">
                  Perfil
                </span>
              </div>
              <AiOutlineArrowRight />
            </button>
          </div>

          <div className="mx-auto absolute bottom-28 inset-x-0 ml-10">
            <button className="w-full sm:w-[323px] h-12 bg-red mt-4 rounded-[50px] border-4 border-gray-500">
              <span className="text-base font-bold">Cerrar sesión</span>
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default SideMenu;

/*


 <>
      <div
        className={`${
          open ? "w-80" : "w-0"
        } bg-gray-600/50  backdrop-blur-sm min-h-screen fixed top-0 right-0 transition-all duration-300`}
      >
        <div className={`${!open && "hidden"} pt-3`}>
          <button
            className="ml-4 text-white mb-14 mt-10"
            onClick={() => setSideMenuOpen(false)}
          >
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
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          <div className="text-center text-white text-xl hover:bg-orange-400 cursor-pointer py-3 mb-2">
            Link 1
          </div>
          <div className="text-center text-white text-xl hover:bg-orange-400 cursor-pointer py-3 mb-2">
            Link 2
          </div>
          <div className="text-center text-white text-xl hover:bg-orange-400 cursor-pointer py-3 mb-2">
            Link 3
          </div>
          <div className="text-center text-white text-xl hover:bg-orange-400 cursor-pointer py-3 mb-2">
            Link 4
          </div>
          <div className="text-center text-white text-xl hover:bg-orange-400 cursor-pointer py-3 mb-2">
            Link 5
          </div>
        </div>
      </div>
    </>












        */

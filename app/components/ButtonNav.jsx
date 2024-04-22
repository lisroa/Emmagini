import Link from "next/link";
import { BsGift } from "react-icons/bs";
import { BsCartCheck } from "react-icons/bs";
import { AiOutlineTrophy } from "react-icons/ai";

function ButtonNav() {
  return (
    <div className="fixed bottom-5 left-1/2 transform -translate-x-1/2">
      <div className="flex justify-center gap-10 px-7 py-2 bg-blue mt-4 rounded-full border-4 border-gray-100 shadow-xl">
        <Link href="#" className='flex flex-1 items-center justify-center'>
          <button className="flex flex-col items-center justify-center w-full h-full rounded-xl p-1 hover:bg-sky-700">
            <div className="flex flex-col items-center">
              <BsGift size={18} />
              <span className="mt-1 text-md">Subasta</span>
            </div>
          </button>
        </Link>

        <Link href="#" className='flex flex-1 items-center justify-center'>
          <button className="flex flex-col items-center justify-center w-full h-full rounded-xl p-1 hover:bg-sky-700">
            <div className="flex flex-col items-center">
              <BsCartCheck size={18} />
              <span className="mt-1 text-md">Comprar</span>
            </div>
          </button>
        </Link>

        <Link href="#" className='flex flex-1 items-center justify-center'>
          <button className="flex flex-col items-center justify-center w-full h-full rounded-xl p-1 hover:bg-sky-700">
            <div className="flex flex-col items-center">
              <AiOutlineTrophy size={18} />
              <span className="mt-1 text-md text-center">Premium</span>
            </div>
          </button>
        </Link>
      </div>
    </div>
  );
}

export default ButtonNav;

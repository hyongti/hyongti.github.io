import { ChevronDownIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { useState } from "react";
import Navlinks from "./Navlinks";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  return (
    // TODO: 애니메이션 개선 필요
    <header className={`sticky top-0 left-0 w-full bg-white opacity-80`}>
      <div className="w-full sm:px-6 grid grid-cols-3 items-center relative h-16">
        <Link href="/" className="mx-2 font-extralight text-xl">
          hyongti
        </Link>
        <div className="sm:hidden flex justify-center">
          <button onClick={() => setOpen(!open)}>
            <ChevronDownIcon
              className={`w-4 h-4 text-black ${
                open ? "-rotate-180" : "rotate-0"
              } transition-transform`}
            />
          </button>
        </div>
        <div className="hidden sm:inline">
          <Navlinks />
        </div>
      </div>
      {open && (
        <div className="absolute h-8 w-full flex justify-center items-center sm:hidden bg-white opacity-80">
          <Navlinks />
        </div>
      )}
    </header>
  );
};

export default Navbar;

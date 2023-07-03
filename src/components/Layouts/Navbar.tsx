import { ChevronDownIcon } from "@heroicons/react/24/solid";
import navlinks from "const/navlinks";
import useScrollDirection from "hooks/useScrollDirection";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { pathname } = useRouter();
  // const { direction } = useScrollDirection();

  return (
    <header
      className={`fixed top-0 left-0 w-full ${
        open ? "translate-y-0 sm:-translate-y-1/2" : "-translate-y-1/2"
      } h-32 bg-white opacity-80 transition-transform sm:overflow-y-hidden`}
    >
      <nav className="relative grid h-full w-full grid-cols-3 grid-rows-2 items-center px-2">
        <Link
          href="/"
          className="row-start-2 w-fit translate-x-0 text-xl font-extralight transition-transform duration-300 sm:translate-x-6"
        >
          hyongti
        </Link>
        <div className="relative row-start-2 h-full w-full">
          <div className="absolute top-0 left-0 flex h-[200%] w-full -translate-y-1/2 flex-col justify-center transition-transform sm:translate-y-0">
            <ul className="flex h-full items-center justify-center gap-5 text-xs font-semibold">
              {navlinks.map((nav) => (
                <li key={nav.title}>
                  <Link
                    href={nav.link}
                    className={`${
                      pathname.includes(nav.link) ? "text-red-500" : ""
                    } transition-colors hover:text-red-500`}
                  >
                    {nav.title}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="flex h-full items-center justify-center opacity-100 transition-opacity sm:opacity-0">
              <button onClick={() => setOpen(!open)}>
                <ChevronDownIcon
                  className={`h-4 w-4 text-black ${
                    open ? "-rotate-180" : "rotate-0"
                  } transition-transform`}
                />
              </button>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;

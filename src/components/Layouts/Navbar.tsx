import { ChevronDownIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';
import { useState } from 'react';
import Navlinks from './Navlinks';
import useIsBreakPoint from 'hooks/useIsBreakPoint';

const Navbar = () => {
  const isMobile = useIsBreakPoint();

  const [open, setOpen] = useState(false);

  return (
    // TODO: 애니메이션 개선 필요

    <header className={`sticky top-0 left-0 w-full bg-white opacity-80`}>
      <nav className="w-full grid grid-cols-3 items-center relative h-16 px-2">
        <Link
          href="/"
          className="font-extralight text-xl translate-x-0 transition-transform sm:translate-x-6 duration-300"
        >
          hyongti
        </Link>
        <div className="sm:hidden flex justify-center">
          <button onClick={() => setOpen(!open)}>
            <ChevronDownIcon
              className={`w-4 h-4 text-black ${
                open ? '-rotate-180' : 'rotate-0'
              } transition-transform`}
            />
          </button>
        </div>
        <div className="hidden sm:inline">
          <Navlinks />
        </div>
      </nav>
      {open && (
        <div className="absolute h-8 w-full flex justify-center items-center sm:hidden bg-white opacity-80">
          <Navlinks />
        </div>
      )}
    </header>
  );
};

export default Navbar;

import navlinks from "const/navlinks";
import Link from "next/link";
import { useRouter } from "next/router";

const Navlinks = () => {
  const { pathname } = useRouter();

  console.log(pathname);
  return (
    <ul className="flex justify-center items-center gap-5 text-xs font-semibold">
      {navlinks.map((nav) => (
        <Link
          href={nav.link}
          key={nav.title}
          className={`${
            pathname === nav.link ? "text-red-500" : ""
          } hover:text-red-500 transition-colors`}
        >
          {nav.title}
        </Link>
      ))}
    </ul>
  );
};

export default Navlinks;

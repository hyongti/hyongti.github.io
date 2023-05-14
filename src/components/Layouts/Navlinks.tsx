import navlinks from 'const/navlinks';
import Link from 'next/link';

const Navlinks = () => {
  return (
    <ul className="flex justify-center items-center gap-5 text-xs font-semibold">
      {navlinks.map((nav) => (
        <Link href={nav.link} key={nav.title}>
          {nav.title}
        </Link>
      ))}
    </ul>
  );
};

export default Navlinks;

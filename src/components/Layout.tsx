import Head from "next/head";
import Nav from "./Nav";
import metadata from "data/metadats";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={`w-full flex flex-col items-center p-3`}>
      <Head>
        <title>{metadata.title}</title>
        <link rel="icon" href="/logo.jpg" />
      </Head>
      <header
        className={`w-full max-w-3xl flex flex-row justify-between items-center my-1`}
      >
        <div className={`flex flex-row items-center`}>
          <span className={`mx-2 font-extralight text-lg`}>
            {metadata.title}
          </span>
        </div>
        <Nav />
      </header>
      <main className={`w-full max-w-3xl`}>{children}</main>
    </div>
  );
};

export default Layout;

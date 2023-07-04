import Head from "next/head";
import Navbar from "./Navbar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative flex h-screen w-screen flex-col items-center gap-8">
      <Head>
        <title>hyongti 블로그</title>
        <link rel="icon" href="/logo.jpg" />
      </Head>
      <Navbar />
      <main className="w-full p-3 pt-28">{children}</main>
    </div>
  );
};

export default Layout;

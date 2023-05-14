import Head from 'next/head';
import Navbar from './Navbar';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={`w-full flex flex-col items-center`}>
      <Head>
        <title>hyongti 블로그</title>
        <link rel="icon" href="/logo.jpg" />
      </Head>
      <Navbar />
      <main className="p-3">{children}</main>
    </div>
  );
};

export default Layout;

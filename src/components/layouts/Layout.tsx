import Head from "next/head";
import Navbar from "./Navbar";
import SEO from "components/SEO";
import { GA_ID } from "lib/gtag";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative flex h-screen w-screen flex-col items-center gap-8">
      <Head>
        <link rel="icon" href="/logo.jpg" />
        {GA_ID && (
          <>
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
            />
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${GA_ID}');
                `,
              }}
            />
          </>
        )}
      </Head>
      <SEO />
      <Navbar />
      <main className="w-full p-3 pt-28">{children}</main>
    </div>
  );
};

export default Layout;

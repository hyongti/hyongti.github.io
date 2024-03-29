import "styles/globals.css";

import { AppProps } from "next/app";
import Layout from "components/layouts/Layout";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
};

export default App;

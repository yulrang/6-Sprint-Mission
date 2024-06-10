import type { AppProps } from "next/app";
import "src/style/style.scss";

import Layout from "./layout";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

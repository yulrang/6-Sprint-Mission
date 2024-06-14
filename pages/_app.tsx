import type { AppProps } from "next/app";
import "src/styles/style.scss";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div>
      <Component {...pageProps} />
    </div>
  );
}

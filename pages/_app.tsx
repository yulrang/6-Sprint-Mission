import { AuthProvider } from "@/src/contexts/AuthProvider";
import type { AppProps } from "next/app";
import "@/src/styles/style.scss";
import { NextUIProvider } from "@nextui-org/react";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <NextUIProvider>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </NextUIProvider>
  );
}

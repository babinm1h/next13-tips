import ReactQueryWrapper from "@components/ReactQueryWrapper/ReactQueryWrapper";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ReactQueryWrapper>
      <Component {...pageProps} />
    </ReactQueryWrapper>
  );
}

import type { AppProps } from "next/app";

import { ConfigProvider } from "contexts/ConfigContext";

import GlobalStyles from "styles/global";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ConfigProvider>
      <GlobalStyles />
      <Component {...pageProps} />
    </ConfigProvider>
  );
}

export default MyApp;

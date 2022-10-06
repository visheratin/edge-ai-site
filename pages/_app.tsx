import type { AppProps } from "next/app";
import Layout from "../components/layout";
import "@datadog/browser-logs/bundle/datadog-logs";
import { useEffect } from "react";
import Head from "next/head";

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    window.DD_LOGS.init({
      clientToken: "pub1df46ecb733718bfa44a66ec0e6a5723",
      site: "datadoghq.com",
      forwardErrorsToLogs: true,
      silentMultipleInit: true,
      sampleRate: 100,
    });
  });

  return (
    <Layout>
      <Head>
        <link rel="shortcut icon" href="/favicon.ico" />
      </Head>
      <Component {...pageProps} />
    </Layout>
  );
}
export default MyApp;

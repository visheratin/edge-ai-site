// @ts-nocheck
import type { AppProps } from "next/app";
import Layout from "../components/layout";
import "@datadog/browser-logs/bundle/datadog-logs";
import { useEffect } from "react";
import Head from "next/head";

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    window.DD_LOGS.init({
      clientToken: "pubbcec946de66758406c3148a041c25dde",
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

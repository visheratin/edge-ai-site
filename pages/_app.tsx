import type { AppProps } from 'next/app'
import Layout from '../components/layout'
import '@datadog/browser-logs/bundle/datadog-logs'
import { useEffect } from 'react'

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    window.DD_LOGS.init({
      clientToken: 'pub1df46ecb733718bfa44a66ec0e6a5723',
      site: 'datadoghq.com',
      forwardErrorsToLogs: true,
      sampleRate: 100,
    })
    console.log("Initialized Datadog")
  })

  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}
export default MyApp

import type { AppProps } from 'next/app'
import Layout from '../components/layout'
import { ORTSessionProvider } from '../components/sessionContext'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <ORTSessionProvider>
        <Component {...pageProps} />
      </ORTSessionProvider>
    </Layout>
  )
}
export default MyApp

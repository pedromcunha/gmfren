import 'fonts/inter.css'
import type { AppProps } from 'next/app'
import { ThemeProvider } from 'next-themes'
import { darkTheme, globalStyles } from 'stitches.config'
import { createClient, configureChains, WagmiConfig, chain } from 'wagmi'
import { publicProvider } from 'wagmi/providers/public'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { RecoilRoot } from 'recoil'

const { chains } = configureChains([chain.kovan], [publicProvider()])

const client = createClient({
  autoConnect: true,
  connectors: [
    new InjectedConnector({
      chains,
      options: {
        name: 'Injected',
        shimDisconnect: true,
      },
    }),
  ],
})

function MyApp({ Component, pageProps }: AppProps) {
  globalStyles()

  return (
    <RecoilRoot>
      <WagmiConfig client={client}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          value={{
            dark: darkTheme.className,
            light: 'light',
          }}
        >
          <Component {...pageProps} />
        </ThemeProvider>
      </WagmiConfig>
    </RecoilRoot>
  )
}

export default MyApp

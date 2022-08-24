import '@rainbow-me/rainbowkit/styles.css'
import '@zoralabs/zord/index.css'
import 'styles/global.css'
import 'react-toastify/dist/ReactToastify.css';
import 'degen/styles'

import { getDefaultWallets, RainbowKitProvider, lightTheme } from '@rainbow-me/rainbowkit'
import { configureChains, createClient, WagmiConfig, allChains } from 'wagmi'
import { publicProvider } from 'wagmi/providers/public'
import { ThemeProvider } from 'degen'
import ERC721DropContractProvider from 'providers/ERC721DropProvider'
import { ToastContainer } from 'react-toastify';

const { chains, provider } = configureChains(
  [
    allChains.find(
      (chain) => chain.id.toString() === process.env.NEXT_PUBLIC_CHAIN_ID
    )
  ],
  [ publicProvider()]
)

const { connectors } = getDefaultWallets({
  appName: 'Zora Create',
  chains,
})

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
})

function App({ Component, pageProps }) {
  return (
    <ThemeProvider defaultMode="dark" defaultAccent="yellow">
      <WagmiConfig client={wagmiClient}>
        <RainbowKitProvider
          chains={chains}
          theme={lightTheme({
            accentColor: 'black',
            borderRadius: 'small',
          })}
        >
          <ERC721DropContractProvider
                erc721DropAddress={process.env.NEXT_PUBLIC_CONTRACT_ADDRESS}
                chainId={parseInt(process.env.NEXT_PUBLIC_CHAIN_ID)}
              >            
              <Component {...pageProps} />
          </ERC721DropContractProvider>
          <ToastContainer />
        </RainbowKitProvider>
      </WagmiConfig>    
    </ThemeProvider>
  )
}

export default App

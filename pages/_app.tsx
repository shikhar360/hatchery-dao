import "../styles/globals.css";
import type { AppProps } from "next/app";
import Navbar from "../components/Navbar";
// import "@rainbow-me/rainbowkit/styles.css";
// import {
//   getDefaultWallets,
//   RainbowKitProvider,
//   darkTheme,
//   lightTheme,
// } from "@rainbow-me/rainbowkit";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import {
  filecoinHyperspace
} from "wagmi/chains";
// import { publicProvider } from "wagmi/providers/public";
import { ConnectKitProvider, ConnectKitButton, getDefaultClient } from "connectkit";

// const { chains, provider } = configureChains(
//   [filecoinHyperspace],
//   [publicProvider()]
// );
// const { connectors } = getDefaultWallets({
//   appName: "HatcheryDAO",
//   chains,
// });
// const wagmiClient = createClient({
//   autoConnect: true,
//   connectors,
//   provider,
// });
const chains = [filecoinHyperspace]
const client = createClient(
  getDefaultClient({
    appName: "HatcheryDAO",
    chains,
  }),
);

export default function App({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig client={client}>
      <ConnectKitProvider>
        <Navbar />
        <Component {...pageProps} />
      </ConnectKitProvider>
    </WagmiConfig>
  );
}


import "../styles/globals.css";
import type { AppProps } from "next/app";
import Navbar from "../components/Navbar";

import {  createClient, WagmiConfig } from "wagmi";
import {
  filecoinHyperspace
} from "wagmi/chains";

import { ConnectKitProvider,  getDefaultClient } from "connectkit";


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


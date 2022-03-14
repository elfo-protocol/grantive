// import { WalletAdapterNetwork } from '@solana/wallet-adapter-base'

import * as anchor from '@project-serum/anchor';

const { PublicKey } = anchor.web3;

export const GRANTIVE_PROGRAM_ID = new PublicKey(
    'BydUvE2y1jF3q6CozVgigi2gE7FF3L7tosd9Zmwh9n4n'
);
export const GRANTIVE_STATE = new PublicKey(
    '9VgbwcqirUzeCj7sPYxckZtnzYfMvxkjiAaihj13pjhT'
);
export const DEFAULT_USDC_MINT = new PublicKey(
    '3qzpQ72TdVWpUirUaDV1yvwb1nLHkuY22Z3X3u2VRZ43'
);
export const MINT_DECIMALS = 6;

// export const ENDPOINT = clusterApiUrl(WalletAdapterNetwork.Devnet);

export const ENDPOINT = 'http://127.0.0.1:8899';
export const PREFLIGHT_COMMITMENT = 'processed';

export const ARWEAVE_NODE = '54.221.41.69';

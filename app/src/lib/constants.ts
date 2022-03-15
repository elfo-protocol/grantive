import * as anchor from '@project-serum/anchor';

const { PublicKey, clusterApiUrl } = anchor.web3;

export const GRANTIVE_PROGRAM_ID = new PublicKey(
    '3y7WPpgD3Doo7rubLNB2fP8EscwZib3toWABC4tXwaqz'
);
export const GRANTIVE_STATE = new PublicKey(
    '6jkCQG7DZu9evvHJwrxQw5sosbGVk1vyL2Be8FZwmTF5'
);
export const DEFAULT_USDC_MINT = new PublicKey(
    'DaCWEs6Aofd2Re2WQnZUATRMr2NJv5YRxwo94dH7GYWj'
);
export const MINT_DECIMALS = 6;

export const ENDPOINT = clusterApiUrl('devnet');

// export const ENDPOINT = 'http://127.0.0.1:8899';
export const PREFLIGHT_COMMITMENT = 'processed';

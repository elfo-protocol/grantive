import * as anchor from '@project-serum/anchor';

const { PublicKey, clusterApiUrl } = anchor.web3;

export const GRANTIVE_PROGRAM_ID = new PublicKey(
    'HmaVKgMcqV6bi26kNo5xa9K8bywft2ojFnXCpf5zrQkx'
);
export const GRANTIVE_STATE = new PublicKey(
    '5QhkNozBpsyF9KY3AMLo45k4RXzDPBB3L26TyZebj6QF'
);
export const DEFAULT_USDC_MINT = new PublicKey(
    'DaCWEs6Aofd2Re2WQnZUATRMr2NJv5YRxwo94dH7GYWj'
);
export const MINT_DECIMALS = 6;

export const ENDPOINT = clusterApiUrl('devnet');

// export const ENDPOINT = 'http://127.0.0.1:8899';
export const PREFLIGHT_COMMITMENT = 'processed';

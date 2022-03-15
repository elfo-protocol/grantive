import { useContext, useEffect, useMemo, useState } from 'react';
import { useAnchorWallet } from '@solana/wallet-adapter-react';
import {
    CreatorAccount,
    getCreator,
    getCreatorAddress,
} from '../lib/grantive/creator';
import { isSubscriber } from '../lib/subscription/subscription';
import { getProgram } from '../lib/connection/program';
import { Program } from '@project-serum/anchor';
import { Grantive } from '../types/grantive';
import RefreshContext from '../context';
import { getPosts, PostData } from '../lib/grantive/post';

export const useIsOwner = (creatorAddress: string) => {
    const [own, loading] = useOwnCreatorAccount();
    if (own) {
        return [own.key === creatorAddress, loading];
    }
    return [false, loading];
};

export const useCreator = (
    creatorAddress: string
): [CreatorAccount | undefined, boolean] => {
    const wallet = useAnchorWallet();
    const { lastValue } = useContext(RefreshContext);
    const [loading, setLoading] = useState(true);
    const [creator, setCreator] = useState<CreatorAccount | undefined>(
        undefined
    );
    useEffect(() => {
        if (creatorAddress === '') return;
        getCreator(wallet!, creatorAddress)
            .then((creator) => setCreator(creator))
            .catch((e) => console.error(e))
            .finally(() => setLoading(false));
    }, [wallet, creatorAddress, lastValue]);

    return [creator, loading];
};

export const useOwnCreatorAccount = (): [
    CreatorAccount | undefined,
    boolean
] => {
    const wallet = useAnchorWallet();
    const address = useCreatorAddress(wallet?.publicKey.toBase58() || '');
    return useCreator(address);
};

export const useCreatorAddress = (walletAddress: string | undefined) => {
    return useMemo(() => {
        if (!walletAddress) return '';
        return getCreatorAddress(walletAddress);
    }, [walletAddress]);
};

export const useProgram = (): Program<Grantive> => {
    const wallet = useAnchorWallet();
    return useMemo(() => {
        return getProgram(wallet!);
    }, [wallet]);
};

export const usePosts = (creatorId: string) => {
    const wallet = useAnchorWallet();
    const [creator, creatorLoading] = useCreator(creatorId);
    const [posts, setPosts] = useState<PostData[] | undefined>(undefined);
    const { lastValue } = useContext(RefreshContext);
    useEffect(() => {
        if (creatorLoading) return;
        isSubscriber(creator!, wallet!.publicKey.toBase58(), wallet!).then(
            (is) => {
                getPosts(creator!, is, wallet!).then((posts) =>
                    setPosts(posts)
                );
            }
        );
    }, [wallet, creator, lastValue, creatorLoading]);
    return posts;
};

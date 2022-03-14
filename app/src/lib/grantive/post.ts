import * as anchor from '@project-serum/anchor';
import { Program } from '@project-serum/anchor';
import { Grantive } from '../../types/grantive';
import { AnchorWallet } from '@solana/wallet-adapter-react';
import { getProgram } from '../connection/program';
import { CreatorAccount, getCreator, getCreatorAddress } from './creator';
import ipfsService from './ipfs';
import { GRANTIVE_PROGRAM_ID } from '../constants';

const {
    PublicKey,
    Transaction,
    SystemProgram,
    SYSVAR_CLOCK_PUBKEY,
    SYSVAR_RENT_PUBKEY,
} = anchor.web3;
const utf8 = anchor.utils.bytes.utf8;

export type PostType = string | 'SUBSCRIBE_TO_VIEW';

export interface PostData {
    hasAlreadyBeenInitialized: boolean;
    key: string;
    creator: string;
    subscriberOnly: boolean;
    title: string;
    content: PostType;
    publishedOn: number;
    index: number;
}

export const createPost = async (
    title: string,
    contentHtml: string,
    subscriber_only: boolean,
    wallet: AnchorWallet
): Promise<string> => {
    const ipfsPostData: string = await ipfsService.savePostData(contentHtml);
    const program = await getProgram(wallet);

    const creatorAddress = getCreatorAddress(wallet.publicKey.toBase58());
    const creator = (await getCreator(
        wallet,
        creatorAddress
    )) as CreatorAccount;

    const [post] = anchor.utils.publicKey.findProgramAddressSync(
        [
            utf8.encode('post'),
            new PublicKey(creator.key).toBuffer(),
            utf8.encode((creator.lastPostIndex + 1).toString()),
        ],
        GRANTIVE_PROGRAM_ID
    );

    const ix = await program.instruction.createPost(
        title,
        ipfsPostData,
        subscriber_only,
        {
            accounts: {
                post,
                creator: new PublicKey(creator.key),
                authority: program.provider.wallet.publicKey,
                clock: SYSVAR_CLOCK_PUBKEY,
                rent: SYSVAR_RENT_PUBKEY,
                systemProgram: SystemProgram.programId,
            },
        }
    );
    const tx = new Transaction({
        feePayer: wallet.publicKey,
        recentBlockhash: (
            await program.provider.connection.getLatestBlockhash()
        ).blockhash,
    }).add(ix);

    await wallet.signTransaction(tx);
    await program.provider.send(tx);
    return post.toBase58();
};

export const getPosts = async (
    creator: CreatorAccount,
    isSubscriber: boolean,
    wallet: AnchorWallet
) => {
    const program = await getProgram(wallet);
    const posts: PostData[] = [];
    for (const p of creator.posts) {
        posts.push(await getPost(program, p, isSubscriber));
    }
    return posts;
};

export const getSinglePost = async (
    postPublicKey: string,
    isSubscriber: boolean,
    wallet: AnchorWallet
) => {
    const program = await getProgram(wallet);
    return await getPost(program, postPublicKey, isSubscriber);
};

const getPost = async (
    program: Program<Grantive>,
    postPublicKey: string,
    isSubscriber: boolean
): Promise<PostData> => {
    const {
        hasAlreadyBeenInitialized,
        creator,
        title,
        publishedOn,
        index,
        contentIpfs,
        subscriberOnly,
    } = await program?.account.creatorPost.fetch(postPublicKey);

    // Not querying subscriber only content from ipfs if not a subscriber
    // This is not ideal as this is "private" by obscurity
    // There is no way to have "private" content on solana chain (on-chain) (yet?),
    let content: PostType = 'SUBSCRIBE_TO_VIEW';
    let retrieveActualContent = false;

    if (!subscriberOnly) {
        retrieveActualContent = true;
    } else {
        if (isSubscriber) {
            retrieveActualContent = true;
        }
    }

    if (retrieveActualContent) {
        content = await ipfsService.getPostData(contentIpfs);
    }

    return {
        publishedOn: publishedOn.toNumber(),
        index: index.toNumber(),
        key: postPublicKey,
        hasAlreadyBeenInitialized,
        creator: creator.toBase58(),
        title,
        content,
        subscriberOnly,
    };
};

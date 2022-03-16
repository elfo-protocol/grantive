import { getProgram } from '../connection/program';
import { AnchorWallet } from '@solana/wallet-adapter-react';
import * as anchor from '@project-serum/anchor';
import { BN } from '@project-serum/anchor';

import {
    ELFO_PROTOCOL_PROGRAM_ID,
    ELFO_PROTOCOL_STATE,
    SubscriptionPlan,
    SubscriptionPlanAuthor,
} from '@elfo/sdk';
import {
    DEFAULT_USDC_MINT,
    GRANTIVE_PROGRAM_ID,
    GRANTIVE_STATE,
    MINT_DECIMALS,
} from '../constants';
import {
    ASSOCIATED_TOKEN_PROGRAM_ID,
    getAssociatedTokenAddress,
    TOKEN_PROGRAM_ID,
} from '@solana/spl-token';
import { file2Base64 } from '../utils/img-utils';
import s3 from './s3';

const utf8 = anchor.utils.bytes.utf8;
const { PublicKey, SystemProgram, SYSVAR_RENT_PUBKEY, Transaction } =
    anchor.web3;

export interface CreatorAccount {
    key: string;
    name: string;
    description: string;
    imageDataURI: string;
    hasAlreadyBeenInitialized: boolean;
    authority: string;
    subscriptionPlan: string;
    posts: string[];
    lastPostIndex: number;
}

export interface CreatorData {
    description: string;
    imageDataURI: string;
}

export const getCreator = async (
    wallet: AnchorWallet,
    creatorPublicKey: string
): Promise<CreatorAccount | undefined> => {
    const program = getProgram(wallet);

    const creator = await program.account.creator.fetchNullable(
        creatorPublicKey
    );
    if (!creator) return undefined;

    const {
        name,
        dataId,
        hasAlreadyBeenInitialized,
        authority,
        subscriptionPlan,
        posts,
        lastPostIndex,
    } = creator;

    const data = (await s3.getCreatorData(dataId)) as CreatorData;

    return {
        key: creatorPublicKey,
        name,
        description: data.description,
        imageDataURI: data.imageDataURI,
        hasAlreadyBeenInitialized,
        authority: authority.toBase58(),
        subscriptionPlan: subscriptionPlan.toBase58(),
        posts: posts.map((p) => p.toBase58()),
        lastPostIndex: lastPostIndex.toNumber(),
    };
};

export const initCreator = async (
    creatorName: string,
    description: string,
    amount: number,
    image: File | string,
    wallet: AnchorWallet
): Promise<string> => {
    const program = await getProgram(wallet);
    const creator = getCreatorAddress(
        program.provider.wallet.publicKey.toBase58()
    );
    const subscriptionPlanAuthor = new PublicKey(
        SubscriptionPlanAuthor.address(
            program.provider.wallet.publicKey.toBase58()
        )
    );

    const subscriptionPlan = new PublicKey(
        SubscriptionPlan.address(creatorName, subscriptionPlanAuthor.toBase58())
    );

    const dataId = await s3.saveCreatorData({
        description,
        imageDataURI:
            typeof image === 'string' ? image : await file2Base64(image),
    });

    const ix = program.instruction.initCreator(
        creatorName,
        new BN(amount * Math.pow(10, MINT_DECIMALS)),
        dataId,
        {
            accounts: {
                grantiveState: GRANTIVE_STATE,
                creator: new PublicKey(creator),
                associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
                tokenProgram: TOKEN_PROGRAM_ID,
                authority: program.provider.wallet.publicKey,
                mint: DEFAULT_USDC_MINT,
                subscriptionPlan,
                subscriptionPlanAuthor,
                protocolState: ELFO_PROTOCOL_STATE,
                rent: SYSVAR_RENT_PUBKEY,
                systemProgram: SystemProgram.programId,
                creatorPaymentAccount: await getAssociatedTokenAddress(
                    DEFAULT_USDC_MINT,
                    program.provider.wallet.publicKey
                ),
                protocol: ELFO_PROTOCOL_PROGRAM_ID,
            },
        }
    );
    const tx = new Transaction({
        feePayer: program.provider.wallet.publicKey,
        recentBlockhash: (
            await program.provider.connection.getLatestBlockhash()
        ).blockhash,
    }).add(ix);
    await program.provider.wallet.signTransaction(tx);
    await program.provider.send(tx);
    return creator;
};

export const getCreatorAddress = (authority: string): string => {
    const [creator] = anchor.utils.publicKey.findProgramAddressSync(
        [utf8.encode('creator'), new PublicKey(authority).toBuffer()],
        GRANTIVE_PROGRAM_ID
    );
    return creator.toBase58();
};

export const getCreatorList = async (
    wallet: AnchorWallet
): Promise<string[]> => {
    const program = await getProgram(wallet);
    const { creatorAccounts } = await program.account.grantive.fetch(
        GRANTIVE_STATE
    );
    return creatorAccounts.map((c) => c.toBase58());
};

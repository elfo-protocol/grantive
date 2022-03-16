import {
    subscribe as subscribeTo,
    Subscriber,
    Subscription,
    SubscriptionPlan,
} from '@elfo/sdk';
import { AnchorWallet } from '@solana/wallet-adapter-react';
import { getProvider } from '../connection/provider';
import { CreatorAccount } from '../grantive/creator';

export const isSubscriber = async (
    creator: CreatorAccount,
    query: string,
    wallet: AnchorWallet
) => {
    if (creator.authority === wallet.publicKey.toBase58()) return true;
    const subscriberAddress = Subscriber.address(query);
    const subscriptionAddress = Subscription.address(
        subscriberAddress,
        creator.subscriptionPlan
    );
    const subscriptionPlan = await getSubscriptionPlan(creator, wallet);
    return !(
        subscriptionPlan.subscriptionAccounts.find(
            (s) => s === subscriptionAddress
        ) === undefined
    );
};

export const getSubscriptionPlan = async (
    creator: CreatorAccount,
    wallet: AnchorWallet
): Promise<SubscriptionPlan> => {
    const provider = getProvider(wallet);
    return await SubscriptionPlan.from(creator.subscriptionPlan, provider);
};

export const subscribe = async (
    plan: SubscriptionPlan,
    wallet: AnchorWallet
) => {
    const provider = getProvider(wallet);
    await subscribeTo(provider, plan.publicKey);
};

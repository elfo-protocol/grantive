import { CreatorAccount } from '../lib/grantive/creator';
import Button from '@mui/material/Button';
import { FC, useEffect, useState } from 'react';
import { SubscriptionPlan } from '@elfo/sdk';
import {
    getSubscriptionPlan,
    subscribe,
} from '../lib/subscription/subscription';
import { useAnchorWallet } from '@solana/wallet-adapter-react';
import { BN } from '@project-serum/anchor';
import { toast } from 'react-toastify';
import LoadingButton from '@mui/lab/LoadingButton';

interface IProps {
    creator: CreatorAccount;
}

const SubscribeButton: FC<IProps> = ({ creator }) => {
    const wallet = useAnchorWallet();
    const [amount, setAmount] = useState('');
    const [subscriptionPlan, setSubscriptionPlan] = useState<
        SubscriptionPlan | undefined
    >(undefined);
    useEffect(() => {
        if (!wallet) return;
        getSubscriptionPlan(creator, wallet).then((plan) => {
            setSubscriptionPlan(plan);
            setAmount(
                ' '
                    .concat(plan.amount.div(new BN(Math.pow(10, 6))).toString())
                    .concat(' USDC/Month')
            );
        });
    }, [creator, wallet]);

    const [loading, setLoading] = useState(false);

    const handleSubscribe = async () => {
        if (!wallet) return;
        let plan = subscriptionPlan;
        setLoading(true);
        try {
            if (!plan) {
                plan = await getSubscriptionPlan(creator, wallet);
            }

            await subscribe(plan, wallet);
            toast('You are subscribed. Please refresh this page.', {
                type: 'success',
            });
            window.location.reload();
        } catch (e) {
            console.error(e);
            toast('An error occurred.', {
                type: 'error',
            });
            setLoading(false);
        }
    };

    return (
        <>
            {loading ? (
                <LoadingButton loading variant="outlined">
                    Connecting Wallet
                </LoadingButton>
            ) : (
                <Button
                    onClick={handleSubscribe}
                    variant="contained"
                    size="large"
                    color={'success'}
                >
                    Subscribe {amount}
                </Button>
            )}
        </>
    );
};

export default SubscribeButton;

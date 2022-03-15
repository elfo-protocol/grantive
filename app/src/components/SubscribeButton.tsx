import Button from '@mui/material/Button';
import { useEffect, useState } from 'react';
import { SubscriptionPlan } from '@elfo/sdk';
import {
    getSubscriptionPlan,
    subscribe,
} from '../lib/subscription/subscription';
import { useAnchorWallet } from '@solana/wallet-adapter-react';
import { BN } from '@project-serum/anchor';
import { toast } from 'react-toastify';
import LoadingButton from '@mui/lab/LoadingButton';
import { useCreator } from '../hooks/useHooks';
import { useParams } from 'react-router-dom';

const SubscribeButton = () => {
    const wallet = useAnchorWallet();
    const [amount, setAmount] = useState('');
    const [subscriptionPlan, setSubscriptionPlan] = useState<
        SubscriptionPlan | undefined
    >(undefined);

    const params = useParams();
    const creatorId = params.creatorId;
    const [creator] = useCreator(creatorId as string);

    useEffect(() => {
        if (!wallet || !creator) return;
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
        if (!wallet || !creator) return;
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

import Grid from '@mui/material/Grid';
import Profile from '../components/Profile';
import { useNavigate, useParams } from 'react-router-dom';
import { useAnchorWallet } from '@solana/wallet-adapter-react';
import { useEffect, useState } from 'react';
import { BROWSE_CREATORS } from './routes';
import { CreatorAccount, getCreator } from '../lib/grantive/creator';
import { getPosts, PostData } from '../lib/grantive/post';
import LoadingComponent from '../container/LoadingComponent';
import { isSubscriber } from '../lib/subscription/subscription';
import PostsContainer from '../components/posts/PostsContainer';

const Creator = () => {
    const params = useParams();
    const creatorId = params.creatorId;
    const navigate = useNavigate();
    const wallet = useAnchorWallet();

    const [loading, setLoading] = useState(true);

    const [creator, setCreator] = useState<CreatorAccount | undefined>(
        undefined
    );
    const [posts, setPosts] = useState<PostData[]>([]);
    const [isOwner, setIsOwner] = useState(false);
    const [hasSubscription, setIsSubscriber] = useState(false);

    useEffect(() => {
        if (!creatorId || !wallet) {
            return;
        }
        let creatorAccount: CreatorAccount;
        getCreator(wallet, creatorId)
            .then((returnedCreator) => {
                if (!returnedCreator) {
                    console.error('Creator does not exist');
                    navigate(BROWSE_CREATORS);
                }
                setCreator(returnedCreator as CreatorAccount);
                creatorAccount = returnedCreator as CreatorAccount;
                if (
                    wallet &&
                    wallet.publicKey.toBase58() === creatorAccount.authority
                ) {
                    setIsOwner(true);
                    return true;
                }

                return isSubscriber(
                    creatorAccount,
                    wallet.publicKey.toBase58(),
                    wallet
                );
            })
            .then((isSubscriber) => {
                setIsSubscriber(isSubscriber);
                return getPosts(creatorAccount, isSubscriber, wallet);
            })
            .then((posts) => {
                setPosts(posts);
                setLoading(false);
            })
            .catch((e) => {
                console.error(e);
                navigate(BROWSE_CREATORS);
            });
    }, [creatorId, wallet]);

    if (loading) return <LoadingComponent />;

    return (
        <Grid container spacing={2}>
            <Grid item xs={12} md={4} lg={3}>
                <Profile
                    isOwner={isOwner}
                    isSubscriber={hasSubscription}
                    creator={creator!}
                />
            </Grid>
            <Grid item xs={12} md={8} lg={9}>
                <PostsContainer
                    isOwner={isOwner}
                    creator={creator!}
                    posts={posts}
                />
            </Grid>
        </Grid>
    );
};

export default Creator;

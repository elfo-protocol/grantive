import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import { useNavigate } from 'react-router-dom';
import { BECOME_CREATOR, BROWSE_CREATORS, SINGLE_CREATOR } from './routes';
import Button from '@mui/material/Button';
import { useEffect, useState } from 'react';
import { useAnchorWallet } from '@solana/wallet-adapter-react';
import { getCreator, getCreatorAddress } from '../lib/grantive/creator';
import LoadingComponent from '../container/LoadingComponent';

const Home = () => {
    const navigate = useNavigate();
    const wallet = useAnchorWallet();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!wallet) return;
        const creatorAddress = getCreatorAddress(wallet.publicKey.toBase58());
        getCreator(wallet, creatorAddress).then((creator) => {
            if (creator) {
                navigate(SINGLE_CREATOR.concat(creator.pda), {
                    state: {
                        creatorAccount: creator,
                    },
                });
            } else {
                setLoading(false);
            }
        });
    }, [wallet]);

    if (loading) {
        return <LoadingComponent />;
    }

    return (
        <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="center"
            style={{ minHeight: 'calc(100vh - 60px)' }}
        >
            <Grid item xs={3}>
                <Grid container>
                    <Grid
                        sx={{
                            px: {
                                xs: 1,
                                sm: 2,
                            },
                        }}
                    >
                        <Card>
                            <CardContent>
                                <Button
                                    onClick={() => {
                                        navigate(BECOME_CREATOR);
                                    }}
                                >
                                    Become a creator
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid
                        sx={{
                            px: {
                                xs: 1,
                                sm: 2,
                            },
                        }}
                    >
                        <Card>
                            <CardContent>
                                <Button
                                    onClick={() => {
                                        navigate(BROWSE_CREATORS);
                                    }}
                                >
                                    Browse Creators
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default Home;

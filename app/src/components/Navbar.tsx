import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { WalletMultiButton } from '@solana/wallet-adapter-material-ui';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useNavigate, useParams } from 'react-router-dom';
import { useOwnCreatorAccount } from '../hooks/useHooks';
import { BECOME_CREATOR, SINGLE_CREATOR } from '../routes/routes';

const Navbar = () => {
    const navigate = useNavigate();
    const params = useParams();
    const creatorId = params.creatorId;
    const [ownCreatorAccount, loading] = useOwnCreatorAccount();

    return (
        <Paper>
            <Grid container>
                <Grid
                    item
                    xs={12}
                    sx={{
                        display: 'flex',
                        flexWrap: 'wrap',
                    }}
                >
                    <Box
                        sx={{
                            flex: '50%',
                            px: {
                                xs: 2,
                                sm: 4,
                            },
                            py: {
                                xs: 1,
                            },
                        }}
                    >
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                p: 2,
                                m: 1,
                                bgcolor: 'background.paper',
                                borderRadius: 1,
                            }}
                        >
                            <Typography
                                onClick={() => navigate('/')}
                                sx={{
                                    ':hover': {
                                        cursor: 'pointer',
                                    },
                                    mr: {
                                        xs: 1,
                                        sm: 2,
                                    },
                                }}
                                variant={'h5'}
                            >
                                Grantive
                            </Typography>

                            {!loading && !ownCreatorAccount && (
                                <Button
                                    variant={'outlined'}
                                    size={'small'}
                                    sx={{
                                        mx: {
                                            xs: 1,
                                            sm: 2,
                                        },
                                    }}
                                    onClick={() => navigate(BECOME_CREATOR)}
                                >
                                    Become a creator
                                </Button>
                            )}
                            {ownCreatorAccount &&
                                creatorId &&
                                ownCreatorAccount.key !== creatorId && (
                                    <Button
                                        variant={'outlined'}
                                        size={'small'}
                                        onClick={() =>
                                            navigate(
                                                SINGLE_CREATOR.concat(
                                                    ownCreatorAccount?.key
                                                )
                                            )
                                        }
                                        sx={{
                                            mx: {
                                                xs: 1,
                                                sm: 2,
                                            },
                                        }}
                                    >
                                        Go to Profile
                                    </Button>
                                )}
                        </Box>
                    </Box>
                    <Box
                        sx={{
                            flex: '50%',
                            textAlign: 'right',
                            px: {
                                xs: 2,
                                sm: 4,
                            },
                            py: {
                                xs: 1,
                            },
                        }}
                    >
                        <WalletMultiButton />
                    </Box>
                </Grid>
            </Grid>
        </Paper>
    );
};
export default Navbar;

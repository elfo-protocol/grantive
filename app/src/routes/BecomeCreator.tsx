import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useAnchorWallet } from '@solana/wallet-adapter-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { initCreator } from '../lib/grantive/creator';
import { SINGLE_CREATOR } from './routes';
import LoadingButton from '@mui/lab/LoadingButton';

const BecomeCreator = () => {
    const wallet = useAnchorWallet();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        if (!wallet) return;
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const name = formData.get('name') as string;
        const description = formData.get('description') as string;
        const amount = parseInt(formData.get('amount') as string);
        const image = formData.get('creatorImage') as File;

        if (amount === 0) {
            toast('amount cannot be zero', {
                type: 'error',
            });
            return;
        }

        if (amount > 1000) {
            toast('amount cannot be more than 1000', {
                type: 'error',
            });
            return;
        }

        if (name.trim() === '') {
            toast('Invalid creator name', {
                type: 'error',
            });
            return;
        }

        if (image.size === 0) {
            toast('Please upload an image.', {
                type: 'error',
            });
            return;
        }

        setLoading(true);
        initCreator(name, description, amount, image, wallet)
            .then((creator) => {
                toast('Account Created:' + creator);
                navigate(SINGLE_CREATOR.concat(creator));
            })
            .catch((e) => {
                toast('An error occurred.', {
                    type: 'error',
                });
                console.error(e);
                setLoading(false);
            });
    };

    return (
        <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="center"
        >
            <Grid item xs={3} sx={{}}>
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
                        <OndemandVideoIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Become a creator
                    </Typography>
                    <Box
                        component="form"
                        onSubmit={handleSubmit}
                        sx={{ mt: 1 }}
                    >
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="name"
                            label="Creator Name"
                            name="name"
                            placeholder={'Kurtkuzet'}
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="description"
                            label="Creator Description"
                            name="description"
                            placeholder={
                                'We are creating Science Animation Videos'
                            }
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="amount"
                            label="Amount to pledge monthly in USD"
                            type="number"
                            placeholder={'10'}
                            id="amount"
                        />

                        <Box
                            sx={{
                                my: 2,
                            }}
                        >
                            <>
                                <input
                                    color="primary"
                                    accept="image/*"
                                    name={'creatorImage'}
                                    type="file"
                                    id="creatorImage"
                                    style={{
                                        fontSize: '16px',
                                    }}
                                />
                                <label htmlFor="creatorImage">
                                    Creator Image
                                </label>
                            </>
                        </Box>
                        {loading ? (
                            <LoadingButton loading variant="outlined">
                                Connecting Wallet
                            </LoadingButton>
                        ) : (
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Submit
                            </Button>
                        )}
                    </Box>
                </Box>
            </Grid>
        </Grid>
    );
};

export default BecomeCreator;

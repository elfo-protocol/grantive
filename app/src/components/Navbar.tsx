import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import { WalletMultiButton } from '@solana/wallet-adapter-material-ui'
import Box from '@mui/material/Box'

const Navbar = () => {
    return (
        <Paper>
            <Grid container>
                <Grid item xs={12} sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                }}>
                    <Box sx={{
                        flex: '50%',
                        px: {
                            xs: 2,
                            sm: 4,
                        },
                        py: {
                            xs: 1,
                        },
                    }}>
                        <Typography variant={'h5'}>
                            Grantive
                        </Typography>
                    </Box>
                    <Box sx={{
                        flex: '50%',
                        textAlign: 'right',
                        px: {
                            xs: 2,
                            sm: 4,
                        },
                        py: {
                            xs: 1,
                        },
                    }}>
                        <WalletMultiButton />
                    </Box>
                </Grid>
            </Grid>
        </Paper>
    )
}
export default Navbar
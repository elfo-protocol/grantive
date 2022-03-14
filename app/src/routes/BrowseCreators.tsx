import Grid from '@mui/material/Grid';
import { useEffect, useState } from 'react';
import { useAnchorWallet } from '@solana/wallet-adapter-react';
import { getCreatorList } from '../lib/grantive/creator';
import CreatorBox from '../components/browse/CreatorBox';

const BrowseCreators = () => {
    const [loading, setLoading] = useState(true);
    const [list, setList] = useState<string[] | undefined>(undefined);
    const wallet = useAnchorWallet();

    useEffect(() => {
        if (!wallet) return;
        getCreatorList(wallet)
            .then((l) => {
                setList(l);
                setLoading(false);
            })
            .catch((e) => {
                console.error(e);
            });
    }, [wallet]);
    return (
        <Grid
            sx={{
                px: {
                    xs: 2,
                    sm: 4,
                    md: 6,
                    lg: 12,
                    xl: 16,
                },
            }}
            container
            spacing={2}
        >
            {loading || !list ? (
                <div>loading</div>
            ) : (
                list.map((i) => (
                    <Grid key={i} item xs={12} sm={6} md={4}>
                        <CreatorBox creatorId={i} />
                    </Grid>
                ))
            )}
        </Grid>
    );
};

export default BrowseCreators;

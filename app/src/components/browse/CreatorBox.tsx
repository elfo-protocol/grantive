import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import {
    CreatorAccount,
    getCreator,
    getCreatorAddress,
} from '../../lib/grantive/creator';
import { FC, useEffect, useState } from 'react';
import { useAnchorWallet } from '@solana/wallet-adapter-react';
import Skeleton from '@mui/material/Skeleton';

const CreatorBoxComponent: FC<{ creator: CreatorAccount | undefined }> = ({
    creator,
}) => {
    return (
        <Paper>
            <Card>
                <CardMedia
                    component="img"
                    height="140"
                    alt={creator ? creator.name : ''}
                    src={creator ? creator.imageDataURI : ''}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {creator ? creator.name : ''}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {creator ? creator.description : ''}
                    </Typography>
                </CardContent>
            </Card>
        </Paper>
    );
};

interface IProps {
    creatorId: string;
}

const CreatorBox: FC<IProps> = ({ creatorId }) => {
    const [loading, setLoading] = useState(true);
    const [creator, setCreator] = useState<CreatorAccount | undefined>(
        undefined
    );
    const wallet = useAnchorWallet();

    useEffect(() => {
        if (!wallet) return;
        getCreator(wallet, getCreatorAddress(creatorId))
            .then((creator) => {
                setCreator(creator as CreatorAccount);
                setLoading(false);
            })
            .catch((e) => console.error(e));
    }, [wallet]);

    if (loading || !creator) {
        return (
            <Skeleton>
                <CreatorBoxComponent creator={undefined} />
            </Skeleton>
        );
    }
    return <CreatorBoxComponent creator={creator} />;
};

export default CreatorBox;

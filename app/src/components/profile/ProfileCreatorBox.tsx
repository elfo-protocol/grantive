import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import { CreatorAccount, getCreator } from '../../lib/grantive/creator';
import { FC, useEffect, useState } from 'react';
import { useAnchorWallet } from '@solana/wallet-adapter-react';
import Skeleton from '@mui/material/Skeleton';
import { useNavigate } from 'react-router-dom';
import { SINGLE_CREATOR } from '../../routes/routes';

const ProfileCreatorBoxComponent: FC<{
    creator: CreatorAccount | undefined;
}> = ({ creator }) => {
    const navigate = useNavigate();
    return (
        <Paper>
            <Card
                sx={{
                    ':hover': {
                        cursor: 'pointer',
                    },
                }}
                onClick={() => {
                    if (creator) {
                        navigate(SINGLE_CREATOR.concat(creator.key));
                    }
                }}
            >
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

const ProfileCreatorBox: FC<IProps> = ({ creatorId }) => {
    const [loading, setLoading] = useState(true);
    const [creator, setCreator] = useState<CreatorAccount | undefined>(
        undefined
    );
    const wallet = useAnchorWallet();

    useEffect(() => {
        if (!wallet) return;
        console.log(creatorId);
        getCreator(wallet, creatorId)
            .then((creator) => {
                console.log('C: ', JSON.stringify(creator));
                setCreator(creator as CreatorAccount);
                setLoading(false);
            })
            .catch((e) => console.error(e));
    }, [wallet]);

    if (loading || !creator) {
        return <Skeleton height={350} width={500} />;
    }
    return <ProfileCreatorBoxComponent creator={creator} />;
};

export default ProfileCreatorBox;

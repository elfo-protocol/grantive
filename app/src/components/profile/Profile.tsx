import Paper from '@mui/material/Paper';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import SubscribeButton from '../SubscribeButton';
import Button from '@mui/material/Button';
import { useCreator, useIsOwner } from '../../hooks/useHooks';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { isSubscriber } from '../../lib/subscription/subscription';
import { useAnchorWallet } from '@solana/wallet-adapter-react';

const Profile = () => {
    const params = useParams();
    const creatorId = params.creatorId;
    const [creator] = useCreator(creatorId as string);
    const [isOwner, isOwnerLoading] = useIsOwner(creator ? creator.key : '');
    const [subscriber, setIsSubscriber] = useState<undefined | boolean>(
        undefined
    );
    const wallet = useAnchorWallet();

    useEffect(() => {
        if (!wallet || !creator) return;
        isSubscriber(creator, wallet.publicKey.toBase58(), wallet).then((is) =>
            setIsSubscriber(is)
        );
    }, [creator, wallet]);
    return (
        <Paper>
            <Card>
                <CardMedia
                    component="img"
                    height="140"
                    alt="green iguana"
                    src={creator?.imageDataURI || ''}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {creator?.name || ''}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {creator?.description || ''}
                    </Typography>
                </CardContent>
                <CardActions>
                    {subscriber !== undefined && !isOwner && !subscriber && (
                        <SubscribeButton />
                    )}
                    {subscriber !== undefined && !isOwner && subscriber && (
                        <Button color={'success'}>Supporter</Button>
                    )}
                </CardActions>
            </Card>
        </Paper>
    );
};

export default Profile;

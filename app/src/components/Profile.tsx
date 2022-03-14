import Paper from '@mui/material/Paper';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { FC } from 'react';
import SubscribeButton from './SubscribeButton';
import { CreatorAccount } from '../lib/grantive/creator';
import Button from '@mui/material/Button';

interface IProps {
    creator: CreatorAccount;
    isSubscriber: boolean;
    isOwner: boolean;
}

const Profile: FC<IProps> = ({ creator, isSubscriber, isOwner }) => {
    const { name, imageDataURI, description } = creator;
    return (
        <Paper>
            <Card>
                <CardMedia
                    component="img"
                    height="140"
                    alt="green iguana"
                    src={imageDataURI}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {description}
                    </Typography>
                </CardContent>
                <CardActions>
                    {!isOwner && !isSubscriber && (
                        <SubscribeButton creator={creator} />
                    )}
                    {!isOwner && isSubscriber && (
                        <Button color={'success'}>Supporter</Button>
                    )}
                </CardActions>
            </Card>
        </Paper>
    );
};

export default Profile;

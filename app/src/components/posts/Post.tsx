import Typography from '@mui/material/Typography';
import PostHeader from './PostHeader';
import Divider from '@mui/material/Divider';
import { FC, ReactNode, useEffect, useMemo, useState } from 'react';
import { PostData } from '../../lib/grantive/post';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import SubscribeButton from '../SubscribeButton';

const HtmlToReactParser = require('html-to-react').Parser;

type IProps = {
    post: PostData;
};

const Post: FC<IProps> = ({ post }) => {
    const parser = useMemo(() => new HtmlToReactParser(), []);
    const [body, setBody] = useState<ReactNode | null>(null);
    useEffect(() => {
        if (!parser) return;
        if (post.content !== 'SUBSCRIBE_TO_VIEW') {
            console.log(post.content);
            setBody(parser.parse(post.content));
        } else {
            setBody(
                <Grid
                    container
                    spacing={0}
                    direction="column"
                    alignItems="center"
                    justifyContent="center"
                    sx={{
                        minHeight: {
                            xs: 100,
                            sm: 200,
                        },
                    }}
                >
                    <Grid item xs={3}>
                        <Typography variant={'h6'}>
                            Unlock this content by becoming a subscriber
                        </Typography>
                        <SubscribeButton />
                    </Grid>
                </Grid>
            );
        }
    }, [parser]);
    return (
        <Paper
            sx={{
                px: {
                    xs: 2,
                    sm: 4,
                },

                py: {
                    xs: 2,
                    sm: 4,
                },

                mb: {
                    xs: 2,
                    sm: 4,
                },
            }}
        >
            <PostHeader title={post.title} />
            <Divider variant="fullWidth" />
            <Paper sx={{ typography: 'body1', fontSize: '18px' }}>{body}</Paper>

            <Divider variant="fullWidth" />
        </Paper>
    );
};

export default Post;

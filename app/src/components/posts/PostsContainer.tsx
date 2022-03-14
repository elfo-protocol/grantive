import { PostData } from '../../lib/grantive/post';
import { FC } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import PostList from './PostList';
import Paper from '@mui/material/Paper';
import PostNewForm from './PostNewForm';
import { CreatorAccount } from '../../lib/grantive/creator';

interface IProps {
    isOwner: boolean;
    creator: CreatorAccount;
    posts: PostData[];
}

const PostsContainer: FC<IProps> = ({ isOwner, creator, posts }) => {
    return (
        <Box>
            {isOwner && <PostNewForm />}
            {posts.length === 0 && (
                <Paper
                    sx={{
                        px: {
                            xs: 2,
                            sm: 5,
                        },
                        py: {
                            xs: 2,
                            sm: 5,
                        },
                    }}
                >
                    <Typography variant={'h5'}>
                        {isOwner
                            ? "You haven't"
                            : creator.name.concat("hasn't")}{' '}
                        made any posts yet.
                    </Typography>
                </Paper>
            )}
            <PostList isOwner={isOwner} creator={creator} posts={posts} />
        </Box>
    );
};

export default PostsContainer;

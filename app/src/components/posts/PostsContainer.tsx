import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import PostList from './PostList';
import Paper from '@mui/material/Paper';
import { useCreator, useIsOwner, usePosts } from '../../hooks/useHooks';
import { useNavigate, useParams } from 'react-router-dom';
import Button from '@mui/material/Button';
import { SINGLE_CREATOR } from '../../routes/routes';
import CircularProgress from '@mui/material/CircularProgress';

const PostsContainer = () => {
    const params = useParams();
    const creatorId = params.creatorId;
    const [creator] = useCreator(creatorId as string);
    const [isOwner, isOwnerLoading] = useIsOwner(creator ? creator.key : '');
    const posts = usePosts(creatorId as string);
    const navigate = useNavigate();
    return (
        <Box>
            {isOwner && (
                <Button
                    variant={'contained'}
                    size={'large'}
                    onClick={() =>
                        navigate(
                            SINGLE_CREATOR.concat(creatorId as string).concat(
                                '/add-post'
                            )
                        )
                    }
                    color={'primary'}
                    sx={{
                        mb: {
                            xs: 1,
                            sm: 2,
                        },
                    }}
                >
                    Add post
                </Button>
            )}
            {!posts && (
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
                    <Box sx={{ display: 'flex' }}>
                        <Typography
                            sx={{
                                mr: {
                                    xs: 1,
                                    sm: 2,
                                },
                            }}
                            variant={'h5'}
                        >
                            Loading
                        </Typography>{' '}
                        <CircularProgress />
                    </Box>
                </Paper>
            )}
            {posts && posts.length === 0 && (
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
                            : creator?.name.concat("hasn't")}{' '}
                        made any posts yet.
                    </Typography>
                </Paper>
            )}
            <PostList />
        </Box>
    );
};

export default PostsContainer;

import Grid from '@mui/material/Grid';
import Profile from '../components/profile/Profile';
import PostsContainer from '../components/posts/PostsContainer';

const Creator = () => {
    return (
        <Grid container spacing={2}>
            <Grid item xs={12} md={4} lg={3}>
                <Profile />
            </Grid>
            <Grid item xs={12} md={8} lg={9}>
                <PostsContainer />
            </Grid>
        </Grid>
    );
};

export default Creator;

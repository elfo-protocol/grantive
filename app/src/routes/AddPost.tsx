import Grid from '@mui/material/Grid';
import Profile from '../components/profile/Profile';
import PostEditor from '../components/posts/PostEditor';

const AddPost = () => {
    return (
        <Grid container spacing={2}>
            <Grid item xs={12} md={4} lg={3}>
                <Profile />
            </Grid>
            <Grid item xs={12} md={8} lg={9}>
                <PostEditor />
            </Grid>
        </Grid>
    );
};

export default AddPost;

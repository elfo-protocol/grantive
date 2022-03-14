import { useState } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import PostEditor from './PostEditor';

const PostNewForm = () => {
    const [showEditor, setShowEditor] = useState(false);
    return (
        <Box>
            <Button
                variant={'contained'}
                size={'large'}
                onClick={() => setShowEditor(!showEditor)}
                color={showEditor ? 'warning' : 'primary'}
                sx={{
                    mb: {
                        xs: 1,
                        sm: 2,
                    },
                }}
            >
                {showEditor ? 'Cancel' : 'Add Post'}
            </Button>
            {showEditor && <PostEditor />}
        </Box>
    );
};

export default PostNewForm;

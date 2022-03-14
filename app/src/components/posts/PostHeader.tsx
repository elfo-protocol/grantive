import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { FC } from 'react';

type IProps = {
    title: String;
};

const PostHeader: FC<IProps> = ({ title }) => {
    return (
        <>
            <Box sx={{ pb: 2 }}>
                <Typography
                    component="h2"
                    variant="h4"
                    color="inherit"
                    noWrap
                    sx={{ flex: 1 }}
                >
                    {title}
                </Typography>
            </Box>
        </>
    );
};

export default PostHeader;

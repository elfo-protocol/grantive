import 'react-quill/dist/quill.snow.css';
import './PostEditor.css';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import ReactQuill from 'react-quill';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import { createPost } from '../../lib/grantive/post';
import { AnchorWallet, useAnchorWallet } from '@solana/wallet-adapter-react';
import { toast } from 'react-toastify';
import LoadingButton from '@mui/lab/LoadingButton';
import { useNavigate } from 'react-router-dom';

const PostEditor = () => {
    const wallet = useAnchorWallet();
    const navigate = useNavigate();
    const [publishing, setPublishing] = useState(false);
    const [title, setTitle] = useState("What's a good title?");
    const [content, setContent] = useState('This is good content');
    const [subscriberOnly, setSubscriberOnly] = useState(false);

    const handlePublish = () => {
        setPublishing(true);
        createPost(title, content, subscriberOnly, wallet as AnchorWallet)
            .then((post) => {
                toast('Post created: '.concat(post), {
                    type: 'success',
                });
                window.location.reload();
            })
            .catch((e) => {
                toast('An error occurred.', {
                    type: 'error',
                });
                setPublishing(false);
                console.error(e);
            });
    };

    return (
        <Card
            variant="elevation"
            sx={{
                mt: {
                    xs: 1,
                },
                mb: {
                    xs: 1,
                    sm: 2,
                },
                border: 1,
                borderColor: 'primary.main',
            }}
        >
            <CardContent sx={{ typography: 'body1' }}>
                <Grid container>
                    <Grid item xs={9}>
                        <TextField
                            sx={{
                                mb: {
                                    xs: 1,
                                    sm: 2,
                                },
                            }}
                            variant="standard"
                            InputProps={{
                                style: {
                                    fontSize: 25,
                                },
                                disableUnderline: true,
                            }}
                            fullWidth
                            focused
                            value={title}
                            onChange={(v) => setTitle(v.target.value)}
                        />
                    </Grid>
                    <Grid item xs={2}>
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={subscriberOnly}
                                    onChange={(e) =>
                                        setSubscriberOnly(e.target.checked)
                                    }
                                />
                            }
                            labelPlacement={'top'}
                            label="Subscriber Only"
                        />
                    </Grid>
                    <Grid item xs={1}>
                        {publishing ? (
                            <LoadingButton loading variant="outlined">
                                Connecting Wallet
                            </LoadingButton>
                        ) : (
                            <Button
                                onClick={handlePublish}
                                variant={'contained'}
                                size={'large'}
                                color={'success'}
                                sx={{
                                    mb: {
                                        xs: 1,
                                        sm: 2,
                                    },
                                }}
                            >
                                Publish
                            </Button>
                        )}
                    </Grid>
                </Grid>
                <ReactQuill
                    theme="snow"
                    value={content}
                    modules={{
                        toolbar: [
                            [{ header: '1' }, { header: '2' }, { font: [] }],
                            [{ size: [] }],
                            [
                                'bold',
                                'italic',
                                'underline',
                                'strike',
                                'blockquote',
                            ],
                            [
                                { list: 'ordered' },
                                { list: 'bullet' },
                                { indent: '-1' },
                                { indent: '+1' },
                            ],
                            ['link', 'image', 'video'],
                            ['clean'],
                        ],
                    }}
                    onChange={setContent}
                />
            </CardContent>
        </Card>
    );
};

export default PostEditor;

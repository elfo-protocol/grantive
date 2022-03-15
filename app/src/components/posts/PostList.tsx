import Post from '../posts/Post';
import { usePosts } from '../../hooks/useHooks';
import { useParams } from 'react-router-dom';

const PostList = () => {
    const params = useParams();
    const creatorId = params.creatorId;
    const posts = usePosts(creatorId as string);

    if (!posts) return null;
    return (
        <>
            {posts
                .sort((a, b) => (a.index < b.index ? 1 : -1))
                .map((post) => {
                    return <Post key={post.key} post={post} />;
                })}
        </>
    );
};

export default PostList;

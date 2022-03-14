import { FC } from 'react';
import { PostData } from '../../lib/grantive/post';
import Post from '../posts/Post';
import { CreatorAccount } from '../../lib/grantive/creator';

interface IProps {
    isOwner: boolean;
    creator: CreatorAccount;
    posts: PostData[];
}

const PostList: FC<IProps> = ({ posts, creator, isOwner }) => {
    return (
        <>
            {posts
                .sort((a, b) => (a.index < b.index ? 1 : -1))
                .map((post) => {
                    return (
                        <Post
                            key={post.key}
                            post={post}
                            creator={creator}
                            isOwner={isOwner}
                        />
                    );
                })}
        </>
    );
};

export default PostList;

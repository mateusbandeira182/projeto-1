import P from "prop-types";
import "./styles.css";
import { PostCard } from "../PostCard";

export const Posts = ({ posts = [] }) => (
    <div className="posts">
        {posts.map(post => (
        <PostCard
            key={post.id}
            title={post.title}
            body={post.body}
            cover={post.cover}
        />
        ))}
    </div>
);

Posts.defaultProps = {
    posts: [],
};

Posts.prototype = {
    posts: P.arrayOf(P.shape(PostCard.propTypes)),
};

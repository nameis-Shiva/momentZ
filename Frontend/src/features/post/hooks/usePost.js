import { createPost, getFeed, likePost, unLikePost } from "../services/post.api";
import { useContext, useEffect } from "react";
import { PostContext } from "../Post.Context";

export const usePost = () => {
    
    const context = useContext(PostContext);
    
    const { loading, setLoading, post, feed, setFeed } = context;

    const handleGetFeed = async() =>{
        setLoading(true);
        const data = await getFeed();
        setFeed(data.posts);
        setLoading(false);
    }

    const handleCreatePost = async(imgFile,caption) => {

        setLoading(true);
        const data = await createPost(imgFile,caption);

        setFeed([data.post, ...feed]);
        setLoading(false);
    }

    const handleLike = async (postId) => {
  await likePost(postId);
  setFeed(feed.map(post => post._id === postId ? {...post, isLiked: true} : post));
}

const handleUnLike = async (postId) => {
  await unLikePost(postId);
  setFeed(feed.map(post => post._id === postId ? {...post, isLiked: false} : post));
}

    useEffect(() => {
        handleGetFeed();
    },[])

    return{
        loading,
        feed,
        post,
        handleGetFeed,
        handleCreatePost,
        handleLike,
        handleUnLike
    }

}
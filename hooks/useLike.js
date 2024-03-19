import { useCallback, useMemo } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import useCurrentUser from "./useCurrentUser";
import useLoginModal from "./useLoginModal";
import usePosts from "./usePosts";
import usePost from "./usePost";

const useLike = ({ postId, userId }) => {
    const { data: currentUser } = useCurrentUser();
    const { data: fetchedPost, mutate: mutateFetchedPost } = usePost(postId);
    const { mutate: mutateFetchedPosts } = usePosts(userId);
    const loginModal = useLoginModal();

    const hasLiked = useMemo(() => {
        const list = fetchedPost?.likedIds || [];

        return list.includes(currentUser?._id);
    }, [fetchedPost, currentUser]);

    const toggleLike = useCallback(async () => {
        if(!currentUser) {
            return loginModal.onOpen();
        }

        try {
            let request;
            if(hasLiked) {
                request = () => axios.delete('/api/like', { data: { postId } });
            }else {
                request = () => axios.post('/api/like', { postId });
            }

            await request();
            mutateFetchedPost();
            mutateFetchedPosts();

            toast.success('Success');
        } catch (error) {
            toast.error('Something went wrong');
        }
    }, [currentUser, hasLiked, mutateFetchedPost, mutateFetchedPosts, postId, loginModal]);

    return {
        hasLiked,
        toggleLike
    }

};

export default useLike;
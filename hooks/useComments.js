"use client";
import useSWR from "swr";
import fetcher from "@/libs/fetcher";

const useComments = (postId) => {
    const { data, error, isLoading, mutate } = useSWR(postId ? `/api/comments/${postId}` : null, fetcher);
    return {
        data,
        error,
        isLoading,
        mutate
    }
};

export default useComments;
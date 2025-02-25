import { Comment, Like, Post } from "@/types";
import { createContext } from "react";

export type PostContextType = {
    handleCreatePost: (userId: number, title: string, body: string) => void;
    handleUpdatePost: (postId: number, title: string, body: string) => void;
    handleDeletePost: (postId: number) => void;
    getPosts: (limit?: number) => Post[];
    handleLikePost: (postId: number, userId: number) => void;
    handleCommentPost: (postId: number, userId: number, body: string) => void;
    getLikes: (postId: number) => Like[];
    getComments: (postId: number) => Comment[];
    getPostById: (id: number) => Post | undefined;
    isLikedByUser: (postId: number, userId: number) => boolean;
};

const PostContext = createContext<PostContextType>({} as PostContextType);

export default PostContext;
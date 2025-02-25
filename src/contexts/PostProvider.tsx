import useLocalstorage from "@/hooks/useLocalstorage";
import PostContext from "./PostContext";
import { Comment, Like, Post } from "@/types";

export default function PostProvider({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	const [posts, setPosts] = useLocalstorage<Post[]>("posts", [] as Post[]);
	const [likes, setLikes] = useLocalstorage<Like[]>("likes", [] as Like[]);
	const [comments, setComments] = useLocalstorage<Comment[]>(
		"comments",
		[] as Comment[]
	);

	function getPostById(id: number) {
		return posts.find((post) => post.id === id);
	}

	function handleCreatePost(userId: number, title: string, body: string) {
		if (!title.trim() || !body.trim()) return;
		const post: Post = {
			id: new Date().getTime(),
			title,
			body,
			createdAt: new Date().toUTCString(),
			updatedAt: new Date().toUTCString(),
			userId,
		};
		setPosts((prev) => [...prev, post]);
	}

	function handleUpdatePost(postId: number, title: string, body: string) {
		if (!title.trim() || !body.trim()) return;
		const post = posts.find((post) => post.id === postId);
		if (!post) return;
		post.title = title;
		post.body = body;
		post.updatedAt = new Date().toUTCString();
		setPosts((prev) => [...prev]);
	}

	function handleDeletePost(postId: number) {
		setPosts((prev) => prev.filter((post) => post.id !== postId));
	}

	function getPosts(limit: number = 10) {
		return [...posts].sort((a, b) => b.id - a.id).slice(0, limit);
	}

    function handleLikePost(postId: number, userId: number) {
        const post = posts.find((post) => post.id === postId);
        if (!post) return;
        const like = likes.find((like) => like.postId === postId && like.userId === userId);
        if (like) {
            setLikes((prev) => prev.filter((like) => like.id !== like.id));
        } else {
            const newLike: Like = {
                id: new Date().getTime(),
                postId,
                userId,
                createdAt: new Date().toUTCString(),
                updatedAt: new Date().toUTCString(),
            };
            setLikes((prev) => [...prev, newLike]);
        }
    }

    function handleCommentPost(postId: number, userId: number, body: string) {
        if (!body.trim()) return;
        const newComment: Comment = {
            id: new Date().getTime(),
            postId,
            userId,
            body,
            createdAt: new Date().toUTCString(),
            updatedAt: new Date().toUTCString(),
        };
        setComments((prev) => [...prev, newComment]);
    }

    function getComments(postId: number) {
        return comments.filter((comment) => comment.postId === postId);
    }

    function getLikes(postId: number) {
        return likes.filter((like) => like.postId === postId);
    }

	function isLikedByUser(postId: number, userId: number) {
		return likes.some((like) => like.postId === postId && like.userId === userId);
	}

	return (
		<PostContext.Provider
			value={{
				getPosts,
				handleCreatePost,
				handleUpdatePost,
				handleDeletePost,
                handleLikePost,
                handleCommentPost,
                getComments,
                getLikes,
				getPostById,
				isLikedByUser
			}}
		>
			{children}
		</PostContext.Provider>
	);
}

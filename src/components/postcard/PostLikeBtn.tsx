import AuthContext from "@/contexts/AuthContext";
import PostContext from "@/contexts/PostContext";
import { ThumbsUp } from "lucide-react";
import { useContext } from "react";

export default function PostLikeBtn({ postId }: { postId: number }) {
	const { handleLikePost, isLikedByUser } = useContext(PostContext);
	const { user } = useContext(AuthContext);
    const isLiked = isLikedByUser(postId, user.id);

	function handleClick() {
		handleLikePost(postId, user.id);
	}

	return (
		<button
			onClick={handleClick}
			className={`border-2 rounded-full px-2 py-1 transition-colors hover:bg-gray-100 flex items-center gap-2 font-semibold ${
				isLiked ? "border-teal-500 text-teal-500" : ""
			}`}
		>
			<ThumbsUp className="transition-colors" color={isLiked ? "#14b8a6" : "gray"} strokeWidth={2} fill={isLiked ? "#14b8a6" : "none"} size={16} />
			Like
		</button>
	);
}

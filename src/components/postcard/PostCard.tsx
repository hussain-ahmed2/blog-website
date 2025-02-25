import AuthContext from "@/contexts/AuthContext";
import PostContext from "@/contexts/PostContext";
import { Post } from "@/types";
import { Link } from "lucide-react";
import { useContext, useState } from "react";
import PostLikeBtn from "./PostLikeBtn";
import PostAuthor from "./PostAuthor";
import PostComments from "./PostComments";
import AddComment from "./AddComment";
import PostCommentBtn from "./PostCommentBtn";

interface PostCardProps extends Post {
	isSingleComment?: boolean;
}

export default function PostCard({ id, title, body, userId, updatedAt, isSingleComment = true }: PostCardProps) {
	const [focusComment, setFocusComment] = useState(false);
	const { getLikes, getComments } = useContext(PostContext);
	const { getUserById } = useContext(AuthContext);

	const author = getUserById(userId);
	const likes = getLikes(id);
    const comments = getComments(id);

	return (
		<div onClick={() => setFocusComment(false)} className="bg-white rounded-xl shadow p-5 mb-5">
			<div>
				<PostAuthor author={author!} />
			</div>
			<h1 className="text-xl font-bold">{title}</h1>
			<p className="mt-2">{body}</p>
			<p className="text-[0.75rem] text-gray-500 mt-1 text-right">{updatedAt}</p>
			<div className="flex items-center gap-5 mt-5">
				<p className="text-sm text-gray-500">{likes.length} likes</p>
				<p className="text-sm text-gray-500">{comments.length} comments</p>
			</div>
			<div className="flex items-center gap-5 mt-2">
				<PostLikeBtn postId={id} />
				<PostCommentBtn focusComment={focusComment} setFocusComment={setFocusComment} />
			</div>
			<div className="mt-2">
				<PostComments isSingle={isSingleComment} comments={comments} />
				<div className="">
					<AddComment focusComment={focusComment} postId={id} />
				</div>
			</div>
		</div>
	);
}

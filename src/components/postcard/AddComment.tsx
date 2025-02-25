import AuthContext from "@/contexts/AuthContext";
import PostContext from "@/contexts/PostContext";
import commentSchema, { CommentSchema } from "@/form-schema/commentSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";

export default function AddComment({
	postId,
	focusComment,
}: {
	postId: number;
	focusComment: boolean;
}) {
	const { handleCommentPost } = useContext(PostContext);
	const { user } = useContext(AuthContext);
	const {
		register,
		handleSubmit,
		formState: { errors },
		setFocus,
		reset
	} = useForm({
		resolver: zodResolver(commentSchema),
	});

	function onSubmit(data: CommentSchema) {
		handleCommentPost(postId, user.id, data.body);
		reset();
	}

	useEffect(() => {
		if (focusComment) setFocus("body");
	}, [focusComment]);

	return (
		<div>
			<form className="flex gap-2" onSubmit={handleSubmit(onSubmit)}>
				<div className="flex flex-col gap-1 w-full">
					<div className="flex gap-4 items-center justify-between">
						<label className="font-medium text-sm" htmlFor="body">
							Comment
						</label>
						{errors.body && (
							<span className="text-sm text-rose-500">
								{errors.body.message}
							</span>
						)}
					</div>
					<div className="flex items-center justify-center gap-2">
						<input
							{...register("body")}
							type="text"
							className={`border p-2 outline-none rounded w-full text-base ${
								errors.body ? "border-rose-500" : ""
							}`}
							placeholder="Write your comment..."
						/>
						<button
							type="submit"
							className="bg-teal-500 hover:bg-teal-600 transition-colors text-white px-5 py-2 text-base rounded"
						>
							Comment
						</button>
					</div>
				</div>
			</form>
		</div>
	);
}

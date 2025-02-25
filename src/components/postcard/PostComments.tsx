import AuthContext from "@/contexts/AuthContext";
import { Comment } from "@/types";
import Link from "next/link";
import { useContext } from "react";

export default function PostComments({ comments, isSingle = true }: { comments: Comment[], isSingle?: boolean }) {
	const { getUserById, user } = useContext(AuthContext);

	return (
		<div className="flex flex-col gap-2">
			{comments.slice(0, isSingle ? 1 : comments.length).map((comment) => {
				const author = getUserById(comment.userId);
				return (
					<div
						className="bg-neutral-50 px-2 py-1 rounded shadow-sm"
						key={comment.id}
					>
						<div className="flex items-center justify-between">
							<Link
								className="text-[0.75rem] text-teal-500 font-bold hover:underline"
								href={`/user/${
									author?.id === user.id ? "" : author?.id
								}`}
							>
								{author?.name}
							</Link>
						</div>
						<p className="text-sm">{comment.body}</p>
						<p className="text-[0.7rem] text-gray-500 text-right">
							{comment.createdAt}
						</p>
					</div>
				);
			})}
			<div>
				{
					comments.length > 1&& isSingle  && (
						<Link
							href={`/posts/${comments[0].postId}`}
							className="text-sm font-medium text-teal-500 hover:underline text-right block"
						>
							View More
						</Link>
					)
				}
			</div>
		</div>
	);
}

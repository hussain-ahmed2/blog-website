import AuthContext from "@/contexts/AuthContext";
import { User } from "@/types";
import { Edit } from "lucide-react";
import Link from "next/link";
import { useContext } from "react";

export default function PostAuthor({ author, postId }: { author: User | null; postId: number; }) {
	const { user } = useContext(AuthContext);

	return (
		<div className="flex justify-between items-center text-sm">
			<Link
				href={`/user/${author?.id === user.id ? "" : author?.id}`}
				className="text-teal-500 font-bold hover:underline"
			>
				{author?.name}
			</Link>
			{author?.id === user.id && (
				<Link
					className="flex items-center gap-1 hover:text-teal-500 hover:underline transition-colors"
					href={`/edit/${postId}`}
				>
					<Edit size={14} /> Edit
				</Link>
			)}
		</div>
	);
}

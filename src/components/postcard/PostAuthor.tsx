import AuthContext from "@/contexts/AuthContext";
import { User } from "@/types";
import Link from "next/link";
import { useContext } from "react";

export default function PostAuthor({ author }: { author: User | null }) {
	const { user } = useContext(AuthContext);

	return (
		<Link
			href={`/user/${author?.id === user.id ? "" : author?.id}`}
			className="text-sm text-teal-500 font-bold hover:underline"
		>
			{author?.name}
		</Link>
	);
}

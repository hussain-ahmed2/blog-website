"use client";

import PostCard from "@/components/postcard/PostCard";
import PostContext from "@/contexts/PostContext";
import { useContext } from "react";

export default function Home() {
	const {getPosts} = useContext(PostContext);
	const posts = getPosts();
	return <div className="container min-h-[calc(100vh-4rem)] mx-auto p-5">
		<h1 className="text-2xl font-bold mb-5 text-center">Latest Posts</h1>
		<div>
			{
				posts.map((post) => (
					<PostCard key={post.id} {...post} />
				))
			}
		</div>
	</div>;
}

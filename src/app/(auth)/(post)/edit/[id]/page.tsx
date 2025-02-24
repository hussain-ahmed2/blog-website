"use client";

import AuthContext from "@/contexts/AuthContext";
import PostContext from "@/contexts/PostContext";
import postSchema, { PostSchema } from "@/form-schema/postSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { redirect, useParams } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export default function page() {
  const [isMounted, setIsMounted] = useState(false);
  const { id } = useParams();
	const { getPostById, handleUpdatePost } = useContext(PostContext);
	const { user } = useContext(AuthContext);
  const post = getPostById(Number(id));
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: zodResolver(postSchema),
	});

	function onSubmit(data: PostSchema) {
		handleUpdatePost(Number(id), data.title, data.body);
		redirect("/posts");
	}

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  if (isMounted && !user.id) {
    redirect("/login");
  }

  if (isMounted && !post) {
    redirect('/posts');
  }

	return (
		<div className="min-h-[calc(100vh-4rem)] px-5 max-w-4xl mx-auto flex items-center justify-center">
			<div className="bg-white rounded-xl shadow p-5 max-w-3xl w-full">
				<h1 className="text-2xl font-bold text-center pb-5 border-b mb-5">
					Edit Post
				</h1>
				<form
					className="flex flex-col gap-4"
					onSubmit={handleSubmit(onSubmit)}
				>
					<div className="flex flex-col gap-1 *:transition-colors">
						<div className="flex gap-4 items-center justify-between">
							<label className="font-medium" htmlFor="title">
								Title
							</label>
							{errors.title && (
								<span className="text-sm text-rose-500">
									{errors.title.message}
								</span>
							)}
						</div>
						<input
							className={`p-2 border rounded outline-none ${
								errors.title
									? "border-rose-500"
									: "focus:border-teal-500"
							}`}
              defaultValue={post?.title}
							{...register("title")}
							id="title"
							placeholder="write post title here"
						/>
					</div>
					<div className="flex flex-col gap-1">
						<div className="flex gap-4 items-center justify-between">
							<label className="font-medium" htmlFor="body">
								Body
							</label>
							{errors.body && (
								<span className="text-sm text-rose-500">
									{errors.body.message}
								</span>
							)}
						</div>
						<textarea
							className={`p-2 border rounded outline-none ${
								errors.body
									? "border-rose-500"
									: "focus:border-teal-500"
							}`}
							rows={5}
							{...register("body")}
              defaultValue={post?.body}
							id="body"
							placeholder="write post body here"
						/>
					</div>
					<button
						type="submit"
						className="px-4 py-2 rounded bg-teal-500 hover:bg-teal-600 transition-colors text-white"
					>
						Save
					</button>
				</form>
			</div>
		</div>
	);
}

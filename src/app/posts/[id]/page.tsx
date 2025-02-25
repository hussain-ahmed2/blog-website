"use client";

import PostCard from "@/components/postcard/PostCard";
import PostContext from "@/contexts/PostContext";
import { useParams } from "next/navigation";
import { useContext, useEffect, useState } from "react";

export default function page() {
  const [isMounted, setIsMounted] = useState(false);
  const { id } = useParams();
  const { getPostById } = useContext(PostContext);
  const post = getPostById(Number(id));

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  if (isMounted && !post) {
    return <div>Post not found</div>;
  }

  return <div className="container min-h-[calc(100vh-4rem)] mx-auto p-5">
    <h1 className="text-2xl font-bold mb-5 text-center">Post</h1>
    <PostCard isSingleComment={false} {...post!} />
  </div>;
}

import { getPosts } from "@/api/posts";
import { PostCard, SkeletonPostCard } from "@/components/PostCard";
import { SkeletonList } from "@/components/Skeleton";
import React, { Suspense } from "react";

export default function Posts() {
  return (
    <div>
      <h1 className="page-title">Posts</h1>

      <div className="card-grid">
        <Suspense
          fallback={
            <SkeletonList amount={6}>
              <SkeletonPostCard />
            </SkeletonList>
          }
        >
          <AllPosts />
        </Suspense>
      </div>
    </div>
  );
}

async function AllPosts() {
  const posts = await getPosts();
  return posts.map((post) => <PostCard key={post.id} {...post} />);
}

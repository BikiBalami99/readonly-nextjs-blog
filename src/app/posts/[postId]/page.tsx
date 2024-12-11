import { getComments, getSpecificPost } from "@/api/posts";
import { getUser } from "@/api/users";
import { Skeleton, SkeletonList } from "@/components/Skeleton";
import Link from "next/link";
import React, { Suspense } from "react";

export default async function PostPage({
  params: { postId },
}: {
  params: { postId: string };
}) {
  const post = await getSpecificPost(postId);
  return (
    <div>
      <PostDetails postId={postId} />
      <Comments postId={post.id} />
    </div>
  );
}

async function PostDetails({ postId }: { postId: string }) {
  const post = await getSpecificPost(postId);

  return (
    <>
      <h1 className="page-title">{post.title}</h1>
      <UserDetails userId={post.userId} />
      <Suspense
        fallback={
          <>
            <Skeleton />
            <Skeleton />
            <Skeleton />
          </>
        }
      >
        {post.body}
      </Suspense>
    </>
  );
}

async function UserDetails({ userId }: { userId: number }) {
  const user = await getUser(userId);

  return (
    <span className="page-subtitle">
      By:
      <Suspense fallback={<Skeleton short inline />}>
        <Link href={`/users/${user.id}`}>{user.name}</Link>
      </Suspense>
    </span>
  );
}

async function Comments({ postId }: { postId: number }) {
  const comments = await getComments(postId);

  return (
    <>
      <h3 className="mt-4 mb-2">Comments</h3>
      <div className="card-stack">
        <Suspense
          fallback={
            <SkeletonList amount={5}>
              <div className="card">
                <div className="card-body">
                  <div className="text-sm mb-1">
                    <Skeleton short />
                  </div>
                  <Skeleton />
                  <Skeleton />
                </div>
              </div>
            </SkeletonList>
          }
        >
          {comments.map((comment) => (
            <div key={comment.id} className="card">
              <div className="card-body">
                <div className="text-sm mb-1">{comment.email}</div>
                {comment.body}
              </div>
            </div>
          ))}
        </Suspense>
      </div>
    </>
  );
}

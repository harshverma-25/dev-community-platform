"use client";

import { useParams } from "next/navigation";
import { useGetUser, useFollow, useUnfollow } from "@/src/features/user/hooks";
import { useAuthStore } from "@/src/features/auth/store";


export default function UserProfilePage() {
  const params = useParams();
  const username = params.username as string;

  const { data, isLoading } = useGetUser(username);

  const currentUserId = useAuthStore((state) => state.token); // temp logic (we improve later)
    const followMutation = useFollow();
    const unfollowMutation = useUnfollow();
    const isFollowing = data?.followers?.includes(currentUserId);

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">{data.username}</h1>
      <p className="mt-2">{data.bio}</p>

      <div className="mt-4">
        <h2 className="font-semibold">Tech Stack:</h2>
        <p>{data.techStack?.join(", ")}</p>
      </div>

      <div className="mt-4">
        <p>Followers: {data.followers?.length}</p>
        <p>Following: {data.following?.length}</p>
      </div>
      <div className="mt-4">
  {isFollowing ? (
    <button
      onClick={() => unfollowMutation.mutate(data._id)}
      className="bg-red-500 text-white px-4 py-2 rounded"
    >
      Unfollow
    </button>
  ) : (
    <button
      onClick={() => followMutation.mutate(data._id)}
      className="bg-blue-500 text-white px-4 py-2 rounded"
    >
      Follow
    </button>
  )}
</div>
    </div>
    
  );
}
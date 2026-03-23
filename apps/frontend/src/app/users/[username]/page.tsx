"use client";

import { useParams } from "next/navigation";
import { useGetUser, useFollow, useUnfollow } from "@/src/features/user/hooks";
import { useAuthStore } from "@/src/features/auth/store";
import { useEffect } from "react";

export default function UserProfilePage() {
  const params = useParams();
  const username = params.username as string;

  const { data, isLoading, refetch } = useGetUser(username);
  const currentUser = useAuthStore((state) => state.user);

  const followMutation = useFollow();
  const unfollowMutation = useUnfollow();

  // Debug logging
  useEffect(() => {
    if (data?.followers && currentUser) {
      console.log("Followers:", data.followers);
      console.log("Current user ID:", currentUser._id);
      const following = data.followers.some((f: any) => {
        const followerId = f._id ? String(f._id) : String(f);
        return followerId === String(currentUser._id);
      });
      console.log("Is following:", following);
    }
  }, [data, currentUser]);

  const isFollowing = !!currentUser && data?.followers?.some((f: any) => {
    const followerId = f._id ? String(f._id) : String(f);
    return followerId === String(currentUser._id);
  });

  const isOwnProfile = currentUser?._id === data?._id;

  if (isLoading) return <p>Loading...</p>;
  if (!data) return <p>User not found</p>;

  const handleFollow = () => {
    followMutation.mutate(data._id, {
      onSuccess: () => {
        refetch(); // Manually refetch after mutation
      },
    });
  };

  const handleUnfollow = () => {
    unfollowMutation.mutate(data._id, {
      onSuccess: () => {
        refetch(); // Manually refetch after mutation
      },
    });
  };

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

      {!isOwnProfile && (
        <div className="mt-4">
          {isFollowing ? (
            <button
              onClick={handleUnfollow}
              disabled={unfollowMutation.isPending}
              className="bg-red-500 text-white px-4 py-2 rounded disabled:opacity-50"
            >
              {unfollowMutation.isPending ? "Unfollowing..." : "Unfollow"}
            </button>
          ) : (
            <button
              onClick={handleFollow}
              disabled={followMutation.isPending}
              className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
            >
              {followMutation.isPending ? "Following..." : "Follow"}
            </button>
          )}
        </div>
      )}
    </div>
  );
}
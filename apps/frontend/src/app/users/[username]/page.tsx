"use client";

import { useParams } from "next/navigation";
import { useGetUser } from "@/src/features/user/hooks";

export default function UserProfilePage() {
  const params = useParams();
  const username = params.username as string;

  const { data, isLoading } = useGetUser(username);

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
    </div>
  );
}
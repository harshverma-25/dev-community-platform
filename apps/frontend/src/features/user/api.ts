import { api } from "@/src/lib/api";

export const getMe = async () => {
  const res = await api.get("/users/me");
  return res.data;
};

export const createProfile = async (data: {
  username: string;
  bio: string;
  techStack: string[];
}) => {
  const res = await api.post("/users/profile", data);
  return res.data;
};

export const getUserByUsername = async (username: string) => {
  const res = await api.get(`/users/${username}`);
  return res.data;
};
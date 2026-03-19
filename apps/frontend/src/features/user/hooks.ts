import { useQuery } from "@tanstack/react-query";
import { getMe, getUserByUsername } from "./api";

export const useGetMe = () => {
  return useQuery({
    queryKey: ["me"],
    queryFn: getMe,
  });
};


export const useGetUser = (username: string) => {
  return useQuery({
    queryKey: ["user", username],
    queryFn: () => getUserByUsername(username),
    enabled: !!username,
  });
};
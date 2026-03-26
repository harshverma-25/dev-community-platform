import { useQuery } from "@tanstack/react-query";
import { getMe, getUserByUsername, followUser, unfollowUser } from "./api";
import { useMutation, useQueryClient } from "@tanstack/react-query";


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



export const useFollow = (username: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: followUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user", username] });
    },
  });
};

export const useUnfollow = (username: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: unfollowUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user", username] });
    },
  });
};


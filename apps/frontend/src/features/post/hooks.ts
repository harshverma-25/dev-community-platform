import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createPost, getPosts } from "./api";

export const useCreatePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });
};

export const useGetPosts = () => {
  return useQuery({
    queryKey: ["posts"],
    queryFn: getPosts,
  });
};
import { useQuery } from "@tanstack/react-query";
import { getMe } from "./api";

export const useGetMe = () => {
  return useQuery({
    queryKey: ["me"],
    queryFn: getMe,
  });
};
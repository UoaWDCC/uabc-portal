import type { QueryClient } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";

import { toast } from "@/components/ui/use-toast";
import { QUERY_KEY } from "@/lib/utils/queryKeys";
import type { PendingMemberResponse } from "../query/usePendingMembers";

export const useApproveUserMutation = (queryClient: QueryClient) => {
  const mutation = useMutation({
    mutationFn: async ({
      userId,
      prepaidSessions,
    }: {
      userId: string;
      prepaidSessions: number;
    }) => {
      const response = await fetch(`/api/users/${userId}/membership/approve`, {
        method: "PATCH",
        body: JSON.stringify({ prepaidSessions }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) throw new Error(response.statusText);
    },

    onMutate: async ({ userId }) => {
      await queryClient.cancelQueries({ queryKey: [QUERY_KEY.PendingMembers] });

      const previousMembers = queryClient.getQueryData([
        QUERY_KEY.PendingMembers,
      ]);

      queryClient.setQueryData(
        [QUERY_KEY.PendingMembers],
        (old: PendingMemberResponse[]) =>
          old.filter((member) => member.id !== userId),
      );

      return { previousMembers };
    },
    onSuccess: () => {
      toast({
        title: "Success!",
        description: "User has been successfully approved.",
      });
    },
    onError: (_error, _variables, context) => {
      queryClient.setQueryData(
        [QUERY_KEY.PendingMembers],
        context?.previousMembers,
      );
      toast({
        title: "Uh oh! Something went wrong",
        description:
          "An error occurred while approving the user. Please try again.",
        variant: "destructive",
      });
    },
  });

  return mutation;
};

export const useRejectUserMutation = (queryClient: QueryClient) => {
  const mutation = useMutation({
    mutationFn: async ({ userId }: { userId: string }) => {
      const response = await fetch(`/api/users/${userId}/membership/reject`, {
        method: "PATCH",
      });
      if (!response.ok) throw new Error(response.statusText);
    },
    onMutate: async ({ userId }) => {
      await queryClient.cancelQueries({ queryKey: [QUERY_KEY.PendingMembers] });

      const previousMembers = queryClient.getQueryData([
        QUERY_KEY.PendingMembers,
      ]);

      queryClient.setQueryData(
        [QUERY_KEY.PendingMembers],
        (old: PendingMemberResponse[]) =>
          old.filter((member) => member.id !== userId),
      );

      return { previousMembers };
    },
    onSuccess: () => {
      toast({
        title: "Success!",
        description: "User has been successfully rejected.",
      });
    },
    onError: (_error, _variables, context) => {
      queryClient.setQueryData(
        [QUERY_KEY.PendingMembers],
        context?.previousMembers,
      );
      toast({
        title: "Uh oh! Something went wrong",
        description:
          "An error occurred while rejecting the user. Please try again.",
        variant: "destructive",
      });
    },
  });

  return mutation;
};

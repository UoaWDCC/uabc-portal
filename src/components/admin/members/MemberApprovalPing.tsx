"use client";

import { usePendingMembers } from "@/hooks/query/usePendingMembers";

export function MemberApprovalPing() {
  const { data } = usePendingMembers();

  if (!data?.length) return null;

  return (
    <div className="absolute left-0 top-0 -translate-x-1/4 -translate-y-1/4">
      <span className="relative flex size-4">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75"></span>
        <span className="inline-flex size-4 rounded-full bg-red-500"></span>
      </span>
    </div>
  );
}

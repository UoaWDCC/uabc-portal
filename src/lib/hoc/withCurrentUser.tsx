import type { User } from "next-auth";

import "server-only";

import { redirect } from "next/navigation";

import { getCurrentUser } from "../session";

const withCurrentUser = <T,>(
  Component: React.ComponentType<T & CurrentUserProps>,
) => {
  const WrappedComponent = async (props: T) => {
    const currentUser = await getCurrentUser();

    if (!currentUser) redirect("/auth/login");

    return <Component {...props} currentUser={currentUser} />;
  };
  WrappedComponent.displayName = `withCurrentUser(${Component.displayName})`;
  return WrappedComponent;
};

export default withCurrentUser;

export interface CurrentUserProps {
  currentUser: User;
}

import { redirect } from "@tanstack/react-router";

import { UserRole } from "../api/graphql";
import { apolloClient } from "../clients/graphql";
import { getAccessToken } from "../model/tokens";
import { GET_USER } from "../model/user";
import { navigation } from "../navigation";

export const unauthorizedGuard = async () => {
  const accessToken = getAccessToken();

  if (!accessToken) {
    return;
  }

  const { data } = await apolloClient.query({ query: GET_USER });
  const role = data?.getCurrentUser?.role;

  if (role === UserRole.Teacher) {
    throw redirect({ to: navigation.teacher.dashboard });
  }
  if (role === UserRole.Student) {
    throw redirect({ to: navigation.student.dashboard });
  }
  if (role === UserRole.Admin) {
    throw redirect({ to: navigation.admin.dashboard });
  }
};

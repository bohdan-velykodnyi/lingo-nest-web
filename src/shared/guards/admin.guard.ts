import { redirect } from "@tanstack/react-router";

import { UserRole } from "../api/graphql";
import { apolloClient } from "../clients/graphql";
import { GET_USER } from "../model/user";
import { navigation } from "../navigation";

export const adminGuard = async () => {
  const { data } = await apolloClient.query({
    query: GET_USER,
  });

  if (data?.getCurrentUser.role === UserRole.Teacher) {
    throw redirect({
      to: navigation.teacher.dashboard,
    });
  }

  if (data?.getCurrentUser.role === UserRole.Student) {
    throw redirect({
      to: navigation.student.dashboard,
    });
  }
};

import { redirect } from "@tanstack/react-router";

import { getAccessToken } from "../model/tokens";
import { navigation } from "../navigation";

export const unauthorizedGuard = async () => {
  const accessToken = getAccessToken();

  if (accessToken) {
    throw redirect({
      to: navigation.teacher.dashboard,
    });
  }
};

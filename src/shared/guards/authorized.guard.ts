import { redirect } from "@tanstack/react-router";

import { getAccessToken } from "../model/tokens";
import { navigation } from "../navigation";

export const authorizedGuard = async () => {
  const accessToken = getAccessToken();

  if (!accessToken) {
    throw redirect({
      to: navigation.auth.login,
    });
  }
};

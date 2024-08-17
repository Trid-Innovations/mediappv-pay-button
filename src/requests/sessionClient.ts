import { getSessionTokenFromUrl } from "../util";
import webClient from "./webClient";

export function requestValidateSession() {
  const sessionToken: string = getSessionTokenFromUrl();
  return webClient.request({
    method: "post",
    url: "/api/v1/validate-session",
    ...(sessionToken && {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionToken}`,
      },
    }),
  });
}

export function fetchSession() {
  return webClient.request({
    method: "get",
    url: "/api/v1/session",
  });
}

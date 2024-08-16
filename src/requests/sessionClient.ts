import webClient from "./webClient";

export function requestValidateSession(token: string) {
  return webClient.request({
    method: "post",
    url: "/api/v1/validate-session",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
}

export function fetchSession() {
  return webClient.request({
    method: "get",
    url: "/api/v1/session",
  });
}

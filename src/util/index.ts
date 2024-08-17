import { Error } from "../type/error.definition";

export function removeSearchQueriesFromURL() {
  if (window.location.search !== "") {
    const urlObj = new URL(window.location.href);
    urlObj.search = "";
    const path = urlObj.toString();
    window.history.pushState({ path }, "", path);
  }
}

export function getCookieValue(name: string) {
  if (typeof document === "undefined") {
    // document is not defined, likely server-side environment
    return null;
  }

  const cookieString = document.cookie;
  const cookies = cookieString.split("; ");
  for (let i = 0; i < cookies.length; i++) {
    const cookiePair = cookies[i].split("=");
    if (cookiePair[0] === name) {
      return decodeURIComponent(cookiePair[1]);
    }
  }
  return null;
}

export const isValidErrorFormat = (error: Error) =>
  !!error.code && !!error.message;

export const isTimeExpires = (expiresAt: Date) => {
  const expirationDate = new Date(expiresAt);

  const now = new Date();
  const timeDifference = expirationDate.getTime() - now.getTime();

  const countDown = Math.floor(timeDifference / 1000);
  return countDown < 0;
};

export const mediappvSessionQueryParamKeyName = "mediappvSession";
export const getSessionTokenFromUrl = () => {
  const urlSearchParam = new URLSearchParams(document.location.search);
  return urlSearchParam.get(mediappvSessionQueryParamKeyName) as string;
};

export const portalAppUrl = () => {
  return import.meta.env.VITE_MEDIAPPV_PORTAL_URL;
};

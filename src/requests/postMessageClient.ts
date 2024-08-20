export const postMessageActions = {
  SHOW_LOADER: "SHOW_LOADER",
  HIDE_LOADER: "HIDE_LOADER",
  SESSION_INVALID: "SESSION_INVALID",
  PAYMENT_RESULT: "PAYMENT_RESULT",
  REDIRECT_LOGIN: "REDIRECT_LOGIN",
  ERROR: "ERROR",
} as const;

type SendMessageProp = {
  action: keyof typeof postMessageActions;
  payload?: any;
};

export function sendMessage(props: SendMessageProp) {
  if (window.location !== window?.parent?.location) {
    window.parent.postMessage({ ...props }, "*");
  } else {
    console.log("Parent undefined");
  }
}

export function sendShowLoader() {
  sendMessage({ action: postMessageActions.SHOW_LOADER });
}

export function sendHideLoader() {
  sendMessage({ action: postMessageActions.HIDE_LOADER });
}

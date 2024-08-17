export const errorCode = {
  SESSION_EXPIRED: "SESSION_EXPIRED",
  EXPIRED_JWT_TOKEN_ERROR: "EXPIRED_JWT_TOKEN_ERROR",
  INVALID_JWT_TOKEN_ERROR: "INVALID_JWT_TOKEN_ERROR",
};

export type Error = {
  code: string;
  message: string;
  fields: {
    name: string;
    message: string;
  };
};

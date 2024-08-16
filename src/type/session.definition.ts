export type Session = {
  firstName: String;
  lastName: String;
  settings: {
    returnUrl: String;
    credit: number;
  };
};

export enum SessionStatus {
  VALID_SESSION = "VALID_SESSION",
  INVALID_SESSION = "INVALID_SESSION",
  SESSION_PENDING_VALIDATION = "SESSION_PENDING_VALIDATION",
}

export interface ValidateSessionState {
  status: SessionStatus;
}

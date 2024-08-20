export type Payment = {
  result: PaymentResult | null;
  details?: PaymentDetails;
};

export type PaymentDetails = {
  provider: {
    id: string;
    name: string;
  };
  article: {
    link: string;
    cost: string;
  };
};

export enum PaymentResult {
  SUCCESS = "SUCCESS",
  FAIL = "FAIL",
  ABORT = "ABORT",
  INIT = "INIT",
}

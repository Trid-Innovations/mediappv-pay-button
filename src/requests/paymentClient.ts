import { PaymentDetails } from "../type/payment.definition";
import { getSessionTokenFromUrl } from "../util";
import webClient from "./webClient";

export function authorizeAndCapture(data: PaymentDetails) {
  return webClient.request({
    method: "post",
    url: "/authorize-and-capture",
    data,
  });
}

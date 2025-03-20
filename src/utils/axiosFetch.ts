import axios, { AxiosError, AxiosRequestConfig } from "axios";
import https from "https";

// import axiosRetry from "axios-retry";

// axiosRetry(axios, {
//   retries: 3,
//   retryDelay: (retryCount: number) => {
//     console.log(`Retrying request, attempt: ${retryCount}`);
//     return retryCount * 1000;
//   },
//   retryCondition: (error: AxiosError) => {
//     return (
//       axiosRetry.isNetworkError(error) ||
//       (error.response && error.response.status >= 500) ||
//       error.message.includes("socket hang up") ||
//       error.code === "ECONNRESET" ||
//       error.code === "ENOTFOUND" ||
//       error.code === "ETIMEDOUT"
//     );
//   },
//   onRetry: (
//     retryCount: number,
//     error: AxiosError,
//     requestConfig: AxiosRequestConfig
//   ) => {
//     console.log(
//       `Retrying ${requestConfig.url}, attempt ${retryCount} due to: ${error.message}`
//     );
//   },
// });

const httpsAgent = new https.Agent({
  rejectUnauthorized: false, // Disable SSL certificate verification
});

export const axiosFetch = (url: string, timeout: number = 0) => {
  return axios.get(url, { httpsAgent, timeout });
};

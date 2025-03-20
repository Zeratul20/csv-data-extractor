import { axiosFetch } from "../utils/axiosFetch";

export const extractUrlResponseWithPrefixes = async (
  prefixes: string[],
  url: string
) => {
  for (const prefix of prefixes) {
    let error: any;
    try {
      const response = await axiosFetch(`${prefix}${url}`);
      return response;
    } catch (error: any) {
      console.error(
        `Error processing ${url} with prefix ${prefix}: ${error.message}`
      );
      error = error.message;
    }

    try {
      if (error && !url.endsWith(".com")) {
        const response = await axiosFetch(`${prefix}${url}.com`);
        return response;
      }
    } catch (error: any) {
      console.error(
        `Error processing ${url} with prefix ${prefix} and timeout: ${error.message}`
      );
    }
  }
};

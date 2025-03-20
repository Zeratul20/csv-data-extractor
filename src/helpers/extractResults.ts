import { extractDataFromUrl, ExtractionResult } from "./extractDataFromUrl";

export const extractResults = async (domains: string[]) => {
  let phoneNumbersNr = 0;
  let socialMediaLinksNr = 0;
  let addressNr = 0;
  const allResults: Promise<ExtractionResult>[] = domains.map(
    async (domain) => {
      if (!domain) return { domain, error: "Invalid URL" };
      const urlData = await extractDataFromUrl(domain);
      const { phone_numbers, social_media_links, address, error } = urlData;
      phoneNumbersNr += phone_numbers?.length || 0;
      socialMediaLinksNr += social_media_links?.length || 0;
      addressNr += address ? 1 : 0;
      return urlData;
    }
  );
  const resolvedResults = (await Promise.all(allResults)).filter(
    (result) => !result.error
  );
  console.log(">>>Success: ", resolvedResults.length);
  console.log(
    ">>>Success rate: ",
    `${(resolvedResults.length * 100) / domains.length}%`
  );
  console.log(">>>Phone numbers: ", phoneNumbersNr);
  console.log(">>>Social media links: ", socialMediaLinksNr);
  console.log(">>>Address: ", addressNr);
  return resolvedResults;
};

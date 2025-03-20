import { axiosFetch } from "../utils/axiosFetch";
import * as cheerio from "cheerio";
import {
  extractAddress,
  extractPhoneNumbers,
  extractSocialMediaLinks,
  extractUrlResponseWithPrefixes,
} from ".";

export interface ExtractionResult {
  domain: string;
  phone_numbers?: string[];
  social_media_links?: string[];
  address?: string;
  error?: string;
}

export const extractDataFromUrl = async (
  domain: string
): Promise<ExtractionResult> => {
  try {
    let urlResponse;
    if (domain.includes("http://") || domain.includes("https://")) {
      urlResponse = await axiosFetch(domain);
    } else {
      urlResponse = await extractUrlResponseWithPrefixes(
        ["https://", "http://", ""],
        domain
      );
    }
    if (!urlResponse) {
      return { domain, error: "Could not fetch URL" };
    }
    const html = urlResponse.data;
    const $ = cheerio.load(html);

    const data: ExtractionResult = {
      domain,
      phone_numbers: extractPhoneNumbers($),
      social_media_links: extractSocialMediaLinks($),
      address: extractAddress($),
    };
    return data;
  } catch (error: any) {
    console.error(`Error processing ${domain}: ${error.message}`);
    return { domain, error: error.message };
  }
};

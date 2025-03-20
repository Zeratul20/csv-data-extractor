import * as cheerio from "cheerio";

export const extractPhoneNumbers = ($: cheerio.CheerioAPI): string[] => {
  const phoneNumbers = new Set<string>();
  const phoneRegex = /(\+\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}(?:\s?(?:ext|x)\s?(\d+))?/gi;
  const bodyText = $("body").text();
  let match;
  while ((match = phoneRegex.exec(bodyText)) !== null) {
    phoneNumbers.add(match[0].trim());
  }
  $('a[href^="tel:"]').each((i, el) => {
    phoneNumbers.add($(el).attr("href")?.replace("tel:", "").trim() || "");
  });
  return Array.from(phoneNumbers);
};

import * as cheerio from "cheerio";

export const extractAddress = ($: cheerio.CheerioAPI): string | undefined => {
  const addressSelectors = [
    "address",
    ".address",
    "#address",
    '[itemprop="address"]',
    '[itemprop="streetAddress"]',
    '[itemprop="postalCode"]',
    '[itemprop="addressLocality"]',
    '[itemprop="addressRegion"]',
    ".contact-info",
    ".location",
    "#location",
    ".office-address",
    "#office-address",
    "footer address",
  ];

  for (const selector of addressSelectors) {
    const $addressElements = $(selector);
    if ($addressElements.length > 0) {
      let fullAddress = "";
      $addressElements.each((i, el) => {
        fullAddress += $(el).text().trim() + "\n";
      });
      return fullAddress.trim();
    }
  }

  const contactSectionSelectors = [
    ".contact-section",
    "#contact-section",
    ".contact-us",
    "#contact-us",
  ];
  for (const sectionSelector of contactSectionSelectors) {
    const $section = $(sectionSelector);
    if ($section.length > 0) {
      const addressWithinSection = $section
        .find(addressSelectors.join(", "))
        .text()
        .trim();
      if (addressWithinSection) {
        return addressWithinSection;
      }
    }
  }
};

import { ExtractionResult, Row } from "../helpers";
import { sortByDomain } from "./sortData";

export const mergeData = (companyData: any[], extractedData: any[]) => {
  const sortedCompanyData: Row[] = sortByDomain(companyData);
  const sortedExtractedData: ExtractionResult[] = sortByDomain(extractedData);

  let extractedDataIndex = 0;
  return sortedCompanyData.map((item) => {
    if (
      extractedDataIndex < sortedExtractedData.length &&
      item.domain === sortedExtractedData[extractedDataIndex].domain
    ) {
      extractedDataIndex++;
      return {
        ...item,
        ...sortedExtractedData[extractedDataIndex],
      };
    }
    return item;
  });
};

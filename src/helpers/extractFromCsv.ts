import fs from "fs";
import csv from "csv-parser";

export interface Row {
  domain: string;
  company_commercial_name?: string;
  company_legal_name?: string;
  company_all_available_names?: string;
  phone_numbers?: string;
  social_media_links?: string;
  address?: string;
}

export const extractUrlsFromCsv = async (csvFilePath: string) => {
  const urls: string[] = [];
  return new Promise<string[]>((resolve, reject) => {
    fs.createReadStream(csvFilePath)
      .pipe(csv())
      .on("data", (row: Row) => {
        // console.log("ROW: ", row);
        urls.push(row.domain.trim().replace("\n", ""));
      })
      .on("end", () => {
        resolve(urls);
      });
  });
};

export const extractDataFromCsv = async (csvFilePath: string) => {
  const urls: Row[] = [];
  return new Promise<Row[]>((resolve, reject) => {
    fs.createReadStream(csvFilePath)
      .pipe(csv())
      .on("data", (row: Row) => {
        // console.log("ROW: ", row);
        urls.push(row);
      })
      .on("end", () => {
        resolve(urls);
      });
  });
};

import { createObjectCsvWriter } from "csv-writer";

export const csvWriter = (data: any[]) => {
  const filePath = "merged-websites-information.csv";

  const csvFileWriter = createObjectCsvWriter({
    path: filePath,
    header: [
      { id: "domain", title: "domain" },
      { id: "company_commercial_name", title: "company_commercial_name" },
      { id: "company_legal_name", title: "company_legal_name" },
      {
        id: "company_all_available_names",
        title: "company_all_available_names",
      },
      { id: "phone_numbers", title: "phone_numbers" },
      { id: "social_media_links", title: "social_media_links" },
      { id: "address", title: "address" },
    ],
    // append: true, // Uncomment this to append instead of overwriting
  });
  csvFileWriter
    .writeRecords(data)
    .then(() => console.log(`Data successfully written to ${filePath}`))
    .catch((err) => console.error("Error writing to CSV file:", err));
};

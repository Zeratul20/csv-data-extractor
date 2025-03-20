import express from "express";
import bodyParser from "body-parser";
import { Client } from "@elastic/elasticsearch";

import {
  extractUrlsFromCsv,
  extractResults,
  Row,
  extractDataFromCsv,
} from "./helpers";
import { mergeData } from "./utils/mergeData";
import { csvWriter } from "./utils/csvWriter";
import { createElasticIndex, insertElasticCompanies } from "./utils/elastic";
import { updateElasticQuery } from "./helpers/updateElasticQuery";
import * as dotenv from 'dotenv'; // Import dotenv

dotenv.config(); // Load environment variables from .env

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.post("/extract-data", async (req: any, res: any) => {
  const start = Date.now();
  const urls: string[] = await extractUrlsFromCsv("sample-websites.csv");
  if (!urls || !Array.isArray(urls)) {
    return res.status(400).json({
      error:
        'Please provide a JSON body with an array of website URLs under the key "urls".',
    });
  }
  res.json(await extractResults(urls));
  const end = Date.now();
  console.log(`Time elapsed: ${(end - start) / 1000 / 60} minutes`);
});

app.post("/merge-data", async (req: any, res: any) => {
  const companyData: Row[] = await extractDataFromCsv(
    "sample-websites-company-names.csv"
  );
  const urls: string[] = await extractUrlsFromCsv("sample-websites.csv");
  const extractedData = await extractResults(urls);

  const mergedData = mergeData(companyData, extractedData);
  csvWriter(mergedData);
});

app.post("/search-data", async (req: any, res: any) => {
  const elasticClient = new Client({
    node: "http://localhost:9200",
    auth: {
      apiKey: process.env.ELASTIC_API_KEY as string,
    },
  });
  const query: any = {
    query: {
      bool: {
        should: [],
        minimum_should_match: 1,
      },
    },
  };
  query.query = updateElasticQuery(query, req.body);

  try {
    const companies = await extractDataFromCsv(
      "merged-websites-information.csv"
    );
    await createElasticIndex(elasticClient);
    await insertElasticCompanies(elasticClient, companies);

    const response = await elasticClient.search({
      index: "companies",
      body: query,
    });

    const hits = response.hits.hits;

    if (hits.length > 0) {
      res.json(hits[0]._source);
    } else {
      res.status(404).json({ message: "No matching company profile found." });
    }
  } catch (error) {
    console.error("Error querying Elasticsearch:", error);
    res.status(500).json({ error: "Failed to match company profile." });
  }
});

app.post("/get-api-input", async (req: any, res: any) => {
  const input = await extractDataFromCsv("API-input-sample.csv");
  res.json(input);
});

app.listen(port, () => {
  console.log(`Server listening on port http://localhost:${port}`);
});

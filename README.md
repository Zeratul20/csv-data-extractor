### csv-data-extractor ###

Steps:

## 1. Data extraction ##

1.1 The scraping part
After some research, I found the # cheerio # library which helps a lot at this task. The next step was to find as much places where the information could reside (and a pretty much complicated phone number regex expression). Then, I encountered the first issue: a lot of domains were not found. I saw that some domains had http (basically were not having a certificate). Then I realized I would have a higher success rate if I were to also search the url with http prefix and without any prefix. After this improve, some domains returned "Unauthorized" error messages, so I assigned the rejectUnauthorized attribute from httpsAgent with false (I know this should not exist in a real project). After this, a lot of errors were 403 and 404, but also ETIMEDOUT. In order to solve this, I tried multiple approaches, with a timeout (no success) and also with retries, but from 685 successes and 7 minutes elapsed time, I went to 688, but with 26 minutes time. It was not worth it, so I gave up on the retry idea (still left it in the comment, also with the timeout in axiosFetch function). The statistic from the two runs mentioned above will be found in the next section.

Success:  688
Success rate:  69.00702106318957%
Phone numbers:  6106
Social media links:  1239
Address:  53
Time elapsed: 26.655533333333334 minutes

Success:  685
Success rate:  68.7061183550652%
Phone numbers:  6092
Social media links:  1243
Address:  53
Time elapsed: 7.110966666666667 minutes

1.2 The data analysis part
As can be seen in the section above, I did not receive errors at ~68.7% of files (685 of 997) (a lot of them were not existing anymore - tried to access them manually, also with http, https prefixes).

1.3 The scaling part
It clearly can be more scalable (The program is pretty well optimized from my perspective, maybe I could use fetch instead of axios - at a large scale the difference is visible). A major upgrade is if this could be run in multiple threads, maybe some AI for better recognition of data? - no very hard to be made since I think there is enough training data for this kind of problems

## 2. Data retrieval 🎣 ##

For this part of the task I did some research and I saw that Elastic Search would be a better fit for this type of task and for the tech stack I am using. Then, I found out this tool has an "extension" that can be used freely on the local environment and went for it.

2.1 The storing part
Not very much to talk about here, I extracted the data from the csv, merged with the data I extracted in the first exercise, then sorted them both by domain (I saw that they were in the same order, but I wanted this to be applied in a little more general environment and data set). Then, I uploaded the merged data into a new .csv file (merged-websites-information.csv)

2.2 The querying (final) part
As the name says, this was the query-building part (also, I needed to create an index and then populate it with the data)
From my perspective, the domain was the most important (when talking about the website input) - it had boost (weight) 5. Then the company commercial and legal names. I thought that the social media (facebook) had also a strong relevance, and the least relevance had the phone numbers which were not exactly the same. Another important fact is the fuzziness applied to company names. Although some companies can have similar names, I considered the name more important than other data.

I also tested the api with the API-input-sample and the results really impressed me. From what I saw, there was a high number of outputs that had very good relevance according to the input, I did not expect at first that Elastic Search would be so powerful. There were some outputs (2 of them which had little to no relevance to the input), but in rest it was pretty much good from my perspective.

## 3. Accuracy? ##

I think a pretty good way of measuring the accuracy (not manually) would be to check if the domain or name is equal to the input (which would be almost 100% equal). If not, we are talking about the elements that at most are similar. For this, what I think would be to write multiple queries with different logics, run them and see if they return the same result. If they do (assuming that the queries are written logically correct), then it is a very high change that the output is the right one.


Retro: This was a fun challenge, I leave with new learnings from it (the power of some tools, some of Elastic Search functionalities and how many data can be obtained from some websites).

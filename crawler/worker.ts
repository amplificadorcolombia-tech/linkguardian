import { Worker } from "bullmq"
import { crawlSite } from "./crawl"

const worker = new Worker(
  "scan-domain",
  async (job) => {
    const { domain, scanId, limit } = job.data

    console.log("Starting crawl:", domain)

    await crawlSite(domain, scanId, limit || 100)
  },
  {
    connection: {
      host: "127.0.0.1",
      port: 6379
    }
  }
)

worker.on("completed", (job) => {
  console.log(`Job ${job.id} completed`)
})

worker.on("failed", (job, err) => {
  console.error(`Job ${job?.id} failed`, err)
})
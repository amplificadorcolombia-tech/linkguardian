import { Worker } from "bullmq"

const worker = new Worker(
  "scan",
  async (job) => {
    console.log("Processing scan job:", job.data)

    // crawler logic will go here later
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
  console.log(`Job ${job?.id} failed`, err)
})
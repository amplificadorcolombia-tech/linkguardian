import { Queue } from "bullmq"

export const scanQueue = new Queue("scan", {
  connection: {
    host: "127.0.0.1",
    port: 6379
  }
})
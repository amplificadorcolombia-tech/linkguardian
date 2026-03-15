import express from "express"
import cors from "cors"
import { crawlSite } from "../crawler/crawl"

const app = express()

app.use(cors())
app.use(express.json())

// health route
app.get("/", (req, res) => {
  res.json({
    message: "Crawler server running"
  })
})

// scan route
app.post("/scan", async (req, res) => {

  try {

    const { domain, scanId, limit } = req.body

    if (!domain || !scanId) {
      return res.status(400).json({
        error: "Missing domain or scanId"
      })
    }

    console.log("Starting scan:", domain)

    // run crawler in background
    crawlSite(domain, scanId, limit || 100)

    res.json({
      success: true,
      message: "Scan started"
    })

  } catch (err) {

    console.error(err)

    res.status(500).json({
      error: "Scan failed"
    })

  }

})

app.listen(4000, () => {
  console.log("Crawler server running on port 4000")
})
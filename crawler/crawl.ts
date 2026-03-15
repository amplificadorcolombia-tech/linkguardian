import axios from "axios"
import cheerio from "cheerio"
import { PrismaClient } from "@prisma/client"
import { checkUrl } from "./httpCheck"

const prisma = new PrismaClient()

export async function crawlSite(domain: string, scanId: string, limit: number) {

  try {

    console.log("Crawling:", domain)

    const response = await axios.get(domain)

    const html = response.data

    const $ = cheerio.load(html)

    const links: string[] = []

    $("a").each((i, el) => {

      const href = $(el).attr("href")

      if (href && href.startsWith("http")) {
        links.push(href)
      }

    })

    const limitedLinks = links.slice(0, limit)

    for (const link of limitedLinks) {

      const result = await checkUrl(link)

      console.log(link, result.status)

      await prisma.link.create({
        data: {
          url: link,
          status: result.status,
          scan: {
            connect: {
              id: scanId
            }
          }
        }
      })

    }

    console.log("Scan finished")

  } catch (err) {

    console.error("Crawler error:", err)

  }

}
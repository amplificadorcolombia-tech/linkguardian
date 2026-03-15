import * as cheerio from "cheerio"

export function extractLinks(
  html: string,
  domain: string
) {

  const $ = cheerio.load(html)

  const links: string[] = []

  $("a").each((_, el) => {

    const href = $(el).attr("href")

    if (!href) return

    if (href.startsWith("http")) {

      if (href.includes(domain)) {
        links.push(href)
      }

    } else if (href.startsWith("/")) {

      links.push(domain + href)

    }

  })

  return links

}
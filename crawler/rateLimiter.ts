const lastRequest: Record<string, number> = {}

export async function rateLimit(
  domain: string
) {

  const now = Date.now()

  const last = lastRequest[domain] || 0

  const diff = now - last

  if (diff < 1000) {

    await new Promise(r =>
      setTimeout(r, 1000 - diff)
    )

  }

  lastRequest[domain] = Date.now()

}
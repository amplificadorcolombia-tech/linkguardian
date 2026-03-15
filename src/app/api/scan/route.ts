import { NextResponse } from "next/server"
import prisma from "../../../lib/db"

export async function POST(req: Request) {

  try {

    const body = await req.json()
    const { domain } = body

    if (!domain) {
      return NextResponse.json(
        { error: "Domain is required" },
        { status: 400 }
      )
    }

    const userId = "demo-user"

    // ensure demo user exists
    const existingUser = await prisma.user.findUnique({
      where: { id: userId }
    })

    if (!existingUser) {
      await prisma.user.create({
        data: {
          id: userId,
          email: "demo@example.com"
        }
      })
    }

    // create domain record
    const domainRecord = await prisma.domain.create({
      data: {
        domain,
        userId
      }
    })

    // create scan job
    const scan = await prisma.scan.create({
      data: {
        domainId: domainRecord.id,
        userId,
        status: "queued",
        pagesLimit: 100
      }
    })

    // send job to crawler
    await fetch("http://localhost:4000/scan", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        domain,
        scanId: scan.id,
        limit: 100
      })
    })

    return NextResponse.json({
      success: true,
      scanId: scan.id
    })

  } catch (error) {

    console.error(error)

    return NextResponse.json(
      { error: "Scan failed to start" },
      { status: 500 }
    )

  }

}
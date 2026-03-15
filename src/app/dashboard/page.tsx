"use client"

import { useState } from "react"
import axios from "axios"

export default function Dashboard() {

  const [domain, setDomain] = useState("")
  const [loading, setLoading] = useState(false)

  async function startScan() {

    setLoading(true)

    await axios.post("/api/scan", {
      domain
    })

    setLoading(false)
  }

  return (

    <div className="p-10">

      <h1 className="text-3xl font-bold">
        Broken Link Scanner
      </h1>

      <div className="mt-6 flex gap-4">

        <input
          placeholder="example.com"
          value={domain}
          onChange={e => setDomain(e.target.value)}
          className="border p-3 rounded w-96"
        />

        <button
          onClick={startScan}
          className="bg-blue-600 text-white px-6 rounded"
        >
          {loading ? "Scanning..." : "Start Scan"}
        </button>

      </div>

    </div>

  )
}
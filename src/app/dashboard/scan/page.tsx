"use client"

import { useEffect, useState } from "react"
import axios from "axios"

export default function ScanPage({ params }: any) {

  const [scan, setScan] = useState<any>(null)

  async function loadScan() {

    const res = await axios.get(
      "/api/scan/" + params.id
    )

    setScan(res.data)

  }

  useEffect(() => {

    loadScan()

    const interval = setInterval(loadScan, 3000)

    return () => clearInterval(interval)

  }, [])

  if (!scan) return <div>Loading...</div>

  return (

    <div className="p-10">

      <h1 className="text-3xl font-bold">
        Scan Results
      </h1>

      <div className="mt-4">

        Pages scanned: {scan.pagesScanned}

      </div>

      <table className="mt-6 w-full">

        <thead>
          <tr>
            <th>URL</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>

          {scan.links.map((l:any)=>(
            <tr key={l.id}>
              <td>{l.url}</td>
              <td>{l.status}</td>
            </tr>
          ))}

        </tbody>

      </table>

    </div>

  )

}
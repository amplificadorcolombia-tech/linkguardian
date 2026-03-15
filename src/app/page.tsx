"use client"

import { useState } from "react"

export default function Home() {

  const [domain, setDomain] = useState("")
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")

  const startScan = async () => {

    if (!domain) {
      setMessage("Please enter a domain")
      return
    }

    setLoading(true)
    setMessage("Starting scan...")

    try {

      const res = await fetch("/api/scan", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          domain,
          userId: "demo-user"
        })
      })

      const data = await res.json()

      if (data.success) {
        setMessage("Scan started successfully")
      } else {
        setMessage("Failed to start scan")
      }

    } catch (err) {
      setMessage("Server error")
    }

    setLoading(false)
  }

  return (

    <main style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      background: "#0b0f19"
    }}>

      <div style={{
        background: "#111827",
        padding: "40px",
        borderRadius: "12px",
        width: "420px",
        textAlign: "center"
      }}>

        <h1 style={{
          fontSize: "28px",
          marginBottom: "10px"
        }}>
          Broken Link Checker
        </h1>

        <p style={{
          color: "#9ca3af",
          marginBottom: "30px"
        }}>
          Scan your website for broken links
        </p>

        <input
          type="text"
          placeholder="https://example.com"
          value={domain}
          onChange={(e) => setDomain(e.target.value)}
          style={{
            width: "100%",
            padding: "12px",
            borderRadius: "6px",
            border: "1px solid #374151",
            background: "#0f172a",
            color: "white",
            marginBottom: "20px"
          }}
        />

        <button
          onClick={startScan}
          disabled={loading}
          style={{
            width: "100%",
            padding: "12px",
            borderRadius: "6px",
            border: "none",
            background: "#6366f1",
            color: "white",
            fontWeight: "bold"
          }}
        >
          {loading ? "Scanning..." : "Scan Website"}
        </button>

        {message && (
          <p style={{
            marginTop: "20px",
            color: "#9ca3af"
          }}>
            {message}
          </p>
        )}

      </div>

    </main>
  )
}
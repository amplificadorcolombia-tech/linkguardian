import axios from "axios"

export async function checkUrl(url: string) {

  try {

    const res = await axios.get(url, {
      timeout: 5000,
      validateStatus: () => true
    })

    return {
      status: res.status,
      ok: res.status >= 200 && res.status < 400
    }

  } catch (error) {

    return {
      status: 0,
      ok: false
    }

  }

}
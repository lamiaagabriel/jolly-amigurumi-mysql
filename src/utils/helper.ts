export const getPrice = (price: number) => price.toFixed(2)

export const getDate = (timestamp: string) => {
  return new Date(timestamp).toLocaleDateString("en-GB", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

export const getDateAgo = (timestamp: string) => {
  const timeInSeconds = new Date(timestamp).getSeconds()

  if (timeInSeconds < 60) return `${getFixed(timeInSeconds)} seconds ago`

  if (timeInSeconds < 60 * 60)
    return `${getFixed(timeInSeconds / 60)} minutes ago`

  if (timeInSeconds < 60 * 60 * 24)
    return `${getFixed(timeInSeconds / (60 * 60))} hours ago`

  return `${getFixed(timeInSeconds / (60 * 60 * 24))} days ago`
}

const getFixed = (num: number) => {
  return num.toFixed(0)
}

export const fetcher = async (
  url: RequestInfo | URL,
  options: RequestInit | undefined
) => {
  console.log("process.env.VERCEL_URL")
  console.log(process.env.VERCEL_URL)
  return await fetch(`${process.env.VERCEL_URL}/api${url}`, options).then(
    (res) => res.json()
  )
}

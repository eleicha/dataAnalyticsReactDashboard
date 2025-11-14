export async function fetchDatabricksData(query) {
  const response = await fetch(`/api/query?statement=${encodeURIComponent(query)}`)
  return await response.json()
}

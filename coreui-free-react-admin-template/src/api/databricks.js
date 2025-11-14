export async function fetchDatabricksData(query) {
  const url = `http://localhost:4000/api/query?statement=${encodeURIComponent(query)}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Backend error: ${response.statusText}`);
  }

  return await response.json();
}

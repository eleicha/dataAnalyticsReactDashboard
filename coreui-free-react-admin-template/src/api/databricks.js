/**
 * Asynchronous function to fetch data from databricks
 * Calls the backend API endpoint in the backend and sends the query string as statement
 * @param query Full SQL query as string
 * @returns {Promise<any>} response data as json
 */
export async function fetchDatabricksData(query) {
  // use await fetch() to call the backend api endpoint asynchronously
  // you need to use the path to the api endpoint add a ? to mark the query string
  // the query string consists of key-value pairs that are used to pass data to the server
  // the syntax is key=value
  // URLs can only contain certain characters, therefore, you should use encodeURIComponent()
  // function to ensure UTF-8 input
  const response = await fetch(`/api/query?statement=${encodeURIComponent(query)}`)
  // return the asynchronous response to the frontend
  return await response.json()
}

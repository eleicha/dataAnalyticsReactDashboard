import { useState, useEffect } from 'react'
import { fetchDatabricksData } from 'src/api/databricks'

/**
 * The hook to obtain data from the databricks api
 * @returns {{data: unknown, loading: boolean, error: unknown}}
 */
export function useDashboardData() {
  // create useState variables to keep track of data, loading, and error states
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // in the use effect call fetchDatabricksData
  // since fetchDatabricksData is an async function, you have to await the results
  // you also have to wrap that into another async function and call that function inside
  // useEffect
  // make sure to catch any errors
  // it is good practice to also include a final clause that sets the loading state
  // we won't use it in this training, but you can still set and return it
  useEffect(() => {
    async function fetchData() {
      try {
        const result = await fetchDatabricksData(
          'SELECT * FROM mhpdeworkshop_databricks.workshop_power_bi.nyc_taxi_cleaned LIMIT 15',
        )
        setData(result)
      } catch (err) {
        setError(err)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, []) // Runs only once at startup

  return { data, loading, error }
}

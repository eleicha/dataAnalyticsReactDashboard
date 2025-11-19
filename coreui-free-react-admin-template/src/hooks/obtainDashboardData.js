import { useState, useEffect } from 'react'
import { fetchDatabricksData } from 'src/api/databricks'

/**
 * The hook to obtain data from the databricks api
 * @returns {{data: unknown, loading: boolean, error: unknown}}
 */
export function useDashboardData() {
  // create useState variables to keep track of data, loading, and error states

  /* in the use effect call fetchDatabricksData
   since fetchDatabricksData is an async function, you have to await the results
   you also have to wrap that into another async function and call that function inside
   useEffect
   make sure to catch any errors
   it is good practice to also include a final clause that sets the loading state
   we won't use it in this training, but you can still set and return it
   Please use LIMIT when querying databricks! Please obtain a max of 100 values, 15 will
    probably be sufficient for our testing purposes
   */
  useEffect(() => {}, []) // Runs only once at startup
}

import React from 'react'
import classNames from 'classnames'

import {
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CProgress,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilPeople } from '@coreui/icons'

import MainChart from './MainChart'
import tripsObject from 'src/data/nycTaxiCleaned.json'
import { useDashboardData } from 'src/hooks/obtainDashboardData'

const DatabricksDashboard = () => {
  // uncomment if local data should be used
  const data = null
  // uncomment if databricks data should be used
  // const { data, loading, error } = useDashboardData()
  const queriedData = data ? data : tripsObject

  // Extract pick up times as a list
  // Tip: JavaScript has a .map(item => ... return ...) function that allows you to iterate
  // through a list of objects
  // you can also use new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })
  // to extract the time in 24hr format

  // calculate average tip amount, you can use Math.round to round your result
  // and .reduce((sum, item) => ... ) to calculate a sum
  // do the same for total_amount, tolls_amount, and congestion_surcharge

  // obtain the maximum of total amount, you can use Math.max(...object.map((item) => item.name))

  // Create some CProgress bars; and fill them with values you calculated above
  // look at progressExample in Dashboards.js for help, if you're stuck
  // Use Math.round() again to obtain nicer values

  // extract the earliest and latest pickup times to display below the chart's headline

  return (
    <>
      <CCard className="mb-4">
        <CCardBody>
          <CRow>
            <CCol sm={5}>
              <h4 id="traffic" className="card-title mb-0">
                Taxi trips
              </h4>
              <div className="small text-body-secondary">
                {/*add earliest and latest and latest pickup date*/}
              </div>
            </CCol>
            <CCol sm={7} className="d-none d-md-block"></CCol>
          </CRow>
          <MainChart
          /* Use the available input values to MainChart to fill the chart with actual values
            the labels should be pickup times
            then you can be creative with the other values
            I choose trip_distance, fare_amount, passenger_count
            you need a .map function again
            also, use a value that makes sense for y_max */
          />
        </CCardBody>
        <CCardFooter>
          <CRow
            xs={{ cols: 1, gutter: 4 }}
            sm={{ cols: 2 }}
            lg={{ cols: 4 }}
            xl={{ cols: 5 }}
            className="mb-2 text-center"
          >
            {
              // add the mapping for the progressExample here.
              // take a look at dashboard.js and copy the appropriate code
            }
          </CRow>
        </CCardFooter>
      </CCard>
      <CRow>
        <CCol xs>
          <CCard className="mb-4">
            <CCardHeader>
              Traffic {' & '} Sales - You can play around here and fill these vars
            </CCardHeader>
            <CCardBody>
              <CRow>
                <CCol xs={12} md={6} xl={6}>
                  <CRow>
                    <CCol xs={6}>
                      <div className="border-start border-start-4 border-start-info py-1 px-3">
                        <div className="text-body-secondary text-truncate small">
                          Average Tip Amount
                        </div>
                        <div className="fs-5 fw-semibold">todo</div>
                      </div>
                    </CCol>
                    <CCol xs={6}>
                      <div className="border-start border-start-4 border-start-danger py-1 px-3 mb-3">
                        <div className="text-body-secondary text-truncate small">
                          Average Total Amount
                        </div>
                        <div className="fs-5 fw-semibold">todo</div>
                      </div>
                    </CCol>
                  </CRow>
                  <hr className="mt-0" />
                </CCol>
                <CCol xs={12} md={6} xl={6}>
                  <CRow>
                    <CCol xs={6}>
                      <div className="border-start border-start-4 border-start-warning py-1 px-3 mb-3">
                        <div className="text-body-secondary text-truncate small">
                          Average Toll Amount
                        </div>
                        <div className="fs-5 fw-semibold">todo</div>
                      </div>
                    </CCol>
                    <CCol xs={6}>
                      <div className="border-start border-start-4 border-start-success py-1 px-3 mb-3">
                        <div className="text-body-secondary text-truncate small">
                          Average Congestion Surcharge
                        </div>
                        <div className="fs-5 fw-semibold">todo</div>
                      </div>
                    </CCol>
                  </CRow>

                  <hr className="mt-0" />

                  <div className="mb-5"></div>
                </CCol>
              </CRow>

              <br />
              {/* Here you can fill the table with the table with data
              Use the cilPeople icon as column name for the first column
              Then Pick Up, Fare Amount, Tip Amount, Payment Method, Drop Off
              Pick Up: use the vendor_id, passenger_count and pickup_datetime
              Fare Amount: total_amount
              Tip Amount: Percentage of tip_amount from total_amount
              Payment Method: store_and_fwd_flag with the true meaning added with the help of an
               if else, i.e. not displaying Y or N but store and forward trip and no store and forward trip
              Drop Off: dropoff_id, dropoff_time
              */}
              <CTable align="middle" className="mb-0 border" hover responsive>
                <CTableHead className="text-nowrap">
                  <CTableRow>
                    <CTableHeaderCell className="bg-body-tertiary text-center">
                      <CIcon icon={null} />
                    </CTableHeaderCell>
                    <CTableHeaderCell className="bg-body-tertiary">todo</CTableHeaderCell>
                    <CTableHeaderCell className="bg-body-tertiary text-center">
                      todo
                    </CTableHeaderCell>
                    <CTableHeaderCell className="bg-body-tertiary">todo</CTableHeaderCell>
                    <CTableHeaderCell className="bg-body-tertiary text-center">
                      todo
                    </CTableHeaderCell>
                    <CTableHeaderCell className="bg-body-tertiary">todo</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {/* todo: add the body here; don't write this on your own, use the
                 example in dashboard.js and adapt it accordingly*/}
                </CTableBody>
              </CTable>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default DatabricksDashboard

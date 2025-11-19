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
  const pickupTimes = queriedData.data.map((trip) => {
    const date = new Date(trip.pickup_datetime)
    return date.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })
  })

  // calculate average tip amount, you can use Math.round to round your result
  // and .reduce((sum, item) => ... ) to calculate a sum
  // do the same for total_amount, tolls_amount, and congestion_surcharge
  const averageTipAmount = Math.round(
    queriedData.data.reduce((sum, item) => sum + item.tip_amount, 0) / queriedData.data.length,
  )
  const averageTotalAmount = Math.round(
    queriedData.data.reduce((sum, item) => sum + item.total_amount, 0) / queriedData.data.length,
  )
  const averageTollAmount = Math.round(
    queriedData.data.reduce((sum, item) => sum + item.tolls_amount, 0) / queriedData.data.length,
  )
  const averageCongestionSurcharge = Math.round(
    queriedData.data.reduce((sum, item) => sum + item.congestion_surcharge, 0) /
      queriedData.data.length,
  )
  // obtain the maximum of total amount, you can use Math.max(...object.map((item) => item.name))
  const maxTotalAmount = Math.max(...queriedData.data.map((item) => item.total_amount))

  // Create some CProgress bars; and fill them with values you calculated above
  // Use Math.round() again to obtain nicer values
  const progressExample = [
    {
      title: 'Average Tip Amount',
      value: averageTipAmount,
      percent: Math.round((averageTipAmount / averageTotalAmount) * 100),
      color: 'success',
    },
    {
      title: 'Average Total Amount',
      value: averageTotalAmount,
      percent: Math.round((averageTotalAmount / maxTotalAmount) * 100),
      color: 'info',
    },
  ]

  // extract the earliest and latest pickup times to display below the chart's headline
  const getEarliestAndLatestPickup = (data) => {
    const pickupTimes = data.map((item) => new Date(item.pickup_datetime).getTime())
    const earliest = new Date(Math.min(...pickupTimes)).toLocaleString('de-DE')
    const latest = new Date(Math.max(...pickupTimes)).toLocaleString('de-DE')
    return { earliest, latest }
  }

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
                {getEarliestAndLatestPickup(queriedData.data).earliest} -{' '}
                {getEarliestAndLatestPickup(queriedData.data).latest}
              </div>
            </CCol>
            <CCol sm={7} className="d-none d-md-block"></CCol>
          </CRow>
          <MainChart
            // Use the available input values to MainChart to fill the chart with actual values
            // the labels should be pickup times
            // then you can be creative with the other values
            // I choose trip_distance, fare_amount, passenger_count
            // you need a .map function again
            // also, use a value that makes sense for y_max
            labels={pickupTimes}
            data_one={queriedData.data.map((trip) => trip.trip_distance)}
            data_two={queriedData.data.map((trip) => trip.fare_amount)}
            data_three={queriedData.data.map((trip) => trip.passenger_count)}
            y_max={50}
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
              // here the progressExample is mapped and displayed below the chart
              progressExample.map((item, index, items) => (
                <CCol
                  className={classNames({
                    'd-none d-xl-block': index + 1 === items.length,
                  })}
                  key={index}
                >
                  <div className="text-body-secondary">{item.title}</div>
                  <div className="fw-semibold text-truncate">
                    {item.value} ({item.percent}%)
                  </div>
                  <CProgress thin className="mt-2" color={item.color} value={item.percent} />
                </CCol>
              ))
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
                        <div className="fs-5 fw-semibold">{averageTipAmount}</div>
                      </div>
                    </CCol>
                    <CCol xs={6}>
                      <div className="border-start border-start-4 border-start-danger py-1 px-3 mb-3">
                        <div className="text-body-secondary text-truncate small">
                          Average Total Amount
                        </div>
                        <div className="fs-5 fw-semibold">{averageTotalAmount}</div>
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
                        <div className="fs-5 fw-semibold">{averageTollAmount}</div>
                      </div>
                    </CCol>
                    <CCol xs={6}>
                      <div className="border-start border-start-4 border-start-success py-1 px-3 mb-3">
                        <div className="text-body-secondary text-truncate small">
                          Average Congestion Surcharge
                        </div>
                        <div className="fs-5 fw-semibold">{averageCongestionSurcharge}</div>
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
                      <CIcon icon={cilPeople} />
                    </CTableHeaderCell>
                    <CTableHeaderCell className="bg-body-tertiary">Pick Up</CTableHeaderCell>
                    <CTableHeaderCell className="bg-body-tertiary text-center">
                      Fare Amount
                    </CTableHeaderCell>
                    <CTableHeaderCell className="bg-body-tertiary">Tip Amount</CTableHeaderCell>
                    <CTableHeaderCell className="bg-body-tertiary text-center">
                      Payment Method
                    </CTableHeaderCell>
                    <CTableHeaderCell className="bg-body-tertiary">Drop Off</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {queriedData.data.map((item, index) => (
                    <CTableRow v-for="item in tableItems" key={index}>
                      <CTableDataCell className="text-center">
                        <div className="fw-semibold">{item.vendor_id}</div>{' '}
                      </CTableDataCell>
                      <CTableDataCell>
                        <div>{item.pickup_location_id}</div>
                        <div className="small text-body-secondary text-nowrap">
                          <span>{item.passenger_count}</span> | Time:{' '}
                          {new Date(item.pickup_datetime).toLocaleString('de-DE')}
                        </div>
                      </CTableDataCell>
                      <CTableDataCell className="text-center">
                        <div className="fw-semibold">{item.total_amount}</div>
                      </CTableDataCell>
                      <CTableDataCell>
                        <div className="d-flex justify-content-between text-nowrap">
                          <div className="fw-semibold">
                            {Math.round((item.tip_amount / item.total_amount) * 100)}%
                          </div>
                        </div>
                        <CProgress
                          thin
                          color={'success'}
                          value={Math.round((item.tip_amount / item.total_amount) * 100)}
                        />
                      </CTableDataCell>
                      <CTableDataCell className="text-center">
                        <div className="fw-semibold">
                          {item.store_and_fwd_flag === 'Y'
                            ? 'store and forward trip'
                            : 'no store and forward trip'}
                        </div>
                      </CTableDataCell>
                      <CTableDataCell>
                        <div className="small text-body-secondary text-nowrap">
                          Location: {item.dropoff_location_id}
                        </div>
                        <div className="fw-semibold text-nowrap">
                          Time: {new Date(item.dropoff_datetime).toLocaleString('de-DE')}
                        </div>
                      </CTableDataCell>
                    </CTableRow>
                  ))}
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

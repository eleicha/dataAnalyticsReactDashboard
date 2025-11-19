import React, { useEffect, useRef } from 'react'

import { CChartLine } from '@coreui/react-chartjs'
import { getStyle } from '@coreui/utils'

/**
 * Creates a line chart with two lines
 * if input params are not given, dummy values will be used
 * @param labels array of labels
 * @param data_one array of data values
 * @param data_two array of data values
 * @param data_three array of data values
 * @param y_max max value for y-axis
 * @returns {JSX.Element}
 * @constructor
 */
const MainChart = ({ labels, data_one, data_two, data_three, y_max }) => {
  const chartRef = useRef(null)

  useEffect(() => {
    const handleColorSchemeChange = () => {
      if (chartRef.current) {
        setTimeout(() => {
          chartRef.current.options.scales.x.grid.borderColor = getStyle(
            '--cui-border-color-translucent',
          )
          chartRef.current.options.scales.x.grid.color = getStyle('--cui-border-color-translucent')
          chartRef.current.options.scales.x.ticks.color = getStyle('--cui-body-color')
          chartRef.current.options.scales.y.grid.borderColor = getStyle(
            '--cui-border-color-translucent',
          )
          chartRef.current.options.scales.y.grid.color = getStyle('--cui-border-color-translucent')
          chartRef.current.options.scales.y.ticks.color = getStyle('--cui-body-color')
          chartRef.current.update()
        })
      }
    }

    document.documentElement.addEventListener('ColorSchemeChange', handleColorSchemeChange)
    return () =>
      document.documentElement.removeEventListener('ColorSchemeChange', handleColorSchemeChange)
  }, [chartRef])

  const random = (min = 0, max = 100) => Math.floor(Math.random() * (max - min + 1)) + min

  return (
    <>
      <CChartLine
        ref={chartRef}
        style={{ height: '300px', marginTop: '40px' }}
        data={{
          labels:
            labels === undefined
              ? ['January', 'February', 'March', 'April', 'May', 'June', 'July']
              : labels,
          datasets: [
            {
              label: 'My First dataset',
              backgroundColor: `rgba(${getStyle('--cui-info-rgb')}, .1)`,
              borderColor: getStyle('--cui-info'),
              pointHoverBackgroundColor: getStyle('--cui-info'),
              borderWidth: 2,
              data:
                data_one === undefined
                  ? [
                      random(50, 200),
                      random(50, 200),
                      random(50, 200),
                      random(50, 200),
                      random(50, 200),
                      random(50, 200),
                      random(50, 200),
                    ]
                  : data_one,
              fill: true,
            },
            {
              label: 'My Second dataset',
              backgroundColor: 'transparent',
              borderColor: getStyle('--cui-success'),
              pointHoverBackgroundColor: getStyle('--cui-success'),
              borderWidth: 2,
              data:
                data_two === undefined
                  ? [
                      random(50, 200),
                      random(50, 200),
                      random(50, 200),
                      random(50, 200),
                      random(50, 200),
                      random(50, 200),
                      random(50, 200),
                    ]
                  : data_two,
            },
            {
              label: 'My Third dataset',
              backgroundColor: 'transparent',
              borderColor: getStyle('--cui-danger'),
              pointHoverBackgroundColor: getStyle('--cui-danger'),
              borderWidth: 1,
              borderDash: [8, 5],
              data: data_three === undefined ? [65, 65, 65, 65, 65, 65, 65] : data_three,
            },
          ],
        }}
        options={{
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false,
            },
          },
          scales: {
            x: {
              grid: {
                color: getStyle('--cui-border-color-translucent'),
                drawOnChartArea: false,
              },
              ticks: {
                color: getStyle('--cui-body-color'),
              },
            },
            y: {
              beginAtZero: true,
              border: {
                color: getStyle('--cui-border-color-translucent'),
              },
              grid: {
                color: getStyle('--cui-border-color-translucent'),
              },
              max: y_max === undefined ? 250 : y_max,
              ticks: {
                color: getStyle('--cui-body-color'),
                maxTicksLimit: 5,
                stepSize: Math.ceil(250 / 5),
              },
            },
          },
          elements: {
            line: {
              tension: 0.4,
            },
            point: {
              radius: 0,
              hitRadius: 10,
              hoverRadius: 4,
              hoverBorderWidth: 3,
            },
          },
        }}
      />
    </>
  )
}

export default MainChart

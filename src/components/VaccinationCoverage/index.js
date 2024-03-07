// Write your code here

import {BarChart, Bar, XAxis, YAxis, Legend} from 'recharts'

const VaccinationCoverage = props => {
  const {lastsevendays} = props
  console.log(lastsevendays)

  const DataFormatter = number => {
    if (number > 1000) {
      return `${(number / 1000).toString()}k`
    }
    return number.toString()
  }

  return (
    <div>
      <h1>Vaccination Coverage</h1>
      <BarChart
        width={1000}
        height={300}
        data={lastsevendays}
        margin={{
          top: 5,
        }}
      >
        <XAxis
          dataKey="vaccineDate"
          tick={{
            stroke: 'gray',
            strokeWidth: 1,
          }}
        />
        <YAxis
          tickFormatter={DataFormatter}
          tick={{
            stroke: 'gray',
            strokeWidth: 0,
          }}
        />
        <Legend
          wrapperStyle={{
            padding: 30,
          }}
        />
        <Bar
          dataKey="Dose1"
          name={lastsevendays.dose1}
          fill="#1f77b4"
          barSize="20%"
        />
        <Bar
          dataKey="Dose2"
          name={lastsevendays.dose2}
          fill="#f54394"
          barSize="10%"
        />
      </BarChart>
    </div>
  )
}

export default VaccinationCoverage

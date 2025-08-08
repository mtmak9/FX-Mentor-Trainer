import React from 'react'
import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

export default function ChartPanel({ticks}){
  const labels = ticks.map(t => new Date(t.ts).toLocaleTimeString())
  const data = {
    labels,
    datasets: [
      {
        label: 'Price',
        data: ticks.map(t => t.price),
        tension: 0.3,
      }
    ]
  }

  return (
    <div style={{height:300, width:800}}>
      <Line data={data} />
    </div>
  )
}
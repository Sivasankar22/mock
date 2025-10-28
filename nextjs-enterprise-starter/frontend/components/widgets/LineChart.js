import { Line } from 'react-chartjs-2'
import { Chart as C, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend } from 'chart.js'
C.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend)

export default function LineChart({points=[]}){
  const labels = points.map((p,i)=>i+1)
  const data = {
    labels,
    datasets: [{
      label: 'Requests',
      data: points,
      tension: 0.3,
      fill: true,
    }]
  }
  return <div className="w-full"><Line data={data} /></div>
}

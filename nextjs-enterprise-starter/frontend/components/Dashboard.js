import dynamic from 'next/dynamic'
import { useSelector } from 'react-redux'
import Notifs from './Notifs'
import Link from 'next/link'
import { useEffect, useState } from 'react'
const Chart = dynamic(() => import('./widgets/LineChart'), { ssr: false, loading: ()=> <div>Loading chart...</div> })

export default function Dashboard(){
  const user = useSelector(s=>s.auth.user)
  const [data,setData] = useState(null)

  useEffect(()=>{
    // fetch role-specific data from mock API
    fetch('/api/data?role=' + encodeURIComponent(user?.role || 'Employee')).then(r=>r.json()).then(setData)
  },[user])

  return (
    <div className="space-y-6">
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card title="Welcome">
          <p>Hello <strong>{user?.username}</strong>, role: <em>{user?.role}</em></p>
          <p className="mt-2 text-sm">Quick links:</p>
          <ul className="mt-2 space-y-1 text-sm">
            <li><Link href="#"><a>Profile</a></Link></li>
            <li><Link href="#"><a>Settings</a></Link></li>
          </ul>
        </Card>

        <Card title="Live Notifications" className="md:col-span-1">
          <Notifs />
        </Card>

        <Card title="Metrics" className="md:col-span-1">
          {data ? <Chart points={data.points} /> : <div>Loading...</div>}
        </Card>
      </section>

      <section>
        <h3 className="text-lg font-semibold mb-2">Role-specific content</h3>
        <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
          <pre className="text-xs">{JSON.stringify(data?.payload || {message: 'No payload'}, null, 2)}</pre>
        </div>
      </section>
    </div>
  )
}

function Card({children,title, className=''}) {
  return (
    <div className={"p-4 bg-white dark:bg-gray-800 rounded shadow " + className}>
      <h4 className="font-medium mb-2">{title}</h4>
      {children}
    </div>
  )
}

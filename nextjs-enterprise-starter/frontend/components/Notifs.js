import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { add, clear } from '../store/slices/notifSlice'

export default function Notifs(){
  const dispatch = useDispatch()
  const items = useSelector(s=>s.notif.items)

  useEffect(()=>{
    const ws = new WebSocket('ws://localhost:4000')
    ws.addEventListener('message', e=>{
      try {
        const data = JSON.parse(e.data)
        dispatch(add(data))
      } catch(err){}
    })
    return ()=> ws.close()
  },[dispatch])

  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <strong>Notifications</strong>
        <button onClick={()=>dispatch(clear())} className="text-sm text-gray-500">Clear</button>
      </div>
      <ul className="text-sm space-y-2 max-h-40 overflow-auto">
        {items.length===0 && <li className="text-gray-500">No notifications yet</li>}
        {items.map((it, idx)=>(
          <li key={idx} className="p-2 bg-gray-50 dark:bg-gray-700 rounded">
            <div className="text-xs text-gray-400">{new Date(it.ts).toLocaleTimeString()}</div>
            <div>{it.message}</div>
          </li>
        ))}
      </ul>
    </div>
  )
}

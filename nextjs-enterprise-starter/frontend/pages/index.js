import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loginSuccess, logout } from '../store/slices/authSlice'
import Link from 'next/link'
import Dashboard from '../components/Dashboard'

export default function Home() {
  const dispatch = useDispatch()
  const user = useSelector(s => s.auth.user)
  const [username, setUsername] = useState('')
  const [role, setRole] = useState('Employee')

  useEffect(() => {
    // attempt to restore from localStorage
    const raw = localStorage.getItem('user')
    if (raw) dispatch(loginSuccess(JSON.parse(raw)))
  }, [dispatch])

  function handleLogin(e) {
    e.preventDefault()
    const u = { username: username || 'demo', role }
    localStorage.setItem('user', JSON.stringify(u))
    dispatch(loginSuccess(u))
  }
  function handleLogout() {
    localStorage.removeItem('user')
    dispatch(logout())
  }
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <header className="p-4 border-b border-gray-200 dark:border-gray-800 flex justify-between items-center">
        <h1 className="text-xl font-semibold">Enterprise Portal</h1>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          {user ? (
            <div className="flex items-center gap-2">
              <span className="sr-only">Logged in as</span>
              <span className="text-sm">{user.username} ({user.role})</span>
              <button onClick={handleLogout} className="px-3 py-1 rounded bg-red-500 text-white">Logout</button>
            </div>
          ) : <Link href="#login"><a className="px-3 py-1 rounded bg-indigo-600 text-white">Login</a></Link>}
        </div>
      </header>

      <main className="p-6">
        {!user ? (
          <form id="login" onSubmit={handleLogin} className="max-w-md mx-auto bg-white dark:bg-gray-800 p-6 rounded shadow">
            <h2 className="text-lg font-medium mb-4">Sign in (demo)</h2>
            <label className="block mb-2">Username
              <input className="mt-1 block w-full p-2 rounded bg-gray-50 dark:bg-gray-700" value={username} onChange={e => setUsername(e.target.value)} />
            </label>
            <label className="block mb-4">Role
              <select className="mt-1 block w-full p-2 rounded bg-gray-50 dark:bg-gray-700" value={role} onChange={e=>setRole(e.target.value)}>
                <option>Admin</option>
                <option>HR</option>
                <option>Finance</option>
                <option>Sales</option>
                <option>Employee</option>
              </select>
            </label>
            <button className="w-full py-2 rounded bg-indigo-600 text-white">Sign in</button>
          </form>
        ) : (
          <Dashboard />
        )}
      </main>
    </div>
  )
}

function ThemeToggle(){
  function toggle(){
    const cur = document.documentElement.classList.toggle('dark')
    localStorage.setItem('theme', cur ? 'dark' : 'light')
  }
  return (
    <button onClick={toggle} aria-label="Toggle theme" className="p-2 rounded bg-gray-200 dark:bg-gray-700">
      🌓
    </button>
  )
}

import '../styles/globals.css'
import { Provider } from 'react-redux'
import { store } from '../store/store'
import { useEffect } from 'react'
function MyApp({ Component, pageProps }) {
  useEffect(() => {
    // apply saved theme
    const theme = localStorage.getItem('theme') || 'light'
    if (theme === 'dark') document.documentElement.classList.add('dark')
  }, [])
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  )
}
export default MyApp

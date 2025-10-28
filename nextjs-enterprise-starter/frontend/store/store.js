import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slices/authSlice'
import notifReducer from './slices/notifSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    notif: notifReducer
  }
})

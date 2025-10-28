import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user: null, // { username, role }
}

const auth = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess(state, action) {
      state.user = action.payload
    },
    logout(state) {
      state.user = null
    }
  }
})

export const { loginSuccess, logout } = auth.actions
export default auth.reducer

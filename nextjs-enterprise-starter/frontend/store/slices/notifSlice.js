import { createSlice } from '@reduxjs/toolkit'

const notif = createSlice({
  name: 'notif',
  initialState: { items: [] },
  reducers: {
    add(state, action) {
      state.items.unshift(action.payload)
      if (state.items.length > 50) state.items.pop()
    },
    clear(state) {
      state.items = []
    }
  }
})

export const { add, clear } = notif.actions
export default notif.reducer

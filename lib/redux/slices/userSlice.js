import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  data: null,
  token: null
}
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setLoginState: (state, action) => {
      state.data = action.payload
    },
    setLogOutState: state => {
      // state.data = null
      state.token = null
    },
    setToken: (state, action) => {
      state.token = action.payload
    }
  }
})
export const { setLoginState, setLogOutState, setToken } = userSlice.actions
export default userSlice.reducer

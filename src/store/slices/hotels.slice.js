import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const hotelsSlice = createSlice({
  name: 'hotels',
  initialState: null,
  reducers: {
    setHotel: (state, action) => action.payload
  }
})

export const { setHotel } = hotelsSlice.actions;

export default hotelsSlice.reducer;


export const getHotelsThunk = (url) => (dispatch) => {
    axios
    .get(url)
    .then((res) => dispatch(setHotel(res.data)))
    .catch((err) => console.error(err))
}

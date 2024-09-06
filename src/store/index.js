import { configureStore } from '@reduxjs/toolkit'
import hotels from './slices/hotels.slice'

export default configureStore({
  reducer:{
    hotels
  }
})

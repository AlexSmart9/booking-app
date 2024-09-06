import React from 'react'
import { useForm } from 'react-hook-form'
import useCrud from '../../hooks/useCrud'
import { useNavigate } from 'react-router-dom'
import './Styles/FormReservations.css'

const FormReservations = ({hotelId}) => {
  const {reset, handleSubmit, register} = useForm()
  const [,,createBooking] = useCrud()
  const navigate = useNavigate()
  const submit = (data) => { 
    const url = 'https://hotels-api.academlo.tech/bookings'

    const objData = {...data, hotelId}

    createBooking(url, objData ,true)
    reset({
        checkIn:'',
        checkOut:''
    })

    navigate('/reservations')
   }
  return (
    <div className='reservation__form-container'>
      <form onSubmit={handleSubmit(submit)}>
        <h3 className='reservation__title'>Make Your Reservation Here</h3>
        <div className='reservation__form-labels flex-container'>
          <label className='reservation__form-label flex-container'>
            <span className='reservation__check-in'>Check-In</span>
            <input type="date" {...register('checkIn')} />
          </label>
          <label className='reservation__form-label flex-container'>
            <span className='reservation__check-out'>Check-out</span>
            <input {...register('checkOut')} type="date" />
          </label>
        </div>
        <button className='reservation__form-btn'>Reserve a Room</button>
    </form>
    </div>
  )
}

export default FormReservations
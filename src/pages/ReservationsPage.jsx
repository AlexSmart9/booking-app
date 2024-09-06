import React, { useEffect, useState } from 'react'
import useCrud from '../hooks/useCrud'
import './styles/Reservationspage.css'
import BookCard from '../components/ReservationsPage/BookCard'
import FormReviews from '../components/ReservationsPage/FormReviews'
import { Link } from 'react-router-dom'

const ReservationsPage = () => {
  const [reservation,getReservation,,deleteReservation] = useCrud()

  const [bookSelected, setBookSelected] = useState()
  const [formIsOpen, setFormIsOpen] = useState(false)

  useEffect(() => {
    const url = 'https://hotels-api.academlo.tech/bookings'
    getReservation(url,true)
  }, [])
  
  return (
    <section className='reservations flex-container'>
      <h2 className='reservation__title'>Reservations</h2>
      {
        reservation?.length ? (<div>
          <FormReviews 
          formIsOpen={formIsOpen} 
          bookSelected={bookSelected} 
          setFormIsOpen={setFormIsOpen} 
          setBookSelected={setBookSelected}/>
      <div className='reservations__container flex-container'>
        {
          reservation?.map(book => (
            <BookCard 
            key={book.id} 
            book={book} 
            deleteReservation={deleteReservation}
            setBookSelected={setBookSelected}
            setFormIsOpen={setFormIsOpen}/>
          ))
        }
      </div>
        </div>) : (<h2>
          There aren't active reservations. To chose a hotel and book go to {' '}
          <Link to='/'>Home</Link>
        </h2>)
      }
      
    </section>
  )
}

export default ReservationsPage
import React, { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import useFetch from '../../hooks/useFetch'
import StarGenerator from '../HomePage/share/StarGenerator'
import OtherHotels from './OtherHotels'
import HotelMap from './HotelMap'
import FormReservations from './FormReservations'
import Reviews from './Reviews'
import SliderImgHotel from './SliderImgHotel'
import './Styles/HotelDetailsPage.css'

const HotelDetailsPage = () => {
    const {id} = useParams()

    const [hotel, getHotel] = useFetch()

    useEffect(() => {
      const url = `https://hotels-api.academlo.tech/hotels/${id}`
      getHotel(url)
    }, [id])
    
  return (
    <section className='hoteldetails'>
        <h2 className='hoteldetails__name flex-container'>{hotel?.name}</h2>
        <div className='hoteldetails__rating flex-container'>
            {hotel?.rating && <StarGenerator rating={hotel.rating}/>}
            <span className=''>{hotel?.rating}</span>
        </div>
        <div className='hoteldetails__container flex-container'> 
          <div>
            <SliderImgHotel hotel={hotel}/>
          </div>
            {hotel && <HotelMap lat={hotel?.lat} lon={hotel?.lon} />}
        </div>
        <div className='hoteldetails__location'>
            {hotel?.city.name}, {hotel?.city.country}
        </div>
        <div className='hoteldetails__addres flex-container'>
            <i className="bx bx-map"></i>
            <address>{hotel?.address}</address>
        </div>
        <h2>About</h2>
        <p className='hoteldetails__description-text'>{hotel?.description}</p>
        <section>
          {
            localStorage.getItem('token')
            ? (<FormReservations hotelId={hotel?.id}/> ) : ( <p>
              If you want to make a reservation, please{' '}
              <Link to="/login">Login</Link>
            </p>
          )}
          
        </section>
        <div>
          <Reviews hotelId={hotel?.id}/>
        </div>
        <OtherHotels city={hotel?.city} id={hotel?.id} />
    </section>
  )
}

export default HotelDetailsPage
import React, { useEffect } from 'react'
import useFetch from '../../hooks/useFetch'
import HotelCard from '../HomePage/HotelCard'
import './Styles/OtherHotels.css'

const OtherHotels = ({city, id}) => { const [hotelsByCity , getHotelsByCity] = useFetch()

    useEffect(() => {
     if (city) {
        const url =`https://hotels-api.academlo.tech/hotels?cityId=${city.id}`
        getHotelsByCity(url)
     }
    }, [city])
    
  return (
    <section>
        <h3 className='otherhotels__title'>
        Other Hotels in <span className='otherhotels__name'>{city?.country}</span>
        </h3>
        <div className='otherhotels__container flex-container'>
            {
                hotelsByCity?.filter((hotel) => hotel.id !==id).map((hotel) => (
                    <HotelCard key={hotel.id} hotel={hotel}/>
                ))
            }
        </div>
    </section>
  )
}

export default OtherHotels
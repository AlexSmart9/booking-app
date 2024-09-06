import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getHotelsThunk } from '../store/slices/hotels.slice'
import HotelCard from '../components/HomePage/HotelCard'
import './styles/HomePage.css'
import FilterByName from '../components/HomePage/FilterByName'
import FilterByCity from '../components/HomePage/FilterByCity'
import FilterByPrice from '../components/HomePage/FilterByPrice'

const HomePage = () => {
  const [nameFiltered, setNameFiltered] = useState('')
  const [priceFilter, setPriceFilter] = useState({
    from: 0,
    to: Infinity
  })

  const [filtersAreOpen, setFiltersAreOpen] = useState(false)
   const hotels = useSelector((states) => states.hotels )
   const dispatch = useDispatch()
   useEffect(() => {
        const url = 'https://hotels-api.academlo.tech/hotels'
        dispatch(getHotelsThunk(url))
   }, [])
   
   const callbackFilter = (hotel) => { 
      const filterName = hotel.name.toLowerCase().includes(nameFiltered)

      const price = +hotel.price
      const filterByPrice= price >= priceFilter.from && price <= priceFilter.to
      return filterName && filterByPrice
    }

    const handleFiltersClose = () => { 
        setFiltersAreOpen(false)
     }

     const handleFiltersOpen = () => { 
        setFiltersAreOpen(true)
      }
  return (
    <div className='home'>
      <section className={`home__filters grid-container ${filtersAreOpen || 'home__filters-closed'}`}>
        <i onClick={handleFiltersClose} className="bx bx-x-circle home__filters-btnclose"></i>
        <h3 className='home__filters-title'>Filters</h3>
        <FilterByPrice handleFiltersClose={handleFiltersClose} setPriceFilter={setPriceFilter}/>
        <FilterByCity handleFiltersClose={handleFiltersClose} setNameFiltered={setNameFiltered} setPriceFilter={setPriceFilter}/>
      </section>
      <section className='home__hotels grid-container'>
        <div className='home__hotels-filters flex-container'>
            <FilterByName setNameFiltered={setNameFiltered}/> 
            <i onClick={handleFiltersOpen} className="bx bx-filter-alt home__hotels-btnfilters"></i>

        </div>
        <div className='hotels__container flex-container'> 
        {
            hotels?.filter(callbackFilter).map((hotel) => (
              <HotelCard key={hotel.id} hotel={hotel} />
            ))
        }
        </div>
    </section>
    </div>
    
  )
}

export default HomePage
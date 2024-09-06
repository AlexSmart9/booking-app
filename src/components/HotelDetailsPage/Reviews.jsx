import React, { useEffect, useState } from 'react'
import useFetch from '../../hooks/useFetch'
import StarGenerator from '../HomePage/share/StarGenerator'
import './Styles/Reviews.css'

const Reviews = ({hotelId}) => {
    const [visibleComments, setVisibleComments] = useState(5)
    const [reviews, getReviews] = useFetch()

    useEffect(() => {
        const url = `https://hotels-api.academlo.tech/reviews?hotelId=${hotelId}`;
        getReviews(url)
    }, [hotelId])

    const handleReviews = () => { 
        setVisibleComments((prevCount) => prevCount + 5)
     }
    
  return (
    <div className='reviews__comments'>
        <h3 className='reviews__comments-title'>Comments</h3>
        <div className='reviews__comments-container flex-container'>
            {
                reviews?.results.slice(0, visibleComments).map((review)=>(
                    <ul key={review.id}>
                        <li>{review.user.firstName}</li>
                        <li>
                            <StarGenerator rating={review.rating}/> {review.rating}
                        </li>
                        <li>{review.comment}</li>
                    </ul>
                ))
            }
        </div>
        {
            visibleComments < reviews?.results.length && <button className='reviews__btn' onClick={handleReviews}>See more...</button>
        }
    </div>
  )
}

export default Reviews
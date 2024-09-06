import React, { useEffect, useState } from 'react'
import useAuth from '../hooks/useAuth'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import './styles/LoginPage.css'
import Swal from 'sweetalert2'

const LoginPage = () => {
    const [userLogged, setUserLogged] = useState()
    const {loginUser} = useAuth()
    const {handleSubmit, register, reset, formState: {errors}} = useForm({mode:'onChange'})
    const navigate = useNavigate()

    const submit = (data) => { 
        loginUser(data)
        reset({
            email:'',
            password:'',
        
        })
        navigate('/')
        Swal.fire({
            title: "You are Logged!",
            text: "Welcome to Academlo Hotels!",
            icon: "success",
            cancelButtonColor: '#000'
          });
     }

     useEffect(() => {
       const userFromLocalStorage = localStorage.getItem('userLogged')
        if (userFromLocalStorage) {
            const parsedUser = JSON.parse(userFromLocalStorage)
            setUserLogged(parsedUser)
        }
     }, [])

     const handleDeleteLocalStorage = () => { 

        Swal.fire({
            title: "Are you sure you want to logout?",
            text: "You can log again whenever you want!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#999",
            cancelButtonColor: "#ea4959",
            confirmButtonText: "Yes, Logout!"
          }).then((result) => {
            if (result.isConfirmed) {
                localStorage.removeItem('token')
        localStorage.removeItem('userLogged')
        navigate('/')
              Swal.fire({
                title: "Logout!",
                text: "Succesfully logged out.",
                icon: "success",
                cancelButtonColor: '#000'
              });
            }
          });
      }
     
  return (
    <section className='login flex-container'>
        {
            userLogged ? (
            <div >
                {userLogged.gender === 'female' ? (
                <i className="bx bx-female user__logo"></i> ) : ( 
                <i className="bx bx-male user__logo"></i>)}
                <h2 >{"Welcome, "}<span className='user__welcome'>{userLogged.firstName} {userLogged.lastName}</span></h2>
                <button onClick={handleDeleteLocalStorage} className='user_-btn'>Logout</button>
            </div>
            ): (
        <div>
            <i className="bx bxs-user-circle user__logo"></i>
            <form className='user__form flex-container' onSubmit={handleSubmit(submit)}>
            <h2 className='user__name'>Login User</h2>
                <label className='user__form-field grid-container'>
                    <span className='user__form-label'>Email</span>
                    <input className='user__form-input' type="text" {...register('email')} />
                </label>
                <label className='user__form-field grid-container'>
                    <span className='user__form-label'>Password</span>
                    <input className='user__form-input' type="password" {...register('password')}/>
                </label>
            
            <button className='user__btn-login'>Submit</button>
        </form>
        </div>
        
)}
    </section>
  )
}

export default LoginPage


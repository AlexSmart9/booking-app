import { useState } from "react"
import getConfigToken from "../services/getConfigToken"
import axios from "axios"


const useCrud = () => {

const [response, setResponse] = useState()
    const getData = (url, withToken) => { 
        axios.get(url, withToken ? getConfigToken() : {})
        .then((res) =>setResponse(res.data))
        .catch((err) => {
            console.error(err)
            //401 NO ESTA AUTORIZADO O 403 EL TOKEN EXPIRO
            if (err?.response.status === 401|| err?.response.status === 403) {
                localStorage.removeItem('item')
                localStorage.removeItem('userLogged')
            }
        })

     }

     const postData = (url, data, withToken ) => { 
        axios.post(url, data, withToken ? getConfigToken() : {})
        .then((res) =>{
            console.log(res.data)
            setResponse(response ? [...response, res.data] : [res.data])})
        .catch((err) => {
            console.error(err)
            if (err?.response.status === 401|| err?.response.status === 403) {
                localStorage.removeItem('item')
                localStorage.removeItem('userLogged')
            }
        })
      }

     const deleteData = (url, id, withToken) => { 
        axios.delete(url, id, withToken ? getConfigToken() : {} )
        .then((res) =>setResponse(response.filter((item) => item.id !== id)))
        .catch((err) => {
            console.error(err)
            if (err?.response.status === 401|| err?.response.status === 403) {
                localStorage.removeItem('token')
                localStorage.removeItem('userLogged')
            }
     })}
    return [response, getData, postData, deleteData]
    }


export default useCrud
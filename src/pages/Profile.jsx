import axios from 'axios'
import React, { useState } from 'react'
import { useEffect } from 'react'

function Profile() {

    const [jwt, setJwt]=useState()

    useEffect(()=>{
        let jwtLocal=localStorage.getItem('jwt')
        setJwt(jwtLocal)
        console.log(jwt)

    })
    useEffect(()=>{
        axios.get('http://127.0.0.1:8001/api/user')
        .then((res)=>console.log(res))
    }, [])
  return (
    <div>Profile</div>
  )
}

export default Profile
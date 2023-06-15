import axios from 'axios'
import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';


axios.defaults.xsrfCookieName='csrftoken';
axios.defaults.xsrfHeaderName='X-CSRFToken';
axios.defaults.withCredentials=true
const csrfToken = Cookies.get('csrftoken');
const client=axios.create({
  baseURL:'http://127.0.0.1:8001',
 
})
function Login() {
  const [jwt, setJwt]=useState(null)
  const navigate=useNavigate()

  useEffect(()=>{
    let jwtToken=localStorage.getItem('jwt')
    if(jwtToken){
      setJwt(jwtToken)
    }
  }, [])

    const [login, setLogin]=useState({
        
        email:'',
        password:''
    })

  
    const emailChange=(e)=>{
        setLogin({
            ...login,
            email:e.currentTarget.value
        })
    }
    const passwordChange=(e)=>{
        setLogin({
            ...login,
            password:e.currentTarget.value
        })
    }

   


    const Submithandler=  (e)=>{
        e.preventDefault()
        const userData = {
            password: login.password,
            email: login.email,
            
          };
          
          client.post("/api/login", userData).then((res) => {
            setJwt(res.data.jwt);
            localStorage.setItem("jwt", res.data.jwt); 
            console.log(res);
            navigate('/profile');
          });

      
      
}
// useEffect(()=>{
//   localStorage.setItem('jwt', jwt)
// }, [jwt])  
// useEffect(()=>{
//   if(jwt!='null'){
//     navigate('/profile')
//   }
// }, [])
// useEffect(()=>{
//   client.get("/api/user")
//   .then(
//     data=> console.log(data)
//   )
// })
  return (
    <div>
        <form onSubmit={Submithandler}>
            <input type='email' placeholder='enter email' onChange={emailChange}/>
            <input type='password' placeholder='enter password' onChange={passwordChange}/>
            <button type='submit'>Send</button>
        </form>
    </div>
  )
}

export default Login
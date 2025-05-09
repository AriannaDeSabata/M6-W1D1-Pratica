import React, { useState } from 'react'
import { Button, Container, Form } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import "./styles.css";


export default function Login() {

  const url ='http://localhost:3001/authors/login'

  const navigate = useNavigate()

  const [userLogin, setUserLogin] = useState({
    email:'',
    password:''
  })


  const loginFetch = async()=>{
    try {
      if(!userLogin.email || !userLogin.password){
        console.log('compila tutti i campi tutti i campi')
        //allert error
      }

      const res = await fetch(url, {
        method:'POST',
        body: JSON.stringify(userLogin),
        headers: {
          "Content-Type" : 'application/json',
        }
      })

      if(res.ok){
        const data = await res.json()
        setUserLogin({
          email:'',
          password:''
        })

        localStorage.setItem("token", data)
        navigate('/home')
      }


    } catch (error) {
      console.log(error)
    }
  }

  const handleChange = (e)=>{
    setUserLogin({
      ...userLogin,
      [e.target.name]: e.target.value
    })

  }


  const handleSubmit = (e)=>{
    e.preventDefault()
    console.log(userLogin)
    loginFetch()
  }

  return (
    <Container fluid="sm" className="mt-5">
      <h1 className='text-center mb-0'>Login</h1>
      <Form className='mt-3  loginForm' >
        <Form.Group >
          <Form.Label>Email</Form.Label>
          <Form.Control type='email' name='email' value={userLogin.email} onChange={handleChange}/>
        </Form.Group>
        
        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control type='password' name='password' value={userLogin.password} onChange={handleChange}/>
        </Form.Group>

        <Form.Group className="d-flex mt-3 flex-column align-items-start">
          <Button onClick={handleSubmit}>
            Login
          </Button>
          <Link to="/login" className="link my-3 ms-0">Non hai un'account? <span className='registerLink'>Registrati</span></Link>
        </Form.Group>
          <a href='http://localhost:3001/auth/googleLogin' className='btnGoogle'>
          <img src='https://techdocs.akamai.com/identity-cloud/img/social-login/identity-providers/iconfinder-new-google-favicon-682665.png' className='imgGoogleLogin'/>
          Login with Google </a>
      </Form>
    </Container>
  )
}


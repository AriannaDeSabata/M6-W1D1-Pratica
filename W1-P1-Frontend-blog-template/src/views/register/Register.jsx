import React, { useState } from 'react'
import { Button, Container, Form } from 'react-bootstrap'
import { Link} from 'react-router-dom'
import './styles.css'

export default function Register() {

    const url ='http://localhost:3001/authors/register'

    const [userRegister, setUserRegister] = useState({
        name:'',
        surname:'',
        email:'',
        date:'',
        avatar: '',
        password:''
    })

    const postNewUser = async()=>{
        try {
            if(!userRegister.name || !userRegister.surname ||!userRegister.date ||!userRegister.email || !userRegister.password){
                console.log('compila tutti i campi tutti i campi')
                //allert error
              }

              const res = await fetch(url, {
                method: 'POST',
                body: JSON.stringify(userRegister),
                headers: {
                  "Content-Type" : 'application/json',
                }
              })

              if(res.ok){
                const data = await res.json()
                setUserRegister({
                  name:'',
                  surname:'',
                  email:'',
                  date:'',
                  avatar: '',
                  password:''
                })
                console.log(data)
              }

        } catch (error) {
            console.log(error)
        }
    }

    const handleChange = (e)=>{
        setUserRegister({
          ...userRegister,
          [e.target.name]: e.target.value
        })
    
      }
    
    
      const handleSubmit = (e)=>{
        e.preventDefault()
        postNewUser()
        console.log(userRegister)

      }

  return (
<Container fluid="sm" className="mt-5 " >
      <h1 className='text-center mb-0'>Registrati</h1>
      <Form className='mt-3 registerForm' >

        <Form.Group >
          <Form.Label>Nome</Form.Label>
          <Form.Control type='name' name='name' value={userRegister.name} onChange={handleChange}/>
        </Form.Group>

        <Form.Group >
          <Form.Label>Cognome</Form.Label>
          <Form.Control type='surname' name='surname' value={userRegister.surname} onChange={handleChange}/>
        </Form.Group>

        <Form.Group >
          <Form.Label>Data di Nascita</Form.Label>
          <Form.Control type='date' name='date' value={userRegister.date} onChange={handleChange}/>
        </Form.Group>

        <Form.Group >
          <Form.Label>Email</Form.Label>
          <Form.Control type='email' name='email' value={userRegister.email} onChange={handleChange}/>
        </Form.Group>
        
        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control type='password' name='password' value={userRegister.password} onChange={handleChange} />
        </Form.Group>

        <Form.Group className="d-flex mt-3 flex-column align-items-start">
          <Button onClick={handleSubmit}>
            Registrati
          </Button>
          <Link to="/login" className="link mt-2 ms-0">Hai già un'account? <span className='registerLink'>Login</span></Link>
        </Form.Group>

      </Form>
    </Container>
  )
}

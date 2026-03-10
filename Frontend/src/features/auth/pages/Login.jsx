import React, {useState} from 'react'
import '../style/form.scss'
import { Link, useNavigate } from 'react-router'
import { useAuth } from '../hooks/useAuth'

const Login = () => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const { handleLogin, loading } = useAuth();

    const navigate = useNavigate();

    if(loading){
        return (
          <main>
            <h1>Loading...</h1>
          </main>
        )
    }

    async function handleFormSubmit(e){

       e.preventDefault();

       await handleLogin(username, password)
       .then((res) => {
        console.log("Login successful: ", res);
        navigate('/');
       })
       .catch((err) => {
        console.error("Login failed: ", err);
       })
         
    }

  return (
    <main>
        <div className="form-container">
        <h1>Login</h1>
        <form onSubmit={handleFormSubmit}>
            <input 
            onInput={(e) => {setUsername(e.target.value)}}
            type="text" 
            name='username' 
            placeholder='Enter username' 
            />
            <input 
            onInput={(e) => {setPassword(e.target.value)}}
            type="password" 
            name='password' 
            placeholder='Enter password' 
            />

            <button className='button primary-button' type='submit'>Login</button>
        </form>

        <p>Don't have an account? <Link to="/register">Register</Link></p>
    </div>
    </main>
  )
}

export default Login
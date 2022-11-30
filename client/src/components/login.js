import { useRef, useState, useEffect, useContext } from 'react';
import AuthContext from '../contexts/AuthProvider';
import PropTypes from 'prop-types';


async function loginUser(credentials) {
  return fetch('http://localhost:8089/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  })
    .then(data => data.json())
 }


const Login = ({setToken}) => {

  const [username, setUserName] = useState();
  const [password, setPassword] = useState();
  const authMsg = sessionStorage.token?"Hi "+JSON.parse(sessionStorage.token).data.firstName+"! You have logged in successfully. You can now access the protected page." : "You are not logged in. Please log in to continue.";
  const [loginStatus,setLoginStatus] = useState(authMsg)

  const handleSubmit = async e => {
    e.preventDefault();
    const token = await loginUser({
      username,
      password
    });
    if (token.token) {
      setLoginStatus("Hi "+token.data.firstName+"! You have logged in successfully. You can now access the protected page.")
      setToken(token);
      window.location.href = '/';
    }else{
        setLoginStatus("Invalid username or password.")
    }
    console.log(token);
    }


	return (
    <div className="login-wrapper">
      <h1>Please Log In</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <p>Username</p>
          <input type="text" onChange={e => setUserName(e.target.value)}/>
        </label>
        <label>
          <p>Password</p>
          <input type="password" onChange={e => setPassword(e.target.value)}/>
        </label>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
      <div>{loginStatus}</div>
    </div>
	);
};


export default Login;
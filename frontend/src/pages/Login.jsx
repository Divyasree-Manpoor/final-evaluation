import { useState, useContext } from "react"
import { useNavigate, Link } from "react-router-dom"
import API from "../api/api"
import { AuthContext } from "../context/AuthContext"

function Login(){

const [email,setEmail] = useState("")
const [password,setPassword] = useState("")
const [message,setMessage] = useState("")

const { login } = useContext(AuthContext)

const navigate = useNavigate()

const handleLogin = async () => {

  try {

    const res = await API.post("/auth/login",{
      email,
      password
    })

    const token = res.data.token

    login(token)

    setMessage("Login successful")

    navigate("/dashboard")

  } catch(error){

    setMessage("Invalid email or password")

  }

}

return(

<div style={{padding:"20px"}}>

<h2>Login</h2>

<input
placeholder="Email"
value={email}
onChange={(e)=>setEmail(e.target.value)}
/>

<br/><br/>

<input
type="password"
placeholder="Password"
value={password}
onChange={(e)=>setPassword(e.target.value)}
/>

<br/><br/>

<button onClick={handleLogin}>
Login
</button>

<p>{message}</p>

<p>
Don't have an account? <Link to="/signup">Signup</Link>
</p>

</div>

)

}

export default Login
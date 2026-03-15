import { useState } from "react"
import { useNavigate } from "react-router-dom"
import API from "../api/api"

function Signup(){

const [name,setName] = useState("")
const [email,setEmail] = useState("")
const [password,setPassword] = useState("")
const [message,setMessage] = useState("")

const navigate = useNavigate()

const handleSignup = async () => {

  try {

    const res = await API.post("/auth/signup",{
      name,
      email,
      password
    })

    setMessage("Signup successful")

    navigate("/login")

  } catch(error){

    setMessage("Signup failed")

  }

}

return(

<div style={{padding:"20px"}}>

<h2>Create Account</h2>

<input
placeholder="Name"
value={name}
onChange={(e)=>setName(e.target.value)}
/>

<br/><br/>

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

<button onClick={handleSignup}>
Signup
</button>

<p>{message}</p>

</div>

)

}

export default Signup
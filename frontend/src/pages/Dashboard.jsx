import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import API from "../api/api"

function Dashboard(){

const [balance,setBalance] = useState(0)
const [loading,setLoading] = useState(true)

useEffect(()=>{

  const fetchBalance = async () => {

    try {

      const token = localStorage.getItem("token")

      const res = await API.get("/account/balance",{
        headers:{
          Authorization:`Bearer ${token}`
        }
      })

      setBalance(res.data.balance)

    } catch(error) {

      console.error("Error fetching balance")

    } finally {

      setLoading(false)

    }

  }

  fetchBalance()

},[])

return(

<div style={{padding:"20px"}}>

<h2>Dashboard</h2>

{loading ? (
  <p>Loading...</p>
) : (
  <h3>Balance: ₹{balance}</h3>
)}

<Link to="/send">
<button>Send Money</button>
</Link>

<br/><br/>

<Link to="/statement">
<button>View Statement</button>
</Link>

</div>

)

}

export default Dashboard
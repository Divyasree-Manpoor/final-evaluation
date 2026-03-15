import { useEffect, useState } from "react"
import API from "../api/api"

function Statement(){

const [transactions,setTransactions] = useState([])

useEffect(()=>{

  const fetchStatement = async () => {

    const token = localStorage.getItem("token")

    const res = await API.get("/account/statement",{
      headers:{
        Authorization:`Bearer ${token}`
      }
    })

    setTransactions(res.data)
  }

  fetchStatement()

},[])

return(

<div style={{padding:"20px"}}>

<h2>Account Statement</h2>

<table border="1">

<thead>
<tr>
<th>Date</th>
<th>Type</th>
<th>Amount</th>
<th>Sender</th>
<th>Receiver</th>
</tr>
</thead>

<tbody>

{transactions.map((t)=>(
<tr key={t.id}>

<td>{new Date(t.created_at).toLocaleDateString()}</td>

<td style={{color: t.transaction_type==="credit"?"green":"red"}}>
{t.transaction_type}
</td>

<td>₹{t.amount}</td>

<td>{t.sender_id}</td>

<td>{t.receiver_id}</td>

</tr>
))}

</tbody>

</table>

</div>

)

}

export default Statement
import { useState } from "react"
import API from "../api/api"

function SendMoney(){

const [receiverEmail,setReceiverEmail] = useState("")
const [amount,setAmount] = useState("")
const [message,setMessage] = useState("")

const handleTransfer = async () => {

  try {

    const token = localStorage.getItem("token")

    const res = await API.post(
      "/account/transfer",
      { receiverEmail, amount },
      {
        headers:{
          Authorization:`Bearer ${token}`
        }
      }
    )

    setMessage(res.data.message)

  } catch(error){

    setMessage("Transfer failed")

  }

}

return(

<div style={{padding:"20px"}}>

<h2>Send Money</h2>

<input
placeholder="Receiver Email"
value={receiverEmail}
onChange={(e)=>setReceiverEmail(e.target.value)}
/>

<br/><br/>

<input
type="number"
placeholder="Amount"
value={amount}
onChange={(e)=>setAmount(e.target.value)}
/>

<br/><br/>

<button onClick={handleTransfer}>
Send Money
</button>

<p>{message}</p>

</div>

)

}

export default SendMoney
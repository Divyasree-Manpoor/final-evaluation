import { supabase } from "../config/supabaseClient.js"


// GET BALANCE
export const getBalance = async (req, res) => {

  try {

    const { data, error } = await supabase
      .from("users")
      .select("balance")
      .eq("id", req.user.id)
      .single()

    if (error) {
      return res.status(400).json({ message: error.message })
    }

    res.json(data)

  } catch (error) {
    res.status(500).json({ message: "Server error" })
  }

}



// TRANSFER MONEY
export const transferMoney = async (req, res) => {

  try {

    const receiverEmail = req.body.receiverEmail
    const amount = Number(req.body.amount)

    if (!amount || amount <= 0) {
      return res.status(400).json({ message: "Invalid amount" })
    }

    const senderId = req.user.id

    const { data: sender, error: senderError } = await supabase
      .from("users")
      .select("*")
      .eq("id", senderId)
      .single()

    if (senderError) {
      return res.status(400).json({ message: "Sender not found" })
    }

    if (sender.balance < amount) {
      return res.status(400).json({ message: "Insufficient balance" })
    }

    const { data: receiver, error: receiverError } = await supabase
      .from("users")
      .select("*")
      .eq("email", receiverEmail)
      .single()

    if (receiverError || !receiver) {
      return res.status(404).json({ message: "Receiver not found" })
    }

    if (receiver.id === senderId) {
      return res.status(400).json({ message: "Cannot transfer to yourself" })
    }

    const newSenderBalance = sender.balance - amount
    const newReceiverBalance = receiver.balance + amount


    await supabase
      .from("users")
      .update({ balance: newSenderBalance })
      .eq("id", senderId)


    await supabase
      .from("users")
      .update({ balance: newReceiverBalance })
      .eq("id", receiver.id)


    await supabase
      .from("transactions")
      .insert([
        {
          sender_id: senderId,
          receiver_id: receiver.id,
          amount,
          transaction_type: "debit"
        },
        {
          sender_id: senderId,
          receiver_id: receiver.id,
          amount,
          transaction_type: "credit"
        }
      ])

    res.json({ message: "Transfer successful" })

  } catch (error) {
    res.status(500).json({ message: "Server error" })
  }

}



// GET ACCOUNT STATEMENT
export const getStatement = async (req, res) => {

  try {

    const { data, error } = await supabase
      .from("transactions")
      .select("*")
      .or(`sender_id.eq.${req.user.id},receiver_id.eq.${req.user.id}`)
      .order("created_at", { ascending: false })

    if (error) {
      return res.status(400).json({ message: error.message })
    }

    res.json(data)

  } catch (error) {
    res.status(500).json({ message: "Server error" })
  }

}
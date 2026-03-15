import { supabase } from "../config/supabaseClient.js"
import bcrypt from "bcryptjs"
import generateToken from "../utils/generateToken.js"


// SIGNUP
export const signup = async (req, res) => {

  try {

    const { name, email, password } = req.body

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" })
    }

    // check if user already exists
    const { data: existingUser } = await supabase
      .from("users")
      .select("*")
      .eq("email", email)

    if (existingUser.length > 0) {
      return res.status(400).json({ message: "User already exists" })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const { data, error } = await supabase
      .from("users")
      .insert([
        {
          name,
          email,
          password: hashedPassword,
          balance: 10000
        }
      ])
      .select()

    if (error) {
      return res.status(400).json({ message: error.message })
    }

    const token = generateToken(data[0])

    res.status(201).json({
      user: data[0],
      token
    })

  } catch (error) {
    res.status(500).json({ message: "Server error" })
  }

}



// LOGIN
export const login = async (req, res) => {

  try {

    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" })
    }

    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("email", email)
      .single()

    if (error || !data) {
      return res.status(400).json({ message: "User not found" })
    }

    const isMatch = await bcrypt.compare(password, data.password)

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" })
    }

    const token = generateToken(data)

    res.json({
      user: data,
      token
    })

  } catch (error) {
    res.status(500).json({ message: "Server error" })
  }

}
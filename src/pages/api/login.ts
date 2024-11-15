import { NextApiRequest, NextApiResponse } from 'next'
import { neon } from '@neondatabase/serverless'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  const { email, password } = req.body

  if (!email || !password) {
    return res.status(400).json({ message: 'Missing required fields' })
  }

  try {
    const sql = neon(process.env.DATABASE_URL!)

    // Fetch the user from the database
    const users = await sql`
      SELECT * FROM users WHERE email = ${email}
    `

    if (users.length === 0) {
      return res.status(401).json({ message: 'Invalid email or password' })
    }

    const user = users[0]

    // Compare the password
    const match = await bcrypt.compare(password, user.password)

    if (!match) {
      return res.status(401).json({ message: 'Invalid email or password' })
    }

    // Create JWT token
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET!,
      { expiresIn: '1h' }
    )

    // Save token in local storage (this would be handled on the client side)

    // Send the token in the response
    return res.status(200).json({ token })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: 'Internal server error' })
  }
}
import { NextApiRequest, NextApiResponse } from 'next'
import { neon } from '@neondatabase/serverless'
import bcrypt from 'bcrypt'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  const { name, email, password } = req.body

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Missing required fields' })
  }

  try {
    const sql = neon(process.env.DATABASE_URL!)

    // Create the users table if it doesn't exist
    await sql`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10)
    console.log('hashedPassword:', hashedPassword)

    // Insert the new user into the database
    const result = await sql`
      INSERT INTO users (name, email, password)
      VALUES (${name}, ${email}, ${hashedPassword})
      RETURNING *
    `
    const user = result[0]

    res.status(201).json({ message: 'User created successfully', user })
  } catch (error) {
    console.error('Error creating user:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}
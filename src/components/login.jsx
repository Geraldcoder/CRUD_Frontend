import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const url = 'http://localhost:3000/auth/login'

  const handleLogin = async (e) => {
    e.preventDefault()

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    })
    const data = await response.json()
    const { token } = data
    localStorage.setItem('token', token)
    navigate('/')
  }

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-50'>
      <div className='bg-white shadow-sm rounded-md w-full max-w-md p-6'>
        <h2 className='text-2xl font-semibold text-center mb-6'>
          Create Account
        </h2>

        <form className='flex flex-col gap-4' onSubmit={handleLogin}>
          <div className='flex flex-col gap-1'>
            <label className='text-sm font-medium'>Email</label>
            <input
              type='email'
              placeholder='Enter your email'
              className='border rounded-sm px-3 py-2 outline-none focus:ring-1 focus:ring-black'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className='flex flex-col gap-1'>
            <label className='text-sm font-medium'>Password</label>
            <input
              type='password'
              placeholder='Enter your password'
              className='border rounded-sm px-3 py-2 outline-none focus:ring-1 focus:ring-black'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type='submit'
            className='mt-4 bg-black text-white py-2 rounded-sm hover:opacity-90 transition'
          >
            Login
          </button>
        </form>

        <p className='text-sm text-center mt-4'>
          Don't have an account?{' '}
          <span
            onClick={() => navigate('/register')}
            className='text-black font-medium cursor-pointer hover:underline'
          >
            Register
          </span>
        </p>
      </div>
    </div>
  )
}

export default login

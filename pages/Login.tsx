"use client"

import { useState } from 'react'
import Inputs from '@/components/Inputs'
import Link from 'next/link'
import React from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'

type InputTypes = {
  email: string,
  password: string
}

const Login = () => {
  const [inputs, setInputs] = useState<InputTypes | null>(null)
  const router = useRouter()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs((prev: InputTypes | any) => {
      return { ...prev, [e.target.name]: e.target.value }
    })
  }

  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault()

    const res = await signIn('credentials', { ...inputs, redirect: false })

    console.log(res)

    if (res?.error) {
      console.log('Invalid credentials')
      return 
    } 

    router.replace('/') 
  }

  return (
    <div className='grid place-content-center h-screen'>
      <div className="p-5 border-l-4 border-[#24FF00] shadow-lg">
        <h3 className='text-black text-xl font-medium'>LOGIN</h3>
        <form className='flex flex-col gap-3 mt-3' onSubmit={handleSubmit}>
          <Inputs change={handleChange} type="email" placeholder="Email" name="email" />
          <Inputs change={handleChange} type="password" placeholder="Password" name="password" />

          <button className='px-6 py-2 bg-[#24FF00] text-white font-bold mt-3 rounded'>Login</button>

          <Link href="/register" className="text-xs text-end font-medium">
            Don't have an account? <span className='underline'>Register</span>
          </Link>
        </form>
      </div>
    </div>
  )
}

export default Login

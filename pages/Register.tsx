"use client"

import Inputs from '@/components/Inputs'
import Link from 'next/link'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'

type InputTypes = {
  name: string,
  email: string,
  password: string
}

const Register = () => {
  const [inputs, setInputs] = useState<InputTypes | null>(null)
  const router = useRouter()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs((prev: InputTypes | any) => {
      return { ...prev, [e.target.name]: e.target.value }
    })
  }

  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault()

    const res = await fetch('/api/register', {
      method: "POST", 
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(inputs)
    })
    if (res.ok) {
      router.push('/login')
    } else {
      const data = await res.json()
      console.log(data.message)
    }
  }

  return (
    <div className='grid place-content-center h-screen'>
      <div className="p-5 border-l-4 border-[#24FF00] shadow-lg">
        <h3 className='text-black text-xl font-medium'>REGISTER</h3>
        <form className='flex flex-col gap-3 mt-3' onSubmit={handleSubmit}>
          <Inputs change={handleChange} type="text" placeholder="name" name="name" />
          <Inputs change={handleChange} type="email" placeholder="Email" name="email" />
          <Inputs change={handleChange} type="password" placeholder="Password" name="password" />

          <button className='px-6 py-2 bg-[#24FF00] text-white font-bold mt-3 rounded'>Register</button>

          <Link href="/login" className="text-xs text-end font-medium">
            Already have an account? <span className='underline'>Login</span>
          </Link>
        </form>
      </div>
    </div>
  )
}

export default Register

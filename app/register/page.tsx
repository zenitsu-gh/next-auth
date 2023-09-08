import Register from '@/pages/Register'
import { getServerSession } from 'next-auth'
import React from 'react'
import { redirect } from 'next/navigation'
import { authOptions } from '../api/auth/[...nextauth]/route'

const page = async () => {
  const session = await getServerSession(authOptions)

  if (session) {
    redirect('/')
  }

  return <Register />
}

export default page

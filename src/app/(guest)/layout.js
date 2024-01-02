'use client'

import { useStateContext } from '@/contexts/ContextProvider.jsx'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import Header from '@/components/Header'

/* import { cookies } from 'next/headers'
import { redirect } from 'next/navigation' */

export default function GuestLayout({ children }) {
  const { token } = useStateContext()
  const router = useRouter()
  
  const [isGuest, setIsGuest] = useState(false)

  useEffect(() => {
    if(token && token !== undefined) {
      router.push("/profile")
    }

    setIsGuest(true)
  }, []);

  /* const cookieStore = cookies();
  const user = cookieStore.get('user');

  if(user) {
    redirect('/profile');
  } */

  return (
    <>
      <Header />
      {isGuest && children}
    </>
  )
}

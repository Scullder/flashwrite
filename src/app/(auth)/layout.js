'use client'

import { useStateContext } from '@/contexts/ContextProvider.jsx'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import Header from '@/components/Header'

/* import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import Cookies from 'js-cookie' */

export default function AuthLayout({ children }) {
  const { setUser, token } = useStateContext();
  const router = useRouter();
  
  useEffect(() => {
    if(!token) {
      setUser({})
      router.push("/login");
    }
  }, []);

  /* const cookieStore = cookies();
  console.log(cookieStore)
  const user = cookieStore.get('user');

  if(!user) {
    redirect('/login');
  } */

  return (
    <>
      <Header />
      {children}
    </>
  )
}

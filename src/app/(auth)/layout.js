'use client'

import { useStateContext } from '@/contexts/ContextProvider.jsx'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import Header from '@/components/Header'

/* import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import Cookies from 'js-cookie' */

export default function AuthLayout({ children }) {
  const { setUser, setToken, token } = useStateContext();
  const router = useRouter();
  
  let [isAuth, setIsAuth] = useState(false)

  useEffect(() => {
    if(!token && token === undefined) {
      setUser({})
      setToken(null)
      router.push("/login");
    }

    setIsAuth(true)
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
      {isAuth && children}
    </>
  )
}

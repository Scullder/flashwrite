/* import { useStateContext } from '@/contexts/ContextProvider.jsx'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react' */
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export default function GuestLayout({ children }) {
  /* const { user } = useStateContext();
  const router = useRouter();
  
  useEffect(() => {
    if(user) {
      router.push("/profile");
    }
  }, []); */

  const cookieStore = cookies();
  const user = cookieStore.get('user');

  if(user) {
    redirect('/profile');
  }

  return (
    <>
      {children}
    </>
  )
}

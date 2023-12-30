import ProfileDescriptor from '@/components/profile/ProfileDescriptor'
import ProfileNavigation from '@/components/profile/ProfileNavigation'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export default function ProfileLayout({ children }) {
  const cookieStore = cookies();
  const user = cookieStore.get('user');

  if(!user) {
    redirect('/login');
  }

  return (
    <main className="container w-9/12 mx-auto text-white">
      <ProfileDescriptor/>
      <ProfileNavigation>
        {children}
      </ProfileNavigation>
    </main>
  )
}

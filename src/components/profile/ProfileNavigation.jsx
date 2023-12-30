'use client'

import Link from 'next/link'

export default function ProfileNavigation({ children }) {
  const navItemClass = "p-5 border-r border-backgroundLighter hover:cursor-pointer";

  return (
    <section id="content" className="w-full mx-auto mb-[100px] bg-background">
      <nav className="grid grid-cols-5 text-lg text-center border-b border-tile">
        <Link href="/profile/posts"><div className={navItemClass}>Лента</div></Link>
        <Link href="/profile/blogs"><div className={navItemClass}>Блоги</div></Link>
        <Link href="/profile/followers"><div className={navItemClass}>Подписчики</div></Link>
        <Link href="/profile/following"><div className={navItemClass}>Подписки</div></Link>
        <Link href="/profile/options"><div className={navItemClass}>Настройки</div></Link>
      </nav>

      <div className="w-[90%] mx-auto">
        {children}
      </div>
    </section>
  )
}
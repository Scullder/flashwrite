'use client'

import { useState } from 'react'
import { useStateContext } from '@/contexts/ContextProvider.jsx'
import Link from 'next/link'

export default function Header() {
  const itemClass = 'hover:cursor-pointer hover:border-b border-primary hover:text-primary p-2 text-sm uppercase font-bold';

  return (
    <>
      <div className="absolute top-0 w-full z-20 shadowed"></div>
      <header className="w-full relative z-30 text-white font-border text-2xl">
          <div className="container w-9/12 mx-auto flex items-center h-[72px] justify-between">
              <div className="font-tim tracking-widest w-1/4 text-left">
                  {/* <img src="/img/logo.png" className="w-36" /> */}
              </div>
              <ul className="flex justify-center items-center gap-9 text-base tracking-wide w-2/4">
                  <li className={itemClass}><Link href="/">Главная</Link></li>
                  <li className={itemClass}><Link href="/blogs">Блоги</Link></li>
                  <li className={itemClass}><Link href="/users">Пользователи</Link></li>
                  <li className={itemClass}><Link href="/profile">Профиль</Link></li>
              </ul>
              <div className="text-lg tracking-widest w-1/4 text-right">
                  <i className="ri-shield-user-line"></i>Invader942
              </div>
          </div>
      </header>
    </>
  )
}
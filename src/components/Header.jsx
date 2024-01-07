'use client'

import { useState } from 'react'
import { useStateContext } from '@/contexts/ContextProvider.jsx'
import Link from 'next/link'
import { IoMdExit } from "react-icons/io"

export default function Header() {
  const [isNameHover, setIsNameHover] = useState(false)
  const { user, setUser, token, setToken, setLoading } = useStateContext()

  const itemClass = 'hover:cursor-pointer hover:border-b border-primary hover:text-primary p-2 text-sm uppercase font-bold';

  const logout = () => {
    setLoading(true)
    setUser({})
    setToken(null)
  }

  return (
    <>
      <div className="absolute top-0 w-full z-20 shadowed"></div>
      <header className="w-full relative z-30 text-white font-border text-2xl">
          <div className="container w-9/12 mx-auto flex items-center h-[72px] justify-between">
              <div className="font-tim tracking-widest w-1/4 text-left">
                  {/* <img src="/img/logo.png" className="w-36" /> */}
              </div>
              <div className="flex justify-center items-center gap-9 text-base tracking-wide w-2/4">
                  <Link href="/" className={itemClass}>Главная</Link>
                  <Link href="/blogs" className={itemClass}>Блоги</Link>
                  <Link href={`/profile/${user._id}`} className={itemClass}>Мой профиль</Link>
                  <Link href="/users" className={itemClass}>Пользователи</Link>
              </div>
              <div className="text-lg w-1/4 text-right relative" onMouseLeave={() => setIsNameHover(false)}>
                <div className="inline-flex hover:cursor-default" onMouseEnter={() => setIsNameHover(true)}>
                  {user.name}
                </div>
                {isNameHover && 
                  <div className="absolute right-0 flex flex-col gap-2 py-2 px-3 items-end text-sm rounded bg-white/20 text-right">
                    <div className="hover:bg-white/30 hover:cursor-pointer p-1 px-2 w-full text-right rounded">Настройки</div>
                    <div onClick={logout} className="flex items-center justify-end hover:bg-white/30 hover:cursor-pointer p-1 px-2 w-full rounded">
                      <IoMdExit /><span className="">Выход</span>
                    </div>
                  </div>
                }
              </div>
          </div>
      </header>
    </>
  )
}
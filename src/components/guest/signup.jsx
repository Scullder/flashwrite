'use client'

import { useState } from 'react'
import { useStateContext } from '@/contexts/ContextProvider.jsx'
import axiosClient from '@/axios-client.js'
import * as UI from '@/components/ui/UI'
import { MdEmail } from "react-icons/md"
import { FaUser } from "react-icons/fa"
import { IoIosLock } from "react-icons/io"
import { GiConfirmed } from "react-icons/gi"
import { FaRegUser } from "react-icons/fa6";
import Link from 'next/link'

export default function Signup() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [errors, setErrors] = useState({});

  const { setUser, setToken, setLoading } = useStateContext();

  const submit = (e) => {
    e.preventDefault();
    setLoading(true)

    const payload = {
      email: email,
      name: name,
      password: password,
      password_confirmation: passwordConfirmation,
    }

    axiosClient.post('/user/signup', payload)
      .then(({ data }) => {
        setLoading(false)
        setToken(data.token)
        setUser(data.user)
      })
      .catch((error) => {
        const response = error.response;

        if (response && response.status === 422) {
          setErrors(response.data.errors);
        }

        setLoading(false)
      })
  }

  return (
    <div className="container w-9/12 mx-auto text-white">
      <div className="relative w-2/6 min-h-[100px] mx-auto mt-64 bg-inherit p-10 pt-20 rounded-lg">
        <div className="absolute -top-[75px] left-0 flex justify-center w-full">
          <div className="text-4xl bg-gray-300 text-background border-4 border-background w-[150px] h-[150px] rounded-full flex items-center justify-center">
            <FaRegUser />
          </div>
        </div>
        <div className="flex text-lg mb-[50px] font-semibold">
          <Link href="/signup" className="flex-1 w-full border-b-4 text-center p-2">Signup</Link>
          <Link href="/login" className="flex-1 w-full border-b-2 text-center p-2 text-input border-input">Login</Link>
        </div>
        <form onSubmit={submit} className="space-y-6">
          <UI.InputInline handle={setEmail}    value={email}    error={errors.email} placeholder="email"><MdEmail/></UI.InputInline>
          <UI.InputInline handle={setName}     value={name}     error={errors.name} placeholder="логин"><FaUser /></UI.InputInline>
          <UI.InputInline handle={setPassword} value={password} error={errors.password} placeholder="пароль" pass={true}><IoIosLock /></UI.InputInline>
          <UI.InputInline handle={setPasswordConfirmation} value={passwordConfirmation} error={errors.passwordConfirmation} placeholder="подтверждение пароля" pass={true}><GiConfirmed /></UI.InputInline>
          <div className="pt-4">
            <UI.Button _class="mx-auto w-full" type="submit" color="bg-secondary">готово</UI.Button>
          </div>
        </form>
      </div>
    </div>
  )
}

'use client'

import { useState } from 'react'
import { useStateContext } from '@/contexts/ContextProvider.jsx'
import axiosClient from '@/axios-client.js'

export default function Signup() {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [errors, setErrors] = useState({});

    const { setUser, setToken } = useStateContext();

    const submit = (e) => {
        e.preventDefault();

        const payload = {
            email: email,
            name: name,
            password: password,
            password_confirmation: passwordConfirmation,
        }

        axiosClient.post('/user/signup', payload)
            .then(({ data }) => {
                setToken(data.token);
                setUser(data.user);
            })
            .catch((error) => {
                const response = error.response;
                if (response && response.status === 422) {
                    setErrors(response.data.errors);
                }
            })
    }

    const inputClass = 'w-full p-2 m-0 outline-none border-b border-gray-600 rounded-sm bg-background/50 text-center focus:border-white focus:text-white';
    const errorClass = 'text-sm text-rose-600 w-full text-center mt-2';

    return (
        <div className="bg-background/60 w-[25%] mx-auto mt-[100px]">
            <form onSubmit={submit}>
                <h1 className="text-2xl w-full bg-background/80 p-6">Signup</h1>
                <div className="p-6 text-gray-400">
                    <div className="mb-5 relative">
                        <label className="text-sm">email</label>
                        <input className={`${inputClass}`} value={email} onChange={(e) => setEmail(e.target.value)} />
                        {errors.email && <div className={`${errorClass}`}>{errors.email}</div>}
                    </div>

                    <div className="mb-5 relative">
                        <label className="text-sm">name</label>
                        <input className={`${inputClass}`} value={name} onChange={(e) => setName(e.target.value)} />
                        {errors.name && <div className={`${errorClass}`}>{errors.name} </div>}
                    </div>

                    <div className="mb-5 relative">
                        <label className="text-sm">password</label>
                        <input className={`${inputClass}`} type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        {errors.password && <div className={`${errorClass}`}>{errors.password}</div>}
                    </div>

                    <div className="mb-5 relative">
                        <label className="text-sm">password confirmation</label>
                        <input className={`${inputClass}`} type="password" value={passwordConfirmation} onChange={(e) => setPasswordConfirmation(e.target.value)} />
                        {errors.passwordConfirmation && <div className={`${errorClass}`}>{errors.passwordConfirmation}</div>}
                    </div>

                    <button className="block w-full h-12 mt-8 mb-4 bg-secondary text-white" type="submit">Signup</button>
                </div>
            </form>
        </div>
    )
}

'use client'

import { createContext, useState, useContext } from "react";
import Cookies from 'js-cookie'

const StateContext = createContext({
    currentUser: null,
    token: null,
    setUser: () => {},
    setToken: () => {},
    alertMessage: {},
    setAlertMessage: () => {},
    loading: false,
    setLoading: () => {},
})

export const ContextProvider = ({children}) => {
    let cookieUser = null
    
    try {
        cookieUser = JSON.parse(Cookies.get('user'));
    } catch (error) {
        if (error instanceof SyntaxError) {
            console.error('Invalid JSON:', error.message)
        }
    }

    const [user, _setUser] = useState(cookieUser)
    const [token, _setToken] = useState(Cookies.get('ACCESS_TOKEN'))

    const setToken = (token) => {
        _setToken(token)
        if (token) {
            Cookies.set('ACCESS_TOKEN', token)
        } else {
            Cookies.remove('ACCESS_TOKEN')
        }
    }

    const setUser = (user) => {
        _setUser(user);
        if (user) {
            Cookies.set('user', JSON.stringify(user))
        } else {
            Cookies.remove('user')
        }
    }

    const [alertMessage, _setAlertMessage] = useState({})

    const setAlertMessage = (message) => {
        _setAlertMessage(message)
    }

    const [loading, _setLoading] = useState(false)
    
    const setLoading = (isLoading) => {
        _setLoading(isLoading)
    }

    return (
        <StateContext.Provider value={{ 
            user,
            token,
            setUser,
            setToken,
            alertMessage,
            setAlertMessage,
            loading,
            setLoading
        }}>
            {children}
        </StateContext.Provider>
    )
}

export const useStateContext = () => useContext(StateContext);
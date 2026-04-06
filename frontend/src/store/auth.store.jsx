import React, {createContext, useContext, useMemo, useState} from 'react'

const AuthCtx = createContext(null)

export function AuthProvider({children}) {
    const [token, setToken] = useState(localStorage.getItem('accessToken'))

    const login = (accessToken) => {
        
    }
}
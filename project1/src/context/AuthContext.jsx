import React, { createContext, useContext, useState } from 'react'


const AuthContext = createContext()


export const AuthProvider = ({ children }) => {
// mock user: null | { name, role }
const [user, setUser] = useState(null)


const login = (name, role = 'user') => setUser({ name, role })
const logout = () => setUser(null)


return (
<AuthContext.Provider value={{ user, login, logout }}>
{children}
</AuthContext.Provider>
)
}


export const useAuth = () => useContext(AuthContext)
import { useContext, useEffect, useState } from "react"
import { StoredUser, UserCollectionType } from "../@types/users"
import { AuthContextType, AuthContext } from "../contexts/AuthContext";


export default function useAuth() {
    const { getStoredUser } = useContext(AuthContext) as AuthContextType
    const [user, setUser] = useState<UserCollectionType | null>(null)
    const [token, setToken] = useState('')



    // useEffect(() => {
    //     getUser()
    // }, []);


    // async function getUser() {
    //     const res: StoredUser = await getStoredUser()
    //     if (res !== null) setUser(res.record)
    // }
    
    function getUser() {
        fetchUserData()
        return {
            token,
            user
        }
    }


    function fetchUserData() {
        getStoredUser()
            .then(res => {
                if (res !== null) {
                    setUser(res.record)
                    setToken(res.token)
                    return {
                        token: res.token,
                        user: res.record
                    }
                }
                return null
            })
    }


    return {
        getUser
    }
}
import React, {useContext, useEffect, useState} from 'react'
import {auth} from '../firebase'
import {
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    sendPasswordResetEmail,
    signInWithEmailAndPassword,
    signOut,
    updateEmail,
    updatePassword
} from "firebase/auth";

const AuthContext = React.createContext()

export function useAuth() {
    return useContext(AuthContext);
}

export default function AuthProvider({children}) {
    const [currentUser, setCurrentUser] = useState();
    const [loading, setLoading] = useState(true)

    // const [isMounted,setIsMounted] = useState(true);
    function signup(email, password) {
        return createUserWithEmailAndPassword(auth, email, password);

    }

    function login(email, password) {
        return signInWithEmailAndPassword(auth, email, password);
    }

    function logout() {
        return signOut(auth);
    }

    function resetPassword(email) {
        return sendPasswordResetEmail(auth, email);
    }

    function updateUserEmail(email) {
        return updateEmail(currentUser, email)
    }

    function updateUserPassword(password) {
        return updatePassword(currentUser, password)
    }

    const value = {
        currentUser,
        signup,
        login,
        logout,
        resetPassword,
        updateUserEmail,
        updateUserPassword
    }
    useEffect(() => {
        // if (isMounted){
        const unsubscribe = onAuthStateChanged(auth, user => {
            setCurrentUser(user);
            setLoading(false)
        })
        return unsubscribe;
        // }
    }, [])

    // useEffect(() => {
    //     return () => {
    //         setCurrentUser(null);
    //         setIsMounted(false);
    //     }
    // }, []);


    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}

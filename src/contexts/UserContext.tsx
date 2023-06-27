import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { createUserWithEmailAndPassword, UserCredential, signInWithEmailAndPassword, signOut, signInWithPopup, onAuthStateChanged, Auth, User } from 'firebase/auth';
import { auth, googleProvider } from '../config/firebase';


export interface AuthContextModel {
    user: User | null
    loginUser: (email: string, password: string) => Promise<UserCredential>
    createUser: (email: string, password: string) => Promise<UserCredential>
    signOutUser: () => Promise<void>
    singUpWithGoogle: () => Promise<UserCredential>;
}

type UserContextProviderProps = {
    children: ReactNode
}

const UserContext = createContext<AuthContextModel>({} as AuthContextModel);

export const AuthContextProvider = ({ children }: UserContextProviderProps): JSX.Element => {

    const [user, setUser] = useState<User | null>(null);

    const createUser = (email: string, password: string) => {
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const loginUser = (email: string, password: string) => {
        return signInWithEmailAndPassword(auth, email, password);
    }

    const signOutUser = () => {
        return signOut(auth)
    }

    const singUpWithGoogle = () => {
        return signInWithPopup(auth, googleProvider)
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser)
        })

        return () => {
            unsubscribe();
        }
    }, [])

    return (
        <UserContext.Provider value={{ createUser, loginUser, signOutUser, singUpWithGoogle, user }}>
            {children}
        </UserContext.Provider>
    )
}

export const UserAuth = () => {
    return useContext(UserContext);
}
import { auth, googleProvider } from "../config/firebase";
import { createUserWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { useState } from "react"

export default function Auth() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const signIn = async () => {
        await createUserWithEmailAndPassword(auth, email, password)
    }

    const signInWithGoogle = async () => {

        try {
            await signInWithPopup(auth, googleProvider)

        } catch (error) {
            console.log(error)
        }
    }

    const logout = async () => {
        await signOut(auth)
    }

    return (
        <div>
            <input type="text" placeholder="Email..." onChange={(e) => setEmail(e.target.value)} />
            <input type="text" placeholder="Password..." onChange={(e) => setPassword(e.target.value)} />
            <button onClick={signIn}>Sign In</button>
            <button onClick={signInWithGoogle}>Sign In with Google</button>
            <button onClick={logout}> Logout</button>

        </div>
    )
}
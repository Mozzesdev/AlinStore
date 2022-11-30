import { createContext, useContext, useEffect, useState } from 'react'
import { auth, db } from '../Firebase/Credenciales'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, GoogleAuthProvider, signInWithPopup, sendPasswordResetEmail } from 'firebase/auth'
import { doc, getDoc, setDoc } from "firebase/firestore";
export const authContext = createContext()

export const useAuth = () => {
 const context = useContext(authContext)
 return context
}

export function AuthProvider({ children }) {

 const [user, setUser] = useState(null)
 const [loading, setLoading] = useState(true)


 const signup = (email, password) => createUserWithEmailAndPassword(auth, email, password)
 const login = (email, password) => signInWithEmailAndPassword(auth, email, password)
 const logout = () => signOut(auth)
 const senResetPassword = (email) => sendPasswordResetEmail(auth, email)


 const loginWithGoogle = () => {
  const googleProvider = new GoogleAuthProvider()
  const result = signInWithPopup(auth, googleProvider);
  const role = 'user';
  const userGoogle = result.user;
  const docRef = doc(db, `users/${userGoogle.email}`);
  setDoc(docRef, { email: userGoogle.email, role: role });
 }

 const getRole = async (email) => {
  const docRef = doc(db, `users/${email}`);
  const docCifrate = await getDoc(docRef);
  const finalInfo = docCifrate.data().role;
  return finalInfo
 }

 useEffect(() => {
  onAuthStateChanged(auth, (userFirebase) => {
   if (userFirebase) {
    setUser(userFirebase)
    getRole(userFirebase.email).then((role) => {
     const userData = {
      ... userFirebase,
      role: role,
     }
     setUser(userData)
     setLoading(false)
    })
   } else {
    setUser(null)
   }
  });

  // eslint-disable-next-line react-hooks/exhaustive-deps
 }, [])

 return (
  <authContext.Provider value={{ signup, login, user, logout, loading, loginWithGoogle, senResetPassword}}>
   {children}
  </authContext.Provider>
 )
}
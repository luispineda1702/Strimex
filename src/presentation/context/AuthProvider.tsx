import React ,{PropsWithChildren, useEffect} from 'react'
import { useAuth } from '../hooks/useAuth'

export const AuthProvider = ({children}: PropsWithChildren) => {

    const {status,checkStatus} = useAuth();
    
  return (
    <>
        {children}
    </>
  )
}



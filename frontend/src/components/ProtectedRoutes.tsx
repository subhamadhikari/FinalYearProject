import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'

type Props = {
    isAllowed: boolean;
    redirectedPath?: string;
    children: React.ReactNode
}

const ProtectedRoutes = ({isAllowed, redirectedPath="/", children}: Props) => {
    if (!isAllowed) {
        return <Navigate to={redirectedPath} replace/>
    }    

    return children ? children : <Outlet/>
}

export default ProtectedRoutes
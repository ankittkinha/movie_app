import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

const ProtectedRoute = (props) => {
    const {Component} = props
    const navigate = useNavigate()

    useEffect(() => {
        let token = localStorage.getItem("access_token")
        if(!token) {
            navigate("/users/login")
        }
    }, [])

    return(
        <>
            <Component />
        </>
    )
}

export default ProtectedRoute;
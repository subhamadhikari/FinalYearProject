import { newUser,loggedUser } from "../types/user"
import { API } from "../backend"

const getToken = () => {
    const token = localStorage.getItem("token")
    return token
}

export const registerUser = async(user:newUser) => {
    const URL = API + "/auth/register"
    const response = await fetch(URL,{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(user)
    })
    const data = await response.json()
    console.log(data)
}

export const loginUser = async(user:loggedUser) => {
    const URL = API + "/auth/login"

    const formData = new FormData()
    formData.append("username",user.email)
    formData.append("password",user.password)

    const response = await fetch(URL,{
        method:"POST",
        body:formData
    })
    const data = await response.json()
    console.log(data)
    if(data.access_token){
        localStorage.setItem("token",data.access_token)
    }
    return data
}


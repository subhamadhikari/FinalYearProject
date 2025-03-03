import React,{useState,useEffect} from 'react'
import WebLogo from "./../assets/icon.png"
import FloatingLabel from '../components/FloatingLabel'
import { loggedUser } from '../types/user'
import { loginUser } from '../api/auth'
import { useNavigate } from 'react-router-dom'
import { getCurrentUser } from '../api/auth'

type Props = {}

const Login = (props: Props) => {

    const [userInfo,setUserInfo] = useState<loggedUser|null>(null)
    const [redirect, setRedirect] = useState<boolean>(false);
    const navigate = useNavigate()

    const userLogin = async () => {
        // if(userInfo){
        //     loginUser(userInfo).then((data)=>{
        //         if (data.role == "1") {
        //             console.log("in 1")
        //             navigate("/dashboard")
        //         }
        //         if (data.role == "2") {
        //             navigate("/patient-dashboard")
        //         }
        //         console.log("data role",data.role)
        //     }).catch((err) => {
        //         console.log(err)
        //     })
        // }
        if (userInfo) {
            try {
                const data = await loginUser(userInfo);
                console.log("data role", data.role);
    
                if (data.role == "1") {
                    console.log("in 1");
                    // setRedirect(true);
                    navigate("/dashboard");
                    window.location.reload();
                } else if (data.role == "2") {
                    // setRedirect(true);
                    navigate("/patient-dashboard");
                    window.location.reload();
                }
            } catch (err) {
                console.log(err);
            }
        }
    }


  return (
    <div className='bg-primary h-screen w-full p-4'>
        <img src={WebLogo} height={85} width={103}/>
        <div className='bg-primary-light w-full h-max flex justify-center items-center mt-4'>
            <div className='flex flex-col justify-start items-start w-full h-2/4'>
                <FloatingLabel fieldLabel='Email' name='email' onInfoChange={setUserInfo} userInfo={userInfo}/>
                <FloatingLabel fieldLabel='Password' name='password' onInfoChange={setUserInfo} userInfo={userInfo}/>
            </div>
        </div>
        <div className='flex flex-col justify-center items-center w-full mt-6 p-4'>
            <button className='bg-[#F16A6A] rounded-lg p-3 flex-[0.4]  w-3/4 text-white' onClick={()=>{}}>Create Account</button>
            <button className='bg-[#EE5253] rounded-lg p-3 flex-[0.4] mt-4 w-3/4 text-white' onClick={userLogin}>Login</button>
        </div>
    </div>
  )
}

export default Login
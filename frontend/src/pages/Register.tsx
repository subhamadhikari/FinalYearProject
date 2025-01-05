import React,{useState} from 'react'
import WebLogo from "./../assets/icon.png"
import FloatingLabel from '../components/FloatingLabel'
import Dropdown from '../components/Dropdown'

type Props = {}

const Register = (props: Props) => {
    const [userType, setUserType] = useState<string|null>(null)

    type user = {
        firstName:string,
        lastName:string,
        email:string,
        password:string,
        confirmPassword:string,
        phoneNumber:number,
    }
    const [userInfo,setUserInfo] = useState<user|null>(null)

  return (
    <div className='bg-primary h-screen w-full p-4'>
        <img src={WebLogo} height={85} width={103}/>
        <div className='bg-primary-light w-full h-3/4 flex justify-center items-center'>
            <div className='flex flex-col justify-center items-center w-full'>
                <FloatingLabel fieldLabel='First Name' name='firstName' onInfoChange={setUserInfo} userInfo={userInfo}/>
                <FloatingLabel fieldLabel='Last Name' name='lastName' onInfoChange={setUserInfo} userInfo={userInfo}/>
                <FloatingLabel fieldLabel='Email' name='email' onInfoChange={setUserInfo} userInfo={userInfo}/>
                <FloatingLabel fieldLabel='Password' name='password' onInfoChange={setUserInfo} userInfo={userInfo}/>
                <FloatingLabel fieldLabel='Confirm Password' name='confirmPassword' onInfoChange={setUserInfo} userInfo={userInfo}/>
            </div>
            <div className='flex flex-col justify-center items-center w-full'>
                {/* <FloatingLabel fieldLabel='User Type'/> */}
                <Dropdown label='Select User' options={["Doctor","Patient","Normal User"]} onChange={setUserType} value={userType}/>
                
                <p>{userType}</p>

                {/* <FloatingLabel fieldLabel='Hospital' onInfoChange={setUserInfo} userInfo={userInfo}/>
                <FloatingLabel fieldLabel='Hospital Address' onInfoChange={setUserInfo} userInfo={userInfo}/>
                <FloatingLabel fieldLabel='ID' onInfoChange={setUserInfo} userInfo={userInfo}/> */}
                <FloatingLabel fieldLabel='Phone Number' name='phoneNumber' onInfoChange={setUserInfo} userInfo={userInfo}/>
                {
                    userInfo && <p>{JSON.stringify(userInfo)}</p>
                }
                {/* <FloatingLabel fieldLabel='Date of Birth' onInfoChange={setUserInfo} userInfo={userInfo}/>  */}
            </div>
        </div>
        <div className='flex justify-center items-center w-full mt-1'>
            <button className='bg-secondary-light rounded-lg p-1 flex-[0.4] m-auto'>Create Account</button>
            <button className='bg-secondary-light rounded-lg p-1 flex-[0.4] m-auto'>Login</button>
        </div>
    </div>
  )
}

export default Register
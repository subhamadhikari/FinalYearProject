import React from 'react'
import WebLogo from "./../assets/icon.png"
import FloatingLabel from '../components/FloatingLabel'

type Props = {}

const Register = (props: Props) => {
  return (
    <div className='bg-primary h-screen w-full p-4'>
        <img src={WebLogo} height={85} width={103}/>
        <div className='bg-primary-light w-full h-2/4 flex justify-center items-center'>
            <div className='flex flex-col justify-center items-center w-full'>
                <FloatingLabel/>
                <FloatingLabel/>
                <FloatingLabel/>
                <FloatingLabel/>
                <FloatingLabel/>
            </div>
            <div className='flex flex-col justify-center items-center w-full'>
                <FloatingLabel/>
                <FloatingLabel/>
                <FloatingLabel/>
                <FloatingLabel/>
                <FloatingLabel/>
            </div>
        </div>
        <div className='flex justify-center items-center'>
            <button className='bg-secondary-light rounded-lg p-1'>Create Account</button>
            <button className='bg-secondary-light rounded-lg p-1'>Login</button>
        </div>
    </div>
  )
}

export default Register
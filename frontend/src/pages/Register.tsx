import React,{useState,useEffect} from 'react'
import WebLogo from "./../assets/icon.png"
import FloatingLabel from '../components/FloatingLabel'
import Dropdown from '../components/Dropdown'

import { registerUser } from '../api/auth'
import { UserRole,newUser } from '../types/user'
import { HospitalDropdown } from '../types/hospital'

import { getAllHospital } from '../api/hospital'
import { HospitalIcon } from 'lucide-react'

type Props = {}

const Register = (props: Props) => {
    const [userRole, setUserRole] = useState<string>("")
    const [hospital, setHospital] = useState<HospitalDropdown[]>([{
        hospitalID:"",
        hospitalName:""
    }])
    const [hospitalID, setHospitalID] = useState<string>("-1")

    // type user = {
    //     userFirstName:string,
    //     userLastName:string,
    //     email:string,
    //     password:string,
    //     confirmPassword:string,
    //     phoneNumber:number,
    //     age:number,
    //     address:string
    //     userRole:string
    // }
    const [userInfo,setUserInfo] = useState<newUser|null>(null)

    const createNewUser = (user:newUser) => {
        switch (userRole) {
            case "1":
                user["userRole"] = UserRole.Doctor
                break;
            case "2":
                user["userRole"] = UserRole.Patient
                break;
            default:
                user["userRole"] = UserRole['Normal User']
                break;
        }
        user["hospitalID"] = parseInt(hospitalID)
        registerUser(user)
    }

    useEffect(() => {
        async function fetchHospitals() {
            const hospitals = await getAllHospital()
            setHospital(hospitals)
        }
        fetchHospitals()
    }, [])
    

  return (
    <div className='bg-primary h-screen w-full p-4'>
        <img src={WebLogo} height={85} width={103}/>
        <div className='bg-primary-light w-full h-3/4 flex justify-center items-start mt-4'>
            <div className='flex flex-col justify-start items-start w-full h-2/4'>
                <FloatingLabel fieldLabel='First Name' name='userFirstName' onInfoChange={setUserInfo} userInfo={userInfo}/>
                <FloatingLabel fieldLabel='Last Name' name='userLastName' onInfoChange={setUserInfo} userInfo={userInfo}/>
                <FloatingLabel fieldLabel='Email' name='email' onInfoChange={setUserInfo} userInfo={userInfo}/>
                <FloatingLabel fieldLabel='Password' name='password' onInfoChange={setUserInfo} userInfo={userInfo}/>
                <FloatingLabel fieldLabel='Confirm Password' name='confirmPassword' onInfoChange={setUserInfo} userInfo={userInfo}/>
            </div>
            <div className='flex flex-col justify-start items-start w-full h-2/4'>
                {/* <FloatingLabel fieldLabel='User Type'/> */}
                <Dropdown label='Select User' options={[{id:"1",label:"Doctor"},{id:"2",label:"Patient"},{id:"3",label:"Normal User"}]} onChange={setUserRole} value={userRole}/>
                
                {/* <p>{userType}</p> */}

                {/* <FloatingLabel fieldLabel='Hospital' onInfoChange={setUserInfo} userInfo={userInfo}/>
                <FloatingLabel fieldLabel='Hospital Address' onInfoChange={setUserInfo} userInfo={userInfo}/>
                <FloatingLabel fieldLabel='ID' onInfoChange={setUserInfo} userInfo={userInfo}/> */}
                <FloatingLabel fieldLabel='Phone Number' name='phoneNumber' onInfoChange={setUserInfo} userInfo={userInfo}/>
                {/* <FloatingLabel fieldLabel='Hospital' name='hospitalID' onInfoChange={setUserInfo} userInfo={userInfo}/> */}
                <FloatingLabel fieldLabel='Date of Birth' name='userDOB' onInfoChange={setUserInfo} userInfo={userInfo}/>
                <FloatingLabel fieldLabel='Address' name='address' onInfoChange={setUserInfo} userInfo={userInfo}/>
                <Dropdown label='Select Hospital' options={hospital?.map(hospital => ({
                    id: hospital.hospitalID,
                    label: hospital.hospitalName,
                }))} onChange={setHospitalID} value={hospitalID}/>
                {
                    // userInfo && <p>{JSON.stringify(userInfo)}</p>
                }
                {/* <FloatingLabel fieldLabel='Date of Birth' onInfoChange={setUserInfo} userInfo={userInfo}/>  */}
            </div>
        </div>
        <div className='flex justify-center items-center w-full'>
            <button className='bg-[#F16A6A] rounded-lg p-3 flex-[0.4] m-auto text-white' onClick={()=>{
                if (userInfo) {
                    createNewUser(userInfo)
                }
            }}>Create Account</button>
            <button className='bg-[#EE5253] rounded-lg p-3 flex-[0.4] m-auto text-white'>Login</button>
        </div>
    </div>
  )
}

export default Register
import React,{useState,useEffect} from 'react'
import logo from "./../assets/icon-brain.png"
import FloatingLabel from '../components/FloatingLabel'
import Dropdown from '../components/Dropdown'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { registerUser } from '../api/auth'
import { UserRole,newUser } from '../types/user'
import { HospitalDropdown } from '../types/hospital'

import { getAllHospital } from '../api/hospital'

type Props = {}

const Register = (props: Props) => {
    const [userRole, setUserRole] = useState<string>("")

    const [hospital, setHospital] = useState<HospitalDropdown[]>([{
        hospitalID:"",
        hospitalName:""
    }])
    const [hospitalID, setHospitalID] = useState<string>("-1")

    const [userInfo,setUserInfo] = useState<newUser|null>(null)
    const [dob, setDOB] = useState<Date|null>(null)

    const today = new Date();

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target

        setUserInfo(prevUserInfo => ({
          ...(prevUserInfo || {}),
          [name]: value,
        } as newUser));
      }
    
      const createNewUser = (user:newUser) => {
            user["hospitalID"] = parseInt(hospitalID)
            user["userDOB"] = dob?.toISOString().split("T")[0].replace(/-/g, "/")
            switch (userRole) {
                case "1":
                    user["userRole"] = UserRole.Doctor
                    break;
                case "2":
                    user["userRole"] = UserRole.Patient
                    break;
                default:
                    user["userRole"] = UserRole['Normal User']
                    user["hospitalID"] = -1
                    break;
            }
            const castedUser = user as newUser
            registerUser(castedUser)
      }

      useEffect(() => {
        async function fetchHospitals() {
            const hospitals = await getAllHospital()
            setHospital(hospitals)
        }
        fetchHospitals()
      }, [])
      


  return (
    <>
<section className="bg-[#3b50df] min-h-screen">
  <div className="flex flex-col w-full items-center justify-center px-6 py-8 mx-auto h-max lg:py-0">
      <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-white py-2">
          <img className="w-12 h-12 mr-2" src={logo} alt="logo"/>
          TumorTracer   
      </a>
      <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-142.5 xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8 w-full">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                  Create an account
              </h1>
              <div className="flex flex-row  w-full" >
                <div className='flex-[0.45]'>
                  <div>
                      <label className="block mb-2 text-sm font-medium text-gray-900 ">First Name</label>
                      <input type="text" name="userFirstName" id="firstName" onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="name@company.com" />
                  </div>
                  <div>
                      <label className="block mb-2 text-sm font-medium text-gray-900 ">Last Name</label>
                      <input type="text" name="userLastName" id="lastName" onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="name@company.com" />
                  </div>
                  <div>
                      <label className="block mb-2 text-sm font-medium text-gray-900 ">Your email</label>
                      <input type="email" name="email" id="email" onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="name@company.com" />
                  </div>
                  <div>
                      <label className="block mb-2 text-sm font-medium text-gray-900 ">Password</label>
                      <input type="password" name="password" id="password" onChange={handleChange} placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " />
                  </div>
                  <div>
                      <label className="block mb-2 text-sm font-medium text-gray-900">Confirm password</label>
                      <input type="confirm-password" name="confirm-password" onChange={handleChange} id="confirm-password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "/>
                  </div>
                </div>
                <div className='flex-[0.45] ml-auto'>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 ">User Type</label>
                    <Dropdown label='Select User' options={[{id:"1",label:"Doctor"},{id:"2",label:"Patient"},{id:"3",label:"Normal User"}]} onChange={setUserRole} value={userRole}/>
                  </div>
                  <div>
                      <label className="block mb-2 text-sm font-medium text-gray-900 ">Phone Number</label>
                      <input type="number" name="phoneNumber" id="phoneNumber" onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="name@company.com" />
                  </div>
                  <div>
                      <label className="block mb-2 text-sm font-medium text-gray-900 ">Date of Birth</label>
                      {/* <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="name@company.com" /> */}
                      <DatePicker maxDate={today} className="w-full px-4 py-2 border rounded-md shadow-sm text-gray-700 bg-gray-50 transition-colors duration-200" showMonthDropdown
                        showYearDropdown
                        dropdownMode="select"
                        popperClassName="react-datepicker-right"
                        popperPlacement="bottom-start"
                        selected={dob}
                        onChange={(date) => {
                          if (date) {
                            setDOB(date)
                          }
                        }}
                        />
                  </div>
                  <div>
                      <label className="block mb-2 text-sm font-medium text-gray-900 ">Address</label>
                      <input type="text" name="address" id="address" onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="name@company.com" />
                  </div>
                  <div>
                  {(userRole === "1" || userRole === "2") &&
                  (
                    <>
                    <label className="block mb-2 text-sm font-medium text-gray-900 ">Associated Hospital</label>
                    <Dropdown label='Select Hospital' styles='' options={hospital?.map(hospital => ({
                            id: hospital.hospitalID,
                            label: hospital.hospitalName,
                        }))} onChange={setHospitalID} value={hospitalID}/>
                    </>
                  )}
                 
                  </div>
                </div>
{/*  */}
{/*  */}
              </div>
              {/*  */}
                  <button type="submit" onClick={()=>{
                    console.log(userInfo)
                    console.log(userRole)
                    if (userInfo) {
                      createNewUser(userInfo)
                    }
                  }} className="w-full text-white bg-blue-400 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Create an account</button>
                  <p className="text-sm font-light text-gray-500 ">
                      Already have an account? <a href="/login" className="font-medium text-primary-600 hover:underline">Login here</a>
                  </p>
              {/*  */}
          </div>
      </div>
  </div>
</section>
    </>
  )
}

export default Register

// const Register = (props: Props) => {
//     const [userRole, setUserRole] = useState<string>("")
//     const [hospital, setHospital] = useState<HospitalDropdown[]>([{
//         hospitalID:"",
//         hospitalName:""
//     }])
//     const [hospitalID, setHospitalID] = useState<string>("-1")
//     const [showHospital, setShowHospital] = useState<boolean>(false)

//     // type user = {
//     //     userFirstName:string,
//     //     userLastName:string,
//     //     email:string,
//     //     password:string,
//     //     confirmPassword:string,
//     //     phoneNumber:number,
//     //     age:number,
//     //     address:string
//     //     userRole:string
//     // }
//     const [userInfo,setUserInfo] = useState<newUser|null>(null)

//     const createNewUser = (user:newUser) => {
//         user["hospitalID"] = parseInt(hospitalID)
//         switch (userRole) {
//             case "1":
//                 user["userRole"] = UserRole.Doctor
//                 break;
//             case "2":
//                 user["userRole"] = UserRole.Patient
//                 break;
//             default:
//                 user["userRole"] = UserRole['Normal User']
//                 user["hospitalID"] = -1
//                 break;
//         }
        
//         registerUser(user)
//     }

//     useEffect(() => {
//         async function fetchHospitals() {
//             const hospitals = await getAllHospital()
//             setHospital(hospitals)
//         }
//         fetchHospitals()
//     }, [])
    

//   return (
//     <div className='bg-primary h-screen w-full p-4'>
//         <img src={WebLogo} height={85} width={103}/>
//         <div className='bg-primary-light w-full h-3/4 flex justify-center items-start mt-4'>
//             <div className='flex flex-col justify-start items-start w-full h-2/4'>
//                 <FloatingLabel fieldLabel='First Name' name='userFirstName' onInfoChange={setUserInfo} userInfo={userInfo}/>
//                 <FloatingLabel fieldLabel='Last Name' name='userLastName' onInfoChange={setUserInfo} userInfo={userInfo}/>
//                 <FloatingLabel fieldLabel='Email' name='email' onInfoChange={setUserInfo} userInfo={userInfo}/>
//                 <FloatingLabel fieldLabel='Password' name='password' onInfoChange={setUserInfo} userInfo={userInfo}/>
//                 <FloatingLabel fieldLabel='Confirm Password' name='confirmPassword' onInfoChange={setUserInfo} userInfo={userInfo}/>
//             </div>
//             <div className='flex flex-col justify-start items-start w-full h-2/4'>
//                 {/* <FloatingLabel fieldLabel='User Type'/> */}
//                 <Dropdown label='Select User' styles='w-3/4' options={[{id:"1",label:"Doctor"},{id:"2",label:"Patient"},{id:"3",label:"Normal User"}]} onChange={setUserRole} value={userRole}/>
                
//                 {/* <p>{userType}</p> */}

//                 {/* <FloatingLabel fieldLabel='Hospital' onInfoChange={setUserInfo} userInfo={userInfo}/>
//                 <FloatingLabel fieldLabel='Hospital Address' onInfoChange={setUserInfo} userInfo={userInfo}/>
//                 <FloatingLabel fieldLabel='ID' onInfoChange={setUserInfo} userInfo={userInfo}/> */}
//                 <FloatingLabel fieldLabel='Phone Number' name='phoneNumber' onInfoChange={setUserInfo} userInfo={userInfo}/>
//                 {/* <FloatingLabel fieldLabel='Hospital' name='hospitalID' onInfoChange={setUserInfo} userInfo={userInfo}/> */}
//                 <FloatingLabel fieldLabel='Date of Birth' name='userDOB' onInfoChange={setUserInfo} userInfo={userInfo}/>
//                 <FloatingLabel fieldLabel='Address' name='address' onInfoChange={setUserInfo} userInfo={userInfo}/>
//                 {
//                     userRole !== "3" && userRole.length !== 0 &&
//                     (
//                         <>
//                         <Dropdown label='Select Hospital' styles='w-3/4' options={hospital?.map(hospital => ({
//                             id: hospital.hospitalID,
//                             label: hospital.hospitalName,
//                         }))} onChange={setHospitalID} value={hospitalID}/>
//                         </>
//                     )
//                 }

//                 {
//                     // userInfo && <p>{JSON.stringify(userInfo)}</p>
//                 }
//                 {/* <FloatingLabel fieldLabel='Date of Birth' onInfoChange={setUserInfo} userInfo={userInfo}/>  */}
//             </div>
//         </div>
//         <div className='flex justify-center items-center w-full'>
//             <button className='bg-[#F16A6A] rounded-lg p-3 flex-[0.4] m-auto text-white' onClick={()=>{
//                 if (userInfo) {
//                     createNewUser(userInfo)
//                 }
//             }}>Create Account</button>
//             <button className='bg-[#EE5253] rounded-lg p-3 flex-[0.4] m-auto text-white'>Login</button>
//         </div>
//     </div>
//   )
// }

// export default Register